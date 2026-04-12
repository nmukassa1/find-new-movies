import type { TMDBTV, TMDBTVDetailsAppended } from "@/types/tmdb";
import { mapTvHero } from "@/lib/tmdb/map-tv-detail";
import type { HomeHeroContent } from "@/lib/home-hero";

const TMDB_IMG = "https://image.tmdb.org/t/p";

/** Merges any number of lists (deduped by id) and picks one show at random, or null if every list is empty. */
export function pickRandomHeroTv(...pools: TMDBTV[][]): TMDBTV | null {
  const byId = new Map<number, TMDBTV>();
  for (const pool of pools) {
    for (const t of pool) {
      byId.set(t.id, t);
    }
  }
  const merged = [...byId.values()];
  if (merged.length === 0) return null;
  return merged[Math.floor(Math.random() * merged.length)]!;
}

export function buildSeriesHeroFromDetails(
  d: TMDBTVDetailsAppended,
): HomeHeroContent {
  return {
    ...mapTvHero(d),
    id: d.id,
    overview: d.overview?.trim() || "",
    detailHref: `/series/${d.id}`,
  };
}

export function buildSeriesHeroListFallback(t: TMDBTV): HomeHeroContent {
  const poster = t.poster_path
    ? `${TMDB_IMG}/w780${t.poster_path}`
    : "/placeholder.svg";
  const backdrop = t.backdrop_path
    ? `${TMDB_IMG}/w1280${t.backdrop_path}`
    : t.poster_path
      ? `${TMDB_IMG}/w780${t.poster_path}`
      : "/placeholder.svg";

  const year = t.first_air_date
    ? new Date(`${t.first_air_date}T12:00:00`).getFullYear()
    : 0;

  return {
    title: t.name || t.original_name,
    tagline: "",
    year: Number.isFinite(year) ? year : 0,
    runtime: "—",
    rating: "NR",
    genres: [],
    backdrop,
    poster,
    logo: undefined,
    trailerYoutubeKey: undefined,
    id: t.id,
    overview: t.overview?.trim() || "",
    detailHref: `/series/${t.id}`,
  };
}
