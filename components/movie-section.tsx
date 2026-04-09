"use client";

import Link from "next/link";
import { TMDBMovie, TMDBPaginatedResponse } from "@/types/tmdb";
import { filterEnglishMovies } from "@/lib/tmdb/movie.service";
import { MoviePosterCard } from "@/components/movie-poster-card";

interface MovieSectionProps {
  title: string;
  data?: TMDBPaginatedResponse<TMDBMovie>;
  viewAllHref?: string;
}

export function MovieSection({ title, data, viewAllHref }: MovieSectionProps) {
  const englishMovies = filterEnglishMovies(data?.results ?? []);
  const movies = englishMovies;

  return (
    <section className="mb-8 px-8 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-foreground">{title}</h2>
        {viewAllHref ? <Link href={viewAllHref}>View All</Link> : null}
      </div>

      {/* Movie Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {movies.map((movie) => (
          <MoviePosterCard
            key={movie.id}
            movie={movie}
            className="w-[140px] lg:w-[180px]"
          />
        ))}
      </div>
    </section>
  );
}
