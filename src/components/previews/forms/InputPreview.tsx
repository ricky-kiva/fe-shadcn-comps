import * as React from "react";
import { cn } from "@/lib/utils";

export function InputPreview() {
  const [val, setVal] = React.useState("shadcn/ui");

  return (
    <div className="w-full max-w-[140px]">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Enter text..."
        className={cn(
          "h-7 w-full rounded-sm border border-border bg-canvas px-2.5 font-sans text-xs text-foreground",
          "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground transition-colors shadow-xs"
        )}
      />
    </div>
  );
}
