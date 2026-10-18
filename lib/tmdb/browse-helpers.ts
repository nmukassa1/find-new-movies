import { filterEnglishMovies } from "@/lib/tmdb/movie.service";
import { TMDBPaginatedResponse } from "@/types/tmdb";

export const BROWSE_PAGE_SIZE = 24;

export const ENGLISH_ONLY = { with_original_language: "en" } as const;

const TMDB_PAGE_SIZE = 20;
/** TMDB rejects `page` values above 500 even when `total_pages` reports more. */
const TMDB_MAX_PAGE = 500;

/**
 * Serves fixed-size pages from a TMDB list that always returns 20 per page,
 * by fetching the TMDB pages that overlap the requested page. One extra TMDB
 * page is fetched because TMDB can repeat a title across adjacent pages when
 * sort values tie; duplicates are dropped and the gap is backfilled.
 */
export async function repaginateTmdb<T extends { id: number }>(
  fetchTmdbPage: (tmdbPage: number) => Promise<TMDBPaginatedResponse<T>>,
  page: number,
  pageSize = BROWSE_PAGE_SIZE,
): Promise<TMDBPaginatedResponse<T>> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const firstTmdbPage = Math.floor(start / TMDB_PAGE_SIZE) + 1;
  const lastTmdbPage = Math.min(
    Math.ceil(end / TMDB_PAGE_SIZE) + 1,
    TMDB_MAX_PAGE,
  );
  const outOfRange = firstTmdbPage > TMDB_MAX_PAGE;

  const tmdbPages = outOfRange
    ? [await fetchTmdbPage(1)]
    : await Promise.all(
        Array.from({ length: lastTmdbPage - firstTmdbPage + 1 }, (_, i) =>
          fetchTmdbPage(firstTmdbPage + i),
        ),
      );

  const offset = start - (firstTmdbPage - 1) * TMDB_PAGE_SIZE;
  const seen = new Set<number>();
  const results = outOfRange
    ? []
    : tmdbPages
        .flatMap((p) => p.results)
        .slice(offset)
        .filter((item) => !seen.has(item.id) && seen.add(item.id))
        .slice(0, pageSize);
  const totalResults = Math.min(
    tmdbPages[0]!.total_results,
    TMDB_MAX_PAGE * TMDB_PAGE_SIZE,
  );

  return {
    page,
    results,
    total_pages: Math.ceil(totalResults / pageSize),
    total_results: totalResults,
  };
}

/** Returns a `YYYY-MM-DD` date (UTC) offset from today by `days`. */
export function isoDateFromToday(days = 0): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * For TMDB lists that can't be language-filtered server-side (e.g. trending):
 * fetches the first `scanPages` pages, keeps English titles, and re-slices them
 * into fixed-size pages so only the last page is short.
 */
export async function repaginateFiltered<
  T extends { id: number; original_language: string },
>(
  fetchPage: (page: number) => Promise<TMDBPaginatedResponse<T>>,
  page: number,
  { pageSize = BROWSE_PAGE_SIZE, scanPages = 10 } = {},
): Promise<TMDBPaginatedResponse<T>> {
  const settled = await Promise.allSettled(
    Array.from({ length: scanPages }, (_, i) => fetchPage(i + 1)),
  );

  const seen = new Set<number>();
  const items: T[] = [];
  for (const result of settled) {
    if (result.status !== "fulfilled") continue;
    for (const item of filterEnglishMovies(result.value.results)) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      items.push(item);
    }
  }

  const start = (page - 1) * pageSize;
  return {
    page,
    results: items.slice(start, start + pageSize),
    total_pages: Math.ceil(items.length / pageSize),
    total_results: items.length,
  };
}
