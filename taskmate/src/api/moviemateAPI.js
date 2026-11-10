const API_KEY = import.meta.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// export const getMovies = async (selection) => {
//   const response = await fetch(
//     `${BASE_URL}/movie/${selection}?api_key=${API_KEY}`,
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch movies");
//   }

//   const data = await response.json();

//   return data.results;
// };
export const getMovies = async (selection, search) => {
  const endpoint = search.trim()
    ? `/search/movie?query=${encodeURIComponent(search)}&api_key=${API_KEY}`
    : `/movie/${selection}?api_key=${API_KEY}`;

  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data.results;
};
export const getMovieDetail = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();

  return data;
};
// export const searchMovies = async (keyword) => {
//   const response = await fetch(
//     `${BASE_URL}/search/movie?query=${encodeURIComponent(keyword)}&api_key=${API_KEY}`,
//   );

//   if (!response.ok) {
//     throw new Error("Failed to search movies");
//   }

//   const data = await response.json();

//   return data.results;
// };
