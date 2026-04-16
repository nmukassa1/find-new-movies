import type { TMDBTV, TMDBTVDetailsAppended, TMDBVideo } from "@/types/tmdb";
import {
  mapCastAndCrew,
  type CastMemberViewModel,
  type MovieHeroViewModel,
} from "@/lib/tmdb/map-movie-detail";

const TV_DIRECTOR_JOBS = new Set([
  "Director",
  "Co-Director",
  "Series Director",
]);

const TV_WRITER_JOBS = new Set([
  "Writer",
  "Screenplay",
  "Story",
  "Characters",
  "Novel",
  "Teleplay",
]);

const TMDB_IMG = "https://image.tmdb.org/t/p";
const TV_DETAIL_PLACEHOLDER = "/placeholder.svg";

function tmdbFile(size: string, path: string | null | undefined): string {
  if (!path) return TV_DETAIL_PLACEHOLDER;
  return `${TMDB_IMG}/${size}${path}`;
}

function usTvRating(d: TMDBTVDetailsAppended): string {
  const r = d.content_ratings?.results?.find((x) => x.iso_3166_1 === "US");
  return r?.rating?.trim() || "NR";
}

function formatAvgEpisodeRuntime(runTimes: number[] | undefined): string {
  if (!runTimes?.length) return "—";
  const sum = runTimes.reduce((a, b) => a + b, 0);
  const avg = sum / runTimes.length;
  if (!Number.isFinite(avg) || avg <= 0) return "—";
  const rounded = Math.round(avg);
  return `${rounded}m ep.`;
}

function firstAirYear(firstAirDate: string): number {
  if (!firstAirDate) return 0;
  const y = new Date(`${firstAirDate}T12:00:00`).getFullYear();
  return Number.isFinite(y) ? y : 0;
}

function pickLogoUrl(d: TMDBTVDetailsAppended): string | undefined {
  const logos = d.images?.logos ?? [];
  if (!logos.length) return undefined;
  const preferred = logos.filter(
    (l) => l.iso_639_1 === "en" || l.iso_639_1 == null,
  );
  const pool = preferred.length ? preferred : logos;
  const sorted = [...pool].sort((a, b) => b.vote_average - a.vote_average);
  const path = sorted[0]?.file_path;
  return path ? tmdbFile("w500", path) : undefined;
}

function isYoutubeTrailer(v: TMDBVideo): boolean {
  return (
    v.site?.toLowerCase() === "youtube" &&
    v.type?.toLowerCase() === "trailer" &&
    Boolean(v.key)
  );
}

function pickHeroTrailerKey(d: TMDBTVDetailsAppended): string | undefined {
  const candidates = (d.videos?.results ?? []).filter(isYoutubeTrailer);
  if (!candidates.length) return undefined;
  const official = candidates.filter((v) => v.official);
  const pool = official.length ? official : candidates;
  const sorted = [...pool].sort((a, b) => {
    if (a.official !== b.official) return a.official ? -1 : 1;
    return (b.size ?? 0) - (a.size ?? 0);
  });
  return sorted[0]?.key;
}

export function mapTvHero(d: TMDBTVDetailsAppended): MovieHeroViewModel {
  const backdrop = d.backdrop_path
    ? tmdbFile("w1280", d.backdrop_path)
    : tmdbFile("w780", d.poster_path);
  const poster = tmdbFile("w780", d.poster_path);

  return {
    tmdbId: d.id,
    title: d.name || d.original_name,
    tagline: d.tagline?.trim() || "",
    year: firstAirYear(d.first_air_date),
    runtime: formatAvgEpisodeRuntime(d.episode_run_time),
    rating: usTvRating(d),
    genres: (d.genres ?? []).map((g) => g.name),
    backdrop,
    poster,
    logo: pickLogoUrl(d),
    trailerYoutubeKey: pickHeroTrailerKey(d),
  };
}

export type TvInfoViewModel = {
  synopsis: string;
  tmdbRating: number;
  voteCount: number;
  studio: string;
  releaseDate: string;
  languages: string[];
  subtitlesNote: string;
  quality: string[];
};

export function mapTvInfo(d: TMDBTVDetailsAppended): TvInfoViewModel {
  const firstAir = d.first_air_date
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(`${d.first_air_date}T12:00:00`))
    : "—";

  const languages = (d.spoken_languages ?? []).map(
    (l) => l.english_name || l.name,
  );

  const studio = d.production_companies?.find((c) => c.name)?.name ?? "—";

  const seasons =
    typeof d.number_of_seasons === "number" && d.number_of_seasons > 0
      ? `${d.number_of_seasons} season${d.number_of_seasons === 1 ? "" : "s"}`
      : null;

  return {
    synopsis: d.overview?.trim() || "No overview available.",
    tmdbRating: d.vote_average,
    voteCount: d.vote_count,
    studio,
    releaseDate: seasons ? `${firstAir} (${seasons})` : firstAir,
    languages: languages.length ? languages : ["—"],
    subtitlesNote:
      "Subtitle availability is not provided by TMDB for this title.",
    quality: [],
  };
}

export type RelatedTvViewModel = {
  id: number;
  title: string;
  poster: string;
  rating: number;
};

export function mapRelatedTvShows(
  d: TMDBTVDetailsAppended,
): RelatedTvViewModel[] {
  const raw =
    d.recommendations?.results?.length
      ? d.recommendations.results
      : (d.similar?.results ?? []);

  return raw
    .filter((t): t is TMDBTV => Boolean(t?.id && t.name))
    .slice(0, 16)
    .map((t) => ({
      id: t.id,
      title: t.name,
      poster: tmdbFile("w500", t.poster_path),
      rating: Math.round(t.vote_average * 10) / 10,
    }));
}

const MAX_TV_DIRECTOR_NAMES = 10;

/**
 * TV aggregate `credits.crew` often omits series-level roles; `created_by` holds showrunners.
 * Directors: de-duplicated crew with TV-relevant director jobs (episode directors when aggregated).
 */
export function mapTvCastAndCrew(d: TMDBTVDetailsAppended): {
  cast: CastMemberViewModel[];
  director: string;
  writers: string[];
  createdBy: string[];
} {
  const base = mapCastAndCrew(d);
  const crew = d.credits?.crew ?? [];

  const createdBy = (d.created_by ?? [])
    .map((c) => c.name?.trim())
    .filter((n): n is string => Boolean(n));

  const directors = [
    ...new Set(
      crew.filter((c) => TV_DIRECTOR_JOBS.has(c.job)).map((c) => c.name),
    ),
  ];
  const directorFromCrew =
    directors.length > 0
      ? directors.slice(0, MAX_TV_DIRECTOR_NAMES).join(", ")
      : base.director;

  const writerNames = new Set<string>();
  for (const w of base.writers) {
    if (w !== "—") writerNames.add(w);
  }
  for (const c of crew) {
    if (TV_WRITER_JOBS.has(c.job)) writerNames.add(c.name);
  }

  const writersList =
    writerNames.size > 0
      ? [...writerNames].sort((a, b) => a.localeCompare(b))
      : ["—"];

  return {
    cast: base.cast,
    director: directorFromCrew,
    writers: writersList,
    createdBy,
  };
}
