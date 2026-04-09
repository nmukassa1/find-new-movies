import { cache } from "react";

import { HeroSection } from "@/components/hero-section";
import { BrandTiles } from "@/components/brand-tiles";
import { MovieSection } from "@/components/movie-section";
import {
  attachYouTubeTrailersToMovies,
  discoverMoviesByGenre,
  discoverMoviesByReleaseYear,
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/movie.service";
import { browsePath } from "@/lib/browse";
import { getHomeFeatureYear } from "@/lib/home-feature-year";
import MovieTrailerSection from "@/components/movie-trailer-section";
import {
  buildHomeHeroFromDetails,
  buildHomeHeroListFallback,
  pickRandomHeroMovie,
} from "@/lib/home-hero";
import { TMDB_MOVIE_GENRES } from "@/lib/tmdb/movie-genres";

export const revalidate = 3600;

const HOME_FEATURE_YEAR = getHomeFeatureYear();

const getHomePageData = cache(async () => {
  const [
    popularMovies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    actionMovies,
    comedyMovies,
    bestOfYearMovies,
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
  ]);

  const heroPick = pickRandomHeroMovie(
    popularMovies.results,
    trendingMovies.results,
    upcomingMovies.results,
    topRatedMovies.results,
    nowPlayingMovies.results,
    actionMovies.results,
    comedyMovies.results,
    bestOfYearMovies.results,
  );

  let homeHero: ReturnType<typeof buildHomeHeroListFallback> | null = null;

  if (heroPick) {
    homeHero = buildHomeHeroListFallback(heroPick);

    try {
      const details = await getMovieDetails(heroPick.id);
      homeHero = buildHomeHeroFromDetails(details);
    } catch {
      /* keep fallback */
    }
  }

  const upcomingMoviesWithTrailers = await attachYouTubeTrailersToMovies(
    upcomingMovies.results,
  );

  return {
    popularMovies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    actionMovies,
    comedyMovies,
    bestOfYearMovies,
    upcomingMoviesWithTrailers,
    homeHero,
  };
});

export default async function MovieDirectory() {
  const {
    popularMovies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    actionMovies,
    comedyMovies,
    bestOfYearMovies,
    upcomingMoviesWithTrailers,
    homeHero,
  } = await getHomePageData();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {homeHero ? <HeroSection hero={homeHero} /> : null}

        <BrandTiles />

        <MovieTrailerSection trailers={upcomingMoviesWithTrailers} />

        <MovieSection
          title="Popular"
          data={popularMovies}
          viewAllHref={browsePath("popular")}
        />

        <MovieSection
          title="Trending"
          data={trendingMovies}
          viewAllHref={browsePath("trending")}
        />

        <MovieSection
          title="Top rated"
          data={topRatedMovies}
          viewAllHref={browsePath("top-rated")}
        />

        <MovieSection
          title="Now playing"
          data={nowPlayingMovies}
          viewAllHref={browsePath("now-playing")}
        />

        <MovieSection
          title="Action"
          data={actionMovies}
          viewAllHref={browsePath("action")}
        />

        <MovieSection
          title="Comedy"
          data={comedyMovies}
          viewAllHref={browsePath("comedy")}
        />

        <MovieSection
          title={`Best of ${HOME_FEATURE_YEAR}`}
          data={bestOfYearMovies}
          viewAllHref={browsePath("best-of-year")}
        />
      </main>

      <div className="h-20" />
    </div>
  );
}
