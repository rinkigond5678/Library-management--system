
class Book {
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    // Add a new book to the library
    addBook(book) {
        this.books.push(book);
        this.displayBooks();
    }

    // Remove a book from the library by title
    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
        this.displayBooks();
    }

    // Display all books in the library
    displayBooks() {
        const bookList = document.querySelector('#book-list tbody');
        bookList.innerHTML = ''; // Clear the current list

        this.books.forEach((book) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td><button class="delete">Delete</button></td>
            `;

            bookList.appendChild(row);

            // Add event listener for the delete button
            row.querySelector('.delete').addEventListener('click', () => {
                this.removeBook(book.title);
            });
        });
    }
}

// UI class for managing user interface
class UI {
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#genre').value = '';
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Remove alert after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Instantiate the Library class
const library = new Library();

// Add event listener for form submission
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genre = document.querySelector('#genre').value;

    // Validation
    if (title === '' || author === '' || genre === '') {
        UI.showAlert('Please fill in all fields', 'error');
    } else {
        const book = new Book(title, author, genre);
        library.addBook(book);

        UI.clearFields();
        UI.showAlert('Book Added', 'success');
    }
});