import { cn } from "@/lib/utils";

export function TextareaPreview() {
  return (
    <div className="w-full max-w-[140px]">
      <textarea
        rows={2}
        defaultValue="Type your note..."
        className={cn(
          "w-full rounded-sm border border-border bg-canvas p-2 font-sans text-xs text-foreground resize-none",
          "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground transition-colors shadow-xs"
        )}
      />
    </div>
  );
}
