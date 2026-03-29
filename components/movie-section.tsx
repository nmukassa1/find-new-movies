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
    <section className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-[#1a1a1f] tracking-tight">{title}</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-xl border border-black/[0.04] shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-white/80 hover:border-black/[0.08] hover:shadow-md hover:scale-105 group">
            <ChevronLeft className="w-5 h-5 text-[#1a1a1f]/30 transition-colors duration-300 group-hover:text-[#1a1a1f]/70" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-xl border border-black/[0.06] shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-white/90 hover:border-black/[0.1] hover:shadow-md hover:scale-105 group">
            <ChevronRight className="w-5 h-5 text-[#1a1a1f]/60 transition-colors duration-300 group-hover:text-[#1a1a1f]" />
          </button>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="group cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-white/40 border border-black/[0.04] shadow-sm transition-all duration-500 group-hover:border-black/[0.08] group-hover:shadow-xl">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
              
              {/* Subtle color tint */}
              <div
                className="absolute inset-0 opacity-15 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-25"
                style={{ backgroundColor: movie.color }}
              />
              
              {/* Title Overlay on Poster */}
              <div className="absolute top-4 left-4 right-4">
                <span className="text-white/90 text-[10px] font-semibold uppercase tracking-[0.15em] drop-shadow-lg">
                  {movie.title.split(" ")[0]}
                </span>
              </div>

              {/* Bottom glass effect on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Info */}
            <div className="flex items-center gap-3 text-[11px] text-[#1a1a1f]/35 mb-1.5">
              <span className="flex items-center gap-1 transition-colors duration-300 group-hover:text-[#1a1a1f]/60">
                <Star className="w-3 h-3 text-[#1a1a1f]/50" />
                {movie.rating} iMDB
              </span>
              <span className="flex items-center gap-1 transition-colors duration-300 group-hover:text-[#1a1a1f]/60">
                <MessageSquare className="w-3 h-3" />
                {movie.comments}
              </span>
            </div>
            <h3 className="text-sm font-medium text-[#1a1a1f]/70 transition-all duration-300 group-hover:text-[#1a1a1f] line-clamp-2 leading-snug">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
