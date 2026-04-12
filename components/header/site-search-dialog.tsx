"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Search, Tv } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { MoviePosterCard } from "@/components/movie-poster-card";
import {
  HEADER_MOBILE_BAR_ICON_BUTTON_CLASSNAME,
  HEADER_NAV_ITEM_CLASSNAME,
} from "./constants";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { TMDBMovie, TMDBPaginatedResponse, TMDBTV } from "@/types/tmdb";

const SEARCH_DEBOUNCE_MS = 320;
const MIN_QUERY_CHARS = 2;

export type SiteSearchDialogProps = {
  /** Override default trigger styling. */
  triggerClassName?: string;
  /** Run before opening search (e.g. close another overlay). */
  onBeforeOpen?: () => void;
  /** Compact icon button for the mobile header bar. */
  variant?: "default" | "iconOnly";
};

async function parseSearchResponse<T>(
  res: Response,
): Promise<{ ok: true; results: T[] } | { ok: false }> {
  try {
    const data = (await res.json()) as
      | TMDBPaginatedResponse<T>
      | { error?: string };
    if (!res.ok) return { ok: false };
    if ("results" in data && Array.isArray(data.results)) {
      return { ok: true, results: data.results as T[] };
    }
    return { ok: true, results: [] };
  } catch {
    return { ok: false };
  }
}

export function SiteSearchDialog({
  triggerClassName,
  onBeforeOpen,
  variant = "default",
}: SiteSearchDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const [movieResults, setMovieResults] = useState<TMDBMovie[] | null>(null);
  const [tvResults, setTvResults] = useState<TMDBTV[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setQuery("");
      setMovieResults(null);
      setTvResults(null);
      setError(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    const trimmed = debouncedQuery.trim();

    if (trimmed.length < MIN_QUERY_CHARS) {
      setMovieResults(null);
      setTvResults(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({ q: trimmed });

    setLoading(true);
    setError(null);
    setMovieResults(null);
    setTvResults(null);

    const movieUrl = `/api/search/movies?${params.toString()}`;
    const tvUrl = `/api/search/tv?${params.toString()}`;

    (async () => {
      try {
        const settled = await Promise.allSettled([
          fetch(movieUrl, { signal: controller.signal }).then((res) =>
            parseSearchResponse<TMDBMovie>(res),
          ),
          fetch(tvUrl, { signal: controller.signal }).then((res) =>
            parseSearchResponse<TMDBTV>(res),
          ),
        ]);

        if (controller.signal.aborted) return;

        const movieParsed =
          settled[0]?.status === "fulfilled"
            ? settled[0].value
            : ({ ok: false as const } satisfies { ok: false });
        const tvParsed =
          settled[1]?.status === "fulfilled"
            ? settled[1].value
            : ({ ok: false as const } satisfies { ok: false });

        const movies = movieParsed.ok ? movieParsed.results : [];
        const shows = tvParsed.ok ? tvParsed.results : [];

        setMovieResults(movies);
        setTvResults(shows);

        if (!movieParsed.ok && !tvParsed.ok) {
          setError("Search temporarily unavailable");
        }
      } catch (e: unknown) {
        if (e instanceof Error && e.name === "AbortError") return;
        setMovieResults(null);
        setTvResults(null);
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [debouncedQuery, open]);

  const trimmedLen = debouncedQuery.trim().length;
  const showHint = trimmedLen > 0 && trimmedLen < MIN_QUERY_CHARS;
  const searchComplete =
    !loading &&
    trimmedLen >= MIN_QUERY_CHARS &&
    movieResults !== null &&
    tvResults !== null;
  const showEmpty =
    searchComplete && movieResults.length === 0 && tvResults.length === 0;
  const showMovieGrid = searchComplete && movieResults.length > 0;
  const showTvGrid = searchComplete && tvResults.length > 0;

  const triggerBaseClass =
    variant === "iconOnly"
      ? (triggerClassName ?? HEADER_MOBILE_BAR_ICON_BUTTON_CLASSNAME)
      : (triggerClassName ?? HEADER_NAV_ITEM_CLASSNAME);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <button
        type="button"
        className={triggerBaseClass}
        onClick={() => {
          onBeforeOpen?.();
          queueMicrotask(() => setOpen(true));
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-search-dialog"
        aria-label={variant === "iconOnly" ? "Search movies and TV" : undefined}
      >
        {variant === "iconOnly" ? (
          <Search size={20} strokeWidth={2} aria-hidden />
        ) : (
          <Search size={18} aria-hidden />
        )}
        {variant === "default" ? (
          <span className="cursor-pointer text-[13px] font-medium tracking-wide uppercase">
            Search
          </span>
        ) : null}
      </button>
      <DialogContent
        id="site-search-dialog"
        fullscreen
        overlayClassName="z-[100] bg-background"
        showCloseButton
        className="z-[101] gap-0"
      >
        <DialogTitle className="sr-only">Search movies and TV</DialogTitle>
        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-6 pt-8 sm:px-6 md:pt-12">
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies and TV…"
            autoComplete="off"
            className="h-12 shrink-0 text-base md:h-14 md:text-lg"
            aria-label="Search movies and TV"
            aria-busy={loading}
          />

          <div
            className="min-h-0 flex-1 overflow-y-auto pr-1"
            aria-live="polite"
          >
            {loading ? (
              <div className="flex justify-center py-16">
                <Spinner className="size-8 text-muted-foreground" />
              </div>
            ) : null}

            {!loading && error ? (
              <p className="text-center text-sm text-destructive">{error}</p>
            ) : null}

            {!loading && !error && showHint ? (
              <p className="text-center text-sm text-muted-foreground">
                Type at least {MIN_QUERY_CHARS} characters to search.
              </p>
            ) : null}

            {!loading && !error && trimmedLen === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                Start typing to search TMDB.
              </p>
            ) : null}

            {!loading && !error && showEmpty ? (
              <p className="text-center text-sm text-muted-foreground">
                No movies or TV series found.
              </p>
            ) : null}

            {!loading && !error && showMovieGrid ? (
              <section className="mb-10">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/80">
                  <Film className="size-4" aria-hidden />
                  Movies
                </h2>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {movieResults!.map((movie) => (
                    <li key={`m-${movie.id}`} className="min-w-0">
                      <MoviePosterCard
                        movie={movie}
                        className="mx-auto w-full max-w-[200px]"
                        onNavigate={() => setOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {!loading && !error && showTvGrid ? (
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/80">
                  <Tv className="size-4" aria-hidden />
                  TV series
                </h2>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {tvResults!.map((show) => (
                    <li key={`t-${show.id}`} className="min-w-0">
                      <MoviePosterCard
                        kind="series"
                        show={show}
                        className="mx-auto w-full max-w-[200px]"
                        onNavigate={() => setOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
