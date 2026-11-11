import { cn } from "@/lib/utils";

export function BadgePreview() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center rounded-xs px-2 py-0.5 font-sans text-[11px] font-semibold transition-colors",
            "bg-foreground text-background shadow-xs"
          )}
        >
          Badge
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-xs px-2 py-0.5 font-sans text-[11px] font-semibold transition-colors",
            "border border-border bg-canvas-soft text-foreground"
          )}
        >
          Secondary
        </span>
      </div>
      <span
        className={cn(
          "inline-flex items-center rounded-xs px-2 py-0.5 font-mono text-[10px] font-medium transition-colors",
          "border border-border/80 text-neutral-400"
        )}
      >
        Outline
      </span>
    </div>
  );
}
