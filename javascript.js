let myLibrary = [];
let collapsed = true;

function Book(author, title, pages, read, publishingHouse, rating, year) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.publishingHouse = publishingHouse;
    this.rating = rating;
    this.year = year;
    if (this.read == true) {
        this.info = `${title} by ${author}, published in ${year} with ${publishingHouse}. Rating: ${rating}. Pages: ${pages}.`;
    }
    else {
        this.info = `${title} by ${author}, published in ${year} with ${publishingHouse}. Rating: ${rating}. Pages: ${pages}.`;
    }
}

Book.prototype.logStaticDetails = function() {
    console.log(this.info)
}

function AddBookToLibrary(author, title, pages, read, publishingHouse, rating, year) {
    myLibrary[myLibrary.length] = new Book(author, title, pages, read, publishingHouse, rating, year);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function DisplayBooksInPage() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i] == null) {
            continue;
        }
        const books = document.getElementById('books');
        let book = document.createElement('div');
        if (myLibrary[i].read === true) {
            book.innerHTML = "" + myLibrary[i].info + " Already read";
        }
        else {
            book.innerHTML = "" + myLibrary[i].info + " Not read yet";
        }
        book.className = 'bookentry';
        let deleteButton = document.createElement('button');
        deleteButton.dataset.bookinquestion = `${i}`;
        deleteButton.setAttribute("onclick", `DeleteBook(${i})`);
        let t = document.createTextNode("delete this book");
        deleteButton.appendChild(t);
        let toggleReadButton = document.createElement('button');
        toggleReadButton.dataset.bookinquestion = `${i}`;
        toggleReadButton.setAttribute("onclick", `ToggleReadStatus(${i})`);
        let t2 = undefined;
        if (myLibrary[i].read === true) {
            t2 = document.createTextNode("mark unread");
        }
        else if (myLibrary[i].read === false) {
            t2 = document.createTextNode("mark read");
        }
        toggleReadButton.appendChild(t2);
        book.appendChild(document.createElement('br'));
        book.appendChild(deleteButton);
        book.appendChild(toggleReadButton);
        books.appendChild(book);
    }
    return;
}

function ToggleReadStatus(index) {
    if (myLibrary[index].read === true) {
        myLibrary[index].read = false;   
    }
    else {
        myLibrary[index].read = true;
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    books.innerHTML = "";
    DisplayBooksInPage();
    return;
}

function ExpandAddBookSection() {
    let form = document.getElementById('adddetails');
    let button = document.getElementById('expandbutton');
    if (collapsed === true) {
        form.classList.remove('invisible');
        button.innerHTML = "Collapse";
        collapsed = false;
    }
    else {
        form.classList.add('invisible');
        button.innerHTML = "New Book";
        collapsed = true;
    }
    return;
}

function DeleteBook(index) {
    myLibrary[index] = null;
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    books.innerHTML = "";
    DisplayBooksInPage();
    return;
}

const clickBot = document.querySelector("#submit")

clickBot.addEventListener("click",function(){
    let author = document.getElementById('author').value;
    let title = document.getElementById('title').value;
    let pages = document.getElementById('pages').value;
    let radiobuttons = document.getElementsByName('read');
    let read;
    for (let i = 0; i < radiobuttons.length; i++) {
        if (radiobuttons[i].checked) {
            read = radiobuttons[i].value;
        }
    }
    if (read === 'true') {
        read = true;
    }
    else {
        read = false;
    }
    let publishingHouse = document.getElementById('publishingHouse').value;
    let rating = document.getElementById('rating').value;
    let year = document.getElementById('year').value;
    if (author && title && publishingHouse && rating && year && pages) {
        AddBookToLibrary(author, title, pages, read, publishingHouse, rating, year);
        const books = document.getElementById('books');
        books.innerHTML = "";
        DisplayBooksInPage();
        return;
    }
    else {
        return 1;
    }
})

function AddSampleBooks() {
    AddBookToLibrary('Marcel Proust', 'O tempo redescoberto', '464', true, 'Editora Globo', '9', '2013');
    AddBookToLibrary('Liev Tolstói', 'Guerra e Paz', '1544', false, 'Companhia das Letras', '8', '2017');
    AddBookToLibrary('Larissa Manoela', 'O mundo de Larissa Manoela', '160', false, 'HarperCollins', '10', '2017');
    DisplayBooksInPage();
    return;
}

if (localStorage.getItem("myLibrary") === null) {
    AddSampleBooks();
    return;
}
else {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    return;
}