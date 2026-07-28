import type { Config } from "tailwindcss";

export default {
  // Only ./app exists -- the ./pages and ./components globs that used to be
  // here matched nothing (components live at app/components).
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      // The Geist variables are set on <html> by next/font/local in
      // app/layout.tsx. Without this mapping they were never referenced by any
      // utility, so both webfonts downloaded on every visit and neither ever
      // rendered. <body> already carries `font-sans`, so mapping it here is
      // what actually turns Geist on across the site.
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // "Engineering Notebook" palette. Driven by CSS variables so the
        // .dark class switches them -- see app/globals.css.
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        // Marking orange: the colour an industrial engineer flags a problem
        // with. Replaces blue-600 as the accent.
        signal: "var(--signal)",
        "signal-ink": "var(--signal-ink)",
        rule: "var(--rule)",
        "rule-hi": "var(--rule-hi)",
        // Used by the hero's chronology rail (bg-tick) and the notebook
        // graph-paper background. Both CSS vars live in app/globals.css.
        tick: "var(--tick)",
        grid: "var(--grid)",
      },
      letterSpacing: {
        claim: "-0.032em",
        label: "0.19em",
        util: "0.13em",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
