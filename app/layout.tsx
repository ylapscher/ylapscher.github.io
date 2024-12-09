import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoogleAnalytics from './components/GoogleAnalytics';
import ChatWidget from './components/ChatWidget';

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
  title: "Joe Lapscher | Product Manager",
  description: "Joe Lapscher is a product manager with a passion for building products that make a difference.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <GoogleAnalytics />
        <link 
          rel="preload" 
          href="https://formspree.io/static/img/loading.svg" 
          as="image" 
          type="image/svg+xml"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans bg-white dark:bg-gray-900">
        <Navbar />
        {children}
        <ChatWidget />
        <Footer textStyles={{ small: "text-sm font-geist-sans" }} />
      </body>
    </html>
  );
}
