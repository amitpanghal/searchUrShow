import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function latestMovieReducer(
  state = initialState.latestMovies,
  action
) {
  let results = [];
  switch (action.type) {
    case types.LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        results: [...state.results, ...action.movies.results],
        total_pages: action.movies.total_pages
      };
    case types.RESET_LATEST_MOVIES:
      return { ...state, results: state.results.filter((movie, i) => i < 20) };
    case types.SAVE_MOVIE_IN_WATCH_LATER_LIST:
    case types.DELETE_MOVIE_IN_WATCH_LATER_LIST:
    case types.SAVE_FAV_MOVIE:
    case types.DELETE_FAV_MOVIE:
      return {
        ...state,
        results: state.results.map(movie =>
          action.movie.id === movie.id ? action.movie : movie
        )
      };
    default:
      return state;
  }
}
