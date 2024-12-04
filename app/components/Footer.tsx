'use client';

export default function Footer() {
  return (
    <footer className="container mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-700">
      <p className="text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Jane Smith. All rights reserved.
      </p>
    </footer>
  );
} 