// ES6 clase and constructor
class Book{
    constructor(title, author, isbn){
        this.title =title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    addBookToList(book){
        const list_body = document.getElementById('body-data');

        // Creating the table row inside the table body
       const row_data = document.createElement('tr');
    
       row_data.innerHTML = `
        <td> ${book.title}</td>
        <td> ${book.author}</td>
        <td> ${book.isbn}</td>
        <td>
            <button class="btn-delete">
                <span class="delete">X</span>
            </button>
        </td>
       `
        
        // Appending data from input to the table body
       list_body.appendChild(row_data);
    }

    showAlert(message, className){
        const div = document.getElementById('mssg');

        div.className = className;
    
        div.textContent = message;
    
        div.style.visibility = 'visible';
    
        setTimeout(() =>{
            div.remove();
        }, 3000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.parentElement.remove();
            ui.showAlert('Book Successfully removed!', 'success');
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


// Store in Local Storage

class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        const books = Store.getBooks();

        // loop through books from LS
        books.forEach(function(book){
            const ui = new UI();

            // Add Book To UI
            ui.addBookToList(book);

        });
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
       
        // loop through books array from LS
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}



// Display Books From LS on DOMContentLoaded

document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listener on form

document.getElementById('form').addEventListener('submit', function(e){
    // get form values
    let title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Assigning the constructor to a variable
    const book = new Book(title, author, isbn);
    // assigning ui variable
    const ui = new UI();

    if(title === '' || author === ''  || isbn === ''){
        ui.showAlert('Please fill in all input fields', 'error');
        // window.location.reload();
    }else{
        
        // Error Alert
        ui.showAlert('Book added!', 'success');

        // instantiate ui to the object book
        ui.addBookToList(book);

        // local storage
        Store.addBook(book);
        //  Clear Fields
        ui.clearFields();
        
    }

    e.preventDefault();
})

// Event listener on the link button

document.querySelector('#body-data').addEventListener('click', function(e){
    // assigning ui variable
    const ui = new UI();
    ui.deleteBook(e.target)

    // Remove fromLS
    Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
})