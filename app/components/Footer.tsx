'use client';

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700">
      <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Joe Lapscher. Made with 💚 from New Jersey.
      </p>
    </footer>
  );
} 