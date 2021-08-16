import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, onShelfChange }) => {
  const handleShelfChange = (shelf) => {
    onShelfChange(book, shelf);
  };

  const showBookThumbnail = () => {
    return book.imageLinks ? `url(${book.imageLinks.thumbnail})` : "none";
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: showBookThumbnail(),
          }}
        />
        <BookShelfChanger
          bookId={book.id}
          bookShelf={book.shelf}
          onShelfChange={handleShelfChange}
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && book.authors.join(",")}
      </div>
    </div>
  );
};

export default Book;
