import React from "react";
import MoviePreview from "./MoviePreview";

const Movie = React.forwardRef((props, ref) => {
  const { movie, isLastMovie } = props;
  return (
    <>
      <img
        className="img-fluid"
        src={`http://image.tmdb.org/t/p/w154${movie.poster_path}`}
        ref={isLastMovie ? ref : null}
      ></img>
    </>
  );
});
export default Movie;
