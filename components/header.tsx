"use client";

import { Search, MessageSquare, Bell, ChevronDown, Flame } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-12 py-5 bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="text-[#1a1a1f] font-semibold text-lg tracking-wider transition-all duration-300 group-hover:text-black">
            <span className="text-[10px] tracking-[0.35em] block opacity-60 group-hover:opacity-100 transition-opacity duration-300">MOVIE</span>
            <span className="text-[10px] tracking-[0.35em] opacity-60 group-hover:opacity-100 transition-opacity duration-300">GATHER</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <a
            href="#"
            className="flex items-center gap-2 text-[#1a1a1f] text-sm font-medium px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-black/[0.06] shadow-sm transition-all duration-300 hover:bg-white/90 hover:border-black/[0.1] hover:shadow-md"
          >
            <Flame className="w-4 h-4 text-[#1a1a1f]" />
            BOARD
          </a>
          <a href="#" className="text-[#1a1a1f]/50 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-[#1a1a1f] hover:bg-black/[0.03]">
            NEW
          </a>
          <a href="#" className="text-[#1a1a1f]/50 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-[#1a1a1f] hover:bg-black/[0.03]">
            MOVIES
          </a>
          <a href="#" className="text-[#1a1a1f]/50 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-[#1a1a1f] hover:bg-black/[0.03]">
            SERIES
          </a>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-white/60 backdrop-blur-xl rounded-full px-4 py-2.5 gap-2.5 border border-black/[0.06] shadow-sm transition-all duration-300 hover:bg-white/80 hover:border-black/[0.08] hover:shadow-md focus-within:bg-white/90 focus-within:border-black/[0.1] focus-within:shadow-md">
          <Search className="w-4 h-4 text-[#1a1a1f]/40" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-[#1a1a1f] placeholder-[#1a1a1f]/30 outline-none w-28 focus:w-36 transition-all duration-300"
          />
        </div>

        {/* Icons */}
        <button className="p-2.5 text-[#1a1a1f]/40 rounded-full transition-all duration-300 hover:text-[#1a1a1f] hover:bg-black/[0.03]">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-2.5 text-[#1a1a1f]/40 rounded-full transition-all duration-300 hover:text-[#1a1a1f] hover:bg-black/[0.03] relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#1a1a1f] rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-xl rounded-full pl-1.5 pr-4 py-1.5 border border-black/[0.06] shadow-sm transition-all duration-300 hover:bg-white/80 hover:border-black/[0.08] hover:shadow-md cursor-pointer group">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-black/[0.06] group-hover:ring-black/[0.1] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#1a1a1f] leading-tight">Lee Phong</p>
            <p className="text-[10px] text-[#1a1a1f]/40 tracking-wide">Premium</p>
          </div>
          <ChevronDown className="w-4 h-4 text-[#1a1a1f]/30 group-hover:text-[#1a1a1f]/50 transition-colors duration-300" />
        </div>
      </div>
    </header>
  );
}
