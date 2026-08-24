/**
 * Captures desktop + mobile screenshots for portfolio projects from live sites.
 * Run: node scripts/capture-portfolio-screenshots.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public/images/portfolio');

const projects = [
  { slug: 'sam-storybook', url: 'https://www.samstorybook.com/' },
  { slug: 'knock-on-block', url: 'https://www.knockonblock.com/' },
  { slug: 'yoga-studio', url: 'https://yoga.lapscher.com/' },
  { slug: 'harbor-parking', url: 'https://parking.lapscher.com/' },
];

function beforeSvg(label, subtitle, bg = '#e8eaed') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
    <rect width="1440" height="900" fill="${bg}"/>
    <rect x="80" y="80" width="1280" height="740" fill="#fff" stroke="#ccc" stroke-width="2"/>
    <text x="720" y="420" text-anchor="middle" font-family="monospace" font-size="42" fill="#5b6874">${label}</text>
    <text x="720" y="480" text-anchor="middle" font-family="monospace" font-size="24" fill="#8b98a4">${subtitle}</text>
  </svg>`;
}

function whatsappSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
    <rect width="1440" height="900" fill="#ece5dd"/>
    <rect x="520" y="60" width="400" height="780" rx="8" fill="#fff" stroke="#ccc"/>
    <text x="720" y="120" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#075e54">Parking Group · 47 messages</text>
    <rect x="540" y="160" width="280" height="48" rx="8" fill="#dcf8c6"/>
    <text x="560" y="190" font-family="sans-serif" font-size="14" fill="#333">Anyone free spot 3 tonight?</text>
    <rect x="620" y="230" width="280" height="48" rx="8" fill="#fff"/>
    <text x="640" y="260" font-family="sans-serif" font-size="14" fill="#333">I thought I had it??</text>
    <rect x="540" y="300" width="320" height="48" rx="8" fill="#dcf8c6"/>
    <text x="560" y="330" font-family="sans-serif" font-size="14" fill="#333">Double booked again</text>
    <rect x="600" y="370" width="300" height="48" rx="8" fill="#fff"/>
    <text x="620" y="400" font-family="sans-serif" font-size="14" fill="#333">Who has spot 7 tomorrow?</text>
    <text x="720" y="820" text-anchor="middle" font-family="monospace" font-size="20" fill="#5b6874">WhatsApp chaos</text>
  </svg>`;
}

async function saveScreenshot(buffer, dest) {
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buffer);
}

async function generateBeforeImages() {
  const befores = [
    { slug: 'sam-storybook', svg: beforeSvg('Generic photo album', 'Static pages, no customization') },
    { slug: 'knock-on-block', svg: beforeSvg('No web presence', 'Word-of-mouth referrals only', '#dfe6ee') },
    { slug: 'harbor-parking', svg: whatsappSvg() },
  ];

  for (const item of befores) {
    const dest = join(outDir, item.slug, 'before.png');
    await saveScreenshot(Buffer.from(item.svg), dest);
  }
}

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });

  for (const project of projects) {
    const projectDir = join(outDir, project.slug);
    await mkdir(projectDir, { recursive: true });

    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();
    try {
      await desktopPage.goto(project.url, { waitUntil: 'networkidle', timeout: 60000 });
      await desktopPage.waitForTimeout(2000);

      const desktopBuffer = await desktopPage.screenshot({ fullPage: false, type: 'png' });
      await saveScreenshot(desktopBuffer, join(projectDir, 'desktop-1.png'));
      await saveScreenshot(desktopBuffer, join(projectDir, 'hero.png'));
      await saveScreenshot(desktopBuffer, join(projectDir, 'thumbnail.png'));
      await saveScreenshot(desktopBuffer, join(projectDir, 'after.png'));

      await desktopPage.evaluate(() => window.scrollBy(0, window.innerHeight * 0.6));
      await desktopPage.waitForTimeout(800);
      const scrollBuffer = await desktopPage.screenshot({ fullPage: false, type: 'png' });
      await saveScreenshot(scrollBuffer, join(projectDir, 'desktop-2.png'));
    } catch (err) {
      console.warn(`Failed desktop capture for ${project.slug}:`, err.message);
    }
    await desktopContext.close();

    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    try {
      await mobilePage.goto(project.url, { waitUntil: 'networkidle', timeout: 60000 });
      await mobilePage.waitForTimeout(2000);
      const mobileBuffer = await mobilePage.screenshot({ fullPage: false, type: 'png' });
      await saveScreenshot(mobileBuffer, join(projectDir, 'mobile-1.png'));
    } catch (err) {
      console.warn(`Failed mobile capture for ${project.slug}:`, err.message);
    }
    await mobileContext.close();
  }

  await browser.close();
}

async function main() {
  console.log('Generating before images...');
  await generateBeforeImages();
  console.log('Capturing live site screenshots...');
  await captureScreenshots();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
