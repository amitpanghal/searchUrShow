import React from "react";
import { connect } from "react-redux";

import Movie from "../Movie";
import * as movieActions from "../../../../lib/redux/actions/movieAction";

const FavMovies = ({
  favMovies,
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
    return favMovies.find(m => parseInt(m.id) === parseInt(movieId));
  };
  if (favMovies.length > 0) {
    return (
      <div className="d-flex flex-wrap ml-3">
        {favMovies.map((movie, i) => {
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
  } else {
    return (
      <div className="d-flex flex-column m-auto">
        <p className="result-loading">No movie added to Favorite list</p>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    favMovies: state.favMovies
  };
};

const mapDispatchToProps = {
  saveOrUpdateFavMovies: movieActions.saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies: movieActions.saveOrUpdateWatchLaterMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(FavMovies);
