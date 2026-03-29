"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <section className="mb-8 px-8 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-[#f9f9f9]">{title}</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-[#22293a] hover:bg-[#2a3144] flex items-center justify-center transition-all duration-200 group">
            <ChevronLeft className="w-5 h-5 text-[#f9f9f9]/50 group-hover:text-[#f9f9f9]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#22293a] hover:bg-[#2a3144] flex items-center justify-center transition-all duration-200 group">
            <ChevronRight className="w-5 h-5 text-[#f9f9f9]/50 group-hover:text-[#f9f9f9]" />
          </button>
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="disney-card flex-shrink-0 w-[200px] lg:w-[240px] cursor-pointer rounded-[4px] overflow-hidden"
          >
            {/* Poster */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-[#1a1d29]">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
