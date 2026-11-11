import logoUrl from "./assets/logo-1-1.png";
import { cn } from "@/lib/utils";

export function App() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground antialiased",
        "selection:bg-neutral-800 selection:text-white"
      )}
    >
      {/* Top minimal bar */}
      <header className="border-b border-border bg-canvas/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="SHADCN Explorer Logo"
              className="h-7 w-7 rounded-sm border border-border object-contain"
            />
            <span className="font-sans text-sm font-semibold tracking-tight text-foreground">
              SHADCN Explorer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-tight text-neutral-400 border border-border rounded-full px-2.5 py-0.5 bg-canvas-soft">
              Foundation Ready
            </span>
          </div>
        </div>
      </header>

      {/* Main Smoke Harness Surface */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas-soft px-3 py-1 font-mono text-xs text-neutral-400 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Vercel-Inspired Design System Active</span>
        </div>

        <h1 className="font-sans text-4xl sm:text-5xl font-semibold tracking-[-2.4px] text-foreground max-w-2xl">
          Visual gallery for exploring shadcn components.
        </h1>

        <p className="mt-4 max-w-lg font-sans text-sm sm:text-base text-neutral-400">
          Dark-mode-first component preview surface built with strict hairline borders,
          Geist typography, and responsive drag-and-drop orchestration.
        </p>

        {/* Verification Card Matrix */}
        <div className="mt-12 w-full max-w-md rounded-md border border-border bg-canvas-soft p-6 text-left shadow-stacked">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-xs tracking-tight text-neutral-400 uppercase">
              Phase 1 Smoke Verification
            </span>
            <span className="font-mono text-xs text-emerald-400">PASSED</span>
          </div>

          <ul className="mt-4 space-y-2.5 font-mono text-xs text-neutral-300">
            <li className="flex items-center justify-between">
              <span className="text-neutral-400">Theme:</span>
              <span className="text-foreground">Dark Mode (Default)</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-neutral-400">Design Tokens:</span>
              <span className="text-foreground">DESIGN.md Mapped</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-neutral-400">Hairline Border:</span>
              <span className="text-foreground">1px #262626</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-neutral-400">shadcn/ui CLI:</span>
              <span className="text-foreground">components.json OK</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-neutral-400">Drag & Drop Engine:</span>
              <span className="text-foreground">@dnd-kit Audited</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Subtle fixed-style footer */}
      <footer className="border-t border-border bg-canvas py-6 text-center">
        <p className="font-mono text-xs text-neutral-500">
          SHADCN Explorer · Built with React 19, Vite, and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
