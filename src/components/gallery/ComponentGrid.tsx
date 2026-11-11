import * as React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { CORE_COMPONENTS } from "@/data/components";
import { ComponentCard } from "./ComponentCard";
import { cn } from "@/lib/utils";

export function ComponentGrid({ className }: { className?: string }) {
  const { selectedComponents, searchQuery, sortMode, resetFilter } = useGallery();

  const filteredComponents = React.useMemo(() => {
    let list = [...CORE_COMPONENTS];

    // Checkbox filter: if active, show only selected components
    if (selectedComponents.length > 0) {
      list = list.filter((name) => selectedComponents.includes(name));
    }

    // Search query filter (if active)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((name) => name.toLowerCase().includes(q));
    }

    if (sortMode === "alphabetical") {
      list.sort((a, b) => a.localeCompare(b));
    }

    return list;
  }, [selectedComponents, searchQuery, sortMode]);

  if (filteredComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-canvas-soft text-neutral-400 mb-3">
          <SearchX className="h-5 w-5" />
        </div>
        <h3 className="font-sans text-sm font-semibold text-foreground">
          No components found
        </h3>
        <p className="mt-1 font-sans text-xs text-neutral-400 max-w-xs">
          No components match your active filters.
        </p>
        <button
          type="button"
          onClick={resetFilter}
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 rounded-sm border border-border bg-canvas px-3 py-1.5",
            "font-mono text-xs text-foreground hover:bg-canvas-soft transition-colors"
          )}
        >
          <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
          <span>Reset filter</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
        "gap-px bg-border border-b border-border",
        className
      )}
    >
      {filteredComponents.map((name) => (
        <ComponentCard
          key={name}
          id={name.toLowerCase().replace(/\s+/g, "-")}
          name={name}
          isDraggable={sortMode === "custom"}
        />
      ))}
    </div>
  );
}
