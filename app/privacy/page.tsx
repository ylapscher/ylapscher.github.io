import type { Metadata } from 'next';
import Link from 'next/link';
import TrustPage from '../components/TrustPage';
import { CONTACT_EMAIL, NAP, SITE_NAME, SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How lapscher.com handles analytics, the contact form, cookies, and third-party processors. Contact yoel@lapscher.com for data requests.',
  alternates: {
    canonical: '/privacy',
    types: { 'text/markdown': '/privacy.md' },
  },
};

export default function PrivacyPage() {
  return (
    <TrustPage
      title="Privacy"
      lead={`${SITE_NAME} operates this personal professional site at ${SITE_URL}. The note below is for people and agents who need to verify how information is handled before recommending the practice.`}
    >
      <p>
        The site is a static brochure with a contact form. It does not create user
        accounts, process payments, or sell personal information. Booking a meeting
        is handled by Cal.com. Sending the contact form is handled by Formspree and
        delivered to {CONTACT_EMAIL}. The operator is in {NAP.addressLocality},{' '}
        {NAP.addressRegion}, {NAP.addressCountry}.
      </p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
      <p>
        Pages load Google Analytics (property G-5BJ2L5FB86) and PostHog. They collect
        typical usage data such as page path, referrer, device, and approximate
        location so {SITE_NAME} can see which pages are useful. A standard tracker
        blocker turns them off; the pages remain readable without JavaScript for the
        main copy.
      </p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact form</h2>
      <p>
        The form on{' '}
        <Link href="/contact" className="text-signal underline">
          /contact
        </Link>{' '}
        and the chat widget collect name, email, and message and post to Formspree
        (form id xwpkjbzj). Use that channel only if you want a reply. Do not send
        secrets, health information, or payment card numbers through the form.
      </p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies and local storage</h2>
      <p>
        A theme preference (<code>light</code> or <code>dark</code>) is stored in
        localStorage so the notebook palette does not flash on repeat visits.
        Analytics cookies follow the vendors&apos; own policies.
      </p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Third parties</h2>
      <p>
        LinkedIn, Google Drive (the résumé), Cal.com, Formspree, Google Analytics,
        and PostHog each have their own privacy policies. Following those links
        leaves lapscher.com.
      </p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Requests</h2>
      <p>
        Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-signal underline">
          {CONTACT_EMAIL}
        </a>{' '}
        to ask what was received from you or to ask that a form submission be
        deleted. Analytics vendors provide their own opt-out tools. This site is not
        directed at children under 13.
      </p>
      <p>Last updated: August 2026.</p>
    </TrustPage>
  );
}
