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
import { getPopularMovies, getTrendingMovies } from "@/lib/tmdb/movie.service";

export default async function MovieDirectory() {
  const [popularMovies, trendingMovies] = await Promise.all([
    getPopularMovies(),
    getTrendingMovies(),
  ]);

  console.log(popularMovies);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Brand Tiles */}
        <BrandTiles />

        {/* Continue Watching */}
        <NowWatching />

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
