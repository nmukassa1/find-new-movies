"use client";

import { Search, Home, Tv, Film, Plus, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent">
      <div className="flex items-center justify-between px-9 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">STREAM</span>
            <span className="text-primary">+</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="nav-item flex items-center gap-2 text-foreground opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Home size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">
              Home
            </span>
          </Link>
          <Link
            href="#"
            className="nav-item flex items-center gap-2 text-foreground opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Search size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">
              Search
            </span>
          </Link>
          <Link
            href="#"
            className="nav-item flex items-center gap-2 text-foreground opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Plus size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">
              Watchlist
            </span>
          </Link>
          <Link
            href="#"
            className="nav-item flex items-center gap-2 text-foreground opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Film size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">
              Movies
            </span>
          </Link>
          <Link
            href="#"
            className="nav-item flex items-center gap-2 text-foreground opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Tv size={18} />
            <span className="text-[13px] font-medium tracking-wide uppercase">
              Series
            </span>
          </Link>
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-foreground transition-all duration-200">
            <User size={20} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
