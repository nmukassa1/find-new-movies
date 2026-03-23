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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Now watching</h2>
      <div className="space-y-3">
        {nowWatchingList.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#252525] transition-colors cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-28 h-20 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="absolute top-1 right-1 bg-[#8bc34a] text-[10px] text-white px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Star className="w-2 h-2 fill-white" />
                {item.views}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center py-2 pr-3">
              <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
              {item.season && (
                <div className="flex gap-1 mb-1">
                  <span className="text-[10px] bg-[#333] text-white px-1.5 py-0.5 rounded">
                    {item.season} season
                  </span>
                  <span className="text-[10px] bg-[#8bc34a] text-white px-1.5 py-0.5 rounded">
                    {item.episode} episode
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-[#d4a853]" />
                  {item.rating} iMDB
                </span>
                <span className="flex items-center gap-0.5">
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
