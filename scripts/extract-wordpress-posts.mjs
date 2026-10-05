import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { dump } from 'js-yaml';

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

function cleanCodeSnippet(code) {
  return code
    .replace(/^[\r\n]+|[\r\n]+$/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'");
}

function normalizeContent(rawContent, slug) {
  if (!rawContent) return '';

  let content = rawContent.replace(/\\+(\[|\])/g, '$1');

  // Fix known WordPress data corruption: premature [/code] inside textarea attribute minimization example
  if (slug === 'jtidy-cfc-stand-alone-and-cfwheels-plugin-1') {
    content = content.replace('READ-ONLY[/code]</div>', 'READ-ONLY</div>');
  }

  // 1. Convert WordPress [code] shortcodes to standard fenced markdown code blocks
  content = content.replace(
    /\[code(?:\s+language\s*=\s*["']?([a-zA-Z0-9_-]+)["']?|\s*=\s*["']?([a-zA-Z0-9_-]+)["']?)?[^\]]*\]([\s\S]*?)\[\/code\]/gi,
    (match, lang1, lang2, code) => {
      const rawLang = (lang1 || lang2 || 'coldfusion').trim();
      const lang = rawLang.toLowerCase();
      return `\n\`\`\`${lang}\n${cleanCodeSnippet(code)}\n\`\`\`\n`;
    }
  );

  // Clean up any remaining orphaned [code] or [/code] tags
  content = content.replace(/\[(?:\/)?code[^\]]*\]/gi, '');

function isSafeUrl(url) {
  if (!url) return false;
  const trimmed = url.trim();
  return /^(https?:\/\/|\/)/i.test(trimmed) && !/["'<>]/i.test(trimmed);
}

function escapeAttr(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

  // 2. Podcast shortcodes -> HTML5 audio player
  content = content.replace(
    /\[podcast\](.*?)\[\/podcast\]/gi,
    (match, audioUrl) => {
      const cleanUrl = audioUrl.trim();
      if (!isSafeUrl(cleanUrl)) return '';
      const safeUrl = escapeAttr(cleanUrl);
      return `\n<div class="podcast-player">\n  <audio controls preload="metadata">\n    <source src="${safeUrl}" type="audio/mpeg">\n    <p>Your browser does not support the audio element. <a href="${safeUrl}">Download the podcast</a></p>\n  </audio>\n</div>\n`;
    }
  );

  // 3. Embed shortcodes -> YouTube responsive embed or link
  content = content.replace(
    /\[embed\](.*?)\[\/embed\]/gi,
    (match, embedUrl) => {
      const cleanUrl = embedUrl.trim();
      const youtubeMatch = cleanUrl.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
      );
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        return `\n<div class="video-embed">\n  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n</div>\n`;
      }
      if (!isSafeUrl(cleanUrl)) return '';
      const safeUrl = escapeAttr(cleanUrl);
      return `\n<div class="generic-embed"><p><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">View embedded content: ${safeUrl}</a></p></div>\n`;
    }
  );

  // 4. Known layout shortcodes -> Semantic HTML
  content = content.replace(/\[row\]/gi, '<div class="row">');
  content = content.replace(/\[\/row\]/gi, '</div>');
  content = content.replace(/\[span(\d+)\]/gi, '<div class="span-$1">');
  content = content.replace(/\[\/span(\d+)\]/gi, '</div>');
  content = content.replace(/\[page_block[^\]]*\]/gi, '');
  content = content.replace(/\[\/page_block\]/gi, '');
  content = content.replace(/\[lazy_load_box[^\]]*\]/gi, '<div class="content-box">');
  content = content.replace(/\[\/lazy_load_box\]/gi, '</div>');
  content = content.replace(/\[title_box title="([^"]*)"[^\]]*\]/gi, (match, title) => `<h2 class="section-title">${escapeAttr(title)}</h2>`);
  content = content.replace(/\[service_box title="([^"]*)"[^>]*text="([^"]*)"[^\]]*\]/gi, (match, title, text) => `<article class="service-box"><h3>${escapeAttr(title)}</h3><p>${escapeAttr(text)}</p></article>`);
  content = content.replace(/\[button text="([^"]*)" link="([^"]*)"[^\]]*\]/gi, (match, text, link) => {
    const safeLink = isSafeUrl(link) ? escapeAttr(link) : '#';
    return `<a href="${safeLink}" class="btn btn-primary">${escapeAttr(text)}</a>`;
  });
  content = content.replace(/\[content_box[^\]]*\]/gi, '<div class="content-section">');
  content = content.replace(/\[\/content_box\]/gi, '</div>');
  content = content.replace(/\[extra_wrap\]/gi, '');
  content = content.replace(/\[\/extra_wrap\]/gi, '');
  content = content.replace(/\[masonry_view[^\]]*\]/gi, '');
  content = content.replace(/\[spacer[^\]]*\]/gi, '');
  content = content.replace(/\[cherry_parallax[^\]]*\]/gi, '');
  content = content.replace(/\[\/cherry_parallax\]/gi, '');
  content = content.replace(/\[skills_info[^\]]*\]/gi, '');
  content = content.replace(/\[chronology_info[^\]]*\]/gi, '');
  content = content.replace(/\[contact-form-7[^\]]*\]/gi, '');
  content = content.replace(/\[google_api_map[^\]]*\]/gi, '');

  // 5. Internal URLs -> /blog/<slug>/
  content = content.replace(
    /href=["'](?:https?:\/\/(?:www\.)?mikehenke\.com)?\/post\.cfm\/([^"'\s#?]+)(\?[^"'\s#]*)?(#[^"'\s]*)?["']/gi,
    (match, postSlug, query, hash) => `href="/blog/${postSlug}/${query || ''}${hash || ''}"`
  );
  content = content.replace(
    /href=["'](?:https?:\/\/(?:www\.)?mikehenke\.com)?(?:\/machblog)?\/?index\.cfm\?event=showEntry(?:&amp;|&)entryId=8A5CAB53-19B9-BA51-EECADB57919F9714["']/gi,
    'href="/blog/Minify-CSS-JS-ant-revisited-using-YUI-compressor/"'
  );
  content = content.replace(
    /href=["'](?:https?:\/\/(?:www\.)?mikehenke\.com)?\/page\.cfm\/cfwheels-series\/?["']/gi,
    'href="/wheels-series/"'
  );
  content = content.replace(
    /href=["'](?:https?:\/\/(?:www\.)?mikehenke\.com)?\/contact-me\/?["']/gi,
    'href="/#contact"'
  );
  content = content.replace(
    /href=["']\/?www\.([^"']+)["']/gi,
    'href="https://www.$1"'
  );
  content = content.replace(
    /href=["']\/?(coldfusionshow\.com[^"']*)["']/gi,
    'href="https://$1"'
  );
  content = content.replace(
    /href=["']\/?(en\.wikipedia\.org[^"']*)["']/gi,
    'href="https://$1"'
  );
  content = content.replace(
    /href=["']\/?CFWheels\.org["']/gi,
    'href="https://cfwheels.org"'
  );
  content = content.replace(
    /href=["']https:\/\/www\.google\.com\/reader\/view\/feed\/[^"']*riaforge[^"']*["']/gi,
    'href="https://www.riaforge.org/"'
  );
  content = content.replace(
    /href=["']http:\/\/([^"']*\.riaforge\.org[^"']*)["']/gi,
    'href="https://$1"'
  );

  // 6. Image paths -> /blog/<slug>/images/...
  content = content.replace(
    /<img([^>]*)\ssrc=["'](?:\.\/)?images\/([^"']+)["']/gi,
    `<img$1 src="/blog/${slug}/images/$2"`
  );
  content = content.replace(
    /!\[([^\]]*)\]\((?:\.\/)?images\/([^)]+)\)/gi,
    `![$1](/blog/${slug}/images/$2)`
  );

  // 7. HTML entity decoding in prose (preserve code fences)
  const codeFenceRegex = /```[\s\S]*?```/g;
  const parts = content.split(codeFenceRegex);
  const fences = content.match(codeFenceRegex) || [];
  const decodedParts = parts.map((part) =>
    part
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&apos;/g, "'")
  );

  let reassembled = '';
  for (let i = 0; i < decodedParts.length; i++) {
    reassembled += decodedParts[i];
    if (i < fences.length) {
      reassembled += fences[i];
    }
  }

  return reassembled;
}

const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
let count = 0;

for (const item of items) {
  const postType = fieldEsc(item, 'wp:post_type');
  const status = fieldEsc(item, 'wp:status');
  if (postType !== 'post' || status !== 'publish') continue;

  const title = field(item, 'title') || fieldEsc(item, 'title');
  const dateRaw = fieldEsc(item, 'wp:post_date');
  const slug =
    fieldEsc(item, 'wp:post_name') ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const rawContent = field(item, 'content:encoded');
  const excerpt = field(item, 'excerpt:encoded');

  const categories = [];
  const catMatches = item.match(
    /<category domain="category"[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g
  );
  if (catMatches) {
    for (const cm of catMatches) {
      const m = cm.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
      if (m) categories.push(m[1]);
    }
  }

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

  const normalizedContent = normalizeContent(rawContent, slug);
  const output = '---\n' + dump(frontmatter) + '---\n\n' + normalizedContent;
  writeFileSync(postFile, output);
  count++;
}

console.log(`\nExtracted and ETL-normalized ${count} published posts.`);
