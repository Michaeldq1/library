"use strict";

const bookList = JSON.parse(window.localStorage.getItem("bookList") || []);
const addBookButton = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const submitBookButton = document.getElementById("submit-book");
const bookListContainer = document.getElementById("main-container");
const filterButtons = document.getElementById("filter-buttons");
const allBooksFilter = document.getElementById("filter-all");
const favoriteBooksFilter = document.getElementById("filter-favorite");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const closeModalButton = document.getElementById("close-modal");

window.addEventListener("load", (event) => {
  renderBookCards(bookList);
});

allBooksFilter.addEventListener("click", () => {
  bookListContainer.innerHTML = "";
  renderBookCards(bookList);
});

favoriteBooksFilter.addEventListener("click", () => {
  const favoriteBooks = bookList.filter((book) => book.favorite === true);
  bookListContainer.innerHTML = "";
  renderBookCards(favoriteBooks);
});

addBookButton.addEventListener("click", (event) => {
  addBookModal.style.display = "block";
  filterButtons.style.display = "none";
  bookListContainer.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";

  console.log(bookList);
});

submitBookButton.addEventListener("click", (event) => {
  const book = {};
  const bookTitle = document.getElementById("modal-input-title");
  const bookAuthor = document.getElementById("modal-input-author");
  const bookGenre = document.getElementById("modal-input-genre");
  const bookPages = document.getElementById("modal-input-pages");

  book.title = bookTitle.value;
  book.author = bookAuthor.value;
  book.genre = bookGenre.value;
  book.pages = bookPages.value;
  book.read = false;
  book.favorite = false;

  addBookModal.style.display = "none";
  bookListContainer.style.display = "flex";
  header.style.display = "flex";
  footer.style.display = "flex";
  filterButtons.style.display = "flex";

  bookList.push(book);
  bookListContainer.innerHTML = "";

  renderBookCards(bookList);
  console.log(book);
  console.log(bookList);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookGenre.value = "";
  bookPages.value = "";

  window.localStorage.setItem("bookList", JSON.stringify(bookList));
});

function renderBookCards(array) {
  for (const book of array) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    const bookDelete = document.createElement("span");
    bookDelete.classList.add("material-symbols-outlined");
    bookDelete.classList.add("book-delete");
    bookDelete.textContent = "delete";

    bookDelete.addEventListener("click", (event) => {
      bookList.splice(bookList.indexOf(book), 1);
      bookListContainer.innerHTML = "";
      renderBookCards(array);
      window.localStorage.setItem("bookList", JSON.stringify(array));
    });

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
    bookRead.textContent = "cancel";

    bookRead.addEventListener("click", (event) => {
      if (!book.read) {
        book.read = true;
        bookRead.textContent = "check_circle";
      } else {
        book.read = false;
        bookRead.textContent = "cancel";
      }

      bookRead.classList.toggle("book-read-enabled");
    });

    const bookFavorite = document.createElement("span");
    bookFavorite.classList.add("material-symbols-outlined");
    bookFavorite.classList.add("book-favorite");
    bookFavorite.textContent = "star";

    bookFavorite.addEventListener("click", (event) => {
      if (!book.favorite) {
        book.favorite = true;
        bookFavorite.classList.add("book-favorite-enabled");
      } else {
        book.favorite = false;
        bookFavorite.classList.remove("book-favorite-enabled");
      }

      window.localStorage.setItem("bookList", JSON.stringify(array));
    });

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookGenre);
    bookCard.appendChild(bookPagesIcon);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(bookDelete);
    bookCard.appendChild(bookFavorite);
    bookListContainer.appendChild(bookCard);
  }
}

closeModalButton.addEventListener("click", (event) => {
  addBookModal.style.display = "none";
  filterButtons.style.display = "flex";
  bookListContainer.style.display = "flex";
  header.style.display = "flex";
  footer.style.display = "flex";
});
