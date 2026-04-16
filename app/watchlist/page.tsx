import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { WatchlistGrid } from "@/components/watchlist/watchlist-grid";
import { authOptions } from "@/lib/auth/options";
import { listWatchlistItems } from "@/lib/services/watchlist/watchlist";

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/watchlist");
  }

  const items = await listWatchlistItems(session.user.id);

  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 pb-16 pt-24 md:px-9 md:pt-28">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Watchlist
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Newest saved first.
        </p>
        <WatchlistGrid items={items} />
      </main>
    </div>
  );
}
