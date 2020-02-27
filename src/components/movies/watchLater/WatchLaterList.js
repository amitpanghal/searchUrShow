import React from "react";
import { connect } from "react-redux";

import MovieList from "../MovieList";
import CustomMessage from "../../common/CustomMessage";
import * as movieActions from "../../../../lib/redux/actions/movieAction";

const WatchLaterList = ({
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
    return watchLaterMovies.find(m => parseInt(m.id) === parseInt(movieId));
  };
  return (
    <>
      <MovieList movies={watchLaterMovies} handleClick={handleClick} />
      <CustomMessage
        checkForProp={watchLaterMovies.length === 0}
        messageText={"No Movie added to Watch later list"}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    watchLaterMovies: state.watchLaterMovies
  };
};

const mapDispatchToProps = {
  saveOrUpdateFavMovies: movieActions.saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies: movieActions.saveOrUpdateWatchLaterMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchLaterList);
