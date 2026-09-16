'use client';

type FooterProps = {
  textStyles: {
    small: string;
  };
};

export default function Footer({ textStyles }: FooterProps) {
  return (
    <footer className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-8 border-t border-rule">
      <div className="flex flex-col items-center gap-4">
        <p className={`text-center ${textStyles.small} text-muted`}>
          © {new Date().getFullYear()} Joe Lapscher. Made in Hoboken, New Jersey.
        </p>
        <nav aria-label="Trust and legal" className={`flex flex-wrap justify-center gap-x-4 gap-y-2 ${textStyles.small}`}>
          <a href="/about" className="text-muted hover:text-signal">About</a>
          <a href="/contact" className="text-muted hover:text-signal">Contact</a>
          <a href="/privacy" className="text-muted hover:text-signal">Privacy</a>
          <a href="/llms.txt" className="text-muted hover:text-signal">llms.txt</a>
        </nav>
      </div>
    </footer>
  );
}
