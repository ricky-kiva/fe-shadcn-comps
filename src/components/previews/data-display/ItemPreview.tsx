import stockItem from "@/assets/stock-item-1-1.jpg";

export function ItemPreview() {
  return (
    <div className="flex items-center gap-2 w-full max-w-[150px] rounded-sm border border-border bg-canvas p-1.5 shadow-xs">
      <img
        src={stockItem}
        alt="Thumbnail"
        className="h-8 w-8 rounded-xs object-cover border border-border shrink-0"
      />
      <div className="flex flex-col overflow-hidden text-left">
        <span className="font-sans text-xs font-medium text-foreground truncate">
          Design System
        </span>
        <span className="font-mono text-[9px] text-neutral-400 truncate">
          Updated 2h ago
        </span>
      </div>
    </div>
  );
}
