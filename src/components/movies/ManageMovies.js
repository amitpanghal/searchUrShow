import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";

import * as movieActions from "../../../lib/redux/actions/movieAction";
import MovieList from "./MovieList";
import useMovieSearch from "../customHooks/useMovieSearch";
import SearchBox from "../common/SearchBox";
import CustomMessage from "../common/CustomMessage";

const ManageMovies = ({
  searchedMovies,
  latestMovies,
  initialLoad,
  loadLatestMovies,
  loadSearchedMovies,
  resetQueriedMovies,
  saveOrUpdateFavMovies,
  saveOrUpdateWatchLaterMovies,
  resetLatestMovies,
  loadMoreSearchedMovies
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

  const moviesToShow = query.length > 0 ? searchedMovies : latestMovies;
  
  const observer = useRef();
  let lastMovieRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(enteries => {
        if (enteries[0].isIntersecting && hasMore) {
          setPage(prevState => prevState + 1);
          setHasMore(page < moviesToShow.total_pages);
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
    return moviesToShow.results.find(m => parseInt(m.id) === parseInt(movieId));
  };

  return (
    <>
      <SearchBox handleSearch={handleSearch} query={query} />
      <CustomMessage
        checkForProp={
          (!loading && query.length > 0 && moviesToShow.results.length === 0) ||
          loading
        }
        messageText={
          !loading && query.length > 0 && moviesToShow.results.length === 0
            ? `No Movie found for ${query}`
            : "Loading..."
        }
      />
      <MovieList
        movies={moviesToShow.results}
        handleClick={handleClick}
        ref={lastMovieRef}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    searchedMovies: state.searchedMovies,
    latestMovies: state.latestMovies,
    initialLoad: state.latestMovies.results.length > 0
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
