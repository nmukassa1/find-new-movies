"use client";

import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  comments: number;
  color: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:bg-[#252525] transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:bg-[#252525] transition-colors">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="group cursor-pointer">
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 bg-[#1a1a1a]">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                className="absolute inset-0 opacity-60 mix-blend-overlay"
                style={{ backgroundColor: movie.color }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Title Overlay on Poster */}
              <div className="absolute top-4 left-4 right-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider opacity-90">
                  {movie.title.split(" ")[0]}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-[#d4a853]" />
                {movie.rating} iMDB
              </span>
              <span className="flex items-center gap-0.5">
                <MessageSquare className="w-3 h-3" />
                {movie.comments}
              </span>
            </div>
            <h3 className="text-sm font-medium text-white group-hover:text-[#d4a853] transition-colors line-clamp-2">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
