'use client';

import Script from 'next/script';

/**
 * Google Analytics component that initializes and loads Google Analytics tracking.
 * Loads the gtag script and configures tracking with the site's GA ID.
 * @returns {JSX.Element} Script tags for Google Analytics
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5BJ2L5FB86"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-5BJ2L5FB86');
        `}
      </Script>
    </>
  );
} 