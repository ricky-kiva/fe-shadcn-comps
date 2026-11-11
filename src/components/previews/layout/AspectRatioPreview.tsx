import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import stockAspect from "@/assets/stock-aspect-ratio-1-1.jpg";

export function AspectRatioPreview() {
  return (
    <div className="w-full max-w-[150px] overflow-hidden rounded-sm border border-border bg-canvas-soft shadow-xs">
      <AspectRatioPrimitive.Root ratio={16 / 9}>
        <img
          src={stockAspect}
          alt="Landscape preview"
          className="h-full w-full object-cover"
        />
      </AspectRatioPrimitive.Root>
    </div>
  );
}
