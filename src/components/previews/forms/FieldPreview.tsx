import { cn } from "@/lib/utils";

export function FieldPreview() {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[145px]">
      <label
        htmlFor="preview-email-field"
        className="font-sans text-xs font-medium text-foreground"
      >
        Email address
      </label>
      <input
        id="preview-email-field"
        type="email"
        placeholder="alex@domain.com"
        className={cn(
          "h-7 w-full rounded-sm border border-border bg-canvas px-2 font-sans text-xs text-foreground",
          "placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground transition-colors shadow-xs"
        )}
      />
      <span className="font-mono text-[9px] text-neutral-400 truncate">
        We will never share your email
      </span>
    </div>
  );
}
