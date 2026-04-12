"use client";

import Link from "next/link";
import { TMDBMovie, TMDBPaginatedResponse, TMDBTV } from "@/types/tmdb";
import { filterEnglishMovies } from "@/lib/tmdb/movie.service";
import { MoviePosterCard } from "@/components/movie-poster-card";

type MovieSectionProps = {
  title: string;
  viewAllHref?: string;
} & (
  | { catalog: "movie"; data?: TMDBPaginatedResponse<TMDBMovie> }
  | { catalog: "series"; data?: TMDBPaginatedResponse<TMDBTV> }
);

export function MovieSection(props: MovieSectionProps) {
  const { title, viewAllHref, catalog } = props;

  return (
    <section className="mb-8 px-8 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-foreground">{title}</h2>
        {viewAllHref ? <Link href={viewAllHref}>View All</Link> : null}
      </div>

      {/* Movie Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {catalog === "movie"
          ? filterEnglishMovies(props.data?.results ?? []).map((movie) => (
              <MoviePosterCard
                key={movie.id}
                movie={movie}
                className="w-[140px] lg:w-[180px]"
              />
            ))
          : filterEnglishMovies(props.data?.results ?? []).map((show) => (
              <MoviePosterCard
                key={show.id}
                kind="series"
                show={show}
                className="w-[140px] lg:w-[180px]"
              />
            ))}
      </div>
    </section>
  );
}
