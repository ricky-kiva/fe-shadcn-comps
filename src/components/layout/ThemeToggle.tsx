import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-canvas text-foreground",
        "hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400",
        className
      )}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5 text-neutral-400 hover:text-foreground" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-neutral-600 hover:text-foreground" />
      )}
    </button>
  );
}
