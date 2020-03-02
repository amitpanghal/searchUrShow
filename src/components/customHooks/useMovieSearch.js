import { useState, useEffect } from "react";

export default function useMovieSearch(
  query,
  page,
  resetQueriedMovies,
  resetLatestMovies,
  loadSearchedMovies,
  loadLatestMovies,
  loadMoreSearchedMovies,
  initialLoad
) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (query.length === 0) {
      setLoading(false);
      resetQueriedMovies();
    }

    return () => {
      resetLatestMovies();
    };
  }, [query]);

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      let timeOut = setTimeout(() => {
        loadSearchedMovies(query)
          .catch(error => {
            alert("Error while loading movies " + error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 250);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [query]);

  useEffect(() => {
    if (page > 1 && query.length > 0) {
      setLoading(true);
      let timeOut = setTimeout(() => {
        loadMoreSearchedMovies(query, page)
          .catch(error => {
            alert("Error while loading movies " + error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 250);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [page]);

  useEffect(() => {
    if (!initialLoad || (page > 1 && query.length === 0)) {
      setLoading(true);
      loadLatestMovies(page)
        .catch(error => {
          alert("Error while loading movies" + error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialLoad, page]);

  return { loading };
}
