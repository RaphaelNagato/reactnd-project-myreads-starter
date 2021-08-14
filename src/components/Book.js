import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        />
        <BookShelfChanger bookShelf={book.shelf} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(",")}</div>
    </div>
  );
};

export default Book;
