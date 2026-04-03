"use client";

import { Play, Plus, Users, Info } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 lg:p-16 max-w-2xl">
        {/* Logo/Title Treatment */}
        <div className="mb-6">
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=150&fit=crop"
            alt="Movie Title"
            className="h-24 lg:h-32 object-contain mb-4 hidden"
          />
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground tracking-tight mb-2">
            Dune: Part Two
          </h1>
          <p className="text-sm text-foreground/70 font-medium tracking-wide">
            2024 &bull; 2h 46m &bull; PG-13 &bull; Action, Adventure, Sci-Fi
          </p>
        </div>

        {/* Description */}
        <p className="text-foreground/80 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3">
          Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 bg-foreground hover:bg-foreground-cta-hover text-background font-semibold px-8 py-4 rounded-[4px] transition-all duration-200 uppercase text-sm tracking-wider">
            <Play size={20} className="fill-background" />
            Play
          </button>
          <button className="flex items-center gap-3 bg-foreground/20 hover:bg-foreground/30 border-2 border-foreground text-foreground font-semibold px-8 py-4 rounded-[4px] transition-all duration-200 uppercase text-sm tracking-wider">
            <Plus size={20} />
            Watchlist
          </button>
          <button className="w-12 h-12 rounded-full border-2 border-foreground bg-background/60 hover:bg-foreground/20 flex items-center justify-center transition-all duration-200">
            <Users size={20} className="text-foreground" />
          </button>
          <button className="w-12 h-12 rounded-full border-2 border-foreground bg-background/60 hover:bg-foreground/20 flex items-center justify-center transition-all duration-200">
            <Info size={20} className="text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
