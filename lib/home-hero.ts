import type { TMDBMovie, TMDBMovieDetailsAppended } from "@/types/tmdb";
import {
  mapMovieHero,
  type MovieHeroViewModel,
} from "@/lib/tmdb/map-movie-detail";

const TMDB_IMG = "https://image.tmdb.org/t/p";

export type HomeHeroContent = MovieHeroViewModel & {
  id: number;
  overview: string;
};

export function pickRandomHeroMovie(
  popular: TMDBMovie[],
  trending: TMDBMovie[],
  upcoming: TMDBMovie[],
): TMDBMovie {
  const byId = new Map<number, TMDBMovie>();
  for (const m of [...popular, ...trending, ...upcoming]) {
    byId.set(m.id, m);
  }
  const pool = [...byId.values()];
  if (pool.length === 0) {
    throw new Error("No movies available for home hero");
  }
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function buildHomeHeroFromDetails(
  d: TMDBMovieDetailsAppended,
): HomeHeroContent {
  return {
    ...mapMovieHero(d),
    id: d.id,
    overview: d.overview?.trim() || "",
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
  };
}
