import { Coffee, Heart } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: FooterLink[] = [
  {
    label: "GitHub profile",
    href: "https://github.com/ricky-kiva",
    icon: GithubIcon,
  },
  {
    label: "Instagram profile",
    href: "https://www.instagram.com/r.ckyslash/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn profile",
    href: "https://www.linkedin.com/in/ricky-fadel/",
    icon: LinkedinIcon,
  },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 pointer-events-none",
        "h-16 sm:h-14 flex items-center justify-center",
        "bg-gradient-to-t from-canvas via-canvas/95 to-transparent",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 px-3 text-[11px] sm:text-xs font-mono text-neutral-500 pointer-events-auto">
        {/* Row 1 on mobile: Social Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-sm text-neutral-400 hover:text-foreground hover:bg-canvas-soft transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>

        {/* Separator on desktop between social icons and text info */}
        <span className="hidden sm:inline text-neutral-600" aria-hidden="true">
          ·
        </span>

        {/* Row 2 on mobile: Buy me a Coffee · Made with by Rickyslash */}
        <div className="flex items-center gap-1.5 sm:gap-4 text-neutral-400">
          <div className="flex items-center gap-1">
            <span>Buy me a</span>
            <a
              href="https://ko-fi.com/rickyslash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy me a Coffee"
              className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-sm text-neutral-400 hover:text-foreground hover:bg-canvas-soft transition-colors"
            >
              <Coffee className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <span className="text-neutral-600" aria-hidden="true">
            ·
          </span>

          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-3 w-3 fill-rose-500 text-rose-500 inline" aria-hidden="true" />
            <span>by</span>
            <a
              href="https://rickyslash.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-neutral-600 underline-offset-4 hover:decoration-foreground transition-colors"
            >
              Rickyslash
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
