import React from "react";
import Movie from "./Movie";
import AddMovie from "../common/AddMovie";

const MovieList = React.forwardRef(({ movies, handleClick }, ref) => {
  return (
    <div className="d-flex my-2 flex-wrap movie-container justify-content-center">
      {movies.map((movie, i) => {
        if (movie.poster_path) {
          return (
            <div
              key={movie.id + i}
              className="movie-div mt-1 mx-3 hover-button"
            >
              <Movie
                movie={movie}
                isLastMovie={i === movies.length - 1}
                ref={ref}
              />
              <AddMovie movie={movie} handleClick={handleClick} />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
});
export default MovieList;
