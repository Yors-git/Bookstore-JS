class Book {
  constructor(title = 'Unknown', author = 'Unknown', numOfPages = '0', read = false) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
  }
}

const myLibrary = [
  {
    title: 'First title',
    author: 'First author',
    numOfPages: '333',
    read: false,
  },
  {
    title: 'Second title',
    author: 'Second author',
    numOfPages: '444',
    read: true,
  },
];

// Manage book objects

const createNewBook = (newBook) => {
  if (myLibrary.some((book) => book.title === newBook.title)) return false;
  myLibrary.push(newBook);
  // saveLocal();
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
  allBooks.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    bookHtml(myLibrary[i]);
  }
};

const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  showBooks();
  // saveLocal();
};

const toggleRead = (index) => {
  if (myLibrary[index].read === false) {
    myLibrary[index].read = true;
  } else {
    myLibrary[index].read = false;
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
  return new Book(title, author, pages, read);
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
