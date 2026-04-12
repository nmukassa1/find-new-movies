import type { TMDBMovie, TMDBTV } from "@/types/tmdb";

export type MergedSearchHit =
  | { catalog: "movie"; movie: TMDBMovie }
  | { catalog: "series"; show: TMDBTV };

/** How strongly the query matches a display title (case-insensitive). */
function titleMatchScore(query: string, primary: string, alternate: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const titles = [primary, alternate]
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  let best = 0;
  for (const t of titles) {
    if (t === q) {
      best = Math.max(best, 1_000_000);
    } else if (t.startsWith(q)) {
      best = Math.max(best, 500_000);
    } else if (t.includes(q)) {
      best = Math.max(best, 250_000);
    } else {
      const words = q.split(/\s+/).filter(Boolean);
      if (words.length > 0 && words.every((w) => t.includes(w))) {
        best = Math.max(best, 125_000);
      }
    }
  }
  return best;
}

/** Prefer earlier TMDB hits — list order is relevance-aware from the API. */
function listOrderBonus(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((length - index) / length) * 10_000;
}

/**
 * Merges movie + TV search hits and sorts by query relevance (title match, API rank)
 * with popularity as a tiebreaker.
 */
type ScoredHit =
  | { catalog: "movie"; movie: TMDBMovie; score: number }
  | { catalog: "series"; show: TMDBTV; score: number };

export function mergeMovieAndTvSearchResults(
  query: string,
  movies: TMDBMovie[],
  shows: TMDBTV[],
): MergedSearchHit[] {
  const scored: ScoredHit[] = [];

  movies.forEach((movie, index) => {
    const titleScore = titleMatchScore(
      query,
      movie.title,
      movie.original_title,
    );
    const score =
      titleScore + listOrderBonus(index, movies.length) + movie.popularity;
    scored.push({ catalog: "movie", movie, score });
  });

  shows.forEach((show, index) => {
    const titleScore = titleMatchScore(query, show.name, show.original_name);
    const score =
      titleScore + listOrderBonus(index, shows.length) + show.popularity;
    scored.push({ catalog: "series", show, score });
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.map((row): MergedSearchHit =>
    row.catalog === "movie"
      ? { catalog: "movie", movie: row.movie }
      : { catalog: "series", show: row.show },
  );
}
