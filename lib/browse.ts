import { getHomeFeatureYear } from "@/lib/home-feature-year";
import {
  discoverMoviesByGenre,
  discoverMoviesByReleaseYear,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/tmdb/movie.service";
import { TMDB_MOVIE_GENRES } from "@/lib/tmdb/movie-genres";
import { TMDBMovie, TMDBPaginatedResponse } from "@/types/tmdb";

export const BROWSE_SLUGS = [
  "popular",
  "trending",
  "top-rated",
  "now-playing",
  "action",
  "comedy",
  "best-of-year",
] as const;

export type BrowseSlug = (typeof BROWSE_SLUGS)[number];

export function isBrowseSlug(value: string): value is BrowseSlug {
  return (BROWSE_SLUGS as readonly string[]).includes(value);
}

export function getBrowseTitle(slug: BrowseSlug): string {
  switch (slug) {
    case "popular":
      return "Popular";
    case "trending":
      return "Trending";
    case "top-rated":
      return "Top rated";
    case "now-playing":
      return "Now playing";
    case "action":
      return "Action";
    case "comedy":
      return "Comedy";
    case "best-of-year":
      return `Best of ${getHomeFeatureYear()}`;
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}

export function browsePath(slug: BrowseSlug): string {
  return `/browse/${slug}`;
}

export async function fetchBrowseMovies(
  slug: BrowseSlug,
  page: number,
): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  const region = "US" as const;
  switch (slug) {
    case "popular":
      return getPopularMovies(region, page);
    case "trending":
      return getTrendingMovies(page);
    case "top-rated":
      return getTopRatedMovies(region, page);
    case "now-playing":
      return getNowPlayingMovies(region, page);
    case "action":
      return discoverMoviesByGenre(TMDB_MOVIE_GENRES.Action, region, page);
    case "comedy":
      return discoverMoviesByGenre(
        [
          TMDB_MOVIE_GENRES.Comedy,
          TMDB_MOVIE_GENRES.Drama,
          TMDB_MOVIE_GENRES.Romance,
        ],
        region,
        page,
      );
    case "best-of-year":
      return discoverMoviesByReleaseYear(
        getHomeFeatureYear(),
        region,
        page,
      );
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
