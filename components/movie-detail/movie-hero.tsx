"use client";

import { Play, Users, Info, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ensureYouTubeIframeAPI } from "@/lib/youtube/iframe-api";
import { cn } from "@/lib/utils";
import { WatchlistToggleButton } from "@/components/watchlist/watchlist-toggle-button";

interface MovieHeroProps {
  movie: {
    tmdbId: number;
    title: string;
    tagline: string;
    year: number;
    runtime: string;
    rating: string;
    genres: string[];
    backdrop: string;
    poster: string;
    logo?: string;
    trailerYoutubeKey?: string;
  };
  initialInWatchlist: boolean;
  isAuthenticatedServer: boolean;
  watchlistMediaType: "MOVIE" | "TV";
}

type BgPlayer = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
};

function youtubeModalEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    controls: "1",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const MOBILE_MAX_WIDTH_PX = 767;

export function MovieHero({
  movie,
  initialInWatchlist,
  isAuthenticatedServer,
  watchlistMediaType,
}: MovieHeroProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(
    null,
  );
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [bgMuted, setBgMuted] = useState(true);
  const [bgPlayerReady, setBgPlayerReady] = useState(false);

  const bgPlayerRef = useRef<BgPlayer | null>(null);
  const bgMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    const sync = () => setIsMobileViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const useTrailerBg = Boolean(
    movie.trailerYoutubeKey && !reduceMotion && isMobileViewport === false,
  );

  const heroStillSrc = useTrailerBg
    ? movie.backdrop
    : isMobileViewport === true
      ? movie.poster
      : movie.backdrop;

  useEffect(() => {
    if (!useTrailerBg || !movie.trailerYoutubeKey || !bgMountRef.current) {
      bgPlayerRef.current = null;
      setBgPlayerReady(false);
      return;
    }

    const mountEl = bgMountRef.current;
    const videoId = movie.trailerYoutubeKey;
    if (!videoId) return;

    let cancelled = false;

    ensureYouTubeIframeAPI().then(() => {
      if (cancelled || !mountEl || !window.YT?.Player) return;

      bgPlayerRef.current?.destroy();
      bgPlayerRef.current = null;

      new window.YT.Player(mountEl, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            const p = e.target as unknown as BgPlayer;
            bgPlayerRef.current = p;
            p.mute();
            p.playVideo();
            setBgMuted(true);
            setBgPlayerReady(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      setBgPlayerReady(false);
      try {
        bgPlayerRef.current?.destroy();
      } catch {
        /* noop */
      }
      bgPlayerRef.current = null;
    };
  }, [useTrailerBg, movie.trailerYoutubeKey]);

  const openTrailer = useCallback(() => {
    if (!movie.trailerYoutubeKey) return;
    try {
      bgPlayerRef.current?.pauseVideo();
    } catch {
      /* noop */
    }
    setTrailerOpen(true);
  }, [movie.trailerYoutubeKey]);

  const onTrailerOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setTrailerOpen(false);
      try {
        const p = bgPlayerRef.current;
        if (p) {
          p.mute();
          p.playVideo();
        }
      } catch {
        /* noop */
      }
      setBgMuted(true);
    }
  }, []);

  const toggleBgMute = useCallback(() => {
    const p = bgPlayerRef.current;
    if (!p || !bgPlayerReady || !useTrailerBg) return;
    try {
      if (p.isMuted()) {
        p.unMute();
        setBgMuted(false);
      } else {
        p.mute();
        setBgMuted(true);
      }
    } catch {
      /* noop */
    }
  }, [bgPlayerReady, useTrailerBg]);

  const hasTrailer = Boolean(movie.trailerYoutubeKey);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        {useTrailerBg && movie.trailerYoutubeKey ? (
          <>
            <img
              src={heroStillSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2",
                  "[&_iframe]:pointer-events-none [&_iframe]:!h-full [&_iframe]:!w-full",
                )}
              >
                <div ref={bgMountRef} className="h-full w-full" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={heroStillSrc}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-vignette" />

      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 lg:px-16">
        <div className="max-w-2xl space-y-6">
          {movie.logo ? (
            <img
              src={movie.logo}
              alt={movie.title}
              className="md:-w-md w-[54%]  h-auto"
            />
          ) : (
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground tracking-tight">
              {movie.title}
            </h1>
          )}

          {movie.tagline ? (
            <p className="text-xl lg:text-2xl text-foreground/80 italic">
              {movie.tagline}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/70">
            <span className="font-semibold text-foreground">
              {movie.year > 0 ? movie.year : "TBA"}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/40" />
            <span>{movie.runtime}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/40" />
            <span className="px-2 py-0.5 border border-foreground/40 rounded text-xs">
              {movie.rating}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/40" />
            {movie.genres.map((genre, index) => (
              <span key={genre}>
                {genre}
                {index < movie.genres.length - 1 && (
                  <span className="ml-3">&bull;</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              disabled={!hasTrailer}
              onClick={openTrailer}
              className="flex items-center gap-3 px-8 py-4 bg-foreground/10 backdrop-blur-sm text-foreground rounded-[4px] font-semibold text-lg border border-foreground/20 hover:bg-foreground/20 transition-all duration-200 disabled:pointer-events-none disabled:opacity-40"
            >
              <Play className="w-6 h-6" />
              <span>Trailer</span>
            </button>

            <WatchlistToggleButton
              initialInWatchlist={initialInWatchlist}
              isAuthenticatedServer={isAuthenticatedServer}
              snapshot={{
                mediaType: watchlistMediaType,
                tmdbId: movie.tmdbId,
                title: movie.title,
                posterUrl: movie.poster,
                releaseYear: movie.year > 0 ? movie.year : null,
              }}
            />

            <button
              type="button"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 group"
            >
              <Users className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 group"
            >
              <Info className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
            </button>

            <button
              type="button"
              disabled={!useTrailerBg || !bgPlayerReady}
              onClick={toggleBgMute}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 disabled:pointer-events-none disabled:opacity-40"
              title={
                useTrailerBg && bgPlayerReady
                  ? bgMuted
                    ? "Unmute background trailer"
                    : "Mute background trailer"
                  : "Background trailer unavailable"
              }
            >
              {bgMuted ? (
                <VolumeX className="w-6 h-6 text-foreground" aria-hidden />
              ) : (
                <Volume2 className="w-6 h-6 text-foreground" aria-hidden />
              )}
              <span className="sr-only">
                {bgMuted
                  ? "Unmute background trailer"
                  : "Mute background trailer"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={trailerOpen} onOpenChange={onTrailerOpenChange}>
        <DialogContent
          showCloseButton
          className={cn(
            "z-[100] max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0 sm:max-w-5xl",
          )}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Trailer: {movie.title}</DialogTitle>
          </DialogHeader>
          {movie.trailerYoutubeKey ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={`${movie.trailerYoutubeKey}-modal`}
                title={`Trailer: ${movie.title}`}
                src={youtubeModalEmbedSrc(movie.trailerYoutubeKey)}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
