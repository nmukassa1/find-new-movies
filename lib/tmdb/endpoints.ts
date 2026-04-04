export const TMDB_ENDPOINTS = {
  // Movie Lists
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
  nowPlaying: "/movie/now_playing",
  trending: "/trending/movie/week",

  // Movie Details
  movieDetails: (movieId: number) => `/movie/${movieId}`,

  // Movie Related
  movieVideos: (movieId: number) => `/movie/${movieId}/videos`,
  movieImages: (movieId: number) => `/movie/${movieId}/images`,
  movieCredits: (movieId: number) => `/movie/${movieId}/credits`,
  movieRecommendations: (movieId: number) =>
    `/movie/${movieId}/recommendations`,
  movieSimilar: (movieId: number) => `/movie/${movieId}/similar`,
  movieReleaseDates: (movieId: number) => `/movie/${movieId}/release_dates`,
  movieWatchProviders: (movieId: number) => `/movie/${movieId}/watch/providers`,

  // Search
  searchMovies: "/search/movie",

  // Genres
  genres: "/genre/movie/list",

  // Discover
  discoverMovies: "/discover/movie",

  // Configuration
  configuration: "/configuration",
};
