import React from "react";

const Movie = React.forwardRef(({ movie, isLastMovie }, ref) => {
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
