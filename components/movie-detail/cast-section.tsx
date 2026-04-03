"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CastMember {
  id: number;
  name: string;
  character: string;
  photo: string;
}

interface CastSectionProps {
  cast: CastMember[];
  director: string;
  writers: string[];
}

export function CastSection({ cast, director, writers }: CastSectionProps) {
  return (
    <section className="px-8 lg:px-16 py-8 bg-[#0c111b]">
      {/* Director & Writers */}
      <div className="flex flex-wrap gap-8 mb-8 pb-6 border-b border-[#2a3144]">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-2">Director</h3>
          <p className="text-[#f9f9f9] font-medium hover:text-[#0063e5] cursor-pointer transition-colors">
            {director}
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[#f9f9f9]/40 mb-2">Writers</h3>
          <p className="text-[#f9f9f9]">
            {writers.map((writer, index) => (
              <span key={writer}>
                <span className="hover:text-[#0063e5] cursor-pointer transition-colors">
                  {writer}
                </span>
                {index < writers.length - 1 && <span className="text-[#f9f9f9]/40">, </span>}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Cast Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-[#f9f9f9]">Cast & Crew</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-[#22293a] hover:bg-[#2a3144] flex items-center justify-center transition-all duration-200 group">
            <ChevronLeft className="w-5 h-5 text-[#f9f9f9]/50 group-hover:text-[#f9f9f9]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#22293a] hover:bg-[#2a3144] flex items-center justify-center transition-all duration-200 group">
            <ChevronRight className="w-5 h-5 text-[#f9f9f9]/50 group-hover:text-[#f9f9f9]" />
          </button>
        </div>
      </div>

      {/* Cast Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {cast.map((member) => (
          <div
            key={member.id}
            className="flex-shrink-0 w-[140px] cursor-pointer group"
          >
            {/* Photo */}
            <div className="relative w-full aspect-square overflow-hidden rounded-full mb-3 bg-[#1a1d29] border-2 border-transparent group-hover:border-[#f9f9f9]/40 transition-all duration-300">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Info */}
            <div className="text-center">
              <h3 className="text-sm font-medium text-[#f9f9f9] truncate group-hover:text-[#0063e5] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-[#f9f9f9]/50 truncate mt-1">
                {member.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
