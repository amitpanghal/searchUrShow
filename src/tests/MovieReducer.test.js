import * as MovieAction from "../../lib/redux/actions/movieAction";
import movieReducer from "../../lib/redux/reducers/movieReducer";

describe("Movie Reducer", () => {
  it("should LOAD_QUERIED_MOVIES_SUCCESS movies", () => {
    const initialState = { results: [], total_pages: 0 };
    const movies = { results: [{ id: 1 }], total_pages: 1 };
    const action = MovieAction.loadQueriedMoviesSuccess(movies);
    const result = movieReducer(initialState, action);

    expect(result.results.length).toEqual(1);
    expect(result.total_pages).toEqual(1);
  });

  it("should LOAD_MORE_MOVIES_SUCCESS movies", () => {
    const initialState = { results: [{ id: 1 }], total_pages: 1 };
    const movies = { results: [{ id: 2 }], total_pages: 2 };
    const action = MovieAction.loadMoreMoviesSuccess(movies);
    const result = movieReducer(initialState, action);

    expect(result.results.length).toEqual(2);
    expect(result.total_pages).toEqual(2);
  });

  it("should DELETE_FAV_MOVIE", () => {
    const initialState = {
      results: [{ id: 1 }, { id: 2, isFav: true }],
      total_pages: 1
    };
    const movie = { id: 2, isFav: false };
    const action = MovieAction.saveOrUpdateFavMovies(movie);
    const result = movieReducer(initialState, action);

    expect(result.results.length).toEqual(2);
    expect(result.results[1].isFav).toEqual(false);
  });
});
