import { getHomeFeatureYear } from "@/lib/home-feature-year";
import { getTrendingMovies } from "@/lib/tmdb/movie.service";
import { TMDB_MOVIE_GENRES } from "@/lib/tmdb/movie-genres";
import { tmdbFetch } from "@/lib/tmdb/tmdb-client";
import { TMDB_ENDPOINTS } from "@/lib/tmdb/endpoints";
import {
  ENGLISH_ONLY,
  isoDateFromToday,
  repaginateFiltered,
  repaginateTmdb,
} from "@/lib/tmdb/browse-helpers";
import { TMDBMovie, TMDBPaginatedResponse } from "@/types/tmdb";

export const BROWSE_SLUGS = [
  "upcoming",
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
    case "upcoming":
      return "Latest movies";
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
  const discover = (params: Record<string, string | number>) =>
    repaginateTmdb(
      (tmdbPage) =>
        tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
          TMDB_ENDPOINTS.discoverMovies,
          {
            ...ENGLISH_ONLY,
            region: "US",
            sort_by: "popularity.desc",
            page: tmdbPage,
            ...params,
          },
        ),
      page,
    );

  switch (slug) {
    case "upcoming":
      return discover({
        with_release_type: "2|3",
        "release_date.gte": isoDateFromToday(1),
      });
    case "popular":
      return discover({});
    case "trending":
      return repaginateFiltered(getTrendingMovies, page);
    case "top-rated":
      return discover({
        sort_by: "vote_average.desc",
        "vote_count.gte": 300,
      });
    case "now-playing":
      return discover({
        with_release_type: "2|3",
        "release_date.gte": isoDateFromToday(-42),
        "release_date.lte": isoDateFromToday(0),
      });
    case "action":
      return discover({ with_genres: TMDB_MOVIE_GENRES.Action });
    case "comedy":
      return discover({
        with_genres: [
          TMDB_MOVIE_GENRES.Comedy,
          TMDB_MOVIE_GENRES.Drama,
          TMDB_MOVIE_GENRES.Romance,
        ].join(","),
      });
    case "best-of-year":
      return discover({ primary_release_year: getHomeFeatureYear() });
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
