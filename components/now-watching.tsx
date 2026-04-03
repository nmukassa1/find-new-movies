"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const continueWatching = [
  {
    id: 1,
    title: "Loki",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=225&fit=crop",
    progress: 65,
  },
  {
    id: 2,
    title: "The Mandalorian",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=225&fit=crop",
    progress: 30,
  },
  {
    id: 3,
    title: "WandaVision",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop",
    progress: 80,
  },
  {
    id: 4,
    title: "The Falcon",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop",
    progress: 45,
  },
  {
    id: 5,
    title: "Moon Knight",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop",
    progress: 20,
  },
];

export function NowWatching() {
  return (
    <section className="mb-8 px-8 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-foreground">Continue Watching</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-muted hover:bg-border flex items-center justify-center transition-all duration-200 group">
            <ChevronLeft className="w-5 h-5 text-foreground/50 group-hover:text-foreground" />
          </button>
          <button className="w-8 h-8 rounded-full bg-muted hover:bg-border flex items-center justify-center transition-all duration-200 group">
            <ChevronRight className="w-5 h-5 text-foreground/50 group-hover:text-foreground" />
          </button>
        </div>
      </div>

      {/* Continue Watching Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {continueWatching.map((item) => (
          <div
            key={item.id}
            className="disney-card flex-shrink-0 w-[200px] lg:w-[240px] cursor-pointer rounded-[4px] overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-card">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/30">
                <div 
                  className="h-full bg-foreground"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
