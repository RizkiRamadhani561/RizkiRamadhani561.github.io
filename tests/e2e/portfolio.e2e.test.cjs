const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { after, afterEach, before, beforeEach, test } = require('node:test');

function loadPlaywright() {
  const packagePaths = process.env.PATH.split(path.delimiter)
    .map((binPath) => path.resolve(binPath, '..', 'playwright'));
  const packagePath = packagePaths.find((candidate) =>
    fs.existsSync(path.join(candidate, 'package.json')),
  );

  if (!packagePath) {
    throw new Error(
      'Playwright was not found. Run this test through npm exec --package=playwright.',
    );
  }

  return require(packagePath);
}

const { chromium } = loadPlaywright();
const outputDirectory = path.resolve(__dirname, '../../out');
const port = Number(process.env.PORT || 4173);
const baseUrl = `http://127.0.0.1:${port}`;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

let server;
let browser;
let page;

function serveStaticExport(request, response) {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(request.url, baseUrl).pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  let filePath = path.resolve(outputDirectory, `.${pathname}`);
  const isInsideOutput =
    filePath === outputDirectory || filePath.startsWith(outputDirectory + path.sep);

  if (!isInsideOutput) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && path.extname(filePath) === '') {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
  });
  fs.createReadStream(filePath).pipe(response);
}

before(async () => {
  assert.ok(
    fs.existsSync(path.join(outputDirectory, 'index.html')),
    'Static export not found. Run npm run build before the browser tests.',
  );

  server = http.createServer(serveStaticExport);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });

  browser = await chromium.launch({ headless: true });
});

beforeEach(async () => {
  page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'no-preference',
  });
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.locator('#home h1').waitFor({ state: 'visible' });
});

afterEach(async () => {
  if (page) {
    await page.close();
    page = undefined;
  }
});

after(async () => {
  if (browser) await browser.close();
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('renders all primary portfolio sections and desktop navigation links', async () => {
  for (const sectionId of ['home', 'about', 'skills', 'journey', 'work', 'contact']) {
    assert.equal(
      await page.locator(`#${sectionId}`).count(),
      1,
      `Expected exactly one #${sectionId} section`,
    );
  }

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const label of ['Home', 'About', 'Toolkit', 'Journey', 'Work', 'Contact']) {
    assert.equal(
      await navigation.getByRole('link', { name: label, exact: true }).count(),
      1,
      `Expected a desktop navigation link named ${label}`,
    );
  }
});

test('desktop active navigation follows the section visible in the viewport', async () => {
  await page.locator('#journey').evaluate((section) => {
    const top = section.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, left: 0, behavior: 'instant' });
  });

  await page.waitForFunction(
    () =>
      document
        .querySelector('.global-desktop-nav a[href="/#journey"]')
        ?.getAttribute('aria-current') === 'location',
    { timeout: 5000 },
  );

  assert.equal(
    await page.locator('.global-desktop-nav a[href="/#home"]').getAttribute('aria-current'),
    null,
    'Home should not remain active while Journey is the visible section',
  );
});

test('mobile menu opens with the keyboard and closes after choosing a section', async () => {
  await page.setViewportSize({ width: 390, height: 844 });

  const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
  assert.equal(await menuButton.isVisible(), true);

  await menuButton.focus();
  await page.keyboard.press('Enter');
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'true');

  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
  assert.equal(await mobileNavigation.isVisible(), true);

  await mobileNavigation.getByRole('link', { name: 'Journey', exact: true }).click();
  await page.waitForURL((url) => url.hash === '#journey');

  await page.waitForFunction(
    () => document.querySelector('.global-menu')?.getAttribute('aria-expanded') === 'false',
  );
});

test('theme toggle updates the document theme and persists the selection', async () => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.evaluate(() => localStorage.setItem('rizki-theme', 'light'));
  await page.reload({ waitUntil: 'domcontentloaded' });

  const themeButton = page.getByRole('button', { name: 'Toggle color theme' });
  await themeButton.click();

  await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
  assert.equal(await page.evaluate(() => localStorage.getItem('rizki-theme')), 'dark');
});

test('layout does not introduce horizontal overflow on mobile, tablet, or desktop', async () => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(150);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      ),
    }));

    assert.ok(
      dimensions.document <= dimensions.viewport + 1,
      `Horizontal overflow at ${width}px: document width ${dimensions.document}px, viewport ${dimensions.viewport}px`,
    );
  }
});

test('respects the reduced-motion preference', async () => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(150);

  assert.equal(
    await page.locator('.loader-screen').count(),
    0,
    'The animated loader should be skipped when reduced motion is requested',
  );
});
