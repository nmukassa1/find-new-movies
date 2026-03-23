"use client";

import { Play, Star, MessageSquare } from "lucide-react";

const nowWatchingList = [
  {
    id: 1,
    title: "Pluribus",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=200&fit=crop",
    views: 123,
    rating: 4.8,
    comments: 18,
  },
  {
    id: 2,
    title: "His & Hers",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=200&fit=crop",
    views: 422,
    rating: 4.8,
    comments: 18,
    season: 8,
    episode: 4,
  },
  {
    id: 3,
    title: "Greenland 2",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
    views: 307,
    rating: 4.8,
    comments: 18,
  },
];

export function NowWatching() {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-medium text-white/90 tracking-tight">Now watching</h2>
      <div className="space-y-3">
        {nowWatchingList.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-3 bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1] cursor-pointer group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Thumbnail */}
            <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                <div className="w-8 h-8 rounded-full bg-white/[0.15] backdrop-blur-sm flex items-center justify-center border border-white/[0.1] transition-all duration-300 group-hover:bg-white/[0.25] group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute top-1.5 right-1.5 bg-white/[0.15] backdrop-blur-md text-[9px] text-white/90 px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/[0.1]">
                <Star className="w-2 h-2 fill-white/80" />
                {item.views}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center py-2 pr-3">
              <h3 className="text-sm font-medium text-white/90 mb-1.5 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
              {item.season && (
                <div className="flex gap-1.5 mb-1.5">
                  <span className="text-[9px] bg-white/[0.08] text-white/70 px-2 py-0.5 rounded-full border border-white/[0.06]">
                    {item.season} season
                  </span>
                  <span className="text-[9px] bg-white/[0.15] text-white/90 px-2 py-0.5 rounded-full border border-white/[0.1]">
                    {item.episode} episode
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 text-[10px] text-white/40">
                <span className="flex items-center gap-1 transition-colors duration-300 hover:text-white/60">
                  <Star className="w-2.5 h-2.5 text-[#e8e8ed]" />
                  {item.rating} iMDB
                </span>
                <span className="flex items-center gap-1 transition-colors duration-300 hover:text-white/60">
                  <MessageSquare className="w-2.5 h-2.5" />
                  {item.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
