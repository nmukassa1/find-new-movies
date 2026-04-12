import { getHomeFeatureYear } from "@/lib/home-feature-year";
import {
  discoverTvByFirstAirYear,
  discoverTvByGenre,
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  getTrendingTv,
} from "@/lib/tmdb/tv.service";
import { TMDB_TV_GENRES } from "@/lib/tmdb/tv-genres";
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
  const region = "US" as const;
  switch (slug) {
    case "popular":
      return getPopularTv(region, page);
    case "trending":
      return getTrendingTv(page);
    case "top-rated":
      return getTopRatedTv(region, page);
    case "on-the-air":
      return getOnTheAirTv(region, page);
    case "airing-today":
      return getAiringTodayTv(region, page);
    case "action":
      return discoverTvByGenre(TMDB_TV_GENRES.ActionAdventure, region, page);
    case "comedy":
      return discoverTvByGenre(
        [
          TMDB_TV_GENRES.Comedy,
          TMDB_TV_GENRES.Drama,
          TMDB_TV_GENRES.Mystery,
        ],
        region,
        page,
      );
    case "best-of-year":
      return discoverTvByFirstAirYear(getHomeFeatureYear(), region, page);
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
