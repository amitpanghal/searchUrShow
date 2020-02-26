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
  resetLatestMovies
}) => {
  const [query, setQuery] = useState("");
  const [mount, setMount] = useState(true);
  const [page, setPage] = useState(1);
  const { loading } = useMovieSearch(
    query,
    page,
    resetQueriedMovies,
    loadSearchedMovies,
    loadLatestMovies,
    initialLoad,
    movies.length
  );

  let observer = useRef();
  let lastMovieRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(enteries => {
        if (enteries[0].isIntersecting) {
          setPage(prevState => prevState + 1);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, initialLoad]
  );

  useEffect(() => {
    return () => {
      resetLatestMovies();
    };
  }, [mount]);

  const handleSearch = e => {
    setPage(1);
    setQuery(e.target.value);
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
      state.searchedMovies.length > 0
        ? state.searchedMovies
        : state.latestMovies,
    initialLoad: state.latestMovies.length > 0
  };
};

const mapDispatchToProps = {
  loadLatestMovies: movieActions.loadMovies,
  loadSearchedMovies: movieActions.loadQueriedMovies,
  resetQueriedMovies: movieActions.resetQueriedMovies,
  saveOrUpdateFavMovies: movieActions.saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies: movieActions.saveOrUpdateWatchLaterMovies,
  resetLatestMovies: movieActions.resetLatestMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMovies);
