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
import { getHomeFeatureYear } from "@/lib/home-feature-year";
import {
  buildHomeHeroFromDetails,
  buildHomeHeroListFallback,
  pickRandomHeroMovie,
} from "@/lib/home-hero";
import { TMDB_MOVIE_GENRES } from "@/lib/tmdb/movie-genres";

/** Fetches and assembles everything the home route needs (hero, lists, trailers). */
export async function loadHomePageData() {
  const homeFeatureYear = getHomeFeatureYear();

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
    discoverMoviesByReleaseYear(homeFeatureYear),
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
      /* keep list fallback */
    }
  }

  const upcomingMoviesWithTrailers = await attachYouTubeTrailersToMovies(
    upcomingMovies.results,
  );

  return {
    homeFeatureYear,
    popularMovies,
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    actionMovies,
    comedyMovies,
    bestOfYearMovies,
    homeHero,
    upcomingMoviesWithTrailers,
  };
}

export type HomePageData = Awaited<ReturnType<typeof loadHomePageData>>;
