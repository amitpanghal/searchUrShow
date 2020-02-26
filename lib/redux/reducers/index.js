import { combineReducers } from "redux";
import searchedMovies from "./movieReducer";
import favMovies from "./favMovieReducer";
import watchLaterMovies from "./watchLaterMovieReducer";
import latestMovies from "./latestMovieReducer";

const RootReducer = combineReducers({
  latestMovies,
  searchedMovies,
  favMovies,
  watchLaterMovies
});

export default RootReducer;
