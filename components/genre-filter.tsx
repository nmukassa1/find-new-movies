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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
      <span className="text-xs text-white/40 whitespace-nowrap tracking-wide uppercase">
        Find by<br />genre
      </span>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre, index) => (
          <button
            key={genre.name}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-full text-sm text-white/70 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white/95 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/[0.1] group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <genre.icon className="w-4 h-4 text-white/40 transition-colors duration-300 group-hover:text-[#e8e8ed]" />
            <span className="font-medium">{genre.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
