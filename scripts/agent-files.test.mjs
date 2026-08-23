import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

const pub = join(process.cwd(), 'public');

function read(rel) {
  return readFileSync(join(pub, rel), 'utf8');
}

describe('committed agent files follow published formats', () => {
  it('llms.txt matches llmstxt.org v2 and includes when-to-use guidance', () => {
    const text = read('llms.txt');
    assert.match(text, /^# Joe Lapscher\n/);
    assert.match(text, /^> /m);
    assert.match(text, /## When to use this/);
    assert.match(text, /## How to call/);
    assert.match(text, /## Pages/);
    assert.match(text, /- \[Home\]\(https:\/\/lapscher\.com\/index\.md\)/);
    assert.match(text, /no savings, no fee/);
    assert.match(text, /yoel@lapscher.com/);
    assert.match(text, /cal.com\/joe-erc\/15min/);
  });

  it('404.md points agents at sitemap, llms.txt, and contact', () => {
    const text = read('404.md');
    assert.match(text, /^# Page not found/m);
    assert.match(text, /\[llms\.txt\]\(https:\/\/lapscher\.com\/llms\.txt\)/);
    assert.match(text, /\[Sitemap\]\(https:\/\/lapscher\.com\/sitemap\.xml\)/);
    assert.match(text, /\[Contact\]\(https:\/\/lapscher\.com\/contact\)/);
  });

  it('trust markdown pages are at least 500 characters', () => {
    for (const rel of ['about.md', 'contact.md', 'privacy.md', 'index.md']) {
      const text = read(rel);
      assert.ok(text.length >= 500, `${rel} is ${text.length} chars`);
      assert.match(text, /^# /m);
    }
  });
});
