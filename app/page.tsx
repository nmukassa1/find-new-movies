import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { BrandTiles } from "@/components/brand-tiles";
import { NowWatching } from "@/components/now-watching";
import { MovieSection } from "@/components/movie-section";
import {
  recommended,
  trending,
  newReleases,
  originals,
} from "@/lib/home-movie-data";
import {
  attachYouTubeTrailersToMovies,
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/movie.service";
import MovieTrailerSection from "@/components/movie-trailer-section";

export default async function MovieDirectory() {
  const [popularMovies, trendingMovies, upcomingMovies] = await Promise.all([
    getPopularMovies(),
    getTrendingMovies(),
    getUpcomingMovies(),
  ]);

  const upcomingMoviesWithTrailers = await attachYouTubeTrailersToMovies(
    upcomingMovies.results,
  );
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Brand Tiles */}
        <BrandTiles />

        {/* Continue Watching */}
        {/* <NowWatching /> */}
        <MovieTrailerSection trailers={upcomingMoviesWithTrailers} />

        {/* Popular*/}
        <MovieSection title="Popular" data={popularMovies} />

        {/* Trending */}
        <MovieSection title="Trending" data={trendingMovies} />

        {/* New Releases */}
        {/* <MovieSection title="New to Stream+" data={newReleases} /> */}

        {/* Originals */}
        {/* <MovieSection title="Originals" data={originals} /> */}
      </main>

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
