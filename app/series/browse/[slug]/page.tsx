import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MoviePosterCard } from "@/components/movie-poster-card";
import { BrowsePagination } from "@/components/browse-pagination";
import { filterEnglishMovies } from "@/lib/tmdb/movie.service";
import {
  fetchBrowseSeries,
  getSeriesBrowseTitle,
  isSeriesBrowseSlug,
  seriesBrowsePath,
} from "@/lib/series/browse-series";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSeriesBrowseSlug(slug)) {
    return { title: "Series" };
  }
  return {
    title: `${getSeriesBrowseTitle(slug)} — Series`,
  };
}

export default async function BrowseSeriesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  if (!isSeriesBrowseSlug(slug)) {
    notFound();
  }

  const sp = await searchParams;
  const raw = sp.page ?? "1";
  const parsed = parseInt(raw, 10);
  const page = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;

  const data = await fetchBrowseSeries(slug, page);
  if (data.total_pages > 0 && page > data.total_pages) {
    notFound();
  }
  const shows = filterEnglishMovies(data.results);
  const title = getSeriesBrowseTitle(slug);
  const listBase = seriesBrowsePath(slug);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16 px-8 lg:px-16">
        <h1 className="section-title text-foreground mb-8">{title}</h1>

        {shows.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No English-language titles on this page. Try another page.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
            {shows.map((show) => (
              <MoviePosterCard
                key={show.id}
                kind="series"
                show={show}
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
            basePath={listBase}
          />
        )}
      </main>
    </div>
  );
}
