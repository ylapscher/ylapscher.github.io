/**
 * One-off compressor for public images.
 * Run: node scripts/compress-images.mjs
 *
 * - climbing.png → climbing.webp at 1600px
 * - barber JPGs recompressed around 150KB
 * - unique portfolio screenshots → WebP at 1440px
 * - SVG-as-.png "before" plates rasterized to WebP
 * - unused and duplicate files deleted
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

async function writeWebp(input, dest, { width, quality = 72 } = {}) {
  await mkdir(dirname(dest), { recursive: true });
  let pipeline = sharp(input, { failOn: 'none' });
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  const buffer = await pipeline.webp({ quality }).toBuffer();
  await writeFile(dest, buffer);
  return buffer.length;
}

async function writeJpeg(input, dest, { width, quality = 68 } = {}) {
  await mkdir(dirname(dest), { recursive: true });
  let pipeline = sharp(input, { failOn: 'none' });
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  const buffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
  await writeFile(dest, buffer);
  return buffer.length;
}

async function rasterizeSvg(svgPath, dest, { width = 1440, height = 900, quality = 70 } = {}) {
  const svg = await readFile(svgPath);
  const buffer = await sharp(svg, { density: 96 })
    .resize(width, height, { fit: 'fill' })
    .webp({ quality })
    .toBuffer();
  await writeFile(dest, buffer);
  return buffer.length;
}

const unused = [
  'images/initiatives/blockchain.png',
  'images/initiatives/yjp.png',
  'images/companies/lapscher.png',
  'next.svg',
  'vercel.svg',
  'globe.svg',
  'window.svg',
  'file.svg',
];

const portfolioSlugs = ['sam-storybook', 'knock-on-block', 'yoga-studio', 'harbor-parking'];

async function main() {
  const climbingIn = join(pub, 'images/initiatives/climbing.png');
  const climbingOut = join(pub, 'images/initiatives/climbing.webp');
  const climbingBytes = await writeWebp(climbingIn, climbingOut, { width: 1600, quality: 68 });
  console.log('climbing.webp', climbingBytes);
  await rm(climbingIn, { force: true });

  for (const name of ['before-after-1.jpg', 'before-after-2.jpg', 'before-after-3.jpg']) {
    const path = join(pub, 'images/barber', name);
    const tmp = `${path}.tmp`;
    const bytes = await writeJpeg(path, tmp, { width: 1600, quality: 68 });
    await rm(path);
    const { rename } = await import('node:fs/promises');
    await rename(tmp, path);
    console.log(name, bytes);
  }

  for (const slug of portfolioSlugs) {
    const dir = join(pub, 'images/portfolio', slug);
    const heroPng = join(dir, 'hero.png');
    const heroWebp = join(dir, 'hero.webp');
    console.log(slug, 'hero', await writeWebp(heroPng, heroWebp, { width: 1440, quality: 74 }));

    for (const extra of ['desktop-2.png', 'mobile-1.png']) {
      const src = join(dir, extra);
      try {
        const dest = src.replace(/\.png$/, '.webp');
        console.log(slug, extra, await writeWebp(src, dest, { width: extra.includes('mobile') ? 800 : 1440, quality: 74 }));
      } catch {
        // optional
      }
    }

    const beforePng = join(dir, 'before.png');
    try {
      const beforeWebp = join(dir, 'before.webp');
      const raw = await readFile(beforePng);
      if (raw.slice(0, 4).toString() === '<svg' || raw.includes('<svg')) {
        console.log(slug, 'before svg→webp', await rasterizeSvg(beforePng, beforeWebp));
      } else {
        console.log(slug, 'before', await writeWebp(beforePng, beforeWebp, { width: 1440, quality: 74 }));
      }
    } catch {
      // yoga has no before
    }

    for (const leftover of ['hero.png', 'thumbnail.png', 'desktop-1.png', 'desktop-2.png', 'mobile-1.png', 'after.png', 'before.png']) {
      await rm(join(dir, leftover), { force: true });
    }
  }

  for (const rel of unused) {
    await rm(join(pub, rel), { force: true });
    console.log('deleted', rel);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
