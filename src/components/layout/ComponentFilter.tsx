import * as React from "react";
import { Search, X } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { cn } from "@/lib/utils";

export function ComponentFilter({ className }: { className?: string }) {
  const { searchQuery, setSearchQuery, resetFilter } = useGallery();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      resetFilter();
      inputRef.current?.blur();
    }
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Search
        className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-neutral-400"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Filter components..."
        aria-label="Filter components by name"
        className={cn(
          "h-8 w-36 sm:w-48 rounded-sm border border-border bg-canvas pl-8 pr-7 text-xs text-foreground",
          "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600",
          "transition-colors"
        )}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => {
            resetFilter();
            inputRef.current?.focus();
          }}
          aria-label="Clear filter"
          className="absolute right-2 flex h-4 w-4 items-center justify-center rounded-sm text-neutral-400 hover:text-foreground"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
