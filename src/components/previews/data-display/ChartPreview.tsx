export function ChartPreview() {
  return (
    <div className="w-full max-w-[145px] flex flex-col items-center">
      <svg
        viewBox="0 0 100 45"
        className="w-full h-12 stroke-foreground fill-none"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Subtle grid line */}
        <line
          x1="0"
          y1="40"
          x2="100"
          y2="40"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeDasharray="2 2"
        />
        {/* Area fill */}
        <path
          d="M 5,35 Q 25,12 45,26 T 80,10 L 95,18 L 95,40 L 5,40 Z"
          fill="url(#chartGradient)"
          stroke="none"
        />
        {/* Sparkline curve */}
        <path
          d="M 5,35 Q 25,12 45,26 T 80,10 L 95,18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Highlight dot */}
        <circle cx="80" cy="10" r="2" fill="currentColor" />
      </svg>
      <div className="flex items-center justify-between w-full px-1 mt-0.5">
        <span className="font-mono text-[9px] text-neutral-400">Activity</span>
        <span className="font-mono text-[9px] text-foreground font-semibold">
          +24.8%
        </span>
      </div>
    </div>
  );
}
