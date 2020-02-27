import React from "react";
import MoviePreview from "./MoviePreview";

const Movie = React.forwardRef((props, ref) => {
  const { movie, handleClick, index } = props;
  return (
    <>
      <div className="movie-div mt-1 mx-3 hover-button">
        <img
          className="img-fluid"
          src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
          ref={index ? ref : null}
        ></img>
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
      </div>
    </>
  );
});
export default Movie;