import React from "react";
import { connect } from "react-redux";

import MovieList from "../MovieList";
import CustomMessage from "../../common/CustomMessage";
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
  return (
    <>
      <MovieList movies={favMovies} handleClick={handleClick} />
      <CustomMessage
        checkForProp={favMovies.length === 0}
        messageText={"No Movie added to Fav list"}
      />
    </>
  );
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
