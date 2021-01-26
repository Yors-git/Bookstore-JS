class Book {
  constructor(title = 'Unknown', author = 'Unknown', numOfPages = 0, read = false){
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.read = read
  }
}

//Manage book objects

let myLibrary = [
  {
    title: 'First title',
    author: 'First author',
    numOfPages: 333,
    read: false
  },
  {
    title: 'Second title',
    author: 'Second author',
    numOfPages: 444,
    read: false
  }
]

const createNewBook = (newBook) => {
  if (myLibrary.some((book) => book.title === newBook.title)) return false;
  myLibrary.push(newBook);
  saveLocal();
  return true;
}

const deleteBook = (bookTitle) => {
  myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
  saveLocal();
}

function getBook(bookTitle) {
  for (let book of myLibrary) {
    if (book.title === bookTitle) {
      return book;
    }
  }
  return null;
}

// Show Books 

const allBooks = document.querySelector('.row')

const showBooks = () => {
  resetGrid();
  for (let element of myLibrary) {
    bookHtml(element);
  }
}

const resetGrid = () => {
  allBooks.innerHTML = "";
}


// const showBooks = () => {
//   for( let i = 0; i<= myLibrary.length; i++){
//     card.appendChild(myLibrary)
//   }
// }

//  Create Book Card

const bookHtml = (book) => {
  const bookCard = document.createElement('div')
  const cardContent = document.createElement('div')
  const title = document.createElement('h3')
  const author = document.createElement('h4')
  const pages = document.createElement('h4')
  const readBtn = document.createElement('a')
  const deleteBtn = document.createElement('a')
  bookCard.classList.add('col-md-6', 'col-lg-4')
  cardContent.classList.add('project-card-no-image')
  readBtn.classList.add('btn', 'btn-outline-primary', 'btn-sm')
  readBtn.setAttribute('role', 'button')
  readBtn.setAttribute('href', '#')
  deleteBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm')
  deleteBtn.setAttribute('role', 'button')
  deleteBtn.setAttribute('href', '#')
  title.textContent = `Title: ${book.title}`
  author.textContent = `Author: ${book.author}`
  pages.textContent = `Number of pages: ${book.numOfPages}`
  if (book.isRead) {
    readBtn.textContent = 'Already Read'
  } else {
    readBtn.textContent = 'Not Read'
  }
  deleteBtn.textContent = 'Delete Book'

  cardContent.appendChild(title)
  cardContent.appendChild(author)
  cardContent.appendChild(pages)
  cardContent.appendChild(readBtn)
  cardContent.appendChild(deleteBtn)
  bookCard.appendChild(cardContent)
  allBooks.appendChild(bookCard)

}

// Show New Book Form

const newBookButton = document.querySelector(".new-book");
const popup = document.querySelector(".js-popup");
const overlay = document.querySelector(".js-overlay");

newBookButton.addEventListener("click", openPopup);
overlay.addEventListener("click", closePopup);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

function openPopup() {
  // form.reset();
  popup.classList.add("popup--active");
  overlay.classList.add("overlay--active");
}

function closePopup() {
  popup.classList.remove("popup--active");
  overlay.classList.remove("overlay--active");
}

showBooks()
