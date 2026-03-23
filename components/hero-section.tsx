"use client";

import { Play, Download, Star, MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative rounded-[2rem] overflow-hidden h-[360px] bg-white/[0.02] border border-white/[0.06] group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} 
      />

      {/* Carousel Dots */}
      <div className="absolute top-6 left-6 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === 1 
                ? 'bg-white w-6' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 flex items-end justify-between w-full">
        <div className="space-y-4">
          <span className="text-xs text-white/50 tracking-[0.2em] uppercase font-medium">2025</span>
          <h1 className="text-4xl font-semibold text-white tracking-tight text-balance leading-tight">
            Dune: Part Two
          </h1>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <span className="flex items-center gap-2 transition-colors duration-300 hover:text-white/90">
              <Download className="w-4 h-4" />
              <span className="font-medium">243</span>
            </span>
            <span className="flex items-center gap-2 transition-colors duration-300 hover:text-white/90">
              <Star className="w-4 h-4 text-[#e8e8ed]" />
              <span className="font-medium">4.8 iMDB</span>
            </span>
            <span className="flex items-center gap-2 transition-colors duration-300 hover:text-white/90">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">18</span>
            </span>
          </div>
        </div>

        {/* Play Button */}
        <button className="w-20 h-20 bg-white/[0.08] backdrop-blur-xl rounded-[1.25rem] flex items-center justify-center border border-white/[0.1] transition-all duration-300 hover:bg-white/[0.15] hover:border-white/[0.2] hover:scale-105 group/play">
          <Play className="w-7 h-7 text-white fill-white ml-1 transition-transform duration-300 group-hover/play:scale-110" />
        </button>
      </div>
    </div>
  );
}
