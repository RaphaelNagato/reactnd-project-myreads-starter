import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { search } from "../BooksAPI";
import * as Utils from "../utils/utils";
import LoadingComponent from "./LoadingComponent";

class SearchBooks extends Component {
  state = {
    searchText: "",
    books: [],
    delayTimer: 0,
    loading: false,
    error: null,
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

    if (Utils.isEmpty(this.state.searchText)) {
      this.setState({ books: [], loading: false });
      return;
    }

    this.setState({
      loading: true,
    });

    this.setState({
      delayTimer: setTimeout(() => {
        search(this.state.searchText.trim())
          .then((result) => {
            if (result && result.length > 0) {
              this.setState({ books: result, loading: false });
            } else {
              this.setState({ books: [], loading: false });
            }
          })
          .catch((err) => {
            console.log(err);
            this.setState({ error: err.message });
          });
      }, 500),
    });
  };

  render() {
    //This function transforms the books queried from search into one with shelf state if it exists in shelfBooks props
    const showingBooks = this.state.books.map((searchBook) => {
      const bookWithShelf = this.props.shelfBooks.find(
        (shelfBook) => shelfBook.id === searchBook.id
      );
      return bookWithShelf ? bookWithShelf : searchBook;
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
          {Utils.isEmpty(this.state.searchText) && (
            <p>No query in search bar</p>
          )}

          {this.state.loading === false &&
            !Utils.isEmpty(this.state.searchText) &&
            showingBooks.length === 0 && <p>Query not found</p>}

          {(this.state.loading || this.state.error) && (
            <div className="loading">
              {this.state.loading ? (
                <LoadingComponent type={"spinningBubbles"} color={"#00FF00"} />
              ) : (
                this.state.error
              )}
            </div>
          )}

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
