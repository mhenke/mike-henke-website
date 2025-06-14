const { DateTime } = require('luxon');
const { URL } = require('url');

module.exports = function (eleventyConfig) {
  // Code block transform - Convert [code language="..."] shortcodes to Prism-ready HTML
  eleventyConfig.addTransform(
    'codeBlockTransform',
    function (content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        // Function to create code block HTML
        function createCodeBlock(language, code) {
          // Clean up the code content
          let cleanCode = code
            .trim()
            .replace(/<\/?p[^>]*>/gi, '') // Remove paragraph tags
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

          // Escape HTML for display
          const escapedCode = cleanCode
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

          // Map language aliases to Prism language classes
          const languageMap = {
            coldfusion: 'language-coldfusion',
            cfml: 'language-coldfusion',
            cfscript: 'language-cfscript',
            javascript: 'language-javascript',
            js: 'language-javascript',
            java: 'language-java',
            sql: 'language-sql',
            xml: 'language-xml',
            html: 'language-html',
            css: 'language-css',
            python: 'language-python',
            bash: 'language-bash',
            shell: 'language-bash',
            json: 'language-json',
          };

          const prismLanguage =
            languageMap[language.toLowerCase()] ||
            `language-${language.toLowerCase()}`;

          return `<div class="code-block">
  <div class="code-header">
    <span class="code-language">${language.toUpperCase()}</span>
    <button class="code-copy" onclick="copyCode(this)" aria-label="Copy code">
      <i class="fas fa-copy"></i>
    </button>
  </div>
  <pre class="line-numbers"><code class="${prismLanguage}">${escapedCode}</code></pre>
</div>`;
        }

        let transformedContent = content;

        // Step 1: Normalize escaped closing tags - fix \\[/code] to [/code]
        transformedContent = transformedContent.replace(
          /\\\\?\[\/code\]/gi,
          '[/code]'
        );

        // Step 2: Fix inline code blocks that should be on their own lines
        // Pattern: text [code language="..."] - add paragraph breaks
        transformedContent = transformedContent.replace(
          /(\w)\s+(\[code\s+language=(?:&quot;|")([^"&]+)(?:&quot;|")\])/gi,
          '$1</p>\n\n<p>$2'
        );

        // Step 3: Fix code blocks that end with text on same line
        // Pattern: [/code] text - add paragraph breaks
        transformedContent = transformedContent.replace(
          /(\[\/code\])\s+(\w)/gi,
          '$1</p>\n\n<p>$2'
        );

        // Step 4: Handle incomplete code blocks - those without closing tags
        // Look for code blocks followed by markdown headers, images, or new paragraphs
        transformedContent = transformedContent.replace(
          /(\[code\s+language=(?:&quot;|")([^"&]+)(?:&quot;|")\])([\s\S]*?)(?=\n\s*###|\n\s*!\[|\n\s*\[|\n\s*[A-Z][a-z]|\n\s*<|$)/gi,
          (match, openTag, language, code) => {
            // Only transform if there's no [/code] tag in the captured content
            if (!/\[\/code\]/i.test(code)) {
              // Clean the code content - stop at certain patterns
              let cleanedCode = code
                .replace(/\s*You may remember.*$/s, '') // Stop at explanatory text
                .replace(/\s*![^)]*\).*$/s, '') // Stop at images
                .replace(/\s*Pretty neat.*$/s, '') // Stop at commentary
                .replace(/\s*Lets.*$/s, '') // Stop at new sections
                .replace(/\s*Now lets.*$/s, '') // Stop at new sections
                .trim();

              return createCodeBlock(language, cleanedCode);
            }
            return match;
          }
        );

        // Step 5: Handle proper code blocks with closing tags
        transformedContent = transformedContent.replace(
          /\[code\s+language=(?:&quot;|")([^"&]+)(?:&quot;|")\]([\s\S]*?)\[\/code\]/gi,
          (match, language, code) => {
            return createCodeBlock(language, code);
          }
        );

        // Step 6: Clean up any remaining malformed patterns
        // Remove orphaned [/code] tags that weren't matched
        transformedContent = transformedContent.replace(/\[\/code\]/gi, '');

        // Clean up HTML structure issues
        transformedContent = transformedContent.replace(
          /<\/p>\s*<\/p>/g,
          '</p>'
        );
        transformedContent = transformedContent.replace(/<p>\s*<p>/g, '<p>');
        transformedContent = transformedContent.replace(/<p><\/p>/g, '');

        return transformedContent;
      }
      return content;
    }
  );

  // Date filter using Luxon
  eleventyConfig.addFilter('date', (dateObj, format) => {
    if (dateObj === 'now') {
      return DateTime.now().toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Slugify filter for category URLs
  eleventyConfig.addFilter('slugify', function (str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  // absoluteUrl filter
  eleventyConfig.addFilter('absoluteUrl', function (url, base) {
    try {
      // Access global data via this.ctx.site if base is not provided or invalid
      if (
        !base ||
        !(
          URL.canParse(base) ||
          (typeof base === 'string' && base.startsWith('http'))
        )
      ) {
        const siteUrl = this.ctx?.site?.url;
        if (siteUrl) {
          base = siteUrl;
        } else {
          console.warn(
            'Base URL for absoluteUrl filter is not defined in site data. Falling back to relative URL.'
          );
          return url;
        }
      }
      return new URL(url, base).href;
    } catch (e) {
      console.error(
        `Error creating absolute URL for ${url} with base ${base}: `,
        e
      );
      return url;
    }
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy({ _pagefind: 'pagefind' });
  eleventyConfig.addPassthroughCopy('assets'); // Assets folder including images
  eleventyConfig.addPassthroughCopy('output/**/*.{jpg,jpeg,png,gif,svg,webp}'); // WordPress images

  // WordPress export collections
  eleventyConfig.addCollection('wordpressPosts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('output/posts/*/index.md')
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  eleventyConfig.addCollection('wordpressPages', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('output/pages/*/index.md')
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  // Combined posts collection (regular + WordPress)
  eleventyConfig.addCollection('allPosts', function (collectionApi) {
    const regularPosts = collectionApi.getFilteredByGlob('posts/*.md');
    const wordpressPosts = collectionApi.getFilteredByGlob(
      'output/posts/*/index.md'
    );
    return [...regularPosts, ...wordpressPosts].sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Category collections for filtering
  eleventyConfig.addCollection('allCategories', function (collectionApi) {
    const categorySet = new Set();
    collectionApi.getAll().forEach(function (item) {
      if (item.data.categories) {
        item.data.categories.forEach(function (category) {
          categorySet.add(category);
        });
      }
    });
    return Array.from(categorySet).sort();
  });

  eleventyConfig.addCollection('postsByCategory', function (collectionApi) {
    const postsByCategory = {};
    const allPosts = collectionApi.getFilteredByGlob([
      'posts/*.md',
      'output/posts/*/index.md',
    ]);

    allPosts.forEach(function (post) {
      if (post.data.categories) {
        post.data.categories.forEach(function (category) {
          const slug = category
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          if (!postsByCategory[slug]) {
            postsByCategory[slug] = {
              name: category,
              posts: [],
            };
          }
          postsByCategory[slug].posts.push(post);
        });
      }
    });

    // Sort posts in each category by date (newest first)
    Object.keys(postsByCategory).forEach(function (categorySlug) {
      postsByCategory[categorySlug].posts.sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
    });

    return postsByCategory;
  });
  // console log to terminal the NODE_ENV
  console.log('NODE_ENV:', process.env?.NODE_ENV);
  return {
    pathPrefix:
      process.env?.NODE_ENV === 'production' ? '/mike-henke-website' : '/',
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
