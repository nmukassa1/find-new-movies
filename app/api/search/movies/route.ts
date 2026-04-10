import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb/movie.service";

export const dynamic = "force-dynamic";

const MAX_QUERY_LEN = 120;
const MIN_QUERY_LEN = 1;

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("q");
  const q = typeof raw === "string" ? raw.trim() : "";

  if (q.length === 0) {
    return NextResponse.json({
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    });
  }

  if (q.length < MIN_QUERY_LEN) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  if (q.length > MAX_QUERY_LEN) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  try {
    const data = await searchMovies(q);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Search temporarily unavailable" },
      { status: 502 },
    );
  }
}
