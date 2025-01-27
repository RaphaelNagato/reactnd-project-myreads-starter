import React from "react";

const BookShelfChanger = ({ bookShelf, onShelfChange }) => {
  const changeShelf = (shelf) => {
    onShelfChange(shelf);
  };

  const showShelf = () => {
    return bookShelf ? bookShelf : "none";
  };

  return (
    <div className="book-shelf-changer">
      <select value={showShelf()} onChange={(e) => changeShelf(e.target.value)}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
