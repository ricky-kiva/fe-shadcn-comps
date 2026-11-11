import { cn } from "@/lib/utils";

export function ButtonPreview() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={cn(
            "h-7 px-3 rounded-sm font-sans text-xs font-medium transition-colors",
            "bg-foreground text-background hover:bg-foreground/90 shadow-xs"
          )}
        >
          Action
        </button>
        <button
          type="button"
          className={cn(
            "h-7 px-3 rounded-sm font-sans text-xs font-medium transition-colors",
            "border border-border bg-canvas text-foreground hover:bg-canvas-soft"
          )}
        >
          Secondary
        </button>
      </div>
      <button
        type="button"
        className={cn(
          "h-6 px-2.5 rounded-sm font-mono text-[11px] font-medium transition-colors",
          "text-neutral-400 hover:text-foreground hover:bg-canvas-soft"
        )}
      >
        Ghost
      </button>
    </div>
  );
}
