"use client";

import { Star, Check } from "lucide-react";
import { useState } from "react";

interface MovieInfoProps {
  movie: {
    synopsis: string;
    imdbRating: number;
    rottenTomatoes: number;
    studio: string;
    releaseDate: string;
    languages: string[];
    subtitles: string[];
    quality: string[];
  };
}

export function MovieInfo({ movie }: MovieInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="px-8 lg:px-16 py-8 bg-[#0c111b]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Synopsis and Ratings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ratings Bar */}
          <div className="flex flex-wrap items-center gap-6">
            {/* IMDB Rating */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1d29] rounded-lg">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-bold text-[#f9f9f9]">{movie.imdbRating}</span>
              </div>
              <span className="text-sm text-[#f9f9f9]/50">IMDB</span>
            </div>

            {/* Rotten Tomatoes */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1d29] rounded-lg">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">RT</span>
              </div>
              <span className="text-xl font-bold text-[#f9f9f9]">{movie.rottenTomatoes}%</span>
              <span className="text-sm text-[#f9f9f9]/50">Fresh</span>
            </div>

            {/* Quality Badges */}
            <div className="flex items-center gap-2">
              {movie.quality.slice(0, 2).map((q) => (
                <span
                  key={q}
                  className="px-3 py-1 bg-[#22293a] border border-[#f9f9f9]/10 rounded text-xs font-semibold text-[#f9f9f9]/80"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#f9f9f9]">Synopsis</h2>
            <p className={`text-[#f9f9f9]/70 leading-relaxed ${!isExpanded ? "line-clamp-3" : ""}`}>
              {movie.synopsis}
            </p>
            {movie.synopsis.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#0063e5] hover:text-[#0080ff] text-sm font-medium transition-colors"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-6">
          <div className="p-6 bg-[#1a1d29] rounded-lg space-y-4">
            {/* Studio */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-1">Studio</h3>
              <p className="text-[#f9f9f9]">{movie.studio}</p>
            </div>

            {/* Release Date */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-1">Release Date</h3>
              <p className="text-[#f9f9f9]">{movie.releaseDate}</p>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-1">Audio</h3>
              <div className="flex flex-wrap gap-2">
                {movie.languages.map((lang) => (
                  <span
                    key={lang}
                    className="flex items-center gap-1 text-sm text-[#f9f9f9]/70"
                  >
                    <Check className="w-3 h-3 text-green-500" />
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtitles */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-1">Subtitles</h3>
              <p className="text-sm text-[#f9f9f9]/70">
                {movie.subtitles.join(", ")}
              </p>
            </div>

            {/* Video Quality */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-1">Video</h3>
              <div className="flex flex-wrap gap-2">
                {movie.quality.map((q) => (
                  <span
                    key={q}
                    className="px-2 py-1 bg-[#22293a] rounded text-xs text-[#f9f9f9]/70"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
