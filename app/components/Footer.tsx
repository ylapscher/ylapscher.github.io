'use client';

type FooterProps = {
  textStyles: {
    small: string;
  };
};

export default function Footer({ textStyles }: FooterProps) {
  return (
    <footer className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-20 sm:pb-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center gap-4">
        <p className={`text-center ${textStyles.small} text-gray-700 dark:text-gray-400`}>
          © {new Date().getFullYear()} Joe Lapscher. Made with 💚 from Hoboken, New Jersey.
        </p>
        <nav aria-label="Trust and legal" className={`flex flex-wrap justify-center gap-x-4 gap-y-2 ${textStyles.small}`}>
          <a href="/about" className="text-gray-700 dark:text-gray-400 hover:text-signal">About</a>
          <a href="/contact" className="text-gray-700 dark:text-gray-400 hover:text-signal">Contact</a>
          <a href="/privacy" className="text-gray-700 dark:text-gray-400 hover:text-signal">Privacy</a>
          <a href="/llms.txt" className="text-gray-700 dark:text-gray-400 hover:text-signal">llms.txt</a>
        </nav>
      </div>
    </footer>
  );
} 