import React from "react";
const AddMovie = ({ movie, handleClick }) => (
  <div className="fav-div hover-button--on">
    <button
      className={`d-flex flex-column m-1 fav-button  ${
        movie.isFav ? "selected" : ""
      }`}
      name="fav"
      value={movie.id}
      onClick={handleClick}
    ></button>
    <button
      className={`d-flex flex-column m-1 watchLater-button  ${
        movie.watchLater ? "selected" : ""
      }`}
      name="watchLater"
      value={movie.id}
      onClick={handleClick}
    ></button>
  </div>
);

export default AddMovie;
