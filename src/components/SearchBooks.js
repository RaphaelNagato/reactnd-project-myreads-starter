import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { search } from "../BooksAPI";

class SearchBooks extends Component {
  state = {
    searchText: "",
    books: [],
    delayTimer: 0,
  };

  changeSearchText = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  getBooks = () => {
    if (this.state.delayTimer) {
      clearTimeout(this.state.delayTimer);
    }

    if (this.state.searchText === "") {
      this.setState({ books: [] });
      return;
    }

    this.setState({
      delayTimer: setTimeout(() => {
        search(this.state.searchText.trim()).then((result) => {
          if (result && result.length > 0) {
            this.setState({ books: result });
          } else {
            this.setState({ books: [] });
          }
        });
      }, 1000),
    });
  };

  render() {
    const showingBooks = this.state.books.map((searchBook) => {
      const bookWithShelf = this.props.shelfBooks.filter(
        (shelfBook) => shelfBook.id === searchBook.id
      );
      return bookWithShelf.length > 0 ? bookWithShelf[0] : searchBook;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={this.state.searchText}
              onChange={this.changeSearchText}
              placeholder="Search by title or author"
              onKeyUp={this.getBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showingBooks.length !== 0 && (
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} onShelfChange={this.props.onShelfChange} />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
