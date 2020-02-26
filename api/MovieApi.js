import GetRequest from "./apiUtils";
const searchUrl = "search/movie";
const latestMoviesUrl = "discover/movie";

export function searchMovies(query, pageNumber = 1) {
  return GetRequest(searchUrl, { query: query, page: pageNumber });
}

export function getLatestMovies(page = 1) {
  return GetRequest(latestMoviesUrl, {
    page: page,
    sort_by: "popularity.desc"
  });
}
