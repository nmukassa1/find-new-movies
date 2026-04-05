"use client";

import { Play, Plus, Users, Info, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface MovieHeroProps {
  movie: {
    title: string;
    tagline: string;
    year: number;
    runtime: string;
    rating: string;
    genres: string[];
    backdrop: string;
    logo?: string;
    trailerYoutubeKey?: string;
  };
}

function youtubeHeroEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    loop: "1",
    playlist: videoId,
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function MovieHero({ movie }: MovieHeroProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const useTrailerBg = Boolean(
    movie.trailerYoutubeKey && !reduceMotion,
  );

  const embedSrc = useMemo(
    () =>
      movie.trailerYoutubeKey
        ? youtubeHeroEmbedSrc(movie.trailerYoutubeKey)
        : null,
    [movie.trailerYoutubeKey],
  );

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        {useTrailerBg && embedSrc ? (
          <>
            <img
              src={movie.backdrop}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />
            <iframe
              key={embedSrc}
              title=""
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
              src={embedSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </>
        ) : (
          <img
            src={movie.backdrop}
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
              className="max-w-md h-auto"
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
              className="flex items-center gap-3 px-8 py-4 bg-foreground/10 backdrop-blur-sm text-foreground rounded-[4px] font-semibold text-lg border border-foreground/20 hover:bg-foreground/20 transition-all duration-200"
            >
              <Play className="w-6 h-6" />
              <span>Trailer</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 group"
            >
              <Plus className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
            </button>

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
          </div>
        </div>

        <div
          className="absolute right-8 lg:right-16 bottom-16 flex items-center justify-center w-12 h-12 rounded-full bg-muted/60 backdrop-blur-sm border border-foreground/20 text-foreground/80"
          title={
            useTrailerBg
              ? "Background trailer plays muted"
              : "Backdrop only (no trailer or reduced motion)"
          }
        >
          {useTrailerBg ? (
            <VolumeX className="w-5 h-5" aria-hidden />
          ) : (
            <Volume2 className="w-5 h-5 opacity-40" aria-hidden />
          )}
          <span className="sr-only">
            {useTrailerBg
              ? "Trailer playing muted in the background"
              : "No background trailer audio"}
          </span>
        </div>
      </div>
    </section>
  );
}
