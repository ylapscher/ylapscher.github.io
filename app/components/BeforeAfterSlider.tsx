'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
};

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Before and after comparison',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div
        ref={containerRef}
        className="relative aspect-video ring-1 ring-rule-hi overflow-hidden cursor-col-resize select-none bg-gray-100 dark:bg-gray-800"
        onMouseDown={(e) => {
          setIsDragging(true);
          updatePosition(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          updatePosition(e.touches[0].clientX);
        }}
        role="img"
        aria-label={alt}
      >
        {/* After (full width, underneath) */}
        <Image src={after} alt={`${afterLabel} view`} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 768px" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${Math.max(position, 1)}%` }}>
          <div className="relative h-full" style={{ width: `${10000 / Math.max(position, 1)}%` }}>
            <Image src={before} alt={`${beforeLabel} view`} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-signal z-10"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-signal flex items-center justify-center">
            <span className="text-signal-ink text-xs font-mono">↔</span>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 z-20 font-mono text-[10px] uppercase tracking-util bg-paper/90 dark:bg-gray-900/90 px-2 py-1 text-muted">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 z-20 font-mono text-[10px] uppercase tracking-util bg-paper/90 dark:bg-gray-900/90 px-2 py-1 text-muted">
          {afterLabel}
        </span>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-util text-muted">
        Drag to compare
      </p>
    </div>
  );
}
