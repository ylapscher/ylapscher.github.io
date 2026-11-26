import type { ReactNode } from 'react';
import { monoStyles } from '../lib/typography';

/**
 * Shared top-of-page header: mono eyebrow, left-aligned claim, muted lede.
 * Matches the home hero's voice so interior pages don't fall back to a
 * centred generic heading.
 */
export default function PageHeader({
  eyebrow,
  title,
  children,
  as: Heading = 'h1',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="mb-10 sm:mb-12">
      <p className={`${monoStyles.eyebrow} flex items-center gap-3`}>
        <span aria-hidden="true" className="h-px w-6 bg-signal" />
        {eyebrow}
      </p>
      <Heading
        className="mt-3 font-bold text-ink tracking-claim text-balance text-3xl sm:text-[2.6rem] leading-[1.06]"
      >
        {title}
      </Heading>
      {children && (
        <p className="mt-4 max-w-[52ch] text-muted text-base sm:text-[1.03rem] leading-relaxed">{children}</p>
      )}
    </div>
  );
}
