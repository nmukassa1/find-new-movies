import { HeaderBrand } from "./header-brand";
import { HeaderDesktopNav } from "./header-desktop-nav";
import { HeaderProfile } from "./header-profile";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent">
      <div className="flex items-center justify-between px-9 py-4">
        <HeaderBrand />
        <HeaderDesktopNav />
        <HeaderProfile />
      </div>
    </header>
  );
}
