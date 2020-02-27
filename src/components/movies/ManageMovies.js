import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";

import * as movieActions from "../../../lib/redux/actions/movieAction";
import MovieList from "./MovieList";
import useMovieSearch from "../customHooks/useMovieSearch";

const ManageMovies = ({
  movies,
  initialLoad,
  loadLatestMovies,
  loadSearchedMovies,
  resetQueriedMovies,
  saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies,
  resetLatestMovies,
  loadMoreSearchedMovies,
  total_pages
}) => {
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { loading } = useMovieSearch(
    query,
    page,
    resetQueriedMovies,
    resetLatestMovies,
    loadSearchedMovies,
    loadLatestMovies,
    loadMoreSearchedMovies,
    initialLoad
  );
  let observer = useRef();
  let lastMovieRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(enteries => {
        if (enteries[0].isIntersecting && hasMore) {
          setPage(prevState => prevState + 1);
          setHasMore(page < total_pages);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, initialLoad]
  );

  const handleSearch = e => {
    setPage(1);
    setQuery(e.target.value);
    setHasMore(true);
  };

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
    return movies.find(m => parseInt(m.id) === parseInt(movieId));
  };

  return (
    <MovieList
      handleSearch={handleSearch}
      query={query}
      movies={movies}
      handleClick={handleClick}
      loading={loading}
      ref={lastMovieRef}
    />
  );
};

const mapStateToProps = state => {
  return {
    movies:
      state.searchedMovies.results.length > 0
        ? state.searchedMovies.results
        : state.latestMovies.results,
    initialLoad: state.latestMovies.results.length > 0,
    total_pages:
      state.searchedMovies.results.length > 0
        ? state.searchedMovies.total_pages
        : state.latestMovies.total_pages
  };
};

const mapDispatchToProps = {
  loadLatestMovies: movieActions.loadMovies,
  loadSearchedMovies: movieActions.loadQueriedMovies,
  resetQueriedMovies: movieActions.resetQueriedMovies,
  saveOrUpdateFavMovies: movieActions.saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies: movieActions.saveOrUpdateWatchLaterMovies,
  resetLatestMovies: movieActions.resetLatestMovies,
  loadMoreSearchedMovies: movieActions.loadMoreSearchedMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovies);
