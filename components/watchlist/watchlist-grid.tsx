import Link from "next/link";
import type { WatchlistItemRow } from "@/lib/services/watchlist/watchlist";
import { WatchlistRemoveButton } from "@/components/watchlist/watchlist-remove-button";

function detailHref(item: WatchlistItemRow): string {
  return item.mediaType === "TV"
    ? `/series/${item.tmdbId}`
    : `/movie/${item.tmdbId}`;
}

export function WatchlistGrid({ items }: { items: WatchlistItemRow[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-8 max-w-md text-foreground/70">
        Your watchlist is empty. Browse{" "}
        <Link href="/" className="text-foreground underline underline-offset-2">
          home
        </Link>{" "}
        and use the + button on a title to save it here.
      </p>
    );
  }

  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <li
          key={item.id}
          className="group relative rounded-lg border border-border/60 bg-card/40 overflow-hidden"
        >
          <Link
            href={detailHref(item)}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-t-lg"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
              <img
                src={item.posterUrl}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium leading-snug text-foreground line-clamp-2">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-foreground/60">
                {item.releaseYear && item.releaseYear > 0
                  ? item.releaseYear
                  : "—"}{" "}
                · {item.mediaType === "TV" ? "Series" : "Movie"}
              </p>
            </div>
          </Link>
          <div className="absolute right-1 top-1 z-10">
            <WatchlistRemoveButton
              mediaType={item.mediaType}
              tmdbId={item.tmdbId}
              className="bg-background/80 backdrop-blur-sm"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
