import { HeroSection } from "@/components/hero-section";
import { BrandTiles } from "@/components/brand-tiles";
import { MovieSection } from "@/components/movie-section";
import {
  attachYouTubeTrailersToMovies,
  discoverMoviesByGenre,
  discoverMoviesByReleaseYear,
  emptyPaginatedMovies,
  emptyUpcomingMoviesResponse,
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  withTmdbFallback,
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

const HOME_FEATURE_YEAR = getHomeFeatureYear();

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
  ] = await Promise.all([
    withTmdbFallback(() => getPopularMovies(), emptyPaginatedMovies()),
    withTmdbFallback(() => getTrendingMovies(), emptyPaginatedMovies()),
    withTmdbFallback(() => getUpcomingMovies(), emptyUpcomingMoviesResponse()),
    withTmdbFallback(() => getTopRatedMovies(), emptyPaginatedMovies()),
    withTmdbFallback(() => getNowPlayingMovies(), emptyPaginatedMovies()),
    withTmdbFallback(
      () => discoverMoviesByGenre(TMDB_MOVIE_GENRES.Action),
      emptyPaginatedMovies(),
    ),
    withTmdbFallback(
      () =>
        discoverMoviesByGenre([
          TMDB_MOVIE_GENRES.Comedy,
          TMDB_MOVIE_GENRES.Drama,
          TMDB_MOVIE_GENRES.Romance,
        ]),
      emptyPaginatedMovies(),
    ),
    withTmdbFallback(
      () => discoverMoviesByReleaseYear(HOME_FEATURE_YEAR),
      emptyPaginatedMovies(),
    ),
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

  const upcomingMoviesWithTrailers = await withTmdbFallback(
    () => attachYouTubeTrailersToMovies(upcomingMovies.results ?? []),
    [],
  );

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
