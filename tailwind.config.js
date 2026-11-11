/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        "canvas-soft": "var(--canvas-soft)",
        background: "var(--canvas)",
        foreground: "var(--ink)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--on-primary)",
        },
        hairline: {
          DEFAULT: "var(--hairline)",
          strong: "var(--hairline-strong)",
        },
        border: "var(--hairline)",
        body: "var(--body)",
        muted: {
          DEFAULT: "var(--mute)",
          foreground: "var(--mute)",
        },
        link: "var(--link)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        pill: "100px",
        full: "9999px",
      },
      boxShadow: {
        stacked: "var(--shadow-stacked)",
        hairline: "0 0 0 1px var(--hairline)",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: [
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      letterSpacing: {
        "display-xl": "-2.4px",
        "display-lg": "-1.28px",
        "display-md": "-0.96px",
        "display-sm": "-0.6px",
        "tight-sm": "-0.28px",
      },
    },
  },
  plugins: [],
};
