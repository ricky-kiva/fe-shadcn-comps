import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToggleGroupPreview() {
  const [value, setValue] = React.useState<string[]>(["bold"]);

  return (
    <ToggleGroupPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={setValue}
      className="inline-flex rounded-sm border border-border bg-canvas overflow-hidden divide-x divide-border shadow-xs"
    >
      <ToggleGroupPrimitive.Item
        value="bold"
        aria-label="Toggle Bold"
        className={cn(
          "h-7 w-7 flex items-center justify-center text-xs transition-colors",
          value.includes("bold")
            ? "bg-canvas-soft text-foreground"
            : "text-neutral-400 hover:text-foreground"
        )}
      >
        <Bold className="h-3.5 w-3.5" />
      </ToggleGroupPrimitive.Item>
      <ToggleGroupPrimitive.Item
        value="italic"
        aria-label="Toggle Italic"
        className={cn(
          "h-7 w-7 flex items-center justify-center text-xs transition-colors",
          value.includes("italic")
            ? "bg-canvas-soft text-foreground"
            : "text-neutral-400 hover:text-foreground"
        )}
      >
        <Italic className="h-3.5 w-3.5" />
      </ToggleGroupPrimitive.Item>
      <ToggleGroupPrimitive.Item
        value="underline"
        aria-label="Toggle Underline"
        className={cn(
          "h-7 w-7 flex items-center justify-center text-xs transition-colors",
          value.includes("underline")
            ? "bg-canvas-soft text-foreground"
            : "text-neutral-400 hover:text-foreground"
        )}
      >
        <Underline className="h-3.5 w-3.5" />
      </ToggleGroupPrimitive.Item>
    </ToggleGroupPrimitive.Root>
  );
}
