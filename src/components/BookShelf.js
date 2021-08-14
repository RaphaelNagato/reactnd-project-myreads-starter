import React from "react";
import Book from "./Book";

const BookShelf = () => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <li>
            <Book />
          </li>
          <li>
            <Book />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
