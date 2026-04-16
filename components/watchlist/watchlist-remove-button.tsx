"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeWatchlistItemAction } from "@/lib/actions/watchlist";
import type { WatchlistMediaType } from "@/lib/services/watchlist/watchlist";
import { cn } from "@/lib/utils";

export function WatchlistRemoveButton({
  mediaType,
  tmdbId,
  className,
}: {
  mediaType: WatchlistMediaType;
  tmdbId: number;
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        const result = await removeWatchlistItemAction(mediaType, tmdbId);
        setPending(false);
        if (result.ok) {
          router.refresh();
        }
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-2 text-foreground/70 transition-colors hover:bg-destructive/15 hover:text-destructive",
        pending && "opacity-50",
        className,
      )}
      aria-label="Remove from watchlist"
    >
      <Trash2 className="h-4 w-4" aria-hidden />
    </button>
  );
}
