import logoUrl from "@/assets/logo-1-1.png";
import { ComponentFilter } from "./ComponentFilter";
import { SortToggle } from "./SortToggle";
import { ThemeToggle } from "./ThemeToggle";
import { SettingsDropdown } from "./SettingsDropdown";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Branding */}
        <div className="flex items-center gap-2.5">
          <img
            src={logoUrl}
            alt="SHADCN Explorer Logo"
            className="h-6 w-6 rounded-xs border border-border object-contain"
          />
          <span className="font-sans text-sm font-semibold tracking-tight text-foreground">
            SHADCN Explorer
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <SortToggle />
          <ComponentFilter />
          <ThemeToggle />
          <SettingsDropdown />
        </div>
      </div>
    </header>
  );
}
