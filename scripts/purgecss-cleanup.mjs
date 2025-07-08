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
import { createRequire } from 'module';
import path from 'path';
import { PurgeCSS } from 'purgecss';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Import your purgecss.config.js
const userConfig = require(path.join(projectRoot, 'purgecss.config.js'));

// Configuration - using your config file with script-specific overrides
const config = {
  // Source CSS file
  cssFile: path.join(projectRoot, 'styles.css'),

  // Backup location
  backupFile: path.join(projectRoot, 'styles.backup.css'),

  // Output files
  cleanedFile: path.join(projectRoot, 'styles.cleaned.css'),
  reportFile: path.join(projectRoot, 'purgecss-report.json'),

  // Use your config file's content paths (converted to absolute paths)
  content: userConfig.content.map((contentPath) =>
    path.isAbsolute(contentPath)
      ? contentPath
      : path.join(projectRoot, contentPath)
  ),

  // Use your config file's safelist
  safelist: userConfig.safelist,

  // Skip these directories
  skippedContentGlobs: [
    'node_modules/**',
    '.git/**',
    '_site/node_modules/**',
    'output/node_modules/**',
  ],
};

// Custom extractors - use from config file if available, otherwise defaults
const extractors = userConfig.defaultExtractor
  ? [
      {
        extractor: userConfig.defaultExtractor,
        extensions: ['html', 'njk', 'js'],
      },
    ]
  : [
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
      keyframes: userConfig.keyframes || true,
      variables: userConfig.variables || true,
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
