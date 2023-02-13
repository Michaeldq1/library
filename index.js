"use strict";

const bookList = JSON.parse(window.localStorage.getItem("bookList") || []);
const addBookButton = document.getElementById("add-book");
const addBookModal = document.getElementById("add-book-modal");
const submitBookButton = document.getElementById("submit-book");
const bookListContainer = document.getElementById("main-container");
const filterButtons = document.getElementById("filter-buttons");
const allBooksFilter = document.getElementById("filter-all");
const favoriteBooksFilter = document.getElementById("filter-favorite");
const readBooksFilter = document.getElementById("filter-read");
const unreadBooksFilter = document.getElementById("filter-unread");
const filterDisplay = document.getElementById("filter-display");
const sortButton = document.getElementById("sort");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const closeModalButton = document.getElementById("close-modal");

window.addEventListener("load", (event) => {
  renderBookCards(bookList);
});

filterDisplay.addEventListener("click", (event) => {
  filterButtons.style.display =
    filterButtons.style.display == "none" ? "flex" : "none";

  filterDisplay.style.color =
    filterDisplay.style.color == "var(--secondary-color)"
      ? "goldenrod"
      : "var(--secondary-color)";
});

allBooksFilter.addEventListener("click", () => {
  allBooksFilter.classList.add("selected-filter");
  favoriteBooksFilter.classList.remove("selected-filter");
  readBooksFilter.classList.remove("selected-filter");
  unreadBooksFilter.classList.remove("selected-filter");
  sortButton.classList.remove("selected-filter");
  bookListContainer.innerHTML = "";
  renderBookCards(bookList);
});

favoriteBooksFilter.addEventListener("click", () => {
  const favoriteBooks = bookList.filter((book) => book.favorite);
  favoriteBooksFilter.classList.add("selected-filter");
  allBooksFilter.classList.remove("selected-filter");
  readBooksFilter.classList.remove("selected-filter");
  unreadBooksFilter.classList.remove("selected-filter");
  sortButton.classList.remove("selected-filter");
  bookListContainer.innerHTML = "";
  renderBookCards(favoriteBooks);
});

readBooksFilter.addEventListener("click", (event) => {
  const readBooks = bookList.filter((book) => book.read);
  favoriteBooksFilter.classList.remove("selected-filter");
  allBooksFilter.classList.remove("selected-filter");
  readBooksFilter.classList.add("selected-filter");
  unreadBooksFilter.classList.remove("selected-filter");
  sortButton.classList.remove("selected-filter");
  bookListContainer.innerHTML = "";
  renderBookCards(readBooks);
});

unreadBooksFilter.addEventListener("click", (event) => {
  const unreadBooks = bookList.filter((book) => !book.read);
  favoriteBooksFilter.classList.remove("selected-filter");
  allBooksFilter.classList.remove("selected-filter");
  readBooksFilter.classList.remove("selected-filter");
  unreadBooksFilter.classList.add("selected-filter");
  sortButton.classList.remove("selected-filter");
  bookListContainer.innerHTML = "";
  renderBookCards(unreadBooks);
});

addBookButton.addEventListener("click", (event) => {
  addBookModal.style.display = "block";

  console.log(bookList);
});

sortButton.addEventListener("click", (event) => {
  const sortedBooks = bookList.sort((a, b) => {
    const titleA = a.title;
    const titleB = b.title;
    if (titleA > titleB) {
      return 1;
    } else {
      return -1;
    }
  });

  favoriteBooksFilter.classList.remove("selected-filter");
  allBooksFilter.classList.remove("selected-filter");
  readBooksFilter.classList.remove("selected-filter");
  unreadBooksFilter.classList.remove("selected-filter");
  sortButton.classList.add("selected-filter");
  bookListContainer.innerHTML = "";
  renderBookCards(sortedBooks);
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
    if (book.read) {
      bookRead.classList.add("book-read-enabled");
      bookRead.textContent = "check_circle";
    } else {
      bookRead.textContent = "cancel";
    }

    bookRead.addEventListener("click", (event) => {
      if (!book.read) {
        book.read = true;
        bookRead.textContent = "check_circle";
      } else {
        book.read = false;
        bookRead.textContent = "cancel";
      }

      bookRead.classList.toggle("book-read-enabled");
      window.localStorage.setItem("bookList", JSON.stringify(array));
    });

    const bookFavorite = document.createElement("span");
    bookFavorite.classList.add("material-symbols-outlined");
    bookFavorite.classList.add("book-favorite");
    bookFavorite.textContent = "star";
    if (book.favorite) {
      bookFavorite.classList.add("book-favorite-enabled");
    }

    bookFavorite.addEventListener("click", (event) => {
      if (!book.favorite) {
        book.favorite = true;
      } else {
        book.favorite = false;
      }

      bookFavorite.classList.toggle("book-favorite-enabled");
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
