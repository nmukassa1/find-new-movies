import { tmdbFetch } from "./tmdb-client";
import { TMDB_ENDPOINTS } from "./endpoints";
import {
  TMDBMovie,
  TMDBMovieDetailsAppended,
  TMDBPaginatedResponse,
  TMDBUpcomingMoviesResponse,
  TMDBVideo,
  TMDBVideosResponse,
} from "@/types/tmdb";

export function emptyPaginatedMovies(): TMDBPaginatedResponse<TMDBMovie> {
  return {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  };
}

export function emptyUpcomingMoviesResponse(): TMDBUpcomingMoviesResponse {
  return {
    ...emptyPaginatedMovies(),
    dates: { minimum: "1970-01-01", maximum: "2099-12-31" },
  };
}

/** Runs a TMDB call and returns `fallback` on any rejection (network, 401, timeouts, etc.). */
export async function withTmdbFallback<T>(
  fn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

// Popular Movies
export function getPopularMovies(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.popular, {
    region,
    page,
  });
}

// Trending Movies
export function getTrendingMovies(
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.trending, {
    page,
  });
}

// Top Rated Movies
export function getTopRatedMovies(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.topRated, {
    region,
    page,
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
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.nowPlaying, {
    region,
    page,
  });
}

// Movie Details (Appended Data)
export function getMovieDetails(
  movieId: number,
): Promise<TMDBMovieDetailsAppended> {
  return tmdbFetch<TMDBMovieDetailsAppended>(
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

/** TMDB genre ids: https://developer.themoviedb.org/reference/genre-movie-list */
export function discoverMoviesByGenre(
  genreIds: number | number[],
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  // TMDB expects a comma-separated list for multiple genres
  const withGenres = Array.isArray(genreIds) ? genreIds.join(",") : genreIds;
  return tmdbFetch(TMDB_ENDPOINTS.discoverMovies, {
    with_genres: withGenres,
    sort_by: "popularity.desc",
    region,
    page,
  });
}

export function discoverMoviesByReleaseYear(
  year: number,
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.discoverMovies, {
    primary_release_year: year,
    sort_by: "popularity.desc",
    region,
    page,
  });
}

export function discoverHighlyRatedMovies(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch(TMDB_ENDPOINTS.discoverMovies, {
    sort_by: "vote_average.desc",
    "vote_average.gte": 7,
    "vote_count.gte": 250,
    region,
    page,
  });
}

// Watch Providers
export function getWatchProviders(movieId: number) {
  return tmdbFetch(TMDB_ENDPOINTS.movieWatchProviders(movieId));
}

// Configuration
export function getConfiguration() {
  return tmdbFetch(TMDB_ENDPOINTS.configuration, {}, 86400);
}

export function filterEnglishMovies<
  T extends { original_language?: string | null },
>(movies: T[]): T[] {
  return movies.filter((movie) =>
    (movie.original_language ?? "").startsWith("en"),
  );
}

export function filterUpcomingMoviesByMinDate(
  data: TMDBUpcomingMoviesResponse,
): TMDBMovie[] {
  const results = data.results ?? [];
  const minDate = data.dates?.minimum;
  if (!minDate) return results;
  return results.filter((movie) => (movie.release_date ?? "") >= minDate);
}

export function filterYouTubeTrailers(
  videos: TMDBVideosResponse,
): TMDBVideosResponse {
  return {
    ...videos,
    results: (videos.results ?? []).filter(
      (video) =>
        video.site?.toLowerCase() === "youtube" &&
        video.type?.toLowerCase() === "trailer",
    ),
  };
}

/** Fetches YouTube trailers for each movie in parallel. Works with any list that has TMDB `id` (popular, upcoming, discover-by-genre, recommendations, etc.). One failed request does not fail the whole batch. */
export async function attachYouTubeTrailersToMovies<T extends { id: number }>(
  movies: T[],
): Promise<Array<{ movie: T; trailers: TMDBVideo[] }>> {
  if (movies.length === 0) return [];

  try {
    const videosByIndex = await Promise.all(
      movies.map(async (movie) => {
        try {
          return filterYouTubeTrailers(await getMovieVideos(movie.id));
        } catch {
          return { id: String(movie.id), results: [] as TMDBVideo[] };
        }
      }),
    );

    return movies.map((movie, index) => ({
      movie,
      trailers: videosByIndex[index]!.results,
    }));
  } catch {
    return movies.map((movie) => ({ movie, trailers: [] as TMDBVideo[] }));
  }
}
