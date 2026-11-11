import { cn } from "@/lib/utils";

export function NativeSelectPreview() {
  return (
    <div className="w-full max-w-[145px]">
      <select
        defaultValue="opt-1"
        className={cn(
          "h-7 w-full rounded-sm border border-border bg-canvas px-2 font-sans text-xs text-foreground",
          "focus:outline-none focus:ring-1 focus:ring-foreground transition-colors shadow-xs cursor-pointer"
        )}
      >
        <option value="opt-1">Option One</option>
        <option value="opt-2">Option Two</option>
        <option value="opt-3">Option Three</option>
      </select>
    </div>
  );
}
