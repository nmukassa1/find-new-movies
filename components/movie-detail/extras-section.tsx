"use client";

import { useCallback, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Extra {
  id: string;
  title: string;
  type: string;
  duration: string;
  thumbnail: string;
  youtubeKey: string;
}

interface ExtrasSectionProps {
  extras: Extra[];
}

function youtubeExtraEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    controls: "1",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function ExtrasSection({ extras }: ExtrasSectionProps) {
  const [active, setActive] = useState<Extra | null>(null);

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) setActive(null);
  }, []);

  if (extras.length === 0) return null;

  return (
    <section className="px-8 lg:px-16 py-8 bg-background">
      <div className="mb-4">
        <h2 className="section-title text-foreground">Extras</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {extras.map((extra) => (
          <button
            key={extra.id}
            type="button"
            onClick={() => setActive(extra)}
            className="flex-shrink-0 w-[280px] lg:w-[320px] cursor-pointer group border-0 bg-transparent p-0 text-left"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-card mb-3">
              <img
                src={extra.thumbnail}
                alt={extra.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
                </div>
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-foreground font-medium">
                {extra.duration}
              </div>

              <div className="absolute top-2 left-2 px-2 py-1 bg-primary rounded text-xs text-primary-foreground font-medium">
                {extra.type}
              </div>
            </div>

            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {extra.title}
            </h3>
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton
          className={cn(
            "z-[100] max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0 sm:max-w-5xl",
          )}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{active?.title ?? "Extra"}</DialogTitle>
          </DialogHeader>
          {active ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={active.youtubeKey}
                title={active.title}
                src={youtubeExtraEmbedSrc(active.youtubeKey)}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
