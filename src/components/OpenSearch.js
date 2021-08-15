import React from "react";
import { Link } from "react-router-dom";

const OpenSearch = () => {
  return (
    <Link to="/search">
      <div className="open-search">
        <button>Add a book</button>
      </div>
    </Link>
  );
};

export default OpenSearch;
