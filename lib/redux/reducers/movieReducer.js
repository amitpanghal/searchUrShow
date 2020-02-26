import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function movieReducer(
  state = initialState.searchedMovies,
  action
) {
  switch (action.type) {
    case types.LOAD_QUERIED_MOVIES_SUCCESS:
      return [...state, ...action.movies];
    case types.RESET_QUERIED_MOVIES:
      return [];
    case types.SAVE_MOVIE_IN_WATCH_LATER_LIST:
    case types.DELETE_MOVIE_IN_WATCH_LATER_LIST:
    case types.SAVE_FAV_MOVIE:
    case types.DELETE_FAV_MOVIE:
      return state.map(movie =>
        action.movie.id === movie.id ? action.movie : movie
      );
    default:
      return state;
  }
}
