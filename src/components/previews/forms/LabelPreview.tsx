import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export function LabelPreview() {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[140px]">
      <LabelPrimitive.Root
        htmlFor="preview-username"
        className="font-sans text-xs font-medium text-foreground"
      >
        Username
      </LabelPrimitive.Root>
      <input
        id="preview-username"
        type="text"
        defaultValue="@rickyslash"
        className={cn(
          "h-7 w-full rounded-sm border border-border bg-canvas px-2 font-mono text-xs text-neutral-400",
          "focus:outline-none focus:ring-1 focus:ring-foreground transition-colors"
        )}
      />
    </div>
  );
}
