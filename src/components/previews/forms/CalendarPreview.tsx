import { cn } from "@/lib/utils";

export function CalendarPreview() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
  ];

  return (
    <div className="flex flex-col items-center rounded-sm border border-border bg-canvas p-2 shadow-xs">
      <div className="font-sans text-[11px] font-semibold text-foreground mb-1">
        November 2026
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-neutral-400 mb-1">
        {days.map((d, i) => (
          <div key={i} className="w-3.5 h-3.5 flex items-center justify-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px]">
        {dates.map((date, idx) => (
          <div
            key={idx}
            className={cn(
              "w-3.5 h-3.5 flex items-center justify-center rounded-xs",
              date === 11
                ? "bg-foreground text-background font-bold shadow-xs"
                : date
                ? "text-neutral-400 hover:text-foreground"
                : ""
            )}
          >
            {date ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
