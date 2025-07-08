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
  // Source CSS files - now supports multiple files from config
  cssFiles: userConfig.css.map(cssPath => 
    path.isAbsolute(cssPath) ? cssPath : path.join(projectRoot, cssPath)
  ),

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
    const results = [];
    let totalOriginalSize = 0;
    let totalCleanedSize = 0;
    let totalRejectedSelectors = 0;

    // Process each CSS file
    for (const cssFile of config.cssFiles) {
      const fileName = path.basename(cssFile);
      const backupFile = cssFile.replace(/\.css$/, '.backup.css');
      const cleanedFile = cssFile.replace(/\.css$/, '.cleaned.css');
      
      console.log(`📁 Processing ${fileName}...`);
      
      // Step 1: Create backup
      console.log(`   Creating backup...`);
      await copyFile(cssFile, backupFile);
      console.log(`   ✅ Backup created: ${path.basename(backupFile)}`);

      // Step 2: Get original file size
      const originalStats = await stat(cssFile);
      const originalSize = (originalStats.size / 1024).toFixed(2);
      totalOriginalSize += originalStats.size;
      console.log(`   📊 Original size: ${originalSize} KB`);

      // Step 3: Run PurgeCSS
      console.log(`   🔍 Analyzing CSS usage...`);
      const purgeCSSResult = await new PurgeCSS().purge({
        content: config.content,
        css: [cssFile],
        safelist: config.safelist,
        extractors: extractors,
        keyframes: userConfig.keyframes || true,
        variables: userConfig.variables || true,
        rejected: true,
        rejectedCss: true,
        skippedContentGlobs: config.skippedContentGlobs,
      });

      if (purgeCSSResult.length === 0) {
        console.log(`   ❌ No CSS processed for ${fileName}. Skipping.`);
        continue;
      }

      const result = purgeCSSResult[0];

      // Step 4: Write cleaned CSS
      console.log(`   ✂️  Writing cleaned CSS...`);
      await writeFile(cleanedFile, result.css);

      // Step 5: Get cleaned file size
      const cleanedStats = await stat(cleanedFile);
      const cleanedSize = (cleanedStats.size / 1024).toFixed(2);
      totalCleanedSize += cleanedStats.size;
      const savings = (
        ((originalStats.size - cleanedStats.size) / originalStats.size) *
        100
      ).toFixed(1);

      const rejectedCount = result.rejected?.length || 0;
      totalRejectedSelectors += rejectedCount;

      results.push({
        fileName,
        cssFile,
        backupFile,
        cleanedFile,
        originalSize: `${originalSize} KB`,
        cleanedSize: `${cleanedSize} KB`,
        sizeSavings: `${savings}%`,
        bytesRemoved: originalStats.size - cleanedStats.size,
        rejectedSelectors: result.rejected || [],
        rejectedCss: result.rejectedCss || '',
      });

      console.log(`   ✅ ${fileName} processed: ${originalSize} KB → ${cleanedSize} KB (${savings}% savings)`);
      console.log(`   🗑️  Removed ${rejectedCount} unused selectors\n`);
    }

    // Step 6: Generate combined report
    const reportFile = path.join(projectRoot, 'purgecss-report.json');
    const totalSavings = (
      ((totalOriginalSize - totalCleanedSize) / totalOriginalSize) *
      100
    ).toFixed(1);

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: results.length,
        totalOriginalSize: `${(totalOriginalSize / 1024).toFixed(2)} KB`,
        totalCleanedSize: `${(totalCleanedSize / 1024).toFixed(2)} KB`,
        totalSizeSavings: `${totalSavings}%`,
        totalBytesRemoved: totalOriginalSize - totalCleanedSize,
        totalRejectedSelectors: totalRejectedSelectors,
      },
      files: results,
      contentScanned: config.content,
      safelistUsed: config.safelist,
    };

    await writeFile(reportFile, JSON.stringify(report, null, 2));

    // Step 7: Display results
    console.log('📊 CLEANUP RESULTS SUMMARY:');
    console.log(`   Files processed: ${results.length}`);
    console.log(`   Total original:  ${(totalOriginalSize / 1024).toFixed(2)} KB`);
    console.log(`   Total cleaned:   ${(totalCleanedSize / 1024).toFixed(2)} KB`);
    console.log(`   Total savings:   ${totalSavings}% (${totalOriginalSize - totalCleanedSize} bytes)`);
    console.log(`   Total rejected:  ${totalRejectedSelectors} selectors`);

    // Show individual file results
    if (results.length > 1) {
      console.log('\n� INDIVIDUAL FILE RESULTS:');
      results.forEach(result => {
        console.log(`   ${result.fileName}: ${result.originalSize} → ${result.cleanedSize} (${result.sizeSavings})`);
      });
    }

    console.log(`\n📄 Full report saved to: ${reportFile}`);
    
    // Step 8: Show replacement commands
    console.log('\n🔄 To replace original CSS files with cleaned versions:');
    results.forEach(result => {
      console.log(`   mv ${result.cleanedFile} ${result.cssFile}`);
    });
    
    console.log('\n🔙 To restore from backups:');
    results.forEach(result => {
      console.log(`   mv ${result.backupFile} ${result.cssFile}`);
    });

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

main();
