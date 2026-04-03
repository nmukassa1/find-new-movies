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
    <section className="px-8 lg:px-16 py-8 bg-[#0c111b]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-[#f9f9f9]">More Like This</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-[#22293a] hover:bg-[#2a3144] flex items-center justify-center transition-all duration-200 group">
            <ChevronLeft className="w-5 h-5 text-[#f9f9f9]/50 group-hover:text-[#f9f9f9]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#22293a] hover:bg-[#2a3144] flex items-center justify-center transition-all duration-200 group">
            <ChevronRight className="w-5 h-5 text-[#f9f9f9]/50 group-hover:text-[#f9f9f9]" />
          </button>
        </div>
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
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-[#1a1d29]">
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
              <h3 className="text-[#f9f9f9] text-sm font-medium truncate">{movie.title}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-[#f9f9f9]/50">
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
