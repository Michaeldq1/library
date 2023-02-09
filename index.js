"use strict";

const bookList = [
  {
    title: "Unfuck Yourself",
    author: "Gary Bishop",
    genre: "Self-Improvement",
    pages: 224,
  },
];
const addBookButton = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const bookListContainer = document.getElementById("main-container");

addBookButton.addEventListener("click", (event) => {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = bookList[0].title;

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = bookList[0].author;

  const bookGenre = document.createElement("div");
  bookGenre.classList.add("book-genre");
  bookGenre.textContent = bookList[0].genre;

  const bookPagesIcon = document.createElement("span");
  bookPagesIcon.classList.add("material-symbols-outlined");
  bookPagesIcon.classList.add("pages-icon");
  bookPagesIcon.textContent = "auto_stories";

  const bookPages = document.createElement("div");
  bookPages.classList.add("pages");
  bookPages.textContent = bookList[0].pages;

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

  // addBookModal.style.display = "block";
});
