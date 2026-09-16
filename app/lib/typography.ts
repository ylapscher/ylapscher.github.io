/**
 * Single source of truth for the type scale.
 *
 * Historically this replaced four divergent copies (homepage, Navbar,
 * a since-removed collapsible section, and an inline Footer literal).
 * The copies disagreed about `small`; both sizes are kept below as
 * `small` vs `sectionLabel` so nothing silently changes size.
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

  /** Heading scale used by section titles. */
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
