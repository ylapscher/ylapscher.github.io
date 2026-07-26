"use client";

import React from 'react';

/**
 * Rewritten from inline styles to Tailwind so it uses the shared tokens.
 *
 * It previously hardcoded #D97706 (Amber 600), which sat a few degrees off the
 * new signal orange -- and since it lives bottom-left while the ChatWidget FAB
 * lives bottom-right, both oranges were on screen at once and visibly
 * disagreed. It now reads from the same `signal` token, so there is one orange.
 */
const FloatingBadge = () => (
  <a
    href="https://www.samstorybook.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 left-5 z-[1000] inline-block bg-signal text-signal-ink
               px-4 py-3 text-sm font-semibold shadow-lg
               hover:scale-105 motion-reduce:hover:scale-100
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-signal transition-transform"
  >
    Order Baby Book!
  </a>
);

export default FloatingBadge;
