import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const siteDir = '_site';
const postsDir = 'output/posts';

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: {
    build: {},
    redirectStubs: {},
    canonicalPosts: {},
    codeBlocks: {},
    shortcodes: {},
    linkIntegrity: {},
    searchIndex: {},
    securityScan: {}
  }
};

function assert(condition, message, category) {
  if (condition) {
    results.passed++;
  } else {
    results.failed++;
    console.error(`❌ [${category}] FAIL: ${message}`);
    if (!results.details[category].errors) results.details[category].errors = [];
    results.details[category].errors.push(message);
  }
}

function warn(message, category) {
  results.warnings++;
  console.warn(`⚠️ [${category}] WARN: ${message}`);
  if (!results.details[category].warnings) results.details[category].warnings = [];
  results.details[category].warnings.push(message);
}

console.log('====================================================');
console.log('STARTING INCIDENT RESPONSE REGRESSION TEST SUITE');
console.log('====================================================\n');

// 1. Build Artifacts Verification
console.log('--- 1. Build Artifacts Verification ---');
assert(existsSync(siteDir), '_site directory exists', 'build');
assert(existsSync(join(siteDir, 'index.html')), '_site/index.html exists', 'build');
assert(existsSync(join(siteDir, 'blog/index.html')), '_site/blog/index.html exists', 'build');
assert(existsSync(join(siteDir, 'search/index.html')), '_site/search/index.html exists', 'build');
assert(existsSync(join(siteDir, '_redirects')), '_site/_redirects exists', 'build');

const posts = readdirSync(postsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

results.details.build.totalSourcePosts = posts.length;
assert(posts.length === 385, `Source posts count is 385 (found ${posts.length})`, 'build');

// 2. Redirect Stubs Quality & Crawler Compatibility
console.log('--- 2. Redirect Stubs Quality & Crawler Compatibility ---');
let cfmStubCount = 0;
let rootStubCount = 0;
let validCfmStubs = 0;
let validRootStubs = 0;

for (const slug of posts) {
  const cfmStubPath = join(siteDir, 'post.cfm', slug, 'index.html');
  const rootStubPath = join(siteDir, slug, 'index.html');
  const expectedTarget = `/blog/${slug}/`;

  // Test CFM stub
  if (existsSync(cfmStubPath)) {
    cfmStubCount++;
    const content = readFileSync(cfmStubPath, 'utf8');
    const hasMetaRefresh = content.includes(`<meta http-equiv="refresh" content="0; url=${expectedTarget}">`);
    const hasCanonical = content.includes(`<link rel="canonical" href="${expectedTarget}">`);
    const hasRobots = content.includes('<meta name="robots" content="noindex, follow">');
    const hasFallbackLink = content.includes(`<a href="${expectedTarget}">`);
    const hasDocType = content.includes('<!DOCTYPE html>');
    const noPagefind = !content.includes('data-pagefind-body');

    if (hasMetaRefresh && hasCanonical && hasRobots && hasFallbackLink && hasDocType && noPagefind) {
      validCfmStubs++;
    } else {
      assert(false, `CFM stub malformed for ${slug}`, 'redirectStubs');
    }
  } else {
    assert(false, `Missing CFM stub for ${slug}`, 'redirectStubs');
  }

  // Test root stub
  if (existsSync(rootStubPath)) {
    rootStubCount++;
    const content = readFileSync(rootStubPath, 'utf8');
    const hasMetaRefresh = content.includes(`<meta http-equiv="refresh" content="0; url=${expectedTarget}">`);
    const hasCanonical = content.includes(`<link rel="canonical" href="${expectedTarget}">`);
    const hasRobots = content.includes('<meta name="robots" content="noindex, follow">');
    const hasFallbackLink = content.includes(`<a href="${expectedTarget}">`);
    const hasDocType = content.includes('<!DOCTYPE html>');
    const noPagefind = !content.includes('data-pagefind-body');

    if (hasMetaRefresh && hasCanonical && hasRobots && hasFallbackLink && hasDocType && noPagefind) {
      validRootStubs++;
    } else {
      assert(false, `Root stub malformed for ${slug}`, 'redirectStubs');
    }
  } else {
    assert(false, `Missing Root stub for ${slug}`, 'redirectStubs');
  }
}

// Test contact-me stub
const contactStubPath = join(siteDir, 'contact-me', 'index.html');
let validContactStub = false;
if (existsSync(contactStubPath)) {
  const content = readFileSync(contactStubPath, 'utf8');
  const hasMetaRefresh = content.includes('<meta http-equiv="refresh" content="0; url=/#contact">');
  const hasCanonical = content.includes('<link rel="canonical" href="/#contact">');
  const hasRobots = content.includes('<meta name="robots" content="noindex, follow">');
  const hasFallbackLink = content.includes('<a href="/#contact">');
  validContactStub = hasMetaRefresh && hasCanonical && hasRobots && hasFallbackLink;
  assert(validContactStub, 'contact-me stub has valid meta refresh, canonical, robots, and fallback link', 'redirectStubs');
} else {
  assert(false, 'Missing contact-me stub at _site/contact-me/index.html', 'redirectStubs');
}

assert(cfmStubCount === 385, `All 385 CFM stubs exist (found ${cfmStubCount})`, 'redirectStubs');
assert(validCfmStubs === 385, `All 385 CFM stubs have valid meta refresh, canonical, robots, fallback link`, 'redirectStubs');
assert(rootStubCount === 385, `All 385 Root stubs exist (found ${rootStubCount})`, 'redirectStubs');
assert(validRootStubs === 385, `All 385 Root stubs have valid meta refresh, canonical, robots, fallback link`, 'redirectStubs');

results.details.redirectStubs = {
  totalCfmStubs: cfmStubCount,
  validCfmStubs,
  totalRootStubs: rootStubCount,
  validRootStubs,
  contactMeStubValid: validContactStub,
  totalRedirectStubs: cfmStubCount + rootStubCount + (validContactStub ? 1 : 0)
};

// 3. Blog Post Canonical Pages & Code Blocks
console.log('--- 3. Blog Post Canonical Pages & Code Blocks ---');
let canonicalPostCount = 0;
let postsWithCodeBlocks = 0;
let totalCodeBlockElements = 0;
let manualPostVerified = false;

for (const slug of posts) {
  const postHtmlPath = join(siteDir, 'blog', slug, 'index.html');
  if (existsSync(postHtmlPath)) {
    canonicalPostCount++;
    const content = readFileSync(postHtmlPath, 'utf8');

    // Check canonical link
    const expectedCanonical = `https://mikehenke.com/blog/${slug}/`;
    const hasCanonical = content.includes(`<meta property="og:url" content="${expectedCanonical}">`) ||
                         content.includes(`"url": "${expectedCanonical}"`);
    if (!hasCanonical) {
      warn(`Canonical URL metadata mismatch in blog post: ${slug}`, 'canonicalPosts');
    }

    // Check code blocks
    const codeBlockMatches = content.match(/<div class="code-block">/g);
    if (codeBlockMatches) {
      postsWithCodeBlocks++;
      totalCodeBlockElements += codeBlockMatches.length;

      // Verify code block components
      assert(content.includes('<div class="code-header">'), `Code block in ${slug} has .code-header`, 'codeBlocks');
      assert(content.includes('class="code-language"'), `Code block in ${slug} has .code-language`, 'codeBlocks');
      assert(content.includes('class="code-copy" onclick="copyCode(this)"'), `Code block in ${slug} has copy button`, 'codeBlocks');
      assert(content.includes('<pre class="line-numbers"><code class="language-'), `Code block in ${slug} has pre code syntax`, 'codeBlocks');
    }

    if (slug === 'found-an-smtp-spoofing-gap-with-python') {
      const hasPythonCode = content.includes('language-python') && content.includes('<div class="code-block">');
      assert(hasPythonCode, 'Manual post found-an-smtp-spoofing-gap-with-python contains rendered python code-block', 'codeBlocks');
      manualPostVerified = true;
    }
  } else {
    assert(false, `Missing canonical post page at _site/blog/${slug}/index.html`, 'canonicalPosts');
  }
}

assert(canonicalPostCount === 385, `All 385 canonical blog posts rendered (found ${canonicalPostCount})`, 'canonicalPosts');
assert(manualPostVerified, 'Manual post found-an-smtp-spoofing-gap-with-python successfully verified', 'canonicalPosts');

results.details.canonicalPosts = {
  totalCanonicalPosts: canonicalPostCount,
  postsWithCodeBlocks,
  totalCodeBlockElements
};

// 4. Shortcode & Artifact Cleanliness Verification
console.log('--- 4. Shortcode & Artifact Cleanliness Verification ---');
const forbiddenShortcodeRegexes = [
  { name: 'WordPress [code] shortcode', regex: /\[code(?:\s+[^\]]*)?\][\s\S]*?\[\/code\]/i },
  { name: 'WordPress orphan [/code]', regex: /\[\/code\]/i },
  { name: 'WordPress [podcast] shortcode', regex: /\[podcast\][\s\S]*?\[\/podcast\]/i },
  { name: 'WordPress [embed] shortcode', regex: /\[embed\][\s\S]*?\[\/embed\]/i },
  { name: 'WordPress [lazy_load_box] shortcode', regex: /\[lazy_load_box[^\]]*\]/i },
  { name: 'WordPress [title_box] shortcode', regex: /\[title_box[^\]]*\]/i },
  { name: 'WordPress [service_box] shortcode', regex: /\[service_box[^\]]*\]/i },
  { name: 'WordPress [button] shortcode', regex: /\[button\s+text=[^\]]*\]/i },
  { name: 'WordPress [content_box] shortcode', regex: /\[content_box[^\]]*\]/i },
  { name: 'WordPress [cherry_parallax] shortcode', regex: /\[cherry_parallax[^\]]*\]/i },
  { name: 'WordPress [contact-form-7] shortcode', regex: /\[contact-form-7[^\]]*\]/i },
  { name: 'WordPress [google_api_map] shortcode', regex: /\[google_api_map[^\]]*\]/i },
  { name: 'WordPress [masonry_view] shortcode', regex: /\[masonry_view[^\]]*\]/i },
  { name: 'WordPress [skills_info] shortcode', regex: /\[skills_info[^\]]*\]/i },
  { name: 'WordPress [chronology_info] shortcode', regex: /\[chronology_info[^\]]*\]/i }
];

let shortcodeViolations = 0;
for (const slug of posts) {
  const postHtmlPath = join(siteDir, 'blog', slug, 'index.html');
  if (existsSync(postHtmlPath)) {
    const content = readFileSync(postHtmlPath, 'utf8');
    for (const check of forbiddenShortcodeRegexes) {
      if (check.regex.test(content)) {
        shortcodeViolations++;
        assert(false, `Found unrendered ${check.name} in ${slug}`, 'shortcodes');
      }
    }
  }
}
assert(shortcodeViolations === 0, `Zero unrendered WordPress shortcodes across all 385 posts`, 'shortcodes');

// Check false-positive preservation of technical bracketed content
const antPostPath = join(siteDir, 'blog/unofficial-updater-2-for-adobe-coldfusion-awesome/index.html');
if (existsSync(antPostPath)) {
  const content = readFileSync(antPostPath, 'utf8');
  const hasAntEcho = content.includes('[echo]');
  assert(hasAntEcho, 'Technical Ant [echo] tags correctly preserved without shortcode stripping', 'shortcodes');
} else {
  assert(false, 'Ant post unofficial-updater-2-for-adobe-coldfusion-awesome not found', 'shortcodes');
}

// 5. Internal Link Integrity & Rewrites
console.log('--- 5. Internal Link Integrity & Rewrites ---');
let internalPostCfmLinksFound = 0;
let externalPostCfmLinksFound = 0;
let brokenInternalLinks = 0;
const checkedTargets = new Map();

for (const slug of posts) {
  const postHtmlPath = join(siteDir, 'blog', slug, 'index.html');
  if (!existsSync(postHtmlPath)) continue;
  const content = readFileSync(postHtmlPath, 'utf8');

  // Match all hrefs
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const m of hrefMatches) {
    const href = m[1];

    // Check for internal post.cfm leaks
    if (/^(?:https?:\/\/(?:www\.)?mikehenke\.com)?\/post\.cfm/i.test(href)) {
      internalPostCfmLinksFound++;
      assert(false, `Leaked internal post.cfm link found in ${slug}: ${href}`, 'linkIntegrity');
    }

    // Check external post.cfm links are preserved
    if (/https?:\/\/(?!mikehenke\.com)[^/]+\/.*post\.cfm/i.test(href)) {
      externalPostCfmLinksFound++;
    }

    // Check internal links resolve to files in _site
    if (href.startsWith('/') && !href.startsWith('//')) {
      const cleanPath = href.split('?')[0].split('#')[0];
      if (!cleanPath || cleanPath === '/') continue;

      if (!checkedTargets.has(cleanPath)) {
        let exists = false;
        // Could be a file or a directory with index.html
        const directFile = join(siteDir, cleanPath);
        const indexFile = join(siteDir, cleanPath, 'index.html');
        if (existsSync(directFile) && statSync(directFile).isFile()) exists = true;
        else if (existsSync(indexFile) && statSync(indexFile).isFile()) exists = true;

        checkedTargets.set(cleanPath, exists);
        if (!exists) {
          brokenInternalLinks++;
          warn(`Broken internal link in ${slug}: ${href} -> ${cleanPath}`, 'linkIntegrity');
        }
      }
    }
  }
}

assert(internalPostCfmLinksFound === 0, `Zero internal post.cfm links found across posts (all rewritten to /blog/<slug>/)`, 'linkIntegrity');
assert(externalPostCfmLinksFound > 0, `External peer blog post.cfm links preserved (${externalPostCfmLinksFound} found)`, 'linkIntegrity');
results.details.linkIntegrity = {
  internalPostCfmLinksFound,
  externalPostCfmLinksFound,
  uniqueInternalLinksChecked: checkedTargets.size,
  brokenInternalLinks
};

// 6. Search Index Verification
console.log('--- 6. Search Index Verification ---');
const pagefindJs = join(siteDir, 'pagefind', 'pagefind.js');
assert(existsSync(pagefindJs), 'Pagefind search bundle exists at _site/pagefind/pagefind.js', 'searchIndex');

// 7. Security Scan
console.log('--- 7. Security Scan ---');
const prohibitedFiles = [
  'AGENTS.md',
  'CLAUDE.md',
  'CONTEXT.md',
  'DESIGN.md',
  'PRODUCT.md',
  '.eleventyignore',
  '.prettierignore',
  'package.json',
  'package-lock.json',
  '.eleventy.js',
  'eslint.config.js',
  'mikehenke.wordpress.2025-05-31.xml',
  'wp_posts_data.txt'
];

let prohibitedFound = 0;
for (const file of prohibitedFiles) {
  const filePath = join(siteDir, file);
  if (existsSync(filePath)) {
    prohibitedFound++;
    assert(false, `SECURITY VIOLATION: Prohibited file found in _site: ${file}`, 'securityScan');
  }
}
assert(prohibitedFound === 0, 'No prohibited internal or agent files in _site', 'securityScan');

// Check .eleventyignore completeness
const eleventyIgnore = readFileSync('.eleventyignore', 'utf8');
const requiredIgnorePatterns = [
  'AGENTS.md',
  'CLAUDE.md',
  'CONTEXT.md',
  'PRODUCT.md',
  'DESIGN.md',
  '.smart-fix/',
  '.claude/',
  '.impeccable/',
  '.opencode/',
  '.vscode/'
];

for (const pattern of requiredIgnorePatterns) {
  assert(eleventyIgnore.includes(pattern), `.eleventyignore contains ${pattern}`, 'securityScan');
}

// Summary
console.log('\n====================================================');
console.log('REGRESSION TEST EXECUTION COMPLETED');
console.log(`Passed: ${results.passed}`);
console.log(`Failed: ${results.failed}`);
console.log(`Warnings: ${results.warnings}`);
console.log('====================================================\n');

const outputPath = existsSync('.smart-fix') ? '.smart-fix/regression-test-results.json' : 'output/regression-test-results.json';
writeFileSync(outputPath, JSON.stringify(results, null, 2));

if (results.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
