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
  fetchBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({ books }));
  };
  componentDidMount() {
    this.fetchBooks();
  }

  handleChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.fetchBooks());
  };

  getBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => book.shelf === shelf);
  };

  render() {
    const shelves = [
      {
        id: 0,
        title: "Currently Reading",
        books: this.getBooksByShelf("currentlyReading"),
      },
      {
        id: 1,
        title: "Want To Read",
        books: this.getBooksByShelf("wantToRead"),
      },
      { id: 2, title: "Read", books: this.getBooksByShelf("read") },
    ];
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
              {shelves.map((shelf) => (
                <div key={shelf.id}>
                  <BookShelf
                    title={shelf.title}
                    books={shelf.books}
                    onShelfChange={this.handleChangeShelf}
                  />
                </div>
              ))}
            </div>
            <OpenSearch />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
