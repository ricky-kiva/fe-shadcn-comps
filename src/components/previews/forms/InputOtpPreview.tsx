import { cn } from "@/lib/utils";

export function InputOtpPreview() {
  const digits = ["2", "0", "2", "6"];

  return (
    <div className="flex items-center gap-1.5">
      {digits.map((digit, index) => (
        <div
          key={index}
          data-otp-slot={index}
          className={cn(
            "flex h-8 w-7 items-center justify-center rounded-sm border border-border bg-canvas",
            "font-mono text-xs font-semibold text-foreground shadow-xs transition-colors",
            index === 2 && "ring-1 ring-foreground border-foreground"
          )}
        >
          {digit}
        </div>
      ))}
    </div>
  );
}
