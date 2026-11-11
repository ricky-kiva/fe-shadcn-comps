import { ArrowDownAZ, GripVertical } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { cn } from "@/lib/utils";

export function SortToggle({ className }: { className?: string }) {
  const { sortMode, toggleSortMode } = useGallery();
  const isAlphabetical = sortMode === "alphabetical";

  return (
    <button
      type="button"
      onClick={toggleSortMode}
      aria-label={`Sort mode: ${sortMode}. Click to toggle.`}
      title={isAlphabetical ? "Switch to Custom order" : "Switch to Alphabetical order"}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-sm border border-border bg-canvas px-2.5 text-xs font-medium text-foreground",
        "hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
        className
      )}
    >
      {isAlphabetical ? (
        <>
          <ArrowDownAZ className="h-3.5 w-3.5 text-neutral-400" />
          <span className="hidden sm:inline">Alphabetical</span>
        </>
      ) : (
        <>
          <GripVertical className="h-3.5 w-3.5 text-neutral-400" />
          <span className="hidden sm:inline">Custom</span>
        </>
      )}
    </button>
  );
}
