"use client";

import { Play, ChevronLeft, ChevronRight } from "lucide-react";

interface Extra {
  id: string;
  title: string;
  type: string;
  duration: string;
  thumbnail: string;
}

interface ExtrasSectionProps {
  extras: Extra[];
}

export function ExtrasSection({ extras }: ExtrasSectionProps) {
  if (extras.length === 0) return null;

  return (
    <section className="px-8 lg:px-16 py-8 bg-background">
      {/* Header */}
      <div className="mb-4">
        <h2 className="section-title text-foreground">Extras</h2>
      </div>

      {/* Extras Carousel */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {extras.map((extra) => (
          <div
            key={extra.id}
            className="flex-shrink-0 w-[280px] lg:w-[320px] cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-card mb-3">
              <img
                src={extra.thumbnail}
                alt={extra.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-foreground font-medium">
                {extra.duration}
              </div>

              {/* Type badge */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-primary rounded text-xs text-primary-foreground font-medium">
                {extra.type}
              </div>
            </div>

            {/* Info */}
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {extra.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
