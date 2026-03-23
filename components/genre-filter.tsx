"use client";

import { Swords, Smile, Building2, Drama, Tv, Sparkles, Music, Film } from "lucide-react";

const genres = [
  { name: "Action", icon: Swords },
  { name: "Comedy", icon: Smile },
  { name: "Hystorical", icon: Building2 },
  { name: "Drama", icon: Drama },
  { name: "Sci fi", icon: Tv },
  { name: "Fantasy", icon: Sparkles },
  { name: "Musicle", icon: Music },
  { name: "Documentary", icon: Film },
];

export function GenreFilter() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      <span className="text-sm text-gray-400 whitespace-nowrap">
        Find by<br />genre
      </span>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.name}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-full text-sm text-white hover:bg-[#252525] hover:border-[#d4a853] transition-colors"
          >
            <genre.icon className="w-4 h-4" />
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
