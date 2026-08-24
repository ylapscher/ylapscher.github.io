'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

const BARBER_IMAGES: GalleryImage[] = [
  { src: '/images/barber/before-after-1.jpg', alt: 'Before and after haircut transformation' },
  { src: '/images/barber/before-after-2.jpg', alt: 'Before and after haircut transformation' },
  { src: '/images/barber/before-after-3.jpg', alt: 'Before and after haircut transformation' },
];

type ImageGalleryProps = {
  images?: GalleryImage[];
  autoAdvanceMs?: number;
  showDeviceToggle?: boolean;
};

export default function ImageGallery({
  images = BARBER_IMAGES,
  autoAdvanceMs = 5000,
  showDeviceToggle = false,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'desktop' | 'mobile'>('all');

  const filteredImages = showDeviceToggle
    ? images.filter((img) => {
        if (deviceFilter === 'all') return true;
        const isMobile = img.src.includes('mobile');
        return deviceFilter === 'mobile' ? isMobile : !isMobile;
      })
    : images;

  const displayImages = filteredImages.length > 0 ? filteredImages : images;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [displayImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  }, [displayImages.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [deviceFilter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prevSlide();
      else if (event.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  useEffect(() => {
    if (autoAdvanceMs <= 0 || displayImages.length <= 1) return;
    const interval = setInterval(nextSlide, autoAdvanceMs);
    return () => clearInterval(interval);
  }, [nextSlide, autoAdvanceMs, displayImages.length]);

  if (displayImages.length === 0) return null;

  const current = displayImages[currentIndex];

  return (
    <div className="relative max-w-3xl mx-auto">
      {showDeviceToggle && (
        <div className="flex justify-center gap-2 mb-4">
          {(['all', 'desktop', 'mobile'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setDeviceFilter(mode)}
              className={`font-mono text-[10px] uppercase tracking-util px-3 py-1 border transition-colors ${
                deviceFilter === mode
                  ? 'bg-signal text-signal-ink border-signal'
                  : 'border-rule text-muted hover:border-signal'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      )}

      <div className="relative ring-1 ring-rule-hi overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayImages.map((image, index) => (
            <div key={image.src + index} className="min-w-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full object-contain"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-ink/50 text-white hover:bg-ink/75 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-ink/50 text-white hover:bg-ink/75 transition-colors"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-util text-muted">
          {current.caption}
        </p>
      )}

      {displayImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 transition-colors ${
                index === currentIndex ? 'bg-signal' : 'bg-rule-hi hover:bg-muted'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
