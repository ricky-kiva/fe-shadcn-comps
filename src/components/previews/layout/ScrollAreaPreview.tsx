import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export function ScrollAreaPreview() {
  const tags = ["v1.0.0", "v1.1.0", "v1.2.0", "v1.3.0", "v2.0.0"];

  return (
    <div className="w-full max-w-[145px] rounded-sm border border-border bg-canvas p-1 shadow-xs text-left">
      <div className="font-sans text-[10px] font-semibold text-foreground px-1 mb-1">
        Tags
      </div>
      <ScrollAreaPrimitive.Root className="h-12 w-full overflow-hidden">
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-xs">
          <div className="flex flex-col gap-1 pr-1 font-mono text-[9px] text-neutral-400">
            {tags.map((tag) => (
              <div
                key={tag}
                className="rounded-xs border border-border/60 bg-canvas-soft px-1.5 py-0.5 hover:text-foreground transition-colors"
              >
                {tag}
              </div>
            ))}
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-canvas-soft transition-colors duration-150 ease-out hover:bg-neutral-800"
        >
          <ScrollAreaPrimitive.Thumb className="flex-1 bg-border rounded-full relative" />
        </ScrollAreaPrimitive.Scrollbar>
      </ScrollAreaPrimitive.Root>
    </div>
  );
}
