/**
 * Accept-header negotiation for text/markdown vs text/html.
 *
 * Follows acceptmarkdown.com / RFC 9110: rank by q-value, break ties by
 * specificity, treat q=0 as an explicit refusal. Do not substring-match.
 */

export const MARKDOWN_TYPE = 'text/markdown';
export const HTML_TYPE = 'text/html';

export const SUPPORTED_TYPES = [MARKDOWN_TYPE, HTML_TYPE] as const;

export type SupportedType = (typeof SUPPORTED_TYPES)[number];

export type Negotiation =
  | { ok: true; type: SupportedType }
  | { ok: false; status: 406 };

type AcceptEntry = {
  type: string;
  subtype: string;
  q: number;
  specificity: number;
};

const DEFAULT_HTML: Negotiation = { ok: true, type: HTML_TYPE };

function specificity(type: string, subtype: string): number {
  if (type === '*' && subtype === '*') return 1;
  if (subtype === '*') return 2;
  return 3;
}

function parseEntry(raw: string): AcceptEntry | null {
  const parts = raw.split(';').map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return null;

  const media = parts[0].toLowerCase();
  const slash = media.indexOf('/');
  if (slash === -1) return null;

  const type = media.slice(0, slash).trim();
  const subtype = media.slice(slash + 1).trim();
  if (!type || !subtype) return null;

  let q = 1;
  for (const param of parts.slice(1)) {
    const eq = param.indexOf('=');
    if (eq === -1) continue;
    const key = param.slice(0, eq).trim().toLowerCase();
    if (key !== 'q') continue;
    const value = Number.parseFloat(param.slice(eq + 1).trim());
    if (Number.isFinite(value)) {
      q = Math.min(1, Math.max(0, value));
    }
  }

  return { type, subtype, q, specificity: specificity(type, subtype) };
}

export function parseAccept(header: string | null | undefined): AcceptEntry[] {
  if (header == null) return [];
  const trimmed = header.trim();
  if (trimmed === '') return [];

  const entries: AcceptEntry[] = [];
  for (const chunk of trimmed.split(',')) {
    const entry = parseEntry(chunk);
    if (entry) entries.push(entry);
  }
  return entries;
}

function matches(entry: AcceptEntry, offered: string): boolean {
  const slash = offered.indexOf('/');
  const type = offered.slice(0, slash);
  const subtype = offered.slice(slash + 1);
  if (entry.type === '*' && entry.subtype === '*') return true;
  if (entry.type === type && entry.subtype === '*') return true;
  return entry.type === type && entry.subtype === subtype;
}

/** Most specific matching entry's q, or -1 if nothing matched. */
function score(entries: AcceptEntry[], offered: string): { q: number; specificity: number } {
  let matched: AcceptEntry | null = null;
  for (const entry of entries) {
    if (!matches(entry, offered)) continue;
    if (!matched || entry.specificity > matched.specificity) {
      matched = entry;
    }
  }
  if (!matched) return { q: -1, specificity: 0 };
  return { q: matched.q, specificity: matched.specificity };
}

/**
 * Choose text/markdown or text/html from an Accept header.
 * Missing Accept means HTML (the site default). Empty Accept is 406.
 */
export function negotiate(acceptHeader: string | null | undefined): Negotiation {
  if (acceptHeader == null) return DEFAULT_HTML;

  const trimmed = acceptHeader.trim();
  if (trimmed === '') {
    return { ok: false, status: 406 };
  }

  const entries = parseAccept(trimmed);
  if (entries.length === 0) {
    return { ok: false, status: 406 };
  }

  let winner: SupportedType | null = null;
  let winnerQ = 0;
  let winnerSpecificity = 0;

  for (const offered of SUPPORTED_TYPES) {
    const { q, specificity } = score(entries, offered);
    if (q <= 0) continue;

    const betterQ = q > winnerQ;
    const betterSpecificity = q === winnerQ && specificity > winnerSpecificity;
    // Equal q and specificity: prefer HTML, the site's default representation.
    const preferDefault = q === winnerQ && specificity === winnerSpecificity && offered === HTML_TYPE;
    if (betterQ || betterSpecificity || preferDefault) {
      winner = offered;
      winnerQ = q;
      winnerSpecificity = specificity;
    }
  }

  if (!winner || winnerQ <= 0) {
    return { ok: false, status: 406 };
  }

  return { ok: true, type: winner };
}

export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  const result = negotiate(acceptHeader);
  return result.ok && result.type === MARKDOWN_TYPE;
}

/** Response header required by acceptmarkdown.com on negotiated bodies. */
export const VARY_ACCEPT = 'Accept, Accept-Encoding';

export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';
export const HTML_CONTENT_TYPE = 'text/html; charset=utf-8';
