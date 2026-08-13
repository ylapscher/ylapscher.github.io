import { XMLParser } from 'fast-xml-parser';

export type ReadingListBook = {
  title: string;
  author: string;
  coverUrl: string;
  link: string;
};

const GOODREADS_SHELF_RSS_URL =
  'https://www.goodreads.com/review/list_rss/37296901?shelf=read';

type GoodreadsRssItem = {
  title?: string;
  author_name?: string;
  link?: string;
  book_medium_image_url?: string;
};

/**
 * Fetched at build time (this is a static export, there's no runtime
 * server to hit on every page load) so a Goodreads outage or shape change
 * must never fail the build -- swallow errors and return an empty list so
 * the page falls back to the plain sentence + badge instead.
 */
export async function getReadingList(): Promise<ReadingListBook[]> {
  try {
    const response = await fetch(GOODREADS_SHELF_RSS_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBuild/1.0)' },
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: true });
    const parsed = parser.parse(xml);
    const items: GoodreadsRssItem[] = parsed?.rss?.channel?.item ?? [];
    const itemList = Array.isArray(items) ? items : [items];

    return itemList
      .filter((item) => item?.title && item?.book_medium_image_url)
      .map((item) => ({
        title: String(item.title),
        author: String(item.author_name ?? ''),
        coverUrl: String(item.book_medium_image_url),
        link: String(item.link ?? ''),
      }));
  } catch {
    return [];
  }
}
