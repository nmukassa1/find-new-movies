"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Tv, Film, Plus, Menu } from "lucide-react";
import {
  HEADER_MOBILE_BAR_ICON_BUTTON_CLASSNAME,
  HEADER_MOBILE_SHEET_LINK_CLASSNAME,
} from "./constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function HeaderMobileMenu() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={HEADER_MOBILE_BAR_ICON_BUTTON_CLASSNAME}
        aria-expanded={sheetOpen}
        aria-controls="mobile-nav-sheet"
        aria-label="Open menu"
        onClick={() => setSheetOpen(true)}
      >
        <Menu className="size-6" strokeWidth={2} aria-hidden />
      </button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          id="mobile-nav-sheet"
          side="right"
          overlayClassName="z-[90] bg-black/50"
          className="z-[100] flex w-[min(100vw-1rem,20rem)] flex-col border-l sm:max-w-sm"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-lg">Menu</SheetTitle>
          </SheetHeader>
          <nav
            className="flex flex-col gap-1 px-2 pb-8"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className={HEADER_MOBILE_SHEET_LINK_CLASSNAME}
              onClick={() => setSheetOpen(false)}
            >
              <Home size={20} aria-hidden />
              <span className="text-sm font-medium uppercase tracking-wide">
                Home
              </span>
            </Link>
            <Link
              href="#"
              className={HEADER_MOBILE_SHEET_LINK_CLASSNAME}
              onClick={() => setSheetOpen(false)}
            >
              <Plus size={20} aria-hidden />
              <span className="text-sm font-medium uppercase tracking-wide">
                Watchlist
              </span>
            </Link>
            <Link
              href="#"
              className={HEADER_MOBILE_SHEET_LINK_CLASSNAME}
              onClick={() => setSheetOpen(false)}
            >
              <Film size={20} aria-hidden />
              <span className="text-sm font-medium uppercase tracking-wide">
                Movies
              </span>
            </Link>
            <Link
              href="#"
              className={HEADER_MOBILE_SHEET_LINK_CLASSNAME}
              onClick={() => setSheetOpen(false)}
            >
              <Tv size={20} aria-hidden />
              <span className="text-sm font-medium uppercase tracking-wide">
                Series
              </span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
