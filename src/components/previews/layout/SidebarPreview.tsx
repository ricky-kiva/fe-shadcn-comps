import { LayoutDashboard, LineChart, Settings } from "lucide-react";

export function SidebarPreview() {
  return (
    <div className="flex flex-col gap-0.5 w-full max-w-[145px] rounded-sm border border-border bg-canvas p-1 shadow-xs text-left">
      <div className="flex items-center gap-1.5 rounded-xs bg-canvas-soft px-1.5 py-1 text-foreground font-sans text-[10px] font-medium">
        <LayoutDashboard className="h-3 w-3 text-foreground shrink-0" />
        <span className="truncate">Overview</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-xs px-1.5 py-1 text-neutral-400 font-sans text-[10px] hover:text-foreground hover:bg-canvas-soft/50 transition-colors">
        <LineChart className="h-3 w-3 shrink-0" />
        <span className="truncate">Analytics</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-xs px-1.5 py-1 text-neutral-400 font-sans text-[10px] hover:text-foreground hover:bg-canvas-soft/50 transition-colors">
        <Settings className="h-3 w-3 shrink-0" />
        <span className="truncate">Settings</span>
      </div>
    </div>
  );
}
