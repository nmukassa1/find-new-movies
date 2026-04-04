import { tmdbFetch } from "./tmdb-client";
import { TMDB_ENDPOINTS } from "./endpoints";
import {
  TMDBMovie,
  TMDBPaginatedResponse,
  TMDBUpcomingMoviesResponse,
  TMDBVideo,
  TMDBVideosResponse,
} from "@/types/tmdb";

// Popular Movies
export function getPopularMovies(
  region: "US" | "GB" = "US",
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.popular, {
    region,
  });
}

// Trending Movies
export function getTrendingMovies(): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.trending);
}

// Top Rated Movies
export function getTopRatedMovies(
  region: "US" | "GB" = "US",
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.topRated, {
    region,
  });
}

// Upcoming Movies
export async function getUpcomingMovies(
  region: "US" | "GB" = "US",
): Promise<TMDBUpcomingMoviesResponse> {
  const res = await tmdbFetch<TMDBUpcomingMoviesResponse>(
    TMDB_ENDPOINTS.upcoming,
    {
      region,
    },
  );

  const filteredUpcomingMoviesByDate = filterUpcomingMoviesByMinDate(res);
  const upcomingMovies = filterEnglishMovies(filteredUpcomingMoviesByDate);
  return { ...res, results: upcomingMovies };
}

// Now Playing
export function getNowPlayingMovies(
  region: "US" | "GB" = "US",
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.nowPlaying, {
    region,
  });
}

// Movie Details (Appended Data)
export function getMovieDetails(movieId: number) {
  return tmdbFetch(
    TMDB_ENDPOINTS.movieDetails(movieId),
    {
      append_to_response:
        "videos,images,credits,recommendations,similar,release_dates",
    },
    86400,
  );
}

// Movie Videos
export function getMovieVideos(movieId: number): Promise<TMDBVideosResponse> {
  return tmdbFetch(TMDB_ENDPOINTS.movieVideos(movieId));
}

// Movie Images
export function getMovieImages(movieId: number) {
  return tmdbFetch(TMDB_ENDPOINTS.movieImages(movieId));
}

// Movie Credits
export function getMovieCredits(movieId: number) {
  return tmdbFetch(TMDB_ENDPOINTS.movieCredits(movieId));
}

// Recommendations
export function getMovieRecommendations(movieId: number) {
  return tmdbFetch(TMDB_ENDPOINTS.movieRecommendations(movieId));
}

// Similar Movies
export function getSimilarMovies(movieId: number) {
  return tmdbFetch(TMDB_ENDPOINTS.movieSimilar(movieId));
}

// Search Movies
export function searchMovies(query: string) {
  return tmdbFetch(TMDB_ENDPOINTS.searchMovies, {
    query,
  });
}

// Genres
export function getGenres() {
  return tmdbFetch(TMDB_ENDPOINTS.genres);
}

// Discover Movies
export function discoverMovies(params: Record<string, string | number>) {
  return tmdbFetch(TMDB_ENDPOINTS.discoverMovies, params);
}

// Watch Providers
export function getWatchProviders(movieId: number) {
  return tmdbFetch(TMDB_ENDPOINTS.movieWatchProviders(movieId));
}

// Configuration
export function getConfiguration() {
  return tmdbFetch(TMDB_ENDPOINTS.configuration, {}, 86400);
}

export function filterEnglishMovies<T extends { original_language: string }>(
  movies: T[],
): T[] {
  return movies.filter((movie) => movie.original_language.startsWith("en"));
}

export function filterUpcomingMoviesByMinDate(
  data: TMDBUpcomingMoviesResponse,
): TMDBMovie[] {
  const minDate = data.dates.minimum;
  return data.results.filter((movie) => movie.release_date >= minDate);
}

export function filterYouTubeTrailers(
  videos: TMDBVideosResponse,
): TMDBVideosResponse {
  return {
    ...videos,
    results: videos.results.filter(
      (video) =>
        video.site.toLowerCase() === "youtube" &&
        video.type.toLowerCase() === "trailer",
    ),
  };
}

/** Fetches YouTube trailers for each movie in parallel. Works with any list that has TMDB `id` (popular, upcoming, discover-by-genre, recommendations, etc.). */
export async function attachYouTubeTrailersToMovies<T extends { id: number }>(
  movies: T[],
): Promise<Array<{ movie: T; trailers: TMDBVideo[] }>> {
  if (movies.length === 0) return [];

  const videosByIndex = await Promise.all(
    movies.map((movie) =>
      getMovieVideos(movie.id).then(filterYouTubeTrailers),
    ),
  );

  return movies.map((movie, index) => ({
    movie,
    trailers: videosByIndex[index].results,
  }));
}
