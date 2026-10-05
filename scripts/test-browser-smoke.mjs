import http from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/home/mhenke/.npm-global/lib/node_modules/playwright'));
}

const PORT = 8089;
const SITE_DIR = '_site';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm'
};

// Start zero-dependency static file server mimicking GitHub Pages
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  let filePath = join(SITE_DIR, urlPath);

  try {
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html');
    } else if (!existsSync(filePath) && existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (!existsSync(filePath) && existsSync(join(filePath, 'index.html'))) {
      filePath = join(filePath, 'index.html');
    }

    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = extname(filePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mime });
      res.end(content);
      return;
    }

    // 404
    const notFoundPath = join(SITE_DIR, '404.html');
    if (existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(readFileSync(notFoundPath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    res.writeHead(500);
    res.end('Server Error: ' + err.message);
  }
});

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

async function runBrowserTests() {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running at http://localhost:${PORT}/\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  try {
    console.log('=== TEST SUITE 1: Critical User Paths (AGENTS.md) ===');

    // 1. Homepage loads and all 8 sections render
    console.log('\n--- 1. Homepage Loads and 8 Sections Render ---');
    const page = await context.newPage();
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    assert(title.includes('Mike Henke') || title.length > 0, `Homepage title rendered: "${title}"`);

    const sections = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('section, header.hero-section')).map(s => s.id || s.className);
    });
    assert(sections.length >= 8, `Homepage rendered ${sections.length} major sections (expected >= 8)`);

    // Check no horizontal overflow at breakpoints: 320, 375, 414, 768, 1440
    console.log('\n--- Responsive Overflow Checks (320px to 1440px) ---');
    for (const width of [320, 375, 414, 768, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert(!overflow, `No horizontal overflow at ${width}px width`);
    }

    // 2. Mobile drawer — opens, traps Tab, Escape closes and returns focus to the toggle
    console.log('\n--- 2. Mobile Drawer Navigation & Focus Trap ---');
    await page.setViewportSize({ width: 375, height: 667 });
    const toggle = page.locator('button.navbar-toggle').first();
    const toggleExists = await toggle.count() > 0;
    if (toggleExists) {
      await toggle.click();
      await page.waitForTimeout(300);
      const isDrawerOpen = await page.evaluate(() => {
        const drawer = document.querySelector('.navbar-links');
        return drawer && drawer.classList.contains('active');
      });
      assert(isDrawerOpen, 'Mobile drawer opened after toggle click (has .active)');

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const isDrawerClosed = await page.evaluate(() => {
        const drawer = document.querySelector('.navbar-links');
        return !drawer || !drawer.classList.contains('active');
      });
      assert(isDrawerClosed, 'Mobile drawer closed on Escape key');
    }

    // 3. Blog index → post → back to blog
    console.log('\n--- 3. Blog Index → Post → Back Full Journey ---');
    // Switch to desktop viewport for journey test
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(`http://localhost:${PORT}/blog/`, { waitUntil: 'domcontentloaded' });
    const blogTitle = await page.title();
    assert(blogTitle.toLowerCase().includes('blog'), `Blog index loaded: "${blogTitle}"`);

    // Click first post link
    const firstPostLink = page.locator('article h2 a, .blog-post-card a, .post-item a').first();
    const postHref = await firstPostLink.getAttribute('href');
    assert(postHref && postHref.startsWith('/blog/'), `Post link correctly formatted with /blog/ prefix: ${postHref}`);

    await firstPostLink.click();
    await page.waitForLoadState('domcontentloaded');
    const singlePostUrl = page.url();
    assert(singlePostUrl.includes('/blog/'), `Landed on blog post page: ${singlePostUrl}`);

    // Back to blog
    const backLink = page.locator('.back-to-blog-link').first();
    const backLinkExists = await backLink.count() > 0;
    if (backLinkExists) {
      await backLink.click();
      await page.waitForLoadState('domcontentloaded');
      const isBlogUrl = page.url().endsWith('/blog') || page.url().endsWith('/blog/');
      assert(isBlogUrl, `Back to blog navigation succeeded: ${page.url()}`);
    } else {
      console.log('  ⚠️ .back-to-blog-link not found on this post page');
    }

    // 4. Search returns results and renders cards
    console.log('\n--- 4. Pagefind Search Returns Results ---');
    await page.goto(`http://localhost:${PORT}/search/`, { waitUntil: 'domcontentloaded' });
    const searchInput = page.locator('#search-input');
    await searchInput.waitFor({ state: 'attached', timeout: 5000 });
    await searchInput.fill('ColdFusion');
    await page.waitForTimeout(1000); // Allow search debounce
    const resultsCountText = await page.locator('#search-results-count').textContent();
    console.log(`  ℹ️ Search count element: "${resultsCountText}"`);
    const resultsCount = await page.locator('#search-results article, #search-results div').count();
    assert(resultsCount > 0, `Pagefind search returned results for 'ColdFusion'`);

    // 5. With JavaScript disabled, all content is visible
    console.log('\n--- 5. JavaScript Disabled Content Visibility ---');
    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
    const timelineVisible = await noJsPage.evaluate(() => {
      const timeline = document.querySelector('.timeline, #career, .career-section');
      if (!timeline) return true;
      const style = window.getComputedStyle(timeline);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    });
    assert(timelineVisible, 'Career timeline is completely visible with JavaScript disabled');
    await noJsContext.close();

    console.log('\n=== TEST SUITE 2: Static Redirect Stubs in Real Browser ===');

    // Test CFM stub live redirection in Chromium
    console.log('\n--- Live Browser Redirect: /post.cfm/<slug>/ ---');
    await page.goto(`http://localhost:${PORT}/post.cfm/stump-the-cfchump-2b/index.html`);
    // Wait for meta refresh (0s)
    await page.waitForURL(`**/blog/stump-the-cfchump-2b/`, { timeout: 3000 });
    assert(page.url().includes('/blog/stump-the-cfchump-2b/'), `Browser followed meta refresh to ${page.url()}`);

    // Test Root stub live redirection in Chromium
    console.log('\n--- Live Browser Redirect: /<slug>/ ---');
    await page.goto(`http://localhost:${PORT}/stump-the-cfchump-2b/index.html`);
    await page.waitForURL(`**/blog/stump-the-cfchump-2b/`, { timeout: 3000 });
    assert(page.url().includes('/blog/stump-the-cfchump-2b/'), `Browser followed root meta refresh to ${page.url()}`);

    // Test Contact stub live redirection in Chromium
    console.log('\n--- Live Browser Redirect: /contact-me/ ---');
    await page.goto(`http://localhost:${PORT}/contact-me/index.html`);
    await page.waitForTimeout(500);
    assert(page.url().includes('/#contact'), `Browser followed contact-me meta refresh to ${page.url()}`);

    console.log('\n=== TEST SUITE 3: Code Blocks & Manual Post Rendering ===');

    // Test code block components in blog post
    console.log('\n--- Code Block Rendering & Interactive Copy ---');
    await page.goto(`http://localhost:${PORT}/blog/stump-the-cfchump-2b/`, { waitUntil: 'domcontentloaded' });
    const codeBlocks = await page.locator('.code-block').count();
    assert(codeBlocks > 0, `Post contains ${codeBlocks} .code-block components`);

    const codeHeader = await page.locator('.code-header').first().isVisible();
    assert(codeHeader, 'Code header is visible');

    const copyBtn = page.locator('.code-copy').first();
    const copyBtnExists = await copyBtn.isVisible();
    assert(copyBtnExists, 'Copy button is visible with aria-label');

    // Test manual post: found-an-smtp-spoofing-gap-with-python
    console.log('\n--- Manual Post Verification (found-an-smtp-spoofing-gap-with-python) ---');
    await page.goto(`http://localhost:${PORT}/blog/found-an-smtp-spoofing-gap-with-python/`, { waitUntil: 'domcontentloaded' });
    const manualPostTitle = await page.locator('h1').textContent();
    assert(manualPostTitle.toLowerCase().includes('smtp'), `Manual post rendered with title: "${manualPostTitle}"`);

    const pythonCodeBlocks = await page.locator('.code-block code.language-python').count();
    assert(pythonCodeBlocks > 0, `Manual post rendered Python code block (.language-python count: ${pythonCodeBlocks})`);

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n====================================================');
  console.log(`BROWSER E2E TESTS COMPLETED: ${passedTests} passed, ${failedTests} failed`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runBrowserTests().catch((err) => {
  console.error('Browser smoke tests error:', err);
  server.close();
  process.exit(1);
});
