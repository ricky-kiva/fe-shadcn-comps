import { Search, Calendar, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function CommandPreview() {
  return (
    <div className="w-full max-w-[155px] overflow-hidden rounded-sm border border-border bg-canvas shadow-xs text-left">
      <div className="flex items-center border-b border-border px-2">
        <Search className="mr-1.5 h-3 w-3 text-neutral-400 shrink-0" />
        <input
          type="text"
          placeholder="Type a command..."
          className={cn(
            "h-6 w-full bg-transparent font-sans text-[10px] text-foreground placeholder:text-neutral-500 focus:outline-none"
          )}
        />
      </div>
      <div className="p-1 space-y-0.5">
        <div className="flex items-center gap-1.5 rounded-xs bg-canvas-soft px-1.5 py-0.5 font-sans text-[10px] text-foreground">
          <Calendar className="h-3 w-3 text-neutral-400" />
          <span>Calendar</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-xs px-1.5 py-0.5 font-sans text-[10px] text-neutral-400 hover:text-foreground">
          <User className="h-3 w-3" />
          <span>Profile</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-xs px-1.5 py-0.5 font-sans text-[10px] text-neutral-400 hover:text-foreground">
          <Settings className="h-3 w-3" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
