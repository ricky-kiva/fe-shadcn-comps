import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export function TabsPreview() {
  return (
    <div className="w-full max-w-[155px]">
      <TabsPrimitive.Root defaultValue="account" className="w-full">
        <TabsPrimitive.List className="inline-flex h-7 w-full items-center justify-center rounded-sm border border-border bg-canvas p-0.5 shadow-xs">
          <TabsPrimitive.Trigger
            value="account"
            className={cn(
              "inline-flex flex-1 items-center justify-center rounded-xs px-2 py-1 font-sans text-[11px] font-medium transition-all outline-none",
              "data-[state=active]:bg-canvas-soft data-[state=active]:text-foreground data-[state=active]:shadow-xs",
              "text-neutral-400 hover:text-foreground"
            )}
          >
            Account
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            value="password"
            className={cn(
              "inline-flex flex-1 items-center justify-center rounded-xs px-2 py-1 font-sans text-[11px] font-medium transition-all outline-none",
              "data-[state=active]:bg-canvas-soft data-[state=active]:text-foreground data-[state=active]:shadow-xs",
              "text-neutral-400 hover:text-foreground"
            )}
          >
            Password
          </TabsPrimitive.Trigger>
        </TabsPrimitive.List>

        <TabsPrimitive.Content
          value="account"
          className="mt-2 rounded-xs border border-border/80 bg-canvas-soft/40 p-2 text-center font-mono text-[9px] text-neutral-400"
        >
          Manage account settings
        </TabsPrimitive.Content>
        <TabsPrimitive.Content
          value="password"
          className="mt-2 rounded-xs border border-border/80 bg-canvas-soft/40 p-2 text-center font-mono text-[9px] text-neutral-400"
        >
          Change your password
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </div>
  );
}
