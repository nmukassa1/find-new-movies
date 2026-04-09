import { notFound } from "next/navigation";
import { MoviePosterCard } from "@/components/movie-poster-card";
import { BrowsePagination } from "@/components/browse-pagination";
import {
  fetchBrowseMovies,
  getBrowseTitle,
  isBrowseSlug,
} from "@/lib/browse";
import { filterEnglishMovies } from "@/lib/tmdb/movie.service";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isBrowseSlug(slug)) {
    return { title: "Movies" };
  }
  return {
    title: `${getBrowseTitle(slug)} — Movies`,
  };
}

export default async function BrowseMoviesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  if (!isBrowseSlug(slug)) {
    notFound();
  }

  const sp = await searchParams;
  const raw = sp.page ?? "1";
  const parsed = parseInt(raw, 10);
  const page = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;

  const data = await fetchBrowseMovies(slug, page);
  if (data.total_pages > 0 && page > data.total_pages) {
    notFound();
  }
  const movies = filterEnglishMovies(data.results);
  const title = getBrowseTitle(slug);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16 px-8 lg:px-16">
        <h1 className="section-title text-foreground mb-8">{title}</h1>

        {movies.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No English-language titles on this page. Try another page.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
            {movies.map((movie) => (
              <MoviePosterCard
                key={movie.id}
                movie={movie}
                className="w-full max-w-[200px] justify-self-center"
              />
            ))}
          </div>
        )}

        {data.total_pages > 0 && (
          <BrowsePagination
            slug={slug}
            page={data.page}
            totalPages={data.total_pages}
          />
        )}
      </main>
    </div>
  );
}
