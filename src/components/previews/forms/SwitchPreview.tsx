import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function SwitchPreview() {
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <div className="flex items-center gap-2.5">
      <SwitchPrimitive.Root
        id="airplane-switch"
        checked={checked}
        onCheckedChange={setChecked}
        className={cn(
          "h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground",
          "data-[state=checked]:bg-foreground data-[state=unchecked]:bg-border"
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-xs transition-transform",
            "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
          )}
        />
      </SwitchPrimitive.Root>
      <label
        htmlFor="airplane-switch"
        className="font-sans text-xs font-medium text-foreground cursor-pointer select-none"
      >
        Airplane mode
      </label>
    </div>
  );
}
