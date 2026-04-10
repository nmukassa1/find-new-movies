import { HeaderBrand } from "./header-brand";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { HeaderNav } from "./header-nav";
import { HeaderProfile } from "./header-profile";
import { SiteSearchDialog } from "./site-search-dialog";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent">
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-9">
        <HeaderBrand />
        <HeaderNav />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 md:hidden">
            <SiteSearchDialog variant="iconOnly" />
            <HeaderMobileMenu />
          </div>
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
