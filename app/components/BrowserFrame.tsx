'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { getProjectDomain } from '../data/projects-data';
import { monoStyles } from '../lib/typography';

type BrowserFrameProps = {
  src?: string;
  alt: string;
  url?: string;
  /** Fallback gradient class when no image */
  color?: string;
  /** Fallback emoji when no image */
  icon?: string;
  size?: 'card' | 'hero';
  hoverScroll?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function BrowserFrame({
  src,
  alt,
  url,
  color,
  icon,
  size = 'card',
  hoverScroll = false,
  className = '',
  children,
}: BrowserFrameProps) {
  const domain = url ? getProjectDomain(url) : undefined;
  const isHero = size === 'hero';

  return (
    <div
      className={`ring-1 ring-rule-hi bg-white dark:bg-gray-900 overflow-hidden ${className}`}
    >
      {/* Chrome bar — hard-edged, notebook palette */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-rule bg-paper dark:bg-gray-800">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2 h-2 bg-rule-hi" />
          <span className="w-2 h-2 bg-rule-hi" />
          <span className="w-2 h-2 bg-rule-hi" />
        </div>
        {domain && (
          <span className={`${monoStyles.label} flex-1 text-center truncate text-muted`}>
            {domain}
          </span>
        )}
      </div>

      {/* Viewport */}
      <div
        className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${
          isHero ? 'aspect-[16/10]' : 'aspect-video'
        }`}
      >
        {children}
        {src ? (
          hoverScroll ? (
            <div className="group/frame relative w-full h-full overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                sizes={isHero ? '(max-width: 768px) 100vw, 896px' : '(max-width: 768px) 100vw, 50vw'}
                className="object-cover object-top transition-transform duration-[2.5s] ease-in-out group-hover/frame:translate-y-[-18%]"
              />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={isHero ? '(max-width: 768px) 100vw, 896px' : '(max-width: 768px) 100vw, 50vw'}
              className="object-cover object-top"
              priority={isHero}
            />
          )
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${color ?? 'bg-gradient-to-br from-gray-400 to-gray-600'}`}
          >
            {icon && <span className={isHero ? 'text-8xl opacity-90' : 'text-6xl opacity-80'}>{icon}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
