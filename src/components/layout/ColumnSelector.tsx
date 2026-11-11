import { Minus, Plus, Columns3 } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";
import { cn } from "@/lib/utils";

export function ColumnSelector({ className }: { className?: string }) {
  const { gridColumns, maxColumns, incrementColumns, decrementColumns } =
    useGallery();

  const isMin = gridColumns <= 1;
  const isMax = gridColumns >= maxColumns;

  return (
    <div
      className={cn(
        "inline-flex h-8 items-center rounded-sm border border-border bg-canvas shadow-xs divide-x divide-border/60",
        className
      )}
    >
      <button
        type="button"
        onClick={decrementColumns}
        disabled={isMin}
        aria-label="Decrease columns"
        title="Decrease columns"
        className={cn(
          "flex h-8 w-7 items-center justify-center text-neutral-400 transition-colors",
          isMin
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-canvas-soft hover:text-foreground cursor-pointer"
        )}
      >
        <Minus className="h-3 w-3" />
      </button>

      <div className="flex items-center gap-1 px-2 font-mono text-xs text-foreground select-none">
        <Columns3 className="h-3 w-3 text-neutral-400 hidden sm:inline" />
        <span className="font-semibold">{gridColumns}</span>
        <span className="text-[10px] text-neutral-400">
          {gridColumns === 1 ? "col" : "cols"}
        </span>
      </div>

      <button
        type="button"
        onClick={incrementColumns}
        disabled={isMax}
        aria-label="Increase columns"
        title="Increase columns"
        className={cn(
          "flex h-8 w-7 items-center justify-center text-neutral-400 transition-colors",
          isMax
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-canvas-soft hover:text-foreground cursor-pointer"
        )}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
