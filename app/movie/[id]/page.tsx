import { Header } from "@/components/header";
import { MovieHero } from "@/components/movie-detail/movie-hero";
import { MovieInfo } from "@/components/movie-detail/movie-info";
import { CastSection } from "@/components/movie-detail/cast-section";
import { ExtrasSection } from "@/components/movie-detail/extras-section";
import { RelatedMovies } from "@/components/movie-detail/related-movies";

// Mock movie data - in a real app this would come from an API
const movieData: Record<string, {
  id: number;
  title: string;
  tagline: string;
  year: number;
  runtime: string;
  rating: string;
  genres: string[];
  imdbRating: number;
  rottenTomatoes: number;
  synopsis: string;
  director: string;
  writers: string[];
  studio: string;
  releaseDate: string;
  languages: string[];
  subtitles: string[];
  quality: string[];
  backdrop: string;
  poster: string;
  logo: string;
  cast: Array<{
    id: number;
    name: string;
    character: string;
    photo: string;
  }>;
  extras: Array<{
    id: number;
    title: string;
    type: string;
    duration: string;
    thumbnail: string;
  }>;
  related: Array<{
    id: number;
    title: string;
    poster: string;
    rating: number;
  }>;
}> = {
  "1": {
    id: 1,
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    year: 2024,
    runtime: "2h 46m",
    rating: "PG-13",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    imdbRating: 8.8,
    rottenTomatoes: 93,
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
    director: "Denis Villeneuve",
    writers: ["Denis Villeneuve", "Jon Spaihts"],
    studio: "Legendary Pictures",
    releaseDate: "March 1, 2024",
    languages: ["English", "Spanish", "French"],
    subtitles: ["English", "Spanish", "French", "German", "Italian", "Portuguese"],
    quality: ["4K Ultra HD", "HDR10", "Dolby Vision", "Dolby Atmos"],
    backdrop: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop",
    poster: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop",
    logo: "",
    cast: [
      { id: 1, name: "Timothée Chalamet", character: "Paul Atreides", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      { id: 2, name: "Zendaya", character: "Chani", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
      { id: 3, name: "Rebecca Ferguson", character: "Lady Jessica", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
      { id: 4, name: "Josh Brolin", character: "Gurney Halleck", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
      { id: 5, name: "Austin Butler", character: "Feyd-Rautha", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
      { id: 6, name: "Florence Pugh", character: "Princess Irulan", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
      { id: 7, name: "Dave Bautista", character: "Glossu Rabban", photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face" },
      { id: 8, name: "Christopher Walken", character: "Emperor Shaddam IV", photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face" },
    ],
    extras: [
      { id: 1, title: "The Making of Dune: Part Two", type: "Behind the Scenes", duration: "45:32", thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop" },
      { id: 2, title: "Creating the Sandworms", type: "Featurette", duration: "12:18", thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop" },
      { id: 3, title: "Denis Villeneuve Interview", type: "Interview", duration: "28:45", thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=225&fit=crop" },
      { id: 4, title: "Deleted Scenes", type: "Deleted Scenes", duration: "18:22", thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=225&fit=crop" },
    ],
    related: [
      { id: 10, title: "Dune (2021)", poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: 8.0 },
      { id: 11, title: "Blade Runner 2049", poster: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300&h=450&fit=crop", rating: 8.0 },
      { id: 12, title: "Arrival", poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop", rating: 7.9 },
      { id: 13, title: "Interstellar", poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop", rating: 8.7 },
      { id: 14, title: "The Martian", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=450&fit=crop", rating: 8.0 },
      { id: 15, title: "Avatar", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=450&fit=crop", rating: 7.9 },
      { id: 16, title: "Prometheus", poster: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=450&fit=crop", rating: 7.0 },
    ],
  },
};

// Default movie data for any ID
const defaultMovie = movieData["1"];

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = movieData[id] || defaultMovie;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero with backdrop */}
        <MovieHero movie={movie} />
        
        {/* Movie Info Section */}
        <MovieInfo movie={movie} />
        
        {/* Cast & Crew */}
        <CastSection cast={movie.cast} director={movie.director} writers={movie.writers} />
        
        {/* Extras */}
        <ExtrasSection extras={movie.extras} />
        
        {/* Related Movies */}
        <RelatedMovies movies={movie.related} />
      </main>
      
      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
