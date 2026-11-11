import { AlertCircle } from "lucide-react";

export function AlertPreview() {
  return (
    <div className="flex items-start gap-2 w-full max-w-[155px] rounded-sm border border-border bg-canvas p-2 shadow-xs text-left">
      <AlertCircle className="h-3.5 w-3.5 text-foreground shrink-0 mt-0.5" />
      <div className="flex flex-col">
        <span className="font-sans text-xs font-semibold text-foreground leading-tight">
          Heads up!
        </span>
        <span className="font-sans text-[10px] text-neutral-400 leading-tight mt-0.5">
          You can customize this alert component.
        </span>
      </div>
    </div>
  );
}
