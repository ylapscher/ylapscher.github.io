import type { Config, Context } from '@netlify/edge-functions';

import {
  HTML_CONTENT_TYPE,
  MARKDOWN_CONTENT_TYPE,
  VARY_ACCEPT,
  negotiate,
} from '../../app/lib/accept.ts';
import { markdownAssetForPath } from '../../app/lib/markdown-paths.ts';

const VARY = VARY_ACCEPT;
const LINK_DESCRIBEDBY = '</llms.txt>; rel="describedby"';

function withNegotiationHeaders(headers: Headers, extraLink?: string): Headers {
  const next = new Headers(headers);
  next.set('Vary', VARY);
  const link = extraLink ? `${extraLink}, ${LINK_DESCRIBEDBY}` : LINK_DESCRIBEDBY;
  const existing = next.get('Link');
  next.set('Link', existing ? `${existing}, ${link}` : link);
  return next;
}

async function fetchAsset(request: Request, assetPath: string): Promise<Response> {
  const url = new URL(assetPath, request.url);
  return fetch(url);
}

async function markdownResponse(request: Request, assetPath: string, status: number): Promise<Response> {
  const upstream = await fetchAsset(request, assetPath);
  const body = await upstream.text();
  if (!upstream.ok && status === 200) {
    return markdownResponse(request, '/404.md', 404);
  }
  const headers = withNegotiationHeaders(
    new Headers({
      'Content-Type': MARKDOWN_CONTENT_TYPE,
      'Cache-Control': 'public, max-age=300',
    }),
    assetPath !== '/404.md' && assetPath !== '/llms.txt'
      ? `<${assetPath}>; rel="alternate"; type="text/markdown"`
      : undefined
  );
  return new Response(body, { status, headers });
}

export default async (request: Request, context: Context) => {
  const accept = request.headers.get('Accept');
  const decision = negotiate(accept);
  const path = new URL(request.url).pathname;
  const asset = markdownAssetForPath(path);

  if (!decision.ok) {
    const headers = withNegotiationHeaders(
      new Headers({
        'Content-Type': 'text/plain; charset=utf-8',
      })
    );
    return new Response(
      '406 Not Acceptable\n\nSupported types: text/html, text/markdown\nSee /llms.txt\n',
      { status: 406, headers }
    );
  }

  if (decision.type === 'text/markdown') {
    if (asset) {
      return markdownResponse(request, asset, 200);
    }
    return markdownResponse(request, '/404.md', 404);
  }

  const html = await context.next();
  const headers = withNegotiationHeaders(new Headers(html.headers), asset
    ? `<${asset}>; rel="alternate"; type="text/markdown"`
    : undefined);
  return new Response(html.body, {
    status: html.status,
    statusText: html.statusText,
    headers,
  });
};

export const config: Config = {
  path: '/*',
  excludedPath: [
    '/_next/*',
    '/images/*',
    '/favicons/*',
    '/maps/*',
    '/data/*',
    '/*.css',
    '/*.js',
    '/*.woff',
    '/*.woff2',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.svg',
    '/*.ico',
    '/*.xml',
    '/*.webmanifest',
    '/*.json',
  ],
};
