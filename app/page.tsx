import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { BrandTiles } from "@/components/brand-tiles";
import { NowWatching } from "@/components/now-watching";
import { MovieSection } from "@/components/movie-section";

const recommended = [
  {
    id: 1,
    title: "Moana 2",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=225&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#48cae4",
  },
  {
    id: 2,
    title: "Inside Out 2",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 24,
    color: "#f7d547",
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop",
    rating: 4.7,
    comments: 32,
    color: "#e63946",
  },
  {
    id: 4,
    title: "The Acolyte",
    poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=225&fit=crop",
    rating: 4.5,
    comments: 15,
    color: "#9d4edd",
  },
  {
    id: 5,
    title: "Alien: Romulus",
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=225&fit=crop",
    rating: 4.6,
    comments: 28,
    color: "#22293a",
  },
  {
    id: 6,
    title: "Kingdom of the Planet",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop",
    rating: 4.4,
    comments: 19,
    color: "#2d6a4f",
  },
  {
    id: 7,
    title: "The Bear",
    poster: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 45,
    color: "#ff6b35",
  },
];

const trending = [
  {
    id: 1,
    title: "Agatha All Along",
    poster: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=225&fit=crop",
    rating: 4.6,
    comments: 21,
    color: "#9d4edd",
  },
  {
    id: 2,
    title: "Percy Jackson",
    poster: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=225&fit=crop",
    rating: 4.7,
    comments: 38,
    color: "#0077b6",
  },
  {
    id: 3,
    title: "Shogun",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 52,
    color: "#c9184a",
  },
  {
    id: 4,
    title: "Echo",
    poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=225&fit=crop",
    rating: 4.3,
    comments: 14,
    color: "#e63946",
  },
  {
    id: 5,
    title: "What If...?",
    poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=225&fit=crop",
    rating: 4.5,
    comments: 27,
    color: "#0063e5",
  },
  {
    id: 6,
    title: "X-Men 97",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=225&fit=crop",
    rating: 4.8,
    comments: 41,
    color: "#f7d547",
  },
  {
    id: 7,
    title: "Taylor Swift: Eras Tour",
    poster: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 89,
    color: "#ff69b4",
  },
];

const newReleases = [
  {
    id: 1,
    title: "Skeleton Crew",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop",
    rating: 4.5,
    comments: 16,
    color: "#ff6b35",
  },
  {
    id: 2,
    title: "Elemental",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop",
    rating: 4.6,
    comments: 33,
    color: "#48cae4",
  },
  {
    id: 3,
    title: "Wish",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=225&fit=crop",
    rating: 4.2,
    comments: 12,
    color: "#9d4edd",
  },
  {
    id: 4,
    title: "Haunted Mansion",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop",
    rating: 4.1,
    comments: 9,
    color: "#22293a",
  },
  {
    id: 5,
    title: "Indiana Jones",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=225&fit=crop",
    rating: 4.4,
    comments: 29,
    color: "#bc6c25",
  },
  {
    id: 6,
    title: "The Little Mermaid",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop",
    rating: 4.5,
    comments: 35,
    color: "#0077b6",
  },
  {
    id: 7,
    title: "Guardians Vol. 3",
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=225&fit=crop",
    rating: 4.8,
    comments: 47,
    color: "#e63946",
  },
];

const originals = [
  {
    id: 1,
    title: "Loki Season 2",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 58,
    color: "#2d6a4f",
  },
  {
    id: 2,
    title: "Secret Invasion",
    poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=225&fit=crop",
    rating: 4.3,
    comments: 22,
    color: "#9d4edd",
  },
  {
    id: 3,
    title: "Ahsoka",
    poster: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop",
    rating: 4.7,
    comments: 41,
    color: "#ff6b35",
  },
  {
    id: 4,
    title: "Andor",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 63,
    color: "#22293a",
  },
  {
    id: 5,
    title: "Obi-Wan Kenobi",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop",
    rating: 4.6,
    comments: 37,
    color: "#0077b6",
  },
  {
    id: 6,
    title: "The Mandalorian",
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=225&fit=crop",
    rating: 4.9,
    comments: 72,
    color: "#bc6c25",
  },
  {
    id: 7,
    title: "Moon Knight",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop",
    rating: 4.5,
    comments: 31,
    color: "#f9f9f9",
  },
];

export default function MovieDirectory() {
  return (
    <div className="min-h-screen bg-[#0c111b]">
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
