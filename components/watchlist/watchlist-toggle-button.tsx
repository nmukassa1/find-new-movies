"use client";

import { Check, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toggleWatchlistItemAction } from "@/lib/actions/watchlist";
import type { WatchlistSnapshotInput } from "@/lib/validations/watchlist";
import { cn } from "@/lib/utils";

export type WatchlistToggleButtonProps = {
  snapshot: WatchlistSnapshotInput;
  initialInWatchlist: boolean;
  isAuthenticatedServer: boolean;
  className?: string;
};

export function WatchlistToggleButton({
  snapshot,
  initialInWatchlist,
  isAuthenticatedServer,
  className,
}: WatchlistToggleButtonProps) {
  const { status } = useSession();
  const authenticated = isAuthenticatedServer || status === "authenticated";

  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setInWatchlist(initialInWatchlist);
  }, [initialInWatchlist]);

  const onToggle = useCallback(async () => {
    if (pending) return;
    setPending(true);
    const previous = inWatchlist;
    setInWatchlist(!previous);

    const payload: WatchlistSnapshotInput = {
      mediaType: snapshot.mediaType,
      tmdbId: snapshot.tmdbId,
      title: snapshot.title,
      posterUrl: snapshot.posterUrl,
      releaseYear: snapshot.releaseYear ?? null,
    };

    const result = await toggleWatchlistItemAction(payload);
    setPending(false);

    if (!result.ok) {
      setInWatchlist(previous);
      return;
    }
    setInWatchlist(result.inWatchlist);
  }, [
    pending,
    inWatchlist,
    snapshot.mediaType,
    snapshot.tmdbId,
    snapshot.title,
    snapshot.posterUrl,
    snapshot.releaseYear,
  ]);

  if (!authenticated) {
    return null;
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={onToggle}
      aria-pressed={inWatchlist}
      aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      className={cn(
        "flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm border-2 transition-all duration-200 group",
        inWatchlist
          ? "border-emerald-500/70 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:border-emerald-400/90"
          : "bg-muted/80 border-foreground/20 text-foreground hover:border-foreground/60",
        pending && "opacity-70",
        !pending && "hover:scale-[1.02] active:scale-[0.98]",
        className,
      )}
    >
      {inWatchlist ? (
        <Check
          className="w-6 h-6 transition-transform group-hover:scale-110"
          aria-hidden
        />
      ) : (
        <Plus
          className="w-6 h-6 transition-transform group-hover:scale-110"
          aria-hidden
        />
      )}
    </button>
  );
}
