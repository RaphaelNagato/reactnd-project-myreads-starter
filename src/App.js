import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf";
import SearchBooks from "./components/SearchBooks";
import OpenSearch from "./components/OpenSearch";

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) =>
      this.setState({
        books,
      })
    );
  }

  render() {
    const currentlyReadingBooks = this.state.books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = this.state.books.filter(
      (book) => book.shelf === "wantToRead"
    );
    const readBooks = this.state.books.filter((book) => book.shelf === "read");
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  books={currentlyReadingBooks}
                />
              </div>
              <div>
                <BookShelf title="Want To Read" books={wantToReadBooks} />
              </div>
              <div>
                <BookShelf title="Read" books={readBooks} />
              </div>
            </div>
            <OpenSearch />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
