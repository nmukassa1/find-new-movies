"use client";

import Link from "next/link";
import { Play, Plus, Users, Info } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ensureYouTubeIframeAPI } from "@/lib/youtube/iframe-api";
import { cn } from "@/lib/utils";
import type { HomeHeroContent } from "@/lib/home-hero";

type BgPlayer = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
};

const MOBILE_MAX_WIDTH_PX = 767;

interface HeroSectionProps {
  hero: HomeHeroContent;
}

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

export function HeroSection({ hero }: HeroSectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean | null>(
    null,
  );
  const [trailerOpen, setTrailerOpen] = useState(false);
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
    hero.trailerYoutubeKey && !reduceMotion && isMobileViewport === false,
  );

  const heroStillSrc = useTrailerBg
    ? hero.backdrop
    : isMobileViewport === true
      ? hero.poster
      : hero.backdrop;

  useEffect(() => {
    if (!useTrailerBg || !hero.trailerYoutubeKey || !bgMountRef.current) {
      bgPlayerRef.current = null;
      return;
    }

    const mountEl = bgMountRef.current;
    const videoId = hero.trailerYoutubeKey;
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
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        bgPlayerRef.current?.destroy();
      } catch {
        /* noop */
      }
      bgPlayerRef.current = null;
    };
  }, [useTrailerBg, hero.trailerYoutubeKey, hero.id]);

  const openTrailerModal = useCallback(() => {
    if (!hero.trailerYoutubeKey) return;
    try {
      bgPlayerRef.current?.pauseVideo();
    } catch {
      /* noop */
    }
    setTrailerOpen(true);
  }, [hero.trailerYoutubeKey]);

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
    }
  }, []);

  const hasTrailer = Boolean(hero.trailerYoutubeKey);

  const metaParts = [
    hero.year > 0 ? String(hero.year) : "TBA",
    hero.runtime,
    hero.rating,
    ...(hero.genres?.length ? [hero.genres.join(", ")] : []),
  ].filter(Boolean);

  const mobileGenreLine =
    hero.genres?.length > 0
      ? hero.genres.slice(0, 4).join(" \u2022 ")
      : hero.tagline?.trim() || metaParts.join(" \u2022 ");

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "mx-3 mt-2 w-[calc(100%-1.5rem)] max-w-full rounded-2xl md:mx-0 md:mt-0 md:w-full md:max-w-none md:rounded-none",
        "h-[72vh] min-h-[480px] max-h-[720px] md:h-[500px] md:max-h-none md:min-h-0 lg:h-[600px]",
      )}
    >
      <div className="absolute inset-0">
        {useTrailerBg && hero.trailerYoutubeKey ? (
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
            alt={hero.title}
            className="h-full w-full object-cover object-center md:object-cover"
          />
        )}
      </div>

      <div className="hero-gradient absolute inset-0 hidden md:block" />
      <div className="hero-vignette absolute inset-0 hidden md:block" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent md:hidden"
        aria-hidden
      />

      {/* —— Mobile (streaming-style) —— */}
      <div className="relative z-10 flex h-full flex-col md:hidden">
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="pointer-events-auto space-y-4 px-5 pb-8 text-center">
          {hero.logo ? (
            <>
              <h1 className="sr-only">{hero.title}</h1>
              <img
                src={hero.logo}
                alt=""
                className="mx-auto max-h-24 w-auto max-w-[90%] object-contain object-bottom drop-shadow-lg"
                aria-hidden
              />
            </>
          ) : (
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
              {hero.title}
            </h1>
          )}
          {mobileGenreLine ? (
            <p className="text-sm font-medium text-white/90 drop-shadow-sm">
              {mobileGenreLine}
            </p>
          ) : null}
          <div className="mx-auto flex w-full max-w-md gap-3">
            <button
              type="button"
              disabled={!hasTrailer}
              onClick={openTrailerModal}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-white py-3.5 text-sm font-semibold text-black shadow-sm transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
            >
              <Play size={20} className="fill-black text-black" />
              Trailer
            </button>
            <button
              type="button"
              className="flex items-center gap-3 rounded-[4px] border-2 border-foreground bg-foreground/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-foreground transition-all duration-200 hover:bg-foreground/30"
            >
              <Plus size={20} className="shrink-0" strokeWidth={2.5} />
              Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* —— Desktop —— */}
      <div className="absolute bottom-0 left-0 hidden max-w-2xl p-8 md:block lg:p-16">
        <div className="mb-6">
          {hero.logo ? (
            <>
              <h1 className="sr-only">{hero.title}</h1>
              <img
                src={hero.logo}
                alt=""
                className="mb-4 h-24 object-contain lg:h-32"
                aria-hidden
              />
            </>
          ) : (
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              {hero.title}
            </h1>
          )}
          {hero.tagline ? (
            <p className="mb-2 text-base italic text-foreground/75 lg:text-lg">
              {hero.tagline}
            </p>
          ) : null}
          <p className="text-sm font-medium tracking-wide text-foreground/70">
            {metaParts.join(" \u2022 ")}
          </p>
        </div>

        {hero.overview ? (
          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-foreground/80 lg:text-base">
            {hero.overview}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={`/movie/${hero.id}`}
            className="flex items-center gap-3 rounded-[4px] bg-foreground px-8 py-4 text-sm font-semibold uppercase tracking-wider text-background transition-all duration-200 hover:bg-foreground-cta-hover"
          >
            <Play size={20} className="fill-background" />
            Play
          </Link>
          <button
            type="button"
            className="flex items-center gap-3 rounded-[4px] border-2 border-foreground bg-foreground/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-foreground transition-all duration-200 hover:bg-foreground/30"
          >
            <Plus size={20} />
            Watchlist
          </button>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground bg-background/60 transition-all duration-200 hover:bg-foreground/20"
          >
            <Users size={20} className="text-foreground" />
          </button>
          <Link
            href={`/movie/${hero.id}`}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground bg-background/60 transition-all duration-200 hover:bg-foreground/20"
            aria-label={`More about ${hero.title}`}
          >
            <Info size={20} className="text-foreground" />
          </Link>
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
            <DialogTitle>Trailer: {hero.title}</DialogTitle>
          </DialogHeader>
          {hero.trailerYoutubeKey ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={`${hero.trailerYoutubeKey}-hero-modal`}
                title={`Trailer: ${hero.title}`}
                src={youtubeModalEmbedSrc(hero.trailerYoutubeKey)}
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
