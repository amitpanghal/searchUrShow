import { useState, useEffect } from "react";

export default function useMovieSearch(
  query,
  page,
  resetQueriedMovies,
  loadSearchedMovies,
  loadLatestMovies,
  initialLoad
) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (query.length === 0) {
      resetQueriedMovies();
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      let timeOut = setTimeout(() => {
        loadSearchedMovies(query, page)
          .catch(error => {
            alert("Error while loading movies" + error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 250);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [query, page]);

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
