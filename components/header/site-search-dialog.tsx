"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { MoviePosterCard } from "@/components/movie-poster-card";
import {
  HEADER_MOBILE_BAR_ICON_BUTTON_CLASSNAME,
  HEADER_NAV_ITEM_CLASSNAME,
} from "./constants";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { TMDBMovie, TMDBPaginatedResponse } from "@/types/tmdb";

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

export function SiteSearchDialog({
  triggerClassName,
  onBeforeOpen,
  variant = "default",
}: SiteSearchDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const [movies, setMovies] = useState<TMDBMovie[] | null>(null);
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
      setMovies(null);
      setError(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    const trimmed = debouncedQuery.trim();

    if (trimmed.length < MIN_QUERY_CHARS) {
      setMovies(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ q: trimmed });

    fetch(`/api/search/movies?${params.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        const data = (await res.json()) as
          | TMDBPaginatedResponse<TMDBMovie>
          | { error?: string };

        if (!res.ok) {
          const msg =
            "error" in data && typeof data.error === "string"
              ? data.error
              : "Search failed";
          throw new Error(msg);
        }

        if ("results" in data && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === "AbortError") return;
        setMovies(null);
        setError(e instanceof Error ? e.message : "Something went wrong");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, open]);

  const trimmedLen = debouncedQuery.trim().length;
  const showHint = trimmedLen > 0 && trimmedLen < MIN_QUERY_CHARS;
  const showEmpty =
    !loading &&
    trimmedLen >= MIN_QUERY_CHARS &&
    movies !== null &&
    movies.length === 0;
  const showGrid =
    !loading && movies !== null && movies.length > 0 && trimmedLen >= MIN_QUERY_CHARS;

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
        aria-label={variant === "iconOnly" ? "Search movies" : undefined}
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
        <DialogTitle className="sr-only">Search movies</DialogTitle>
        <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-6 pt-8 sm:px-6 md:pt-12">
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies…"
            autoComplete="off"
            className="h-12 shrink-0 text-base md:h-14 md:text-lg"
            aria-label="Search movies"
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
                No movies found.
              </p>
            ) : null}

            {showGrid && movies ? (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie) => (
                  <li key={movie.id} className="min-w-0">
                    <MoviePosterCard
                      movie={movie}
                      className="w-full max-w-[200px] mx-auto"
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
