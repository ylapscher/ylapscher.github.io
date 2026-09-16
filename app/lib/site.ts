/** Canonical origin. Also drives `metadataBase` in app/layout.tsx. */
export const SITE_URL = 'https://lapscher.com';

export const SITE_NAME = 'Joe Lapscher';

export const SITE_ALTERNATE_NAME = 'Yoel Lapscher';

/** Public professional inbox (also listed on GitHub). */
export const CONTACT_EMAIL = 'yoel@lapscher.com';

export const CONTACT_PATH = '/contact';

export const BOOKING_URL = 'https://cal.com/joe-erc/15min';

/** Cal.com event path, derived so the embed cannot drift from BOOKING_URL. */
export const BOOKING_CAL_LINK = BOOKING_URL.replace(/^https?:\/\/(?:www\.)?cal\.com\//, '');

export const RESUME_URL =
  'https://drive.google.com/file/d/1EqxPiOXn3-ao_I5GsP--dh6qYyzUFGsG/view';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/ylapscher/';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwpkjbzj';

/** NAP used in Organization schema, trust pages, and llms.txt. */
export const NAP = {
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  email: CONTACT_EMAIL,
  url: SITE_URL,
  addressLocality: 'Hoboken',
  addressRegion: 'New Jersey',
  addressRegionCode: 'NJ',
  addressCountry: 'US',
} as const;
