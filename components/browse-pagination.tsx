import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrowsePaginationProps = {
  slug: string;
  page: number;
  totalPages: number;
  /** Base path without trailing slash, e.g. `/browse/popular` or `/series/browse/popular` */
  basePath?: string;
};

export function BrowsePagination({
  slug,
  page,
  totalPages,
  basePath,
}: BrowsePaginationProps) {
  const base = basePath ?? `/browse/${slug}`;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <Pagination className="mt-12 border-t border-border pt-8">
      <PaginationContent className="flex flex-wrap items-center justify-center gap-4">
        <PaginationItem>
          {canPrev ? (
            <Link
              href={`${base}?page=${page - 1}`}
              aria-label="Go to previous page"
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 px-2.5 sm:pl-2.5",
              )}
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </Link>
          ) : (
            <span
              aria-disabled
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "pointer-events-none gap-1 px-2.5 opacity-40 sm:pl-2.5",
              )}
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </span>
          )}
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm text-muted-foreground tabular-nums">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          {canNext ? (
            <Link
              href={`${base}?page=${page + 1}`}
              aria-label="Go to next page"
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 px-2.5 sm:pr-2.5",
              )}
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </Link>
          ) : (
            <span
              aria-disabled
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "pointer-events-none gap-1 px-2.5 opacity-40 sm:pr-2.5",
              )}
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
