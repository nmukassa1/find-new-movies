import { notFound } from "next/navigation";
import { MovieHero } from "@/components/movie-detail/movie-hero";
import { MovieInfo } from "@/components/movie-detail/movie-info";
import { CastSection } from "@/components/movie-detail/cast-section";
import { ExtrasSection } from "@/components/movie-detail/extras-section";
import { RelatedMovies } from "@/components/movie-detail/related-movies";
import { getMovieDetails } from "@/lib/tmdb/movie.service";
import {
  mapCastAndCrew,
  mapExtras,
  mapMovieHero,
  mapMovieInfo,
  mapRelatedMovies,
} from "@/lib/tmdb/map-movie-detail";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    notFound();
  }

  let details;
  try {
    details = await getMovieDetails(numericId);
  } catch {
    notFound();
  }

  const hero = mapMovieHero(details);
  const info = mapMovieInfo(details);
  const { cast, director, writers } = mapCastAndCrew(details);
  const extras = mapExtras(details);
  const related = mapRelatedMovies(details);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <MovieHero movie={hero} />

        <MovieInfo movie={info} />

        <CastSection cast={cast} director={director} writers={writers} />

        <ExtrasSection extras={extras} />

        <RelatedMovies movies={related} />
      </main>

      <div className="h-20" />
    </div>
  );
}
