import { HeroSection } from "@/components/hero-section";
import { MovieSection } from "@/components/movie-section";
import MovieTrailerSection from "@/components/movie-trailer-section";
import { loadSeriesPageData } from "@/lib/series/load-series-page-data";
import { seriesBrowsePath } from "@/lib/series/browse-series";

export async function SeriesPage() {
  const {
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
  } = await loadSeriesPageData();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {seriesHero ? <HeroSection hero={seriesHero} /> : null}

        <MovieTrailerSection
          trailers={onTheAirWithTrailers.map(({ show, trailers }) => ({
            catalog: "series" as const,
            media: show,
            trailers,
          }))}
        />

        <MovieSection
          catalog="series"
          title="Popular"
          data={popularTv}
          viewAllHref={seriesBrowsePath("popular")}
        />

        <MovieSection
          catalog="series"
          title="Trending"
          data={trendingTv}
          viewAllHref={seriesBrowsePath("trending")}
        />

        <MovieSection
          catalog="series"
          title="Top rated"
          data={topRatedTv}
          viewAllHref={seriesBrowsePath("top-rated")}
        />

        <MovieSection
          catalog="series"
          title="On the air"
          data={onTheAirTv}
          viewAllHref={seriesBrowsePath("on-the-air")}
        />

        <MovieSection
          catalog="series"
          title="Airing today"
          data={airingTodayTv}
          viewAllHref={seriesBrowsePath("airing-today")}
        />

        <MovieSection
          catalog="series"
          title="Action & adventure"
          data={actionTv}
          viewAllHref={seriesBrowsePath("action")}
        />

        <MovieSection
          catalog="series"
          title="Comedy"
          data={comedyTv}
          viewAllHref={seriesBrowsePath("comedy")}
        />

        <MovieSection
          catalog="series"
          title={`Best of ${homeFeatureYear}`}
          data={bestOfYearTv}
          viewAllHref={seriesBrowsePath("best-of-year")}
        />
      </main>

      <div className="h-20" />
    </div>
  );
}
