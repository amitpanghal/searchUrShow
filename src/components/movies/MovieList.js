import React from "react";
import Movie from "./Movie";

const MovieList = React.forwardRef((props, ref) => {
  const {movies, handleClick } = props;
  return (
    <div className="d-flex flex-wrap ml-3 movie-container">
      {movies.map((movie, i) => {
        if (movie.poster_path) {
          return (
            <Movie
              key={movie.id + i}
              movie={movie}
              index={i}
              handleClick={handleClick}
              index={i === movies.length - 1}
              ref={ref}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
});
export default MovieList;
