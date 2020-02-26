import * as movieAPI from "../../../api/MovieApi";
import * as types from "./actionTypes";

export function loadMoviesSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}

export function loadQueriedMoviesSuccess(movies) {
  return { type: types.LOAD_QUERIED_MOVIES_SUCCESS, movies };
}

export function resetQueriedMovies() {
  return { type: types.RESET_QUERIED_MOVIES };
}

export function resetLatestMovies() {
  return { type: types.RESET_LATEST_MOVIES };
}

export function saveOrUpdateFavMovies(movie) {
  return {
    type: movie.isFav ? types.SAVE_FAV_MOVIE : types.DELETE_FAV_MOVIE,
    movie
  };
}

export function saveOrUpdateWatchLaterMovies(movie) {
  return {
    type: movie.watchLater
      ? types.SAVE_MOVIE_IN_WATCH_LATER_LIST
      : types.DELETE_MOVIE_IN_WATCH_LATER_LIST,
    movie
  };
}

export const loadMovies = page => {
  return dispatch => {
    return movieAPI
      .getLatestMovies(page)
      .then(movies => {
        dispatch(loadMoviesSuccess(movies.results));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const loadQueriedMovies = (query, page) => {
  return dispatch => {
    return movieAPI
      .searchMovies(query, page)
      .then(movies => {
        dispatch(loadQueriedMoviesSuccess(movies.results));
      })
      .catch(error => {
        throw error;
      });
  };
};
