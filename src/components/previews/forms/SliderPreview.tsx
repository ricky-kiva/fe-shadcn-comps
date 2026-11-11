import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export function SliderPreview() {
  const [value, setValue] = React.useState<number[]>([45]);

  return (
    <div className="w-full max-w-[140px] flex flex-col items-center gap-2">
      <SliderPrimitive.Root
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
          <SliderPrimitive.Range className="absolute h-full bg-foreground" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label="Volume slider"
          className={cn(
            "block h-4 w-4 rounded-full border border-border bg-background shadow-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground",
            "hover:scale-105 cursor-grab active:cursor-grabbing"
          )}
        />
      </SliderPrimitive.Root>
      <span className="font-mono text-[11px] text-neutral-400">
        Value: {value[0]}%
      </span>
    </div>
  );
}
