"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HEADER_NAV_ITEM_CLASSNAME } from "./constants";

export function SiteSearchDialog() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        className={HEADER_NAV_ITEM_CLASSNAME}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-search-dialog"
      >
        <Search size={18} />
        <span className="text-[13px] font-medium tracking-wide uppercase cursor-pointer">
          Search
        </span>
      </button>
      <DialogContent
        id="site-search-dialog"
        fullscreen
        overlayClassName="z-[100] bg-background"
        showCloseButton
        className="z-[101] gap-6"
      >
        <DialogTitle className="sr-only">Search movies</DialogTitle>
        <div className="flex w-full min-w-0 flex-1 flex-col pt-8 md:pt-16">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search for movies…"
            autoComplete="off"
            className="h-12 text-base md:h-14 md:text-lg"
            aria-label="Search movies"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
