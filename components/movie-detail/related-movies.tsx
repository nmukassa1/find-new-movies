"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface RelatedMovie {
  id: number;
  title: string;
  poster: string;
  rating: number;
}

interface RelatedMoviesProps {
  movies: RelatedMovie[];
}

export function RelatedMovies({ movies }: RelatedMoviesProps) {
  if (movies.length === 0) return null;

  return (
    <section className="px-8 lg:px-16 py-8 bg-background">
      {/* Header */}
      <div className=" mb-4">
        <h2 className="section-title text-foreground">More Like This</h2>
      </div>

      {/* Movies Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="disney-card flex-shrink-0 w-[140px] lg:w-[180px] cursor-pointer rounded-lg overflow-hidden"
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300" />
            </div>

            {/* Movie info below poster */}
            <div className="pt-3 pb-1">
              <h3 className="text-foreground text-sm font-medium truncate">
                {movie.title}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-foreground/50">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span>{movie.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
