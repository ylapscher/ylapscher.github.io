/**
 * Single source of truth for the type scale.
 *
 * This replaces four divergent copies that had drifted apart:
 *   app/page.tsx                        (5 keys)
 *   app/components/Navbar.tsx           (2 keys)
 *   app/components/CollapsibleSection.tsx (3 keys, different names AND sizes)
 *   app/layout.tsx                      (an inline literal passed to Footer)
 *
 * The copies disagreed about `small`: page/Navbar used `text-sm`, while
 * CollapsibleSection used `text-base font-medium`. Both are kept below under
 * distinct names (`small` vs `sectionLabel`) so nothing silently changes size.
 *
 * None of these carry `font-geist-sans` any more. That class never generated
 * any CSS; Geist now arrives via `font-sans` on <body>, mapped in
 * tailwind.config.ts.
 */
export const textStyles = {
  h1: "text-4xl sm:text-5xl font-bold",
  h2: "text-2xl sm:text-3xl font-bold",
  h3: "text-lg sm:text-xl font-semibold",
  body: "text-base text-muted",
  small: "text-sm",

  /** CollapsibleSection's heading scale (was `large` / `medium` / `small`). */
  sectionTitle: "text-2xl sm:text-3xl font-bold",
  sectionHeading: "text-lg sm:text-xl font-semibold",
  sectionLabel: "text-base font-medium",
} as const;

/**
 * Monospace utility type -- the "voice of the system".
 * Eyebrows, years, stats, nav links, captions.
 */
export const monoStyles = {
  /** Hero eyebrow and similar wide-tracked labels. */
  eyebrow: "font-mono text-[10.5px] uppercase tracking-label text-muted",
  /** Nav links, small captions. */
  label: "font-mono text-[11px] uppercase tracking-util",
  /** Tabular figures -- years, counts. */
  data: "font-mono tabular-nums",
} as const;

export type TextStyles = typeof textStyles;
