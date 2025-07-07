#!/usr/bin/env node

/**
 * PurgeCSS Cleanup Script
 *
 * This script uses the PurgeCSS programmatic API to:
 * 1. Scan all NJK, HTML, and JS files for used CSS classes
 * 2. Generate a cleaned CSS file with unused styles removed
 * 3. Optionally create a report of what was removed
 * 4. Overwrite the original CSS file with the cleaned version
 */

import { copyFile, stat, writeFile } from 'fs/promises';
import path from 'path';
import { PurgeCSS } from 'purgecss';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const config = {
  // Source CSS file
  cssFile: path.join(projectRoot, 'styles.css'),

  // Backup location
  backupFile: path.join(projectRoot, 'styles.backup.css'),

  // Output files
  cleanedFile: path.join(projectRoot, 'styles.cleaned.css'),
  reportFile: path.join(projectRoot, 'purgecss-report.json'),

  // Content files to scan
  content: [
    // Built HTML files (primary source)
    path.join(projectRoot, '_site/**/*.html'),

    // Template files
    path.join(projectRoot, '_includes/**/*.njk'),
    path.join(projectRoot, '_includes/**/*.html'),
    path.join(projectRoot, '*.njk'),
    path.join(projectRoot, 'index.html'),

    // JavaScript files
    path.join(projectRoot, '_includes/**/*.js'),
    path.join(projectRoot, 'assets/**/*.js'),
    path.join(projectRoot, '**/*.js'),

    // Data files
    path.join(projectRoot, '_data/**/*.js'),
    path.join(projectRoot, '_data/**/*.json'),

    // Markdown files
    path.join(projectRoot, '**/*.md'),
  ],

  // Safelist - classes to never remove
  safelist: [
    // Utility classes
    'sr-only',
    'hidden',

    // Navigation states
    'navbar-toggle',
    'active',

    // Dynamic classes (Pagefind, etc.)
    /^pagefind-ui/,
    /^pagefind/,

    // Font Awesome icons
    /^fa-/,
    /^fas/,
    /^far/,
    /^fab/,

    // CSS custom properties
    ':root',

    // Pseudo-classes and elements
    ':before',
    ':after',
    ':hover',
    ':focus',
    ':active',
    '::before',
    '::after',
    '::placeholder',
    '::selection',
    '::-webkit-scrollbar',
    '::-webkit-scrollbar-track',
    '::-webkit-scrollbar-thumb',
    '::-webkit-scrollbar-corner',
    '::-moz-selection',

    // Error page classes (might not be in _site during build)
    /^error-/,
    /^code-/,
    /^suggestion-/,

    // Search classes
    /^search-/,
    'search-shortcuts',
    'search-kbd',
    'search-noscript-alert',
    'search-description',
    'search-no-results',

    // Podcast and video classes
    'podcast-player',
    'video-embed',
  ],

  // Skip these directories
  skippedContentGlobs: [
    'node_modules/**',
    '.git/**',
    '_site/node_modules/**',
    'output/node_modules/**',
  ],
};

// Custom extractors for different file types
const extractors = [
  {
    extractor: (content) => {
      // Enhanced HTML extractor
      const matches =
        content.match(/class\s*=\s*["']([^"']+)["']|[\w-]+/g) || [];
      const classes = [];

      matches.forEach((match) => {
        if (match.includes('class=')) {
          const classMatch = match.match(/class\s*=\s*["']([^"']+)["']/);
          if (classMatch) {
            classes.push(...classMatch[1].split(/\s+/));
          }
        } else if (/^[\w-]+$/.test(match)) {
          classes.push(match);
        }
      });

      return classes;
    },
    extensions: ['html'],
  },
  {
    extractor: (content) => {
      // Enhanced NJK extractor - looks for class names in templates
      const patterns = [
        /class\s*=\s*["']([^"']+)["']/g,
        /classList\.add\(['"]([^'"]+)['"]\)/g,
        /className\s*=\s*["']([^"']+)["']/g,
        /[\w-]+(?=\s*[{}])/g,
      ];

      const classes = [];
      patterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          if (match[1]) {
            classes.push(...match[1].split(/\s+/));
          } else {
            classes.push(match[0]);
          }
        }
      });

      return classes;
    },
    extensions: ['njk'],
  },
  {
    extractor: (content) => {
      // JavaScript extractor - looks for dynamic class usage
      const patterns = [
        /classList\.add\(['"]([^'"]+)['"]\)/g,
        /classList\.remove\(['"]([^'"]+)['"]\)/g,
        /classList\.toggle\(['"]([^'"]+)['"]\)/g,
        /className\s*=\s*['"]([^'"]+)['"]/g,
        /class\s*=\s*['"]([^'"]+)['"]/g,
        /['"][\w-]+['"](?=\s*:\s*)/g, // CSS-in-JS patterns
      ];

      const classes = [];
      patterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          if (match[1]) {
            classes.push(...match[1].split(/\s+/));
          }
        }
      });

      return classes;
    },
    extensions: ['js'],
  },
];

async function main() {
  console.log('🚀 Starting PurgeCSS cleanup...\n');

  try {
    // Step 1: Create backup
    console.log('📁 Creating backup...');
    await copyFile(config.cssFile, config.backupFile);
    console.log(`✅ Backup created: ${config.backupFile}\n`);

    // Step 2: Get original file size
    const originalStats = await stat(config.cssFile);
    const originalSize = (originalStats.size / 1024).toFixed(2);
    console.log(`📊 Original CSS size: ${originalSize} KB\n`);

    // Step 3: Run PurgeCSS
    console.log('🔍 Analyzing CSS usage...');
    const purgeCSSResult = await new PurgeCSS().purge({
      content: config.content,
      css: [config.cssFile],
      safelist: config.safelist,
      extractors: extractors,
      keyframes: true,
      variables: true,
      rejected: true,
      rejectedCss: true,
      skippedContentGlobs: config.skippedContentGlobs,
    });

    if (purgeCSSResult.length === 0) {
      console.log('❌ No CSS processed. Check your configuration.');
      return;
    }

    const result = purgeCSSResult[0];

    // Step 4: Write cleaned CSS
    console.log('✂️  Writing cleaned CSS...');
    await writeFile(config.cleanedFile, result.css);

    // Step 5: Get cleaned file size
    const cleanedStats = await stat(config.cleanedFile);
    const cleanedSize = (cleanedStats.size / 1024).toFixed(2);
    const savings = (
      ((originalStats.size - cleanedStats.size) / originalStats.size) *
      100
    ).toFixed(1);

    // Step 6: Generate report
    const report = {
      timestamp: new Date().toISOString(),
      originalSize: `${originalSize} KB`,
      cleanedSize: `${cleanedSize} KB`,
      sizeSavings: `${savings}%`,
      bytesRemoved: originalStats.size - cleanedStats.size,
      rejectedSelectors: result.rejected || [],
      rejectedCss: result.rejectedCss || '',
      contentScanned: config.content,
      safelistUsed: config.safelist,
    };

    await writeFile(config.reportFile, JSON.stringify(report, null, 2));

    // Step 7: Display results
    console.log('\n📊 CLEANUP RESULTS:');
    console.log(`   Original size: ${originalSize} KB`);
    console.log(`   Cleaned size:  ${cleanedSize} KB`);
    console.log(
      `   Savings:       ${savings}% (${
        originalStats.size - cleanedStats.size
      } bytes)`
    );
    console.log(`   Rejected:      ${result.rejected?.length || 0} selectors`);

    if (result.rejected && result.rejected.length > 0) {
      console.log('\n🗑️  REMOVED SELECTORS (first 10):');
      result.rejected.slice(0, 10).forEach((selector) => {
        console.log(`   - ${selector}`);
      });
      if (result.rejected.length > 10) {
        console.log(
          `   ... and ${result.rejected.length - 10} more (see report)`
        );
      }
    }

    console.log(`\n📄 Full report saved to: ${config.reportFile}`);
    console.log(`💾 Cleaned CSS saved to: ${config.cleanedFile}`);
    console.log(`🔄 Backup available at: ${config.backupFile}`);

    // Step 8: Ask about replacement
    console.log(
      '\n🔄 To replace your original CSS file with the cleaned version:'
    );
    console.log(`   mv ${config.cleanedFile} ${config.cssFile}`);
    console.log('\n🔙 To restore from backup:');
    console.log(`   mv ${config.backupFile} ${config.cssFile}`);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

main();
