import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { WatchlistGrid } from "@/components/watchlist/watchlist-grid";
import { WatchlistPagination } from "@/components/watchlist/watchlist-pagination";
import { authOptions } from "@/lib/auth/options";
import {
  listWatchlistItemsPage,
  WATCHLIST_PAGE_SIZE,
} from "@/lib/services/watchlist/watchlist";

function parsePage(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) {
    return 1;
  }
  return Math.floor(n);
}

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function WatchlistPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/watchlist");
  }

  const { page: pageParam } = await searchParams;
  const requestedPage = parsePage(pageParam);

  const { items, total, page, totalPages } = await listWatchlistItemsPage(
    session.user.id,
    requestedPage,
    WATCHLIST_PAGE_SIZE,
  );

  if (total > 0 && page !== requestedPage) {
    redirect(page === 1 ? "/watchlist" : `/watchlist?page=${page}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 pb-16 pt-24 md:px-9 md:pt-28">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Watchlist
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Newest saved first
          {total > 0 ? (
            <span className="text-foreground/50">
              {" "}
              · {total} {total === 1 ? "title" : "titles"}
            </span>
          ) : null}
        </p>
        <WatchlistGrid items={items} />
        <WatchlistPagination page={page} totalPages={totalPages} />
      </main>
    </div>
  );
}
