import type { Metadata, Viewport } from "next";
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

const SITE_TITLE = "Joe Lapscher — finding money that's stuck";

/** Kept under ~160 characters so Google renders it without truncating. */
const SITE_DESCRIPTION =
  "Engineer turned product leader, now a partner at Expense Reduction Coaching finding operational cost savings. Ten years across payments and fintech.";

/** The social card has room for the longer version. */
const SOCIAL_DESCRIPTION =
  "Industrial engineer turned software engineer turned chief product officer. Now finding operational cost savings at Expense Reduction Coaching. Ten years across payments, working capital, and fintech.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lapscher.com"),
  title: {
    default: SITE_TITLE,
    // Child routes set only their own name; this appends the wordmark.
    template: "%s · Joe Lapscher",
  },
  description: SITE_DESCRIPTION,
  keywords:
    "Joe Lapscher, Yoel Lapscher, Expense Reduction Coaching, cost reduction, operational savings, product leader, chief product officer, fintech, payments, working capital",
  authors: [{ name: "Joe Lapscher" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/favicons/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/images/og-card.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#E04E0F",
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
        {/* theme-color, favicons and the manifest now come from the
            Metadata/Viewport exports above -- declaring them twice made the
            App Router emit duplicate <link rel="icon"> tags. */}
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
