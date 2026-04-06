import { HeroSection } from "@/components/hero-section";
import { BrandTiles } from "@/components/brand-tiles";
import { MovieSection } from "@/components/movie-section";
import {
  attachYouTubeTrailersToMovies,
  discoverHighlyRatedMovies,
  discoverMoviesByGenre,
  discoverMoviesByReleaseYear,
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/movie.service";
import MovieTrailerSection from "@/components/movie-trailer-section";
import {
  buildHomeHeroFromDetails,
  buildHomeHeroListFallback,
  pickRandomHeroMovie,
} from "@/lib/home-hero";
import { TMDB_MOVIE_GENRES } from "@/lib/tmdb/movie-genres";

const HOME_FEATURE_YEAR = (() => {
  const startYear = 1990;
  const endYear = new Date().getFullYear();
  // Use the current date to pick a repeatable pseudo-random year each day
  const today = new Date();
  // Generate a deterministic seed from the date (YYYY-MM-DD as string)
  const seedStr = today.toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit int
  }
  // Generate pseudo-random number between 0 and (endYear - startYear)
  const yearRange = endYear - startYear + 1;
  const pseudoRandom = Math.abs(hash) % yearRange;
  return startYear + pseudoRandom;
})();

export default async function MovieDirectory() {
  const [
    popularMovies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    actionMovies,
    comedyMovies,
    bestOfYearMovies,
    highlyRatedDiscover,
  ] = await Promise.all([
    getPopularMovies(),
    getTrendingMovies(),
    getUpcomingMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
    discoverMoviesByGenre(TMDB_MOVIE_GENRES.Action),
    discoverMoviesByGenre([
      TMDB_MOVIE_GENRES.Comedy,
      TMDB_MOVIE_GENRES.Drama,
      TMDB_MOVIE_GENRES.Romance,
    ]),
    discoverMoviesByReleaseYear(HOME_FEATURE_YEAR),
    discoverHighlyRatedMovies(),
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
        <HeroSection hero={homeHero} />

        <BrandTiles />

        <MovieTrailerSection trailers={upcomingMoviesWithTrailers} />

        <MovieSection title="Popular" data={popularMovies} />

        <MovieSection title="Trending" data={trendingMovies} />

        <MovieSection title="Top rated" data={topRatedMovies} />

        <MovieSection title="Now playing" data={nowPlayingMovies} />

        <MovieSection title="Action" data={actionMovies} />

        <MovieSection title="Comedy" data={comedyMovies} />

        <MovieSection
          title={`Best of ${HOME_FEATURE_YEAR}`}
          data={bestOfYearMovies}
        />
      </main>

      <div className="h-20" />
    </div>
  );
}
