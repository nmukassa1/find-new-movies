"use client";

import { useState } from "react";
import { TMDBMovie, TMDBVideo } from "@/types/tmdb";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tmdbPosterSrc } from "@/lib/tmdb/tmdb-poster";
import { CirclePlay } from "lucide-react";

interface MovieTrailerSectionProps {
  trailers: { movie: TMDBMovie; trailers: TMDBVideo[] }[];
}

export default function MovieTrailerSection({
  trailers,
}: MovieTrailerSectionProps) {
  const [selected, setSelected] = useState<{
    movie: TMDBMovie;
    trailers: TMDBVideo[];
  } | null>(null);

  const primaryTrailer = selected?.trailers[0];

  return (
    <section className="mb-8 px-8 lg:px-16">
      <h2 className="section-title text-foreground">Trailers</h2>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {trailers.map((item) => {
          const posterSrc = tmdbPosterSrc(item.movie.poster_path);
          return (
            <button
              key={item.movie.id}
              type="button"
              onClick={() => setSelected(item)}
              className="disney-card flex-shrink-0 w-[140px] lg:w-[180px] cursor-pointer rounded-lg overflow-hidden relative aspect-[2/3] bg-card border-0 p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <CirclePlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary size-8 stroke-white group-hover:stroke-primary transition-all duration-300 w-1/2 h-1/2" />
              {posterSrc ? (
                <Image
                  src={posterSrc}
                  className="w-full h-full object-cover"
                  alt={item.movie.title}
                  width={140}
                  height={210}
                  loading="lazy"
                  sizes="(max-width: 1024px) 140px, 180px"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground"
                  aria-hidden
                >
                  No poster
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="sm:max-w-4xl gap-0 overflow-hidden p-0 sm:p-0">
          {selected && (
            <>
              <div className="">
                <DialogHeader>
                  <DialogTitle className="hidden">
                    {selected.movie.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
              {primaryTrailer ? (
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    className=" inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${primaryTrailer.key}`}
                    title={primaryTrailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="text-muted-foreground px-6 pb-6 text-sm">
                  No YouTube trailer available for this title.
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
