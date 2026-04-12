import { tmdbFetch } from "./tmdb-client";
import { TMDB_ENDPOINTS } from "./endpoints";
import {
  TMDBPaginatedResponse,
  TMDBTV,
  TMDBTVDetailsAppended,
  TMDBVideo,
  TMDBVideosResponse,
} from "@/types/tmdb";
import { filterYouTubeTrailers } from "./movie.service";

export function getPopularTv(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  return tmdbFetch(TMDB_ENDPOINTS.tvPopular, {
    region,
    page,
  });
}

export function getTrendingTv(
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  return tmdbFetch(TMDB_ENDPOINTS.trendingTv, {
    page,
  });
}

export function getTopRatedTv(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  return tmdbFetch(TMDB_ENDPOINTS.tvTopRated, {
    region,
    page,
  });
}

export function getOnTheAirTv(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  return tmdbFetch(TMDB_ENDPOINTS.tvOnTheAir, {
    region,
    page,
  });
}

export function getAiringTodayTv(
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  return tmdbFetch(TMDB_ENDPOINTS.tvAiringToday, {
    region,
    page,
  });
}

export function getTvDetails(tvId: number): Promise<TMDBTVDetailsAppended> {
  return tmdbFetch<TMDBTVDetailsAppended>(
    TMDB_ENDPOINTS.tvDetails(tvId),
    {
      append_to_response:
        "videos,images,credits,recommendations,similar,content_ratings",
    },
    86400,
  );
}

export function getTvVideos(tvId: number): Promise<TMDBVideosResponse> {
  return tmdbFetch(TMDB_ENDPOINTS.tvVideos(tvId));
}

export function discoverTv(params: Record<string, string | number>) {
  return tmdbFetch(TMDB_ENDPOINTS.discoverTv, params);
}

export function discoverTvByGenre(
  genreIds: number | number[],
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  const withGenres = Array.isArray(genreIds) ? genreIds.join(",") : genreIds;
  return tmdbFetch(TMDB_ENDPOINTS.discoverTv, {
    with_genres: withGenres,
    sort_by: "popularity.desc",
    region,
    page,
  });
}

export function discoverTvByFirstAirYear(
  year: number,
  region: "US" | "GB" = "US",
  page = 1,
): Promise<TMDBPaginatedResponse<TMDBTV>> {
  return tmdbFetch(TMDB_ENDPOINTS.discoverTv, {
    first_air_date_year: year,
    sort_by: "popularity.desc",
    region,
    page,
  });
}

const TRAILER_VIDEOS_CONCURRENCY = 5;

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  async function worker(): Promise<void> {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await mapper(items[i]!, i);
    }
  }

  const n = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

export async function attachYouTubeTrailersToTvShows<T extends { id: number }>(
  shows: T[],
): Promise<Array<{ show: T; trailers: TMDBVideo[] }>> {
  if (shows.length === 0) return [];

  const videosByIndex = await mapWithConcurrency(
    shows,
    TRAILER_VIDEOS_CONCURRENCY,
    async (show) => {
      try {
        return filterYouTubeTrailers(await getTvVideos(show.id));
      } catch {
        return { id: String(show.id), results: [] as TMDBVideo[] };
      }
    },
  );

  return shows.map((show, index) => ({
    show,
    trailers: videosByIndex[index]!.results,
  }));
}
