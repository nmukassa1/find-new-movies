import { getHomeFeatureYear } from "@/lib/home-feature-year";
import { getTrendingTv } from "@/lib/tmdb/tv.service";
import { TMDB_TV_GENRES } from "@/lib/tmdb/tv-genres";
import { tmdbFetch } from "@/lib/tmdb/tmdb-client";
import { TMDB_ENDPOINTS } from "@/lib/tmdb/endpoints";
import {
  ENGLISH_ONLY,
  isoDateFromToday,
  repaginateFiltered,
  repaginateTmdb,
} from "@/lib/tmdb/browse-helpers";
import { TMDBPaginatedResponse, TMDBTV } from "@/types/tmdb";

export const SERIES_BROWSE_SLUGS = [
  "popular",
  "trending",
  "top-rated",
  "on-the-air",
  "airing-today",
  "action",
  "comedy",
  "best-of-year",
] as const;

export type SeriesBrowseSlug = (typeof SERIES_BROWSE_SLUGS)[number];

export function isSeriesBrowseSlug(value: string): value is SeriesBrowseSlug {
  return (SERIES_BROWSE_SLUGS as readonly string[]).includes(value);
}

export function getSeriesBrowseTitle(slug: SeriesBrowseSlug): string {
  switch (slug) {
    case "popular":
      return "Popular";
    case "trending":
      return "Trending";
    case "top-rated":
      return "Top rated";
    case "on-the-air":
      return "On the air";
    case "airing-today":
      return "Airing today";
    case "action":
      return "Action & adventure";
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

export function seriesBrowsePath(slug: SeriesBrowseSlug): string {
  return `/series/browse/${slug}`;
}

export async function fetchBrowseSeries(
  slug: SeriesBrowseSlug,
  page: number,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  const discover = (params: Record<string, string | number>) =>
    repaginateTmdb(
      (tmdbPage) =>
        tmdbFetch<TMDBPaginatedResponse<TMDBTV>>(TMDB_ENDPOINTS.discoverTv, {
          ...ENGLISH_ONLY,
          region: "US",
          sort_by: "popularity.desc",
          page: tmdbPage,
          ...params,
        }),
      page,
    );

  switch (slug) {
    case "popular":
      return discover({});
    case "trending":
      return repaginateFiltered(getTrendingTv, page);
    case "top-rated":
      return discover({
        sort_by: "vote_average.desc",
        "vote_count.gte": 200,
      });
    case "on-the-air":
      return discover({
        "air_date.gte": isoDateFromToday(0),
        "air_date.lte": isoDateFromToday(7),
      });
    case "airing-today":
      return discover({
        "air_date.gte": isoDateFromToday(0),
        "air_date.lte": isoDateFromToday(0),
      });
    case "action":
      return discover({ with_genres: TMDB_TV_GENRES.ActionAdventure });
    case "comedy":
      return discover({
        with_genres: [
          TMDB_TV_GENRES.Comedy,
          TMDB_TV_GENRES.Drama,
          TMDB_TV_GENRES.Mystery,
        ].join(","),
      });
    case "best-of-year":
      return discover({ first_air_date_year: getHomeFeatureYear() });
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
