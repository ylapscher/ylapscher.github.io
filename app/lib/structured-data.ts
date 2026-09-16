import {
  BOOKING_URL,
  CONTACT_EMAIL,
  LINKEDIN_URL,
  NAP,
  SITE_ALTERNATE_NAME,
  SITE_NAME,
  SITE_URL,
} from './site';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  jobTitle: 'Partner, Expense Reduction Coaching',
  description:
    'Partner at Expense Reduction Coaching. Finds operational cost savings for $10M–$100M manufacturers, hospitality groups, and 3PLs. Former chief product officer and software engineer.',
  url: SITE_URL,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/images/profile-portrait.jpg`,
  sameAs: [LINKEDIN_URL, 'https://soundcloud.com/ylapscher/tracks', 'https://github.com/ylapscher', SITE_URL],
  worksFor: {
    '@type': 'Organization',
    name: 'Expense Reduction Coaching',
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional inquiries',
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
    },
  },
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'University of Florida',
      description: 'MS in Information Systems & Operations Management',
    },
  ],
  knowsAbout: [
    'Operational cost reduction',
    'Indirect spend',
    'Telecom expense management',
    'Merchant processing fees',
    'Fractional product leadership',
    'Product Management',
    'Fintech',
    'SaaS',
    'Product Strategy',
    'Roadmapping',
    'Team Leadership',
    'API and Integrations',
    'Agile Methodologies',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  },
} as const;

/**
 * Standalone Organization node with the fields agent-readiness audits look
 * for: contactPoint (email + contactType) and PostalAddress.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  additionalType: 'https://schema.org/ProfessionalService',
  name: SITE_NAME,
  alternateName: SITE_ALTERNATE_NAME,
  legalName: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/images/profile-portrait.jpg`,
  logo: `${SITE_URL}/images/profile-portrait.jpg`,
  description:
    'Joe Lapscher helps CEOs and CFOs of $10M–$100M manufacturers, hospitality groups, and 3PLs find operational cost savings through Expense Reduction Coaching. Also offers fractional product leadership, freelance website development, and PM mentoring.',
  sameAs: [LINKEDIN_URL, 'https://github.com/ylapscher', SITE_URL],
  serviceType: [
    'Operational cost reduction',
    'Fractional product leadership',
    'Freelance website development',
    'Product management mentoring',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional inquiries',
    email: CONTACT_EMAIL,
    url: `${SITE_URL}/contact`,
    availableLanguage: ['English', 'Spanish'],
  },
} as const;

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: [SITE_ALTERNATE_NAME, 'lapscher.com'],
  url: SITE_URL,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Person',
    name: SITE_NAME,
  },
} as const;

export function breadcrumbList(items: ReadonlyArray<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const notFoundMarkdown = `# Page not found

This URL is not a published page on [lapscher.com](${SITE_URL}).

Joe Lapscher (also Yoel Lapscher) is a partner at Expense Reduction Coaching. Agents should not treat this missing path as a real resource.

## Where to look next

- [llms.txt](${SITE_URL}/llms.txt): when to use this site, and the curated index
- [Sitemap](${SITE_URL}/sitemap.xml): every published URL
- [Home](${SITE_URL}/): background, experience, and how to book
- [About](${SITE_URL}/about): who Joe Lapscher is
- [Contact](${SITE_URL}/contact): email, booking link, and the contact form
- [Services](${SITE_URL}/services): cost reduction, fractional CPO, and mentoring
- [Privacy](${SITE_URL}/privacy): how this site handles analytics and form data

Book a 15-minute intro at ${BOOKING_URL} or email ${CONTACT_EMAIL}.
`;
