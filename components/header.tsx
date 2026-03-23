"use client";

import { Search, MessageSquare, Bell, ChevronDown, Flame } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-12 py-5 bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="text-[#e8e8ed] font-semibold text-lg tracking-wider transition-all duration-300 group-hover:text-white">
            <span className="text-[10px] tracking-[0.35em] block opacity-70 group-hover:opacity-100 transition-opacity duration-300">MOVIE</span>
            <span className="text-[10px] tracking-[0.35em] opacity-70 group-hover:opacity-100 transition-opacity duration-300">GATHER</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <a
            href="#"
            className="flex items-center gap-2 text-white/90 text-sm font-medium px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] transition-all duration-300 hover:bg-white/[0.12] hover:border-white/[0.15]"
          >
            <Flame className="w-4 h-4 text-[#e8e8ed]" />
            BOARD
          </a>
          <a href="#" className="text-white/50 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-white/90 hover:bg-white/[0.05]">
            NEW
          </a>
          <a href="#" className="text-white/50 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-white/90 hover:bg-white/[0.05]">
            MOVIES
          </a>
          <a href="#" className="text-white/50 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-white/90 hover:bg-white/[0.05]">
            SERIES
          </a>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-white/[0.05] backdrop-blur-xl rounded-full px-4 py-2.5 gap-2.5 border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.12] focus-within:bg-white/[0.08] focus-within:border-white/[0.15]">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-white/90 placeholder-white/30 outline-none w-28 focus:w-36 transition-all duration-300"
          />
        </div>

        {/* Icons */}
        <button className="p-2.5 text-white/40 rounded-full transition-all duration-300 hover:text-white/90 hover:bg-white/[0.05]">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-2.5 text-white/40 rounded-full transition-all duration-300 hover:text-white/90 hover:bg-white/[0.05] relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#e8e8ed] rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-white/[0.05] backdrop-blur-xl rounded-full pl-1.5 pr-4 py-1.5 border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.12] cursor-pointer group">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/[0.1] group-hover:ring-white/[0.2] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white/90 leading-tight">Lee Phong</p>
            <p className="text-[10px] text-white/40 tracking-wide">Premium</p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors duration-300" />
        </div>
      </div>
    </header>
  );
}
