import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function watchLaterMovieReducer(
  state = initialState.watchLaterMovies,
  action
) {
  switch (action.type) {
    case types.SAVE_MOVIE_IN_WATCH_LATER_LIST:
      return [...state, { ...action.movie }];
    case types.DELETE_MOVIE_IN_WATCH_LATER_LIST:
      return state.filter(movie => movie.id !== action.movie.id);
    case types.SAVE_FAV_MOVIE:
    case types.DELETE_FAV_MOVIE:
      return state.map(movie =>
        action.movie.id === movie.id ? action.movie : movie
      );
    default:
      return state;
  }
}
