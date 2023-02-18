"use-strict";

window.addEventListener("load", () => {
  renderBookCards(bookList);
  renderStats();
});

filterIcon.addEventListener("click", () => {
  highlightIcon(filterIcon);
  toggleDisplay(filterButtons);
});

analyticsIcon.addEventListener("click", () => {
  highlightIcon(analyticsIcon);
  toggleDisplay(statistics);
});

allBooksFilter.addEventListener("click", () => handleFilterClick("all"));

favoriteBooksFilter.addEventListener("click", () =>
  handleFilterClick("favorite")
);

readBooksFilter.addEventListener("click", () => handleFilterClick("read"));

unreadBooksFilter.addEventListener("click", () => handleFilterClick("unread"));

addBookButton.addEventListener("click", () => {
  addBookModal.style.display = "block";
  formFieldCheck();
});

sortButton.addEventListener("click", () => handleSortClick());

submitBookButton.addEventListener("click", () => createBook());

closeModalButton.addEventListener("click", () => closeModal());

bookTitle.addEventListener("keydown", () => {
  formFieldCheck();
});

bookAuthor.addEventListener("keydown", () => {
  formFieldCheck();
});

bookGenre.addEventListener("keydown", () => {
  formFieldCheck();
});

bookPages.addEventListener("keydown", () => {
  formFieldCheck();
});
