import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const xml = readFileSync(join(root, 'mikehenke.wordpress.2025-05-31.xml'), 'utf-8');

function field(item, tag) {
  const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  return m ? m[1].trim() : '';
}

function fieldEsc(item, tag) {
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return m ? m[1].trim() : '';
}

const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
let count = 0;

for (const item of items) {
  const postType = fieldEsc(item, 'wp:post_type');
  const status = fieldEsc(item, 'wp:status');
  if (postType !== 'post' || status !== 'publish') continue;

  const title = field(item, 'title') || fieldEsc(item, 'title');
  const dateRaw = fieldEsc(item, 'wp:post_date');
  const slug = fieldEsc(item, 'wp:post_name') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const content = field(item, 'content:encoded');
  const excerpt = field(item, 'excerpt:encoded');

  const categories = [];
  const catMatches = item.match(/<category domain="category"[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g);
  if (catMatches) {
    for (const cm of catMatches) {
      const m = cm.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
      if (m) categories.push(m[1]);
    }
  }

  const date = dateRaw ? dateRaw.replace(/ /, 'T') + 'Z' : '2000-01-01';
  const dateShort = dateRaw ? dateRaw.split(' ')[0] : '2000-01-01';

  const postDir = join(root, 'output', 'posts', slug);
  const postFile = join(postDir, 'index.md');

  mkdirSync(postDir, { recursive: true });

  const frontmatter = {
    title: title || 'Untitled',
    date: dateShort,
    author: 'Mike Henke',
    layout: 'layouts/post.njk',
  };

  if (categories.length > 0) {
    frontmatter.categories = categories;
  }

  if (excerpt) {
    frontmatter.excerpt = excerpt;
  }

  const output = '---\n' + yaml.dump(frontmatter) + '---\n\n' + content;
  writeFileSync(postFile, output);
  count++;
  console.log(`  ${slug}: "${title}" (${dateShort}, ${categories.length} categories)`);
}

console.log(`\nExtracted ${count} published posts.`);
