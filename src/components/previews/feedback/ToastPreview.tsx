import { CheckCircle2 } from "lucide-react";

export function ToastPreview() {
  return (
    <div className="flex items-center justify-between gap-2 w-full max-w-[155px] rounded-sm border border-border bg-canvas p-2 shadow-stacked text-left">
      <div className="flex items-center gap-1.5 overflow-hidden">
        <CheckCircle2 className="h-3.5 w-3.5 text-foreground shrink-0" />
        <span className="font-sans text-xs font-medium text-foreground truncate">
          Event Created
        </span>
      </div>
      <button
        type="button"
        className="rounded-xs border border-border/80 bg-canvas-soft px-1.5 py-0.5 font-mono text-[9px] text-foreground hover:bg-canvas transition-colors shrink-0"
      >
        Undo
      </button>
    </div>
  );
}
