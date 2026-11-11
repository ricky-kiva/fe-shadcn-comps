import * as React from "react";
import { SlidersHorizontal, RotateCcw, FilterX } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { cn } from "@/lib/utils";

export function SettingsDropdown({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { resetOrder, resetFilter } = useGallery();

  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Settings and layout actions"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-canvas text-foreground",
          "hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
          isOpen && "bg-canvas-soft border-neutral-400 dark:border-neutral-600"
        )}
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400 hover:text-foreground" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            "absolute right-0 mt-1.5 w-56 rounded-sm border border-border bg-canvas p-1 text-xs text-foreground",
            "shadow-stacked z-50 animate-in fade-in duration-150"
          )}
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              resetOrder();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-xs px-2.5 py-1.5 text-left hover:bg-canvas-soft transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
            <span>Reset Custom Order</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              resetFilter();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-xs px-2.5 py-1.5 text-left hover:bg-canvas-soft transition-colors"
          >
            <FilterX className="h-3.5 w-3.5 text-neutral-400" />
            <span>Reset Component Filter</span>
          </button>
        </div>
      )}
    </div>
  );
}
