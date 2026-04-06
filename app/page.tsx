import { HeroSection } from "@/components/hero-section";
import { BrandTiles } from "@/components/brand-tiles";
import { MovieSection } from "@/components/movie-section";
import {
  attachYouTubeTrailersToMovies,
  getMovieDetails,
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/movie.service";
import MovieTrailerSection from "@/components/movie-trailer-section";
import {
  buildHomeHeroFromDetails,
  buildHomeHeroListFallback,
  pickRandomHeroMovie,
} from "@/lib/home-hero";

export default async function MovieDirectory() {
  const [popularMovies, trendingMovies, upcomingMovies] = await Promise.all([
    getPopularMovies(),
    getTrendingMovies(),
    getUpcomingMovies(),
  ]);

  const heroPick = pickRandomHeroMovie(
    popularMovies.results,
    trendingMovies.results,
    upcomingMovies.results,
  );

  let homeHero = buildHomeHeroListFallback(heroPick);
  try {
    const details = await getMovieDetails(heroPick.id);
    homeHero = buildHomeHeroFromDetails(details);
  } catch {
    /* keep list fallback */
  }

  const upcomingMoviesWithTrailers = await attachYouTubeTrailersToMovies(
    upcomingMovies.results,
  );
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        {/* <HeroSection hero={homeHero} /> */}

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
