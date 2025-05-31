const fs = require('fs');

// Read the CSS file
const css = fs.readFileSync(
  '/home/mhenke/Projects/mike-henke-website/styles.css',
  'utf8'
);

// Extract all media queries and their content
const mediaQueries = {};
const lines = css.split('\n');
let currentMediaQuery = null;
let braceDepth = 0;
let content = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('@media')) {
    // Save previous media query if exists
    if (currentMediaQuery && content.length > 0) {
      if (!mediaQueries[currentMediaQuery]) {
        mediaQueries[currentMediaQuery] = [];
      }
      mediaQueries[currentMediaQuery].push({
        line: i - content.length,
        content: content.join('\n'),
      });
    }

    // Start new media query
    currentMediaQuery = line.trim();
    content = [line];
    braceDepth = 0;
  } else if (currentMediaQuery) {
    content.push(line);

    // Count braces to know when media query ends
    for (const char of line) {
      if (char === '{') braceDepth++;
      if (char === '}') braceDepth--;
    }

    if (braceDepth === 0 && line.includes('}')) {
      // Media query ended
      if (!mediaQueries[currentMediaQuery]) {
        mediaQueries[currentMediaQuery] = [];
      }
      mediaQueries[currentMediaQuery].push({
        line: i - content.length + 1,
        content: content.join('\n'),
      });
      currentMediaQuery = null;
      content = [];
    }
  }
}

// Output analysis
console.log('DUPLICATE MEDIA QUERY ANALYSIS');
console.log('=====================================');

Object.keys(mediaQueries)
  .sort()
  .forEach((query) => {
    const occurrences = mediaQueries[query];
    if (occurrences.length > 1) {
      console.log(`\n🔴 DUPLICATE: ${query}`);
      console.log(`   Found ${occurrences.length} times at lines:`);
      occurrences.forEach((occ, idx) => {
        console.log(`   ${idx + 1}. Line ${occ.line + 1}`);
      });
    }
  });

console.log('\n\nALL MEDIA QUERIES COUNT:');
console.log('=====================================');
Object.keys(mediaQueries)
  .sort()
  .forEach((query) => {
    console.log(`${mediaQueries[query].length}x - ${query}`);
  });
