import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { organizationSchema, personSchema, notFoundMarkdown } from './structured-data';

describe('Organization schema completeness', () => {
  it('includes contactPoint with email and contactType', () => {
    assert.equal(organizationSchema['@type'], 'Organization');
    assert.equal(organizationSchema.contactPoint['@type'], 'ContactPoint');
    assert.equal(organizationSchema.contactPoint.email, 'yoel@lapscher.com');
    assert.equal(organizationSchema.contactPoint.contactType, 'professional inquiries');
  });

  it('includes PostalAddress', () => {
    assert.equal(organizationSchema.address['@type'], 'PostalAddress');
    assert.equal(organizationSchema.address.addressLocality, 'Hoboken');
    assert.equal(organizationSchema.address.addressRegion, 'New Jersey');
    assert.equal(organizationSchema.address.addressCountry, 'US');
  });

  it('keeps nested worksFor Organization complete so auditors do not score the thin node', () => {
    const org = personSchema.worksFor;
    assert.equal(org['@type'], 'Organization');
    assert.ok(org.contactPoint?.email);
    assert.ok(org.address?.addressRegion);
  });

  it('404 markdown points at sitemap and llms.txt', () => {
    assert.match(notFoundMarkdown, /llms\.txt/);
    assert.match(notFoundMarkdown, /sitemap\.xml/);
  });
});
