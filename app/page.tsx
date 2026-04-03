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

export default function MovieDirectory() {
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
        
        {/* Recommended For You */}
        <MovieSection title="Recommended For You" movies={recommended} />
        
        {/* Trending */}
        <MovieSection title="Trending" movies={trending} />
        
        {/* New Releases */}
        <MovieSection title="New to Stream+" movies={newReleases} />
        
        {/* Originals */}
        <MovieSection title="Originals" movies={originals} />
      </main>
      
      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
