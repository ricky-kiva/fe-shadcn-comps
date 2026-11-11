import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export function RadioGroupPreview() {
  const [value, setValue] = React.useState<string>("default");

  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={setValue}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center gap-2">
        <RadioGroupPrimitive.Item
          id="radio-opt-1"
          value="default"
          className={cn(
            "h-3.5 w-3.5 rounded-full border border-border bg-canvas transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-foreground",
            "data-[state=checked]:border-foreground"
          )}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <label
          htmlFor="radio-opt-1"
          className="font-sans text-xs font-medium text-foreground cursor-pointer select-none"
        >
          Default
        </label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupPrimitive.Item
          id="radio-opt-2"
          value="comfortable"
          className={cn(
            "h-3.5 w-3.5 rounded-full border border-border bg-canvas transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-foreground",
            "data-[state=checked]:border-foreground"
          )}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <label
          htmlFor="radio-opt-2"
          className="font-sans text-xs font-medium text-foreground cursor-pointer select-none"
        >
          Comfortable
        </label>
      </div>
    </RadioGroupPrimitive.Root>
  );
}
