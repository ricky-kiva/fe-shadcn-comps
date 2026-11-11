import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const FRAMEWORKS = ["Next.js", "React", "Svelte", "Vue", "Remix"];

export function ComboboxPreview() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-[145px]">
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-label="Select framework"
            className={cn(
              "flex h-7 w-full items-center justify-between rounded-sm border border-border bg-canvas px-2.5",
              "font-sans text-xs text-foreground shadow-xs cursor-pointer hover:bg-canvas-soft transition-colors"
            )}
          >
            <span className="truncate">{value || "Select framework..."}</span>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={4}
            className="z-50 min-w-[145px] overflow-hidden rounded-sm border border-border bg-canvas p-1 shadow-stacked animate-in fade-in-0 text-left"
          >
            <div className="flex flex-col gap-0.5">
              {FRAMEWORKS.map((framework) => (
                <button
                  key={framework}
                  type="button"
                  onClick={() => {
                    setValue(framework);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xs px-2 py-1 font-sans text-xs outline-none transition-colors",
                    value === framework
                      ? "bg-canvas-soft text-foreground font-medium"
                      : "text-neutral-400 hover:text-foreground hover:bg-canvas-soft/60"
                  )}
                >
                  <span>{framework}</span>
                  {value === framework && <Check className="h-3 w-3 text-foreground" />}
                </button>
              ))}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}
