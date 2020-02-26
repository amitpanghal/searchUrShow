import React from "react";
import { connect } from "react-redux";

import Movie from "../Movie";
import * as movieActions from "../../../../lib/redux/actions/movieAction";

const WatchLaterList = ({
  movies,
  watchLaterMovies,
  saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies
}) => {
  const handleClick = e => {
    const name = e.target.name;
    const value = e.target.value;
    const movie = getMovieFromMovieListById(value);
    name === "fav"
      ? saveOrUpdateFavMovies({
          ...movie,
          ...{ isFav: movie.isFav !== undefined ? !movie.isFav : true }
        })
      : saveOrUpdateWatchLaterMovies({
          ...movie,
          ...{
            watchLater:
              movie.watchLater !== undefined ? !movie.watchLater : true
          }
        });
  };

  const getMovieFromMovieListById = movieId => {
    return movies.find(m => parseInt(m.id) === parseInt(movieId));
  };
  return (
    <div className="d-flex flex-wrap ml-3">
      {watchLaterMovies.map((movie, i) => {
        return (
          <Movie
            key={movie.id}
            movie={movie}
            index={i}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    movies:
      state.searchedMovies.length > 0
        ? state.searchedMovies
        : state.latestMovies,
    watchLaterMovies: state.watchLaterMovies
  };
};

const mapDispatchToProps = {
  saveOrUpdateFavMovies: movieActions.saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies: movieActions.saveOrUpdateWatchLaterMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchLaterList);
