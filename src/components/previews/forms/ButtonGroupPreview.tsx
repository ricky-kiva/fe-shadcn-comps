import * as React from "react";
import { cn } from "@/lib/utils";

export function ButtonGroupPreview() {
  const [active, setActive] = React.useState<"left" | "mid" | "right">("left");

  return (
    <div className="inline-flex rounded-sm border border-border bg-canvas overflow-hidden divide-x divide-border shadow-xs">
      <button
        type="button"
        onClick={() => setActive("left")}
        className={cn(
          "h-7 px-2.5 font-sans text-xs font-medium transition-colors",
          active === "left"
            ? "bg-canvas-soft text-foreground font-semibold"
            : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/50"
        )}
      >
        Left
      </button>
      <button
        type="button"
        onClick={() => setActive("mid")}
        className={cn(
          "h-7 px-2.5 font-sans text-xs font-medium transition-colors",
          active === "mid"
            ? "bg-canvas-soft text-foreground font-semibold"
            : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/50"
        )}
      >
        Middle
      </button>
      <button
        type="button"
        onClick={() => setActive("right")}
        className={cn(
          "h-7 px-2.5 font-sans text-xs font-medium transition-colors",
          active === "right"
            ? "bg-canvas-soft text-foreground font-semibold"
            : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/50"
        )}
      >
        Right
      </button>
    </div>
  );
}
