"use strict";

const bookList = JSON.parse(window.localStorage.getItem("bookList")) || [];
const addBookButton = document.getElementById("add-book");
const addBookModal = document.getElementById("modal");
const submitBookButton = document.getElementById("add-book-button");
const bookListContainer = document.getElementById("main-container");
const filterButtons = document.getElementById("filter-buttons");
const allBooksFilter = document.getElementById("filter-all");
const favoriteBooksFilter = document.getElementById("filter-favorite");
const readBooksFilter = document.getElementById("filter-read");
const unreadBooksFilter = document.getElementById("filter-unread");
const filterIcon = document.getElementById("filter-icon");
const analyticsIcon = document.getElementById("analytics-icon");
const statistics = document.getElementById("statistics");
const sortButton = document.getElementById("sort");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const closeModalButton = document.getElementById("close-modal");
const totalBooks = document.getElementById("total-books");
const totalFavorites = document.getElementById("total-favorites");
const totalBooksRead = document.getElementById("total-read");
const bookTitle = document.getElementById("modal-input-title");
const bookAuthor = document.getElementById("modal-input-author");
const bookGenre = document.getElementById("modal-input-genre");
const bookPages = document.getElementById("modal-input-pages");

class Book {
  constructor(title, author, genre, pages, read, favorite) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
    this.favorite = favorite;
  }
}
