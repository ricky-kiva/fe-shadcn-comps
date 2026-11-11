import { ChevronRight } from "lucide-react";

export function BreadcrumbPreview() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-sans text-xs">
      <span className="text-neutral-400 hover:text-foreground transition-colors cursor-pointer">
        Home
      </span>
      <ChevronRight className="h-3 w-3 text-neutral-500 shrink-0" />
      <span className="text-neutral-400 hover:text-foreground transition-colors cursor-pointer">
        Components
      </span>
      <ChevronRight className="h-3 w-3 text-neutral-500 shrink-0" />
      <span className="font-semibold text-foreground">Gallery</span>
    </nav>
  );
}
