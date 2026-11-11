import * as ProgressPrimitive from "@radix-ui/react-progress";

export function ProgressPreview() {
  const value = 65;

  return (
    <div className="w-full max-w-[140px] flex flex-col gap-1.5 items-center">
      <ProgressPrimitive.Root
        value={value}
        className="relative h-2 w-full overflow-hidden rounded-full bg-border"
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-foreground transition-all"
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </ProgressPrimitive.Root>
      <span className="font-mono text-[10px] text-neutral-400">
        {value}% Complete
      </span>
    </div>
  );
}
