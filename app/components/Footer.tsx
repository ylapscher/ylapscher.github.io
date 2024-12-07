'use client';

type FooterProps = {
  textStyles: {
    small: string;
  };
};

export default function Footer({ textStyles }: FooterProps) {
  return (
    <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center gap-4">
        <p className={`text-center ${textStyles.small} text-gray-600 dark:text-gray-400`}>
          © {new Date().getFullYear()} Joe Lapscher. Made with 💚 from New Jersey.
        </p>
      </div>
    </footer>
  );
} 