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

/** Cache home HTML for a few minutes to cut TTFB and payload churn on repeat visits (TMDB data does not need to be per-request fresh). */
export const revalidate = 300;

// Year label and TMDB query for the "Best of" home row.
const HOME_FEATURE_YEAR = getHomeFeatureYear();

export default async function MovieDirectory() {
  // Load every home-page list in parallel (charts, genres, featured year).
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

  // Pick one title from all pools to drive the hero.
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

  // Prefer full movie details for the hero; keep list fallback if the request fails.
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

  // Resolve YouTube trailer URLs for the upcoming-movies strip.
  const upcomingMoviesWithTrailers = await attachYouTubeTrailersToMovies(
    upcomingMovies.results,
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Featured hero plus brand / partner tiles. */}
        {homeHero ? <HeroSection hero={homeHero} /> : null}

        <BrandTiles />

        {/* Scrollable upcoming titles with inline trailers. */}
        <MovieTrailerSection trailers={upcomingMoviesWithTrailers} />

        {/* Browse rows: each links to a slug under /browse. */}
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

      {/* Bottom padding so the last row clears the layout / nav. */}
      <div className="h-20" />
    </div>
  );
}
