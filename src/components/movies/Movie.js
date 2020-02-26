import React from "react";
import MoviePreview from "./MoviePreview";

const Movie = React.forwardRef((props, ref) => {
  const { movie, handleClick, index } = props;
  if (index) {
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
              className="d-flex flex-column m-1 button fav-button"
              name="fav"
              value={movie.id}
              onClick={handleClick}
            ></button>
            <button
              className="d-flex flex-column m-1 button watchLater-button"
              name="watchLater"
              value={movie.id}
              onClick={handleClick}
            ></button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="movie-div mt-1 mx-3 hover-button">
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`}
          ></img>
          <div className="fav-div hover-button--on">
            <button
              className="d-flex flex-column m-1 button fav-button"
              name="fav"
              value={movie.id}
              onClick={handleClick}
            ></button>
            <button
              className="d-flex flex-column m-1 button watchLater-button"
              name="watchLater"
              value={movie.id}
              onClick={handleClick}
            ></button>
          </div>
        </div>
      </>
    );
  }
});
export default Movie;
