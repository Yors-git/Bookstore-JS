class Book {
  constructor(title = 'Unknown', author = 'Unknown', numOfPages = 0, read = false){
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.read = read
  }
}

//Manage book objects

let myLibrary = []

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

// Show form

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
