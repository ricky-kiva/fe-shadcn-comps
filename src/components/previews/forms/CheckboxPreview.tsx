import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckboxPreview() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(true);

  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id="terms-checkbox"
        checked={checked}
        onCheckedChange={setChecked}
        className={cn(
          "h-4 w-4 shrink-0 rounded-xs border border-border transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground",
          "data-[state=checked]:bg-foreground data-[state=checked]:text-background data-[state=checked]:border-foreground",
          "bg-canvas"
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Check className="h-3 w-3 stroke-[3]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label
        htmlFor="terms-checkbox"
        className="font-sans text-xs font-medium text-foreground cursor-pointer select-none"
      >
        Accept terms
      </label>
    </div>
  );
}
