import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaginationPreview() {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className="flex items-center gap-1 font-mono text-xs"
    >
      <button
        type="button"
        aria-label="Go to previous page"
        className="flex h-6 items-center gap-1 rounded-xs border border-border bg-canvas px-1.5 text-neutral-400 hover:text-foreground hover:bg-canvas-soft transition-colors"
      >
        <ChevronLeft className="h-3 w-3" />
        <span className="font-sans text-[10px]">Previous</span>
      </button>

      <span
        aria-current="page"
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-xs font-semibold text-[11px]",
          "border border-foreground bg-foreground text-background shadow-xs"
        )}
      >
        1
      </span>

      <span className="flex h-6 w-6 items-center justify-center rounded-xs text-neutral-400 text-[11px] hover:bg-canvas-soft transition-colors cursor-pointer">
        2
      </span>

      <button
        type="button"
        aria-label="Go to next page"
        className="flex h-6 items-center gap-1 rounded-xs border border-border bg-canvas px-1.5 text-neutral-400 hover:text-foreground hover:bg-canvas-soft transition-colors"
      >
        <span className="font-sans text-[10px]">Next</span>
        <ChevronRight className="h-3 w-3" />
      </button>
    </nav>
  );
}
