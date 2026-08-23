import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { negotiate, prefersMarkdown } from './accept.ts';
import { markdownAssetForPath, normalizePathname } from './markdown-paths.ts';

describe('negotiate (acceptmarkdown.com vectors)', () => {
  it('serves markdown for Accept: text/markdown', () => {
    const result = negotiate('text/markdown');
    assert.deepEqual(result, { ok: true, type: 'text/markdown' });
    assert.equal(prefersMarkdown('text/markdown'), true);
  });

  it('serves markdown when markdown is preferred over html', () => {
    assert.deepEqual(negotiate('text/markdown, text/html;q=0.8'), {
      ok: true,
      type: 'text/markdown',
    });
  });

  it('serves html for Accept: text/html', () => {
    assert.deepEqual(negotiate('text/html'), { ok: true, type: 'text/html' });
    assert.equal(prefersMarkdown('text/html'), false);
  });

  it('skips markdown when q=0 and html is offered', () => {
    assert.deepEqual(negotiate('text/markdown;q=0, text/html'), {
      ok: true,
      type: 'text/html',
    });
  });

  it('returns 406 when the only offered type is refused', () => {
    assert.deepEqual(negotiate('text/markdown;q=0'), { ok: false, status: 406 });
  });

  it('returns 406 for application/xml with no wildcard', () => {
    assert.deepEqual(negotiate('application/xml'), { ok: false, status: 406 });
  });

  it('serves html when Accept is missing', () => {
    assert.deepEqual(negotiate(undefined), { ok: true, type: 'text/html' });
    assert.deepEqual(negotiate(null), { ok: true, type: 'text/html' });
  });

  it('serves html for */*', () => {
    assert.deepEqual(negotiate('*/*'), { ok: true, type: 'text/html' });
  });

  it('does not treat Chrome html Accept as markdown', () => {
    const chrome =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';
    assert.deepEqual(negotiate(chrome), { ok: true, type: 'text/html' });
  });

  it('honors text/* over */* when ranking markdown vs html', () => {
    assert.deepEqual(negotiate('text/markdown, */*'), {
      ok: true,
      type: 'text/markdown',
    });
  });

  it('treats empty Accept as 406', () => {
    assert.deepEqual(negotiate(''), { ok: false, status: 406 });
  });
});

describe('markdownAssetForPath', () => {
  it('maps the homepage and trust pages', () => {
    assert.equal(markdownAssetForPath('/'), '/index.md');
    assert.equal(markdownAssetForPath('/about/'), '/about.md');
    assert.equal(markdownAssetForPath('/contact'), '/contact.md');
    assert.equal(markdownAssetForPath('/privacy'), '/privacy.md');
  });

  it('passes through existing markdown URLs', () => {
    assert.equal(markdownAssetForPath('/index.md'), '/index.md');
    assert.equal(markdownAssetForPath('/llms.txt'), '/llms.txt');
  });

  it('returns null for unknown paths so the negotiator can 404', () => {
    assert.equal(markdownAssetForPath('/this-path-does-not-exist-xyz'), null);
    assert.equal(normalizePathname('/foo/?q=1'), '/foo');
  });
});
