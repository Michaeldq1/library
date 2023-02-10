"use strict";

const bookList = [];
const addBookButton = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const submitBook = document.getElementById("submit-book");
const bookListContainer = document.getElementById("main-container");
const closeModalButton = document.getElementById("close-modal");

addBookButton.addEventListener("click", (event) => {
  addBookModal.style.display = "block";
});

submitBook.addEventListener("click", (event) => {
  const book = {};
  const bookTitle = document.getElementById("modal-input-title");
  const bookAuthor = document.getElementById("modal-input-author");
  const bookGenre = document.getElementById("modal-input-genre");
  const bookPages = document.getElementById("modal-input-pages");

  book.title = bookTitle.value;
  book.author = bookAuthor.value;
  book.genre = bookGenre.value;
  book.pages = bookPages.value;

  addBookModal.style.display = "none";
  bookList.push(book);
  bookListContainer.innerHTML = "";

  renderBookCards();
  console.log(book);
  console.log(bookList);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookGenre.value = "";
  bookPages.value = "";
});

function renderBookCards() {
  for (const book of bookList) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;

    const bookGenre = document.createElement("div");
    bookGenre.classList.add("book-genre");
    bookGenre.textContent = book.genre;

    const bookPagesIcon = document.createElement("span");
    bookPagesIcon.classList.add("material-symbols-outlined");
    bookPagesIcon.classList.add("pages-icon");
    bookPagesIcon.textContent = "auto_stories";

    const bookPages = document.createElement("div");
    bookPages.classList.add("pages");
    bookPages.textContent = book.pages;

    const bookRead = document.createElement("span");
    bookRead.classList.add("material-symbols-outlined");
    bookRead.classList.add("book-read");
    bookRead.textContent = "check_circle";

    const bookFavorite = document.createElement("span");
    bookFavorite.classList.add("material-symbols-outlined");
    bookFavorite.classList.add("book-favorite");
    bookFavorite.textContent = "star";

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookGenre);
    bookCard.appendChild(bookPagesIcon);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(bookFavorite);
    bookListContainer.appendChild(bookCard);
  }
}

closeModalButton.addEventListener("click", (event) => {
  addBookModal.style.display = "none";
});
