import React from "react";

const SearchBox = ({ handleSearch, query }) => (
  <div className="d-flex justify-content-center mt-2">
    <input
      className="search-input form-control"
      type="text"
      placeholder="Search Movies"
      onChange={handleSearch}
      value={query}
    />
  </div>
);

export default SearchBox;
