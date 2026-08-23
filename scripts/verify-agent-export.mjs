import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

const out = join(process.cwd(), 'out');

function read(rel) {
  return readFileSync(join(out, rel), 'utf8');
}

/**
 * Count readable characters the way a no-JS crawler does: drop comments and
 * the contents of script/style elements, then strip remaining tags.
 * Implemented as a scan so we do not use an HTML-filter regexp (CodeQL
 * js/bad-tag-filter).
 */
function visibleText(html) {
  let out = '';
  let i = 0;
  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    if (html[i] !== '<') {
      out += html[i];
      i += 1;
      continue;
    }
    out += ' ';
    const close = html.indexOf('>', i + 1);
    if (close === -1) break;
    const rawName = html.slice(i + 1, close).trim().split(/\s/, 1)[0] ?? '';
    const name = rawName.replace(/^\//, '').toLowerCase();
    i = close + 1;
    if (name !== 'script' && name !== 'style') continue;
    const needle = `</${name}`;
    const rest = html.slice(i).toLowerCase();
    const found = rest.indexOf(needle);
    if (found === -1) {
      i = html.length;
      continue;
    }
    const after = html.indexOf('>', i + found + needle.length);
    i = after === -1 ? html.length : after + 1;
  }
  return out.replace(/\s+/g, ' ').trim();
}

describe('visibleText', () => {
  it('drops script and style bodies, including spaced end tags', () => {
    const html = '<h1>Hello</h1><script>alert(1)</script ><style>h1{color:red}</style ><p>World</p>';
    assert.equal(visibleText(html), 'Hello World');
  });
});

describe('static export is agent-readable', () => {
  it('builds into out/', () => {
    assert.equal(existsSync(out), true, 'run `npm run build` before this test');
  });

  it('homepage HTML has an H1 and 500+ characters without JavaScript', () => {
    const html = read('index.html');
    assert.match(html, /<h1[\s>]/i);
    assert.match(html, /Joe Lapscher/);
    assert.doesNotMatch(html, /BAILOUT_TO_CLIENT_SIDE_RENDERING/);
    assert.ok(visibleText(html).length >= 500);
  });

  it('404.html is a real recovery page with markdown body', () => {
    const html = read('404.html');
    assert.match(html, /<h1[\s>]/i);
    assert.match(html, /llms\.txt/);
    assert.match(html, /sitemap\.xml/);
    assert.match(html, /\[llms\.txt\]\(https:\/\/lapscher\.com\/llms\.txt\)/);
    assert.match(html, /\[Sitemap\]\(https:\/\/lapscher\.com\/sitemap\.xml\)/);
  });

  it('trust pages each have an H1 and 500+ characters', () => {
    for (const rel of ['about.html', 'contact.html', 'privacy.html']) {
      const html = read(rel);
      assert.match(html, /<h1[\s>]/i, `${rel} missing H1`);
      assert.ok(visibleText(html).length >= 500, `${rel} only ${visibleText(html).length} chars`);
    }
  });

  it('publishes Organization JSON-LD with contactPoint and address', () => {
    const html = read('index.html');
    assert.match(html, /"@type":"Organization"/);
    assert.match(html, /"contactPoint"/);
    assert.match(html, /"contactType":"professional inquiries"/);
    assert.match(html, /"email":"yoel@lapscher.com"/);
    assert.match(html, /"address"/);
    assert.match(html, /"@type":"PostalAddress"/);
    assert.match(html, /Hoboken/);
  });

  it('copies machine-readable files into the export', () => {
    for (const rel of [
      'llms.txt',
      'index.md',
      'about.md',
      'contact.md',
      'privacy.md',
      '404.md',
      'sitemap.xml',
    ]) {
      assert.equal(existsSync(join(out, rel)), true, `missing ${rel}`);
    }
    const llms = read('llms.txt');
    assert.match(llms, /^# Joe Lapscher/m);
    assert.match(llms, /^> /m);
    assert.match(llms, /## When to use this/);
    assert.match(llms, /## How to call/);
    assert.ok(read('about.md').length >= 500);
    assert.ok(read('contact.md').length >= 500);
    assert.ok(read('privacy.md').length >= 500);
  });
});
