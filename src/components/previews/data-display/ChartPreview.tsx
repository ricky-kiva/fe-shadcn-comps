import * as React from "react";

interface Point {
  x: number;
  y: number;
  label: string;
  value: string;
}

const POINTS: Point[] = [
  { x: 10, y: 35, label: "Mon", value: "12" },
  { x: 30, y: 22, label: "Tue", value: "48" },
  { x: 50, y: 28, label: "Wed", value: "35" },
  { x: 75, y: 12, label: "Thu", value: "92" },
  { x: 92, y: 18, label: "Fri", value: "76" },
];

export function ChartPreview() {
  const [activePoint, setActivePoint] = React.useState<Point>(POINTS[3]!);

  return (
    <div className="w-full max-w-[145px] flex flex-col items-center select-none">
      <svg
        viewBox="0 0 100 45"
        className="w-full h-12 stroke-foreground fill-none overflow-visible"
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
          d="M 10,35 L 30,22 L 50,28 L 75,12 L 92,18 L 92,40 L 10,40 Z"
          fill="url(#chartGradient)"
          stroke="none"
        />
        {/* Sparkline curve */}
        <path
          d="M 10,35 L 30,22 L 50,28 L 75,12 L 92,18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Interactive points */}
        {POINTS.map((pt) => {
          const isActive = activePoint.label === pt.label;
          return (
            <circle
              key={pt.label}
              cx={pt.x}
              cy={pt.y}
              r={isActive ? 3 : 2}
              className="cursor-pointer transition-all"
              fill="currentColor"
              stroke={isActive ? "var(--canvas)" : "none"}
              strokeWidth={isActive ? 1 : 0}
              onMouseEnter={() => setActivePoint(pt)}
              onClick={() => setActivePoint(pt)}
            />
          );
        })}
      </svg>
      <div className="flex items-center justify-between w-full px-1 mt-0.5">
        <span className="font-mono text-[9px] text-neutral-400">
          {activePoint.label}
        </span>
        <span className="font-mono text-[9px] text-foreground font-semibold">
          {activePoint.value} pts
        </span>
      </div>
    </div>
  );
}
