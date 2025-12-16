'use client';

import Script from 'next/script';

/**
 * Goodreads widget component that displays currently reading books.
 * Embeds the Goodreads grid widget script and renders a styled book grid.
 * @returns {JSX.Element} A container with the Goodreads book widget
 */
export default function GoodreadsWidget() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
      {/* Widget Container */}
      <div id="gr_grid_widget_1733507210">
        <h2 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white">
          <a 
            href="https://www.goodreads.com/review/list/37296901-yoel?shelf=read"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Currently Reading
          </a>
        </h2>
        <div className="gr_grid_container">
          {/* Grid content will be injected here */}
        </div>
      </div>

      {/* Goodreads Script */}
      <Script
        src="https://www.goodreads.com/review/grid_widget/37296901.Yoel's%20bookshelf:%20read?cover_size=medium&hide_link=true&hide_title=true&num_books=3&order=d&shelf=read&sort=date_read&widget_id=1733507210"
        strategy="afterInteractive"
      />

      {/* Custom Styles */}
      <style jsx global>{`
        .gr_grid_container {
          @apply flex justify-center gap-8;
        }
        .gr_grid_book_container {
          @apply rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105;
          width: 98px;
          height: 160px;
          padding: 0;
        }
        .gr_grid_book_container img {
          @apply w-full h-full object-cover rounded-lg;
        }
        .gr_grid_book_container a {
          @apply block w-full h-full;
        }
        /* Hide branding */
        noscript {
          @apply hidden;
        }
      `}</style>
    </div>
  );
} 