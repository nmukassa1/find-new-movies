"use client";

import { Play, Plus, Users, Info, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

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
  };
}

export function MovieHero({ movie }: MovieHeroProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-vignette" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 lg:px-16">
        <div className="max-w-2xl space-y-6">
          {/* Logo or Title */}
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

          {/* Tagline */}
          {movie.tagline ? (
            <p className="text-xl lg:text-2xl text-foreground/80 italic">
              {movie.tagline}
            </p>
          ) : null}

          {/* Metadata */}
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

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-[4px] font-semibold text-lg hover:bg-foreground/90 transition-all duration-200 group">
              <Play className="w-6 h-6 fill-current" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center gap-3 px-8 py-4 bg-foreground/10 backdrop-blur-sm text-foreground rounded-[4px] font-semibold text-lg border border-foreground/20 hover:bg-foreground/20 transition-all duration-200">
              <Play className="w-6 h-6" />
              <span>Trailer</span>
            </button>
            
            <button className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 group">
              <Plus className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
            </button>
            
            <button className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 group">
              <Users className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
            </button>
            
            <button className="flex items-center justify-center w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm border-2 border-foreground/20 hover:border-foreground/60 transition-all duration-200 group">
              <Info className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Volume Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute right-8 lg:right-16 bottom-16 flex items-center justify-center w-12 h-12 rounded-full bg-muted/60 backdrop-blur-sm border border-foreground/20 hover:border-foreground/40 transition-all duration-200"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-foreground" />
          ) : (
            <Volume2 className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>
    </section>
  );
}
