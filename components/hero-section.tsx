"use client";

import { Play, Download, Star, MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative rounded-3xl overflow-hidden h-[360px] bg-[#1a1a1a]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Carousel Dots */}
      <div className="absolute top-6 left-6 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-[#d4a853]" />
        <div className="w-2 h-2 rounded-full bg-white/40" />
        <div className="w-2 h-2 rounded-full bg-white/40" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 flex items-end justify-between w-full">
        <div>
          <span className="text-sm text-gray-300 mb-2 block">2025</span>
          <h1 className="text-4xl font-bold text-white mb-4 text-balance">Dune: Part Two</h1>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              243
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#d4a853]" />
              4.8 iMDB
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              18
            </span>
          </div>
        </div>

        {/* Play Button */}
        <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors group">
          <Play className="w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
