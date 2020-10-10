// Using ES5 JS Objects/Constructor
// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor

function UI(){}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        ui.showAlert('Book Successfully removed!', 'success');
    }
}

UI.prototype.showAlert = function(message, className){

    const div = document.getElementById('mssg');

    div.className = className;

    div.textContent = message;

    // div.style.visibility = 'visible';

    setTimeout(() =>{
        div.remove();
    }, 3000)
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

   
}

UI.prototype.addBookToList = function(book){
    
   const list = document.getElementById('body-data');

    // Creating the table row inside the table body
   const row = document.createElement('tr');

   row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
   `
    
    // Appending data from input to the table body
    list.appendChild(row);
   
    
}

// Event Listener on form

document.getElementById('form').addEventListener('submit',function(e){
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
    }else{
       
        // instantiate ui to the object book
        ui.addBookToList(book)
        //  Clear Fields
        ui.clearFields();
        ui.showAlert('Book successfully added!', 'success');
    }

    e.preventDefault();
})

// Event listener on the link button

document.querySelector('#body-data').addEventListener('click', function(e){
    // assigning ui variable
    const ui = new UI();
    ui.deleteBook(e.target)
    e.preventDefault();
})