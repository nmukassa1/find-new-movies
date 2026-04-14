import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/watchlist");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 pb-16 pt-24 md:px-9 md:pt-28">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Watch List</h1>
      </main>
    </div>
  );
}
