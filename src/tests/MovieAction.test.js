import React from "react";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as MovieAction from "../../lib/redux/actions/movieAction";
import * as types from "../../lib/redux/actions/actionTypes";

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);
describe("MovieAction", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load movies thunk", () => {
    it("should load the initial latest movies", () => {
      //arrange
      fetchMock.mock("*", {
        body: { latestMovies: { results: [], total_pages: 0 } },
        headers: { "content-type": "application/json" }
      });

      const acceptedAction = [
        {
          type: types.LOAD_MOVIES_SUCCESS,
          movies: { latestMovies: { results: [], total_pages: 0 } }
        }
      ];

      const store = mockStore({
        latestMovies: { results: [], total_pages: 0 }
      });

      return store.dispatch(MovieAction.loadMovies()).then(() => {
        expect(store.getActions()).toEqual(acceptedAction);
      });
    });
  });

  describe("loadMoviesSuccess", () => {
    it("should create a LOAD_MOVIES_SUCCESS action", () => {
      const movies = { latestMovies: { results: [], total_pages: 0 } };
      const acceptedAction = { type: types.LOAD_MOVIES_SUCCESS, movies };
      const action = MovieAction.loadMoviesSuccess({
        latestMovies: { results: [], total_pages: 0 }
      });
      expect(action).toEqual(acceptedAction);
    });
  });

  describe("loadQueriedMoviesSuccess", () => {
    it("should create a LOAD_QUERIED_MOVIES_SUCCESS action", () => {
      const movies = { latestMovies: { results: [], total_pages: 0 } };
      const acceptedAction = {
        type: types.LOAD_QUERIED_MOVIES_SUCCESS,
        movies
      };
      const action = MovieAction.loadQueriedMoviesSuccess({
        latestMovies: { results: [], total_pages: 0 }
      });
      expect(action).toEqual(acceptedAction);
    });
  });

  describe("loadMoreMoviesSuccess", () => {
    it("should create a LOAD_MORE_MOVIES_SUCCESS action", () => {
      const movies = { latestMovies: { results: [], total_pages: 0 } };
      const acceptedAction = { type: types.LOAD_MORE_MOVIES_SUCCESS, movies };
      const action = MovieAction.loadMoreMoviesSuccess({
        latestMovies: { results: [], total_pages: 0 }
      });
      expect(action).toEqual(acceptedAction);
    });
  });
});
