import type { TMDBMovie, TMDBMovieDetailsAppended } from "@/types/tmdb";
import {
  mapMovieHero,
  type MovieHeroViewModel,
} from "@/lib/tmdb/map-movie-detail";

const TMDB_IMG = "https://image.tmdb.org/t/p";

export type HomeHeroContent = MovieHeroViewModel & {
  id: number;
  overview: string;
  detailHref: string;
};

/** Merges any number of lists (deduped by id) and picks one movie at random, or null if every list is empty. */
export function pickRandomHeroMovie(...pools: TMDBMovie[][]): TMDBMovie | null {
  const byId = new Map<number, TMDBMovie>();
  for (const pool of pools) {
    for (const m of pool) {
      byId.set(m.id, m);
    }
  }
  const merged = [...byId.values()];
  if (merged.length === 0) return null;
  return merged[Math.floor(Math.random() * merged.length)]!;
}

export function buildHomeHeroFromDetails(
  d: TMDBMovieDetailsAppended,
): HomeHeroContent {
  return {
    ...mapMovieHero(d),
    id: d.id,
    overview: d.overview?.trim() || "",
    detailHref: `/movie/${d.id}`,
  };
}

export function buildHomeHeroListFallback(m: TMDBMovie): HomeHeroContent {
  const poster = m.poster_path
    ? `${TMDB_IMG}/w780${m.poster_path}`
    : "/placeholder.svg";
  const backdrop = m.backdrop_path
    ? `${TMDB_IMG}/w1280${m.backdrop_path}`
    : m.poster_path
      ? `${TMDB_IMG}/w780${m.poster_path}`
      : "/placeholder.svg";

  const year = m.release_date
    ? new Date(`${m.release_date}T12:00:00`).getFullYear()
    : 0;

  return {
    title: m.title || m.original_title,
    tagline: "",
    year: Number.isFinite(year) ? year : 0,
    runtime: "—",
    rating: "NR",
    genres: [],
    backdrop,
    poster,
    logo: undefined,
    trailerYoutubeKey: undefined,
    id: m.id,
    overview: m.overview?.trim() || "",
    detailHref: `/movie/${m.id}`,
  };
}
