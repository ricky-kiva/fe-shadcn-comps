import stockCard from "@/assets/stock-card-1-1.jpg";

export function CardPreview() {
  return (
    <div className="w-full max-w-[150px] overflow-hidden rounded-sm border border-border bg-canvas shadow-xs text-left">
      <div className="h-12 w-full overflow-hidden border-b border-border">
        <img
          src={stockCard}
          alt="Card stock"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-1.5 flex flex-col gap-0.5">
        <span className="font-sans text-xs font-semibold text-foreground truncate">
          Vercel Deck
        </span>
        <span className="font-mono text-[9px] text-neutral-400 truncate">
          Deploy in seconds
        </span>
      </div>
    </div>
  );
}
