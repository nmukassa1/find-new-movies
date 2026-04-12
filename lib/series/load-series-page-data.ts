import { getHomeFeatureYear } from "@/lib/home-feature-year";
import {
  attachYouTubeTrailersToTvShows,
  discoverTvByFirstAirYear,
  discoverTvByGenre,
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  getTrendingTv,
  getTvDetails,
} from "@/lib/tmdb/tv.service";
import { TMDB_TV_GENRES } from "@/lib/tmdb/tv-genres";
import {
  buildSeriesHeroFromDetails,
  buildSeriesHeroListFallback,
  pickRandomHeroTv,
} from "@/lib/series/series-hero";

/** Fetches and assembles everything the `/series` route needs (hero, lists, trailers). */
export async function loadSeriesPageData() {
  const homeFeatureYear = getHomeFeatureYear();

  const [
    popularTv,
    trendingTv,
    topRatedTv,
    onTheAirTv,
    airingTodayTv,
    actionTv,
    comedyTv,
    bestOfYearTv,
  ] = await Promise.all([
    getPopularTv(),
    getTrendingTv(),
    getTopRatedTv(),
    getOnTheAirTv(),
    getAiringTodayTv(),
    discoverTvByGenre(TMDB_TV_GENRES.ActionAdventure),
    discoverTvByGenre([
      TMDB_TV_GENRES.Comedy,
      TMDB_TV_GENRES.Drama,
      TMDB_TV_GENRES.Mystery,
    ]),
    discoverTvByFirstAirYear(homeFeatureYear),
  ]);

  const heroPick = pickRandomHeroTv(
    popularTv.results,
    trendingTv.results,
    topRatedTv.results,
    onTheAirTv.results,
    airingTodayTv.results,
    actionTv.results,
    comedyTv.results,
    bestOfYearTv.results,
  );

  let seriesHero: ReturnType<typeof buildSeriesHeroListFallback> | null = null;
  if (heroPick) {
    seriesHero = buildSeriesHeroListFallback(heroPick);
    try {
      const details = await getTvDetails(heroPick.id);
      seriesHero = buildSeriesHeroFromDetails(details);
    } catch {
      /* keep list fallback */
    }
  }

  const trailerPool = onTheAirTv.results.slice(0, 20);
  const onTheAirWithTrailers =
    await attachYouTubeTrailersToTvShows(trailerPool);

  return {
    homeFeatureYear,
    popularTv,
    trendingTv,
    topRatedTv,
    onTheAirTv,
    airingTodayTv,
    actionTv,
    comedyTv,
    bestOfYearTv,
    seriesHero,
    onTheAirWithTrailers,
  };
}

export type SeriesPageData = Awaited<ReturnType<typeof loadSeriesPageData>>;
