import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./components/BookShelf";
import SearchBooks from "./components/SearchBooks";
import OpenSearch from "./components/OpenSearch";
import { Route } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
    error: null,
  };
  fetchBooks = () => {
    BooksAPI.getAll()
      .then((books) => this.setState({ books, loading: false }))
      .catch((err) => this.setState({ loading: false, error: err.message }));
  };
  componentDidMount() {
    this.fetchBooks();
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.fetchBooks());
  };

  getBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => book.shelf === shelf);
  };

  render() {
    if (this.state.loading || this.state.error) {
      return (
        <div className="loading">
          {this.state.loading ? (
            <LoadingComponent type={"spinningBubbles"} color={"#00FF00"} />
          ) : (
            this.state.error
          )}
        </div>
      );
    }

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
        <Route
          exact
          path="/"
          render={() => (
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
                      onShelfChange={this.handleShelfChange}
                    />
                  </div>
                ))}
              </div>
              <OpenSearch />
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              shelfBooks={this.state.books}
              onShelfChange={this.handleShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
