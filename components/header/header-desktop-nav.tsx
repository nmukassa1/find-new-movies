import Link from "next/link";
import { Home, Tv, Film, Plus } from "lucide-react";
import { HEADER_NAV_ITEM_CLASSNAME } from "./constants";
import { SiteSearchDialog } from "./site-search-dialog";

export function HeaderDesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className={HEADER_NAV_ITEM_CLASSNAME}>
        <Home size={18} />
        <span className="text-[13px] font-medium tracking-wide uppercase">
          Home
        </span>
      </Link>
      <SiteSearchDialog />
      <Link href="#" className={HEADER_NAV_ITEM_CLASSNAME}>
        <Plus size={18} />
        <span className="text-[13px] font-medium tracking-wide uppercase">
          Watchlist
        </span>
      </Link>
      <Link href="#" className={HEADER_NAV_ITEM_CLASSNAME}>
        <Film size={18} />
        <span className="text-[13px] font-medium tracking-wide uppercase">
          Movies
        </span>
      </Link>
      <Link href="#" className={HEADER_NAV_ITEM_CLASSNAME}>
        <Tv size={18} />
        <span className="text-[13px] font-medium tracking-wide uppercase">
          Series
        </span>
      </Link>
    </nav>
  );
}
