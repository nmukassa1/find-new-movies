import type { TMDBMovie, TMDBTV } from "@/types/tmdb";

export type MergedSearchHit =
  | { catalog: "movie"; movie: TMDBMovie }
  | { catalog: "series"; show: TMDBTV };

/**
 * Title match strength for the query (higher = more relevant).
 * 4 exact → 3 prefix → 2 substring → 1 all words → 0 no direct match.
 */
function titleRelevanceTier(
  query: string,
  primary: string,
  alternate: string,
): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const titles = [primary, alternate]
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  let best = 0;
  for (const t of titles) {
    if (t === q) {
      best = Math.max(best, 4);
    } else if (t.startsWith(q)) {
      best = Math.max(best, 3);
    } else if (t.includes(q)) {
      best = Math.max(best, 2);
    } else {
      const words = q.split(/\s+/).filter(Boolean);
      if (words.length > 0 && words.every((w) => t.includes(w))) {
        best = Math.max(best, 1);
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

type ScoredHit =
  | {
      catalog: "movie";
      movie: TMDBMovie;
      tier: number;
      popularity: number;
      listBonus: number;
    }
  | {
      catalog: "series";
      show: TMDBTV;
      tier: number;
      popularity: number;
      listBonus: number;
    };

/**
 * Merges movie + TV search hits: sort by popularity (desc), then title relevance tier,
 * then TMDB list position as a final tiebreaker.
 */
export function mergeMovieAndTvSearchResults(
  query: string,
  movies: TMDBMovie[],
  shows: TMDBTV[],
): MergedSearchHit[] {
  const scored: ScoredHit[] = [];

  movies.forEach((movie, index) => {
    scored.push({
      catalog: "movie",
      movie,
      tier: titleRelevanceTier(query, movie.title, movie.original_title),
      popularity: movie.popularity,
      listBonus: listOrderBonus(index, movies.length),
    });
  });

  shows.forEach((show, index) => {
    scored.push({
      catalog: "series",
      show,
      tier: titleRelevanceTier(query, show.name, show.original_name),
      popularity: show.popularity,
      listBonus: listOrderBonus(index, shows.length),
    });
  });

  scored.sort((a, b) => {
    if (b.popularity !== a.popularity) return b.popularity - a.popularity;
    if (b.tier !== a.tier) return b.tier - a.tier;
    return b.listBonus - a.listBonus;
  });

  return scored.map((row): MergedSearchHit =>
    row.catalog === "movie"
      ? { catalog: "movie", movie: row.movie }
      : { catalog: "series", show: row.show },
  );
}
