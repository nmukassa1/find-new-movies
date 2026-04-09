const TMDB_IMG = "https://image.tmdb.org/t/p";

/** Poster width suitable for ~180px tiles on retina without loading `original`. */
export function tmdbPosterSrc(
  posterPath: string | null | undefined,
  size: "w342" | "w500" = "w500",
): string {
  if (!posterPath?.trim()) return "";
  return `${TMDB_IMG}/${size}${posterPath}`;
}
