import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import ChatWidget from './components/ChatWidget';
import { PostHogProvider } from './components/PostHogProvider';
import FloatingBadge from './components/FloatingBadge';
import { textStyles } from './lib/typography';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

const SITE_DESCRIPTION =
  "Industrial engineer turned software engineer turned chief product officer. Now finding operational cost savings at Expense Reduction Coaching. Ten years across payments, working capital, and fintech.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lapscher.com"),
  title: "Joe Lapscher — finding money that's stuck",
  description: SITE_DESCRIPTION,
  keywords:
    "Joe Lapscher, Yoel Lapscher, Expense Reduction Coaching, cost reduction, operational savings, product leader, chief product officer, fintech, payments, working capital",
  authors: [{ name: "Joe Lapscher" }],
  openGraph: {
    title: "Joe Lapscher — finding money that's stuck",
    description: SITE_DESCRIPTION,
    url: "https://lapscher.com",
    siteName: "Joe Lapscher",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Joe Lapscher — ten years finding money that's stuck",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Lapscher — finding money that's stuck",
    description: SITE_DESCRIPTION,
    images: ["/images/og-card.png"],
  },
};

/**
 * Resolves the theme before first paint.
 *
 * Without this, the .dark class is only applied in a useEffect inside Navbar,
 * so dark-mode visitors get a flash of the light palette on every navigation.
 * Kept deliberately tiny and dependency-free; it must run synchronously.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Must stay before any paint -- see THEME_SCRIPT above. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <GoogleAnalytics />
        <meta name="theme-color" content="#E04E0F" />

        {/* Favicons */}
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/manifest.webmanifest" />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans bg-paper text-ink">
        <PostHogProvider>
          <Navbar />
          {children}
          <ChatWidget />
          <Footer textStyles={{ small: textStyles.small }} />
          <FloatingBadge />
        </PostHogProvider>
      </body>
    </html>
  );
}
