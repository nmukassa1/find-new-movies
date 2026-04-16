import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { MovieHero } from "@/components/movie-detail/movie-hero";
import { getWatchlistMembershipAction } from "@/lib/actions/watchlist";
import { authOptions } from "@/lib/auth/options";
import { MovieInfo } from "@/components/movie-detail/movie-info";
import { CastSection } from "@/components/movie-detail/cast-section";
import { ExtrasSection } from "@/components/movie-detail/extras-section";
import { RelatedMovies } from "@/components/movie-detail/related-movies";
import { getTvDetails } from "@/lib/tmdb/tv.service";
import { mapExtras } from "@/lib/tmdb/map-movie-detail";
import {
  mapRelatedTvShows,
  mapTvCastAndCrew,
  mapTvHero,
  mapTvInfo,
} from "@/lib/tmdb/map-tv-detail";

export default async function SeriesDetailPage({
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
    details = await getTvDetails(numericId);
  } catch {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const isAuthenticatedServer = Boolean(session?.user);

  const hero = mapTvHero(details);
  const { inWatchlist: initialInWatchlist } = await getWatchlistMembershipAction(
    "TV",
    numericId,
  );
  const info = mapTvInfo(details);
  const { cast, director, writers, createdBy } = mapTvCastAndCrew(details);
  const extras = mapExtras(details);
  const related = mapRelatedTvShows(details);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <MovieHero
          movie={hero}
          initialInWatchlist={initialInWatchlist}
          isAuthenticatedServer={isAuthenticatedServer}
          watchlistMediaType="TV"
        />

        <MovieInfo movie={info} />

        <CastSection
          cast={cast}
          director={director}
          writers={writers}
          createdBy={createdBy}
        />

        <ExtrasSection extras={extras} />

        <RelatedMovies movies={related} detailBase="series" />
      </main>

      <div className="h-20" />
    </div>
  );
}
