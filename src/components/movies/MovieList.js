import React from "react";
import Movie from "./Movie";

const MovieList = React.forwardRef((props, ref) => {
  const { handleSearch, query, movies, handleClick, loading } = props;
  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        <input
          className="search-input form-control"
          type="text"
          placeholder="Search Movies"
          onChange={handleSearch}
          value={query}
        />
      </div>
      <div className="d-flex flex-wrap ml-3 movie-container">
        {movies.map((movie, i) => {
          return (
            <Movie
              key={movie.id  + movie.title}
              movie={movie}
              index={i}
              handleClick={handleClick}
              index={i === movies.length - 1}
              ref={ref}
            />
          );
        })}
      </div>
      {loading ? <p className="App-intro">loading ...</p> : ""}
    </>
  );
});
export default MovieList;
