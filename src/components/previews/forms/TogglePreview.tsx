import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function TogglePreview() {
  const [pressed, setPressed] = React.useState<boolean>(true);

  return (
    <div className="flex items-center gap-2">
      <TogglePrimitive.Root
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle favorite"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-xs transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground",
          "data-[state=on]:bg-canvas-soft data-[state=on]:text-foreground data-[state=on]:border-foreground/30",
          "data-[state=off]:bg-canvas data-[state=off]:text-neutral-400 hover:text-foreground"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4 transition-transform",
            pressed && "fill-foreground text-foreground scale-110"
          )}
        />
      </TogglePrimitive.Root>
      <span className="font-mono text-xs text-neutral-400">
        {pressed ? "Starred" : "Unstarred"}
      </span>
    </div>
  );
}
