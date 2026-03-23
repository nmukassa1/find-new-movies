import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { NowWatching } from "@/components/now-watching";
import { GenreFilter } from "@/components/genre-filter";
import { MovieSection } from "@/components/movie-section";

const trendingMovies = [
  {
    id: 1,
    title: "Pluribus",
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#f7d547",
  },
  {
    id: 2,
    title: "Tron. Ares",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#e63946",
  },
  {
    id: 3,
    title: "The night manager",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#48cae4",
  },
  {
    id: 4,
    title: "His & Hers",
    poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#9d4edd",
  },
  {
    id: 5,
    title: "Avatar",
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#ff6b35",
  },
  {
    id: 6,
    title: "XXX",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#ff4500",
  },
  {
    id: 7,
    title: "Greenland 2",
    poster: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#2d6a4f",
  },
];

const newMovies = [
  {
    id: 1,
    title: "Marty Supreme",
    poster: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=300&h=450&fit=crop",
    rating: 3.1,
    comments: 18,
    color: "#c9184a",
  },
  {
    id: 2,
    title: "The Pitt",
    poster: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300&h=450&fit=crop",
    rating: 4.1,
    comments: 18,
    color: "#22223b",
  },
  {
    id: 3,
    title: "Pillon",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#0077b6",
  },
  {
    id: 4,
    title: "The Night Manager",
    poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300&h=450&fit=crop",
    rating: 3.2,
    comments: 18,
    color: "#023047",
  },
  {
    id: 5,
    title: "Tell me lies",
    poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#6b705c",
  },
  {
    id: 6,
    title: "The Night Manager",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#bc6c25",
  },
  {
    id: 7,
    title: "Tell me lies",
    poster: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=450&fit=crop",
    rating: 4.8,
    comments: 18,
    color: "#1d3557",
  },
];

export default function MovieDirectory() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <main className="px-6 lg:px-12 pb-12">
        {/* Hero and Now Watching Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <HeroSection />
          </div>
          <div className="w-full lg:w-80">
            <NowWatching />
          </div>
        </div>

        {/* Genre Filter */}
        <GenreFilter />

        {/* Trending Section */}
        <MovieSection title="Trending" movies={trendingMovies} />

        {/* New Section */}
        <MovieSection title="New" movies={newMovies} />
      </main>
    </div>
  );
}
