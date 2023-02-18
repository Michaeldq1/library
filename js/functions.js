"use-strict";

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
      renderStats();
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
      renderStats();
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
      renderStats();
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

function renderStats() {
  const sumBooks = bookList.reduce((counter, book) => {
    if (book) counter += 1;
    return counter;
  }, 0);

  const sumFavorites = bookList.reduce((counter, book) => {
    if (book.favorite === true) counter += 1;
    return counter;
  }, 0);

  const totalRead = bookList.reduce((counter, book) => {
    if (book.read === true) counter += 1;
    return counter;
  }, 0);

  const favoritesPercentage = isNaN((sumFavorites / sumBooks) * 100)
    ? 0
    : ((sumFavorites / sumBooks) * 100).toFixed(2);

  const readPercentage = isNaN((totalRead / sumBooks) * 100)
    ? 0
    : ((totalRead / sumBooks) * 100).toFixed(2);

  totalBooks.textContent = `Number of Books: ${sumBooks}`;
  totalFavorites.textContent = `Favorites: ${sumFavorites} (${favoritesPercentage}%)`;
  totalBooksRead.textContent = `Books Read: ${totalRead} (${readPercentage}%)`;
}

function toggleDisplay(element) {
  element.style.display = element.style.display == "none" ? "flex" : "none";
}

function highlightIcon(icon) {
  icon.style.color =
    icon.style.color == "var(--secondary-color)"
      ? "goldenrod"
      : "var(--secondary-color)";
}

function handleFilterClick(filterType) {
  let filteredBooks;

  if (filterType === "all") {
    filteredBooks = bookList;
    allBooksFilter.classList.add("selected-filter");
    favoriteBooksFilter.classList.remove("selected-filter");
    readBooksFilter.classList.remove("selected-filter");
    unreadBooksFilter.classList.remove("selected-filter");
  } else if (filterType === "favorite") {
    filteredBooks = bookList.filter((book) => book.favorite);
    allBooksFilter.classList.remove("selected-filter");
    favoriteBooksFilter.classList.add("selected-filter");
    readBooksFilter.classList.remove("selected-filter");
    unreadBooksFilter.classList.remove("selected-filter");
  } else if (filterType === "read") {
    filteredBooks = bookList.filter((book) => book.read);
    allBooksFilter.classList.remove("selected-filter");
    favoriteBooksFilter.classList.remove("selected-filter");
    readBooksFilter.classList.add("selected-filter");
    unreadBooksFilter.classList.remove("selected-filter");
  } else if (filterType === "unread") {
    filteredBooks = bookList.filter((book) => !book.read);
    allBooksFilter.classList.remove("selected-filter");
    favoriteBooksFilter.classList.remove("selected-filter");
    readBooksFilter.classList.remove("selected-filter");
    unreadBooksFilter.classList.add("selected-filter");
  }

  sortButton.classList.remove("selected-filter");
  bookListContainer.innerHTML = "";
  renderBookCards(filteredBooks);
}

function handleSortClick() {
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
}

function formFieldCheck() {
  if (
    bookTitle.value !== "" &&
    bookAuthor.value !== "" &&
    bookGenre.value !== "" &&
    bookPages.value !== ""
  ) {
    submitBookButton.classList.remove("disable-button");
  } else submitBookButton.classList.add("disable-button");
}

function createBook() {
  const book = {};

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
  renderStats();

  bookTitle.value = "";
  bookAuthor.value = "";
  bookGenre.value = "";
  bookPages.value = "";

  window.localStorage.setItem("bookList", JSON.stringify(bookList));
}

function closeModal() {
  addBookModal.style.display = "none";
  bookListContainer.style.display = "flex";
  header.style.display = "flex";
  footer.style.display = "flex";
  bookTitle.value = "";
  bookAuthor.value = "";
  bookGenre.value = "";
  bookPages.value = "";
}
