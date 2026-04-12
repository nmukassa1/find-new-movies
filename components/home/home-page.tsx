import { HeroSection } from "@/components/hero-section";
import { MovieSection } from "@/components/movie-section";
import MovieTrailerSection from "@/components/movie-trailer-section";
import { browsePath } from "@/lib/browse";
import { loadHomePageData } from "@/lib/home/load-home-page-data";

export async function HomePage() {
  const {
    homeFeatureYear,
    popularMovies,
    trendingMovies,
    topRatedMovies,
    nowPlayingMovies,
    actionMovies,
    comedyMovies,
    bestOfYearMovies,
    homeHero,
    upcomingMoviesWithTrailers,
  } = await loadHomePageData();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {homeHero ? <HeroSection hero={homeHero} /> : null}

        <MovieTrailerSection
          trailers={upcomingMoviesWithTrailers.map(({ movie, trailers }) => ({
            catalog: "movie" as const,
            media: movie,
            trailers,
          }))}
        />

        <MovieSection
          catalog="movie"
          title="Popular"
          data={popularMovies}
          viewAllHref={browsePath("popular")}
        />

        <MovieSection
          catalog="movie"
          title="Trending"
          data={trendingMovies}
          viewAllHref={browsePath("trending")}
        />

        <MovieSection
          catalog="movie"
          title="Top rated"
          data={topRatedMovies}
          viewAllHref={browsePath("top-rated")}
        />

        <MovieSection
          catalog="movie"
          title="Now playing"
          data={nowPlayingMovies}
          viewAllHref={browsePath("now-playing")}
        />

        <MovieSection
          catalog="movie"
          title="Action"
          data={actionMovies}
          viewAllHref={browsePath("action")}
        />

        <MovieSection
          catalog="movie"
          title="Comedy"
          data={comedyMovies}
          viewAllHref={browsePath("comedy")}
        />

        <MovieSection
          catalog="movie"
          title={`Best of ${homeFeatureYear}`}
          data={bestOfYearMovies}
          viewAllHref={browsePath("best-of-year")}
        />
      </main>

      <div className="h-20" />
    </div>
  );
}
