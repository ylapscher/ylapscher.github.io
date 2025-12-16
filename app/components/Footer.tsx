'use client';

/**
 * Props for the Footer component.
 * @typedef {Object} FooterProps
 * @property {Object} textStyles - Text styling classes
 * @property {string} textStyles.small - CSS class for small text
 */
type FooterProps = {
  textStyles: {
    small: string;
  };
};

/**
 * Footer component displaying copyright information.
 * @param {FooterProps} props - Component props
 * @param {Object} props.textStyles - Text styling classes
 * @returns {JSX.Element} Footer component with copyright text
 */
export default function Footer({ textStyles }: FooterProps) {
  return (
    <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center gap-4">
        <p className={`text-center ${textStyles.small} text-gray-700 dark:text-gray-400`}>
          © {new Date().getFullYear()} Joe Lapscher. Made with 💚 from New Jersey.
        </p>
      </div>
    </footer>
  );
} 