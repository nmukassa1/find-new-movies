import Link from "next/link";
import Image from "next/image";
import { TMDBMovie, TMDBTV } from "@/types/tmdb";
import { tmdbPosterSrc } from "@/lib/tmdb/tmdb-poster";
import { cn } from "@/lib/utils";

type MoviePosterCardProps = {
  className?: string;
  imageLoading?: "eager" | "lazy";
  onNavigate?: () => void;
} & (
  | { kind?: "movie"; movie: TMDBMovie }
  | { kind: "series"; show: TMDBTV }
);

export function MoviePosterCard(props: MoviePosterCardProps) {
  const {
    className,
    imageLoading = "lazy",
    onNavigate,
  } = props;

  const id =
    props.kind === "series" ? props.show.id : props.movie.id;
  const title =
    props.kind === "series" ? props.show.name : props.movie.title;
  const posterPath =
    props.kind === "series" ? props.show.poster_path : props.movie.poster_path;
  const voteAverage =
    props.kind === "series"
      ? props.show.vote_average
      : props.movie.vote_average;
  const href = props.kind === "series" ? `/series/${id}` : `/movie/${id}`;

  const posterSrc = tmdbPosterSrc(posterPath);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "disney-card flex-shrink-0 cursor-pointer rounded-lg overflow-hidden",
        className,
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-card">
        {posterSrc ? (
          <Image
            src={posterSrc}
            alt={title}
            className="w-full h-full object-cover"
            width={180}
            height={270}
            loading={imageLoading}
            sizes="(max-width: 1024px) 140px, 180px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-muted px-2 text-center text-xs text-muted-foreground"
            aria-hidden
          >
            No poster
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300" />
      </div>
      <div className="pt-3 pb-1">
        <h3 className="text-foreground text-sm font-medium truncate">
          {title}
        </h3>
        <div className="flex items-center gap-3 mt-1 text-xs text-foreground/50">
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {voteAverage.toFixed(1)} / 10
          </span>
        </div>
      </div>
    </Link>
  );
}
