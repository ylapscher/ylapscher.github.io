import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import ChatWidget from './components/ChatWidget';
import { PostHogProvider } from './components/PostHogProvider';
import FloatingBadge from './components/FloatingBadge';

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

export const metadata: Metadata = {
  title: "Joe Lapscher | Product Leader",
  description: "Joe Lapscher is a Chief Product Officer at Tienda Pago with a passion for building products that make a difference. Experienced in fintech, SaaS, and enterprise software with expertise in product strategy, roadmapping, and team leadership.",
  keywords: "Chief Product Officer, CPO, product leader, fintech, SaaS, product strategy, roadmapping, team leadership, Tienda Pago, Joe Lapscher",
  authors: [{ name: "Joe Lapscher" }],
  openGraph: {
    title: "Joe Lapscher | Product Leader",
    description: "Chief Product Officer at Tienda Pago. Experienced in fintech, SaaS, and enterprise software with expertise in product strategy, roadmapping, and team leadership.",
    url: "https://lapscher.com",
    siteName: "Joe Lapscher Portfolio",
    images: [
      {
        url: "https://lapscher.com/images/profile.jpg",
        width: 400,
        height: 400,
        alt: "Joe Lapscher Profile Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Lapscher | Product Leader",
    description: "Chief Product Officer at Tienda Pago. Product leader with expertise in fintech, SaaS, and enterprise software. Passionate about building products that make a difference.",
    images: ["https://lapscher.com/images/profile.jpg"],
  },
};

/**
 * Root layout component that wraps all pages with common elements.
 * Includes navigation, footer, chat widget, analytics, and structured metadata.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 * @returns {JSX.Element} Root layout with all global components
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <GoogleAnalytics />
        <meta name="theme-color" content="#000000" />

        {/* Favicons */}
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/manifest.webmanifest" />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans bg-white dark:bg-gray-900">
        <PostHogProvider>
          <Navbar />
          {children}
          <ChatWidget />
          <Footer textStyles={{ small: "text-sm font-geist-sans" }} />
          <FloatingBadge />
        </PostHogProvider>
      </body>
    </html>
  );
}
