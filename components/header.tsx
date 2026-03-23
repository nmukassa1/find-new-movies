"use client";

import { Search, MessageSquare, Bell, ChevronDown, Flame } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-12 py-4 bg-[#0a0a0a]">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="text-[#d4a853] font-bold text-lg tracking-wider">
            <span className="text-xs tracking-[0.3em] block">MOVIE</span>
            <span className="text-xs tracking-[0.3em]">GATHER</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-white text-sm font-medium border-b-2 border-[#d4a853] pb-1"
          >
            <Flame className="w-4 h-4 text-[#d4a853]" />
            BOARD
          </a>
          <a href="#" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
            NEW
          </a>
          <a href="#" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
            MOVIES
          </a>
          <a href="#" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
            SERIES
          </a>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-[#1a1a1a] rounded-full px-4 py-2 gap-2 border border-[#333]">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-32"
          />
        </div>

        {/* Icons */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-full pl-1 pr-3 py-1 border border-[#333]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-tight">Lee Phong</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
