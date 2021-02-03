/* eslint-disable no-undef */
const firebaseConfig = {
  apiKey: 'AIzaSyBht5OtBb2zLnSSnf0ZRWm8eanAIeswNSA',
  authDomain: 'bookstore-js.firebaseapp.com',
  projectId: 'bookstore-js',
  storageBucket: 'bookstore-js.appspot.com',
  messagingSenderId: '93931593699',
  appId: '1:93931593699:web:875342299c5ef877c48ad6',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const bookFactory = (title, author, numOfPages, read) => {
  return { title, author, numOfPages, read };
};

let myLibrary = [];

// Manage book objects

const createNewBook = (newBook) => {
  if (myLibrary.some((book) => book.title === newBook.title)) return false;
  myLibrary.push(newBook);
  database.ref('LibraryDatabase').set({ myLibrary });
  return true;
};

const allBooks = document.querySelector('.row');

// Create Book Card

const bookHtml = (book) => {
  const bookCard = document.createElement('div');
  const cardContent = document.createElement('div');
  const title = document.createElement('h3');
  const author = document.createElement('h4');
  const pages = document.createElement('h4');
  const readBtn = document.createElement('a');
  const deleteBtn = document.createElement('a');
  bookCard.classList.add('col-md-6', 'col-lg-4');
  cardContent.classList.add('project-card-no-image');
  readBtn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  readBtn.setAttribute('role', 'button');
  readBtn.setAttribute('href', '#');
  deleteBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm');
  deleteBtn.setAttribute('role', 'button');
  deleteBtn.setAttribute('href', '#');

  readBtn.setAttribute('data-read', myLibrary.indexOf(book));
  deleteBtn.setAttribute('data-del', myLibrary.indexOf(book));

  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Number of pages: ${book.numOfPages}`;
  if (book.read) {
    readBtn.textContent = 'Already Read';
  } else {
    readBtn.textContent = 'Not Read';
  }
  deleteBtn.textContent = 'Delete Book';

  cardContent.appendChild(title);
  cardContent.appendChild(author);
  cardContent.appendChild(pages);
  cardContent.appendChild(readBtn);
  cardContent.appendChild(deleteBtn);
  bookCard.appendChild(cardContent);
  allBooks.appendChild(bookCard);
};

// Show Books

const showBooks = () => {
  const libraryData = database.ref('LibraryDatabase/');
  libraryData.on('value', (snapshot) => {
    myLibrary = snapshot.val().myLibrary;
    allBooks.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i += 1) {
      bookHtml(myLibrary[i]);
    }
  });
};

const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  database.ref('LibraryDatabase').update({ myLibrary });
  showBooks();
};

const toggleRead = (index) => {
  if (myLibrary[index].read === false) {
    myLibrary[index].read = true;
    database.ref('LibraryDatabase').update({ myLibrary });
  } else {
    myLibrary[index].read = false;
    database.ref('LibraryDatabase').update({ myLibrary });
  }
  showBooks();
};

const toggleOrDelete = (e) => {
  if (e.target.classList.contains('btn-outline-primary')) {
    toggleRead(e.target.getAttribute('data-read'));
  } else if (e.target.classList.contains('btn-outline-danger')) {
    deleteBook(e.target.getAttribute('data-del'));
  }
};

allBooks.addEventListener('click', toggleOrDelete);

// Manage form inputs

function formInputs() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#numOfPages').value;
  const read = document.querySelector('#read').checked;
  return bookFactory(title, author, pages, read);
}

const form = document.querySelector('.new-book-form');
const newBookButton = document.querySelector('.new-book');
const popup = document.querySelector('.js-popup');
const overlay = document.querySelector('.js-overlay');
const popupError = document.querySelector('.book-exist-error');

const openPopup = () => {
  form.reset();
  popup.classList.add('popup--active');
  overlay.classList.add('overlay--active');
};

const closePopup = () => {
  popup.classList.remove('popup--active');
  overlay.classList.remove('overlay--active');
  popupError.classList.remove('error--active');
};

const showBookRepeated = () => {
  popupError.classList.add('error--active');
};

function addBook(e) {
  e.preventDefault();
  if (createNewBook(formInputs())) {
    showBooks();
    closePopup();
  } else {
    showBookRepeated();
    showBooks();
  }
}

form.addEventListener('submit', addBook);

// Show New Book Form

newBookButton.addEventListener('click', openPopup);
overlay.addEventListener('click', closePopup);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

showBooks();
