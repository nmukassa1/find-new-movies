"use client";

import { Search, Home, Tv, Film, Plus, User } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0c111b] via-[#0c111b]/80 to-transparent">
      <div className="flex items-center justify-between px-9 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-[#f9f9f9]">STREAM</span>
            <span className="text-[#0063e5]">+</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="nav-item flex items-center gap-2 text-[#f9f9f9] opacity-80 hover:opacity-100 transition-opacity duration-200">
            <Home size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">Home</span>
          </a>
          <a href="#" className="nav-item flex items-center gap-2 text-[#f9f9f9] opacity-80 hover:opacity-100 transition-opacity duration-200">
            <Search size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">Search</span>
          </a>
          <a href="#" className="nav-item flex items-center gap-2 text-[#f9f9f9] opacity-80 hover:opacity-100 transition-opacity duration-200">
            <Plus size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">Watchlist</span>
          </a>
          <a href="#" className="nav-item flex items-center gap-2 text-[#f9f9f9] opacity-80 hover:opacity-100 transition-opacity duration-200">
            <Film size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">Movies</span>
          </a>
          <a href="#" className="nav-item flex items-center gap-2 text-[#f9f9f9] opacity-80 hover:opacity-100 transition-opacity duration-200">
            <Tv size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">Series</span>
          </a>
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#0063e5] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#f9f9f9] transition-all duration-200">
            <User size={20} className="text-[#f9f9f9]" />
          </div>
        </div>
      </div>
    </header>
  );
}
