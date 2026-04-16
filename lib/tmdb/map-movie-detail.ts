import type {
  TMDBCredits,
  TMDBMovie,
  TMDBMovieDetailsAppended,
  TMDBVideo,
} from "@/types/tmdb";

const TMDB_IMG = "https://image.tmdb.org/t/p";
const MOVIE_DETAIL_PLACEHOLDER = "/placeholder.svg";

function tmdbFile(size: string, path: string | null | undefined): string {
  if (!path) return MOVIE_DETAIL_PLACEHOLDER;
  return `${TMDB_IMG}/${size}${path}`;
}

function usCertification(d: TMDBMovieDetailsAppended): string {
  const us = d.release_dates?.results?.find((r) => r.iso_3166_1 === "US");
  if (!us?.release_dates?.length) return "NR";
  const row = [...us.release_dates]
    .reverse()
    .find((x) => x.certification?.trim());
  return row?.certification?.trim() || "NR";
}

function formatRuntime(minutes: number): string {
  if (!minutes || minutes <= 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function releaseYear(releaseDate: string): number {
  if (!releaseDate) return 0;
  const y = new Date(`${releaseDate}T12:00:00`).getFullYear();
  return Number.isFinite(y) ? y : 0;
}

function pickLogoUrl(d: TMDBMovieDetailsAppended): string | undefined {
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

/** First official YouTube trailer when possible, else first YouTube trailer. */
function pickHeroTrailerKey(d: TMDBMovieDetailsAppended): string | undefined {
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

export type MovieHeroViewModel = {
  tmdbId: number;
  title: string;
  tagline: string;
  year: number;
  runtime: string;
  rating: string;
  genres: string[];
  backdrop: string;
  /** Poster art — used as hero still on narrow viewports */
  poster: string;
  logo?: string;
  /** YouTube video id for muted autoplay background */
  trailerYoutubeKey?: string;
};

export function mapMovieHero(d: TMDBMovieDetailsAppended): MovieHeroViewModel {
  const backdrop = d.backdrop_path
    ? tmdbFile("w1280", d.backdrop_path)
    : tmdbFile("w780", d.poster_path);
  const poster = tmdbFile("w780", d.poster_path);

  return {
    tmdbId: d.id,
    title: d.title || d.original_title,
    tagline: d.tagline?.trim() || "",
    year: releaseYear(d.release_date),
    runtime: formatRuntime(d.runtime),
    rating: usCertification(d),
    genres: (d.genres ?? []).map((g) => g.name),
    backdrop,
    poster,
    logo: pickLogoUrl(d),
    trailerYoutubeKey: pickHeroTrailerKey(d),
  };
}

export type MovieInfoViewModel = {
  synopsis: string;
  tmdbRating: number;
  voteCount: number;
  studio: string;
  releaseDate: string;
  languages: string[];
  subtitlesNote: string;
  quality: string[];
};

export function mapMovieInfo(d: TMDBMovieDetailsAppended): MovieInfoViewModel {
  const releaseDate = d.release_date
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(`${d.release_date}T12:00:00`))
    : "—";

  const languages = (d.spoken_languages ?? []).map(
    (l) => l.english_name || l.name,
  );

  const studio =
    d.production_companies?.find((c) => c.name)?.name ?? "—";

  return {
    synopsis: d.overview?.trim() || "No overview available.",
    tmdbRating: d.vote_average,
    voteCount: d.vote_count,
    studio,
    releaseDate,
    languages: languages.length ? languages : ["—"],
    subtitlesNote:
      "Subtitle availability is not provided by TMDB for this title.",
    quality: [],
  };
}

export type CastMemberViewModel = {
  creditId: string;
  name: string;
  character: string;
  photo: string;
};

const WRITER_JOBS = new Set([
  "Writer",
  "Screenplay",
  "Story",
  "Characters",
  "Novel",
]);

type WithCredits = { credits?: TMDBCredits };

export function mapCastAndCrew(d: WithCredits): {
  cast: CastMemberViewModel[];
  director: string;
  writers: string[];
} {
  const crew = d.credits?.crew ?? [];
  const directors = crew.filter((c) => c.job === "Director").map((c) => c.name);
  const director = directors[0] ?? "—";

  const writerNames = crew
    .filter((c) => WRITER_JOBS.has(c.job))
    .map((c) => c.name);
  const writers = [...new Set(writerNames)];

  const cast = (d.credits?.cast ?? [])
    .sort((a, b) => a.order - b.order)
    .slice(0, 18)
    .map((c) => ({
      creditId: c.credit_id ?? `${c.id}-${c.order}`,
      name: c.name,
      character: c.character || "—",
      photo: tmdbFile("w185", c.profile_path),
    }));

  return { cast, director, writers: writers.length ? writers : ["—"] };
}

function isYouTubeVideo(v: TMDBVideo): boolean {
  return v.site?.toLowerCase() === "youtube" && Boolean(v.key);
}

export type ExtraViewModel = {
  id: string;
  title: string;
  type: string;
  duration: string;
  thumbnail: string;
  youtubeKey: string;
};

type WithVideos = { videos?: { results: TMDBVideo[] } };

export function mapExtras(d: WithVideos): ExtraViewModel[] {
  const results = d.videos?.results ?? [];
  return results
    .filter(isYouTubeVideo)
    .map((v) => ({
      id: v.id,
      title: v.name,
      type: v.type,
      duration: "—",
      thumbnail: `https://img.youtube.com/vi/${v.key}/hqdefault.jpg`,
      youtubeKey: v.key,
    }));
}

export type RelatedMovieViewModel = {
  id: number;
  title: string;
  poster: string;
  rating: number;
};

export function mapRelatedMovies(
  d: TMDBMovieDetailsAppended,
): RelatedMovieViewModel[] {
  const raw =
    d.recommendations?.results?.length
      ? d.recommendations.results
      : (d.similar?.results ?? []);

  return raw
    .filter((m): m is TMDBMovie => Boolean(m?.id && m.title))
    .slice(0, 16)
    .map((m) => ({
      id: m.id,
      title: m.title,
      poster: tmdbFile("w500", m.poster_path),
      rating: Math.round(m.vote_average * 10) / 10,
    }));
}
