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
          // Clean up the code content - remove any HTML tags that might have been included
          let cleanCode = code
            .trim()
            .replace(/<\/?p[^>]*>/gi, '') // Remove paragraph tags
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

          // Remove trailing content that shouldn't be in code blocks
          cleanCode = cleanCode
            .replace(/\s*\\?\[\/code\].*$/s, '') // Remove any trailing [/code] and everything after
            .replace(/\s*###.*$/s, '') // Remove trailing ### headers and everything after
            .replace(/\s*[A-Z]\.\s*.*$/s, '') // Remove trailing answer labels and everything after
            .replace(/\s*<h3>.*$/s, '') // Remove trailing h3 tags and everything after
            .trim();

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

        // Step 1: Clean up multiple consecutive closing tags first
        transformedContent = transformedContent.replace(
          /\\?\[\/code\](\s*\\?\[\/code\])+/gi,
          '\\[/code]'
        );

        // Step 2: Handle inline code blocks that are NOT properly separated
        // Look for code blocks that start after text (not after a > or paragraph break)
        transformedContent = transformedContent.replace(
          /(\w)\s+\[code\s+language=(?:&quot;|")([^"&]+)(?:&quot;|")\]/gi,
          '$1</p>\n\n<p>[code language="$2"]'
        );

        // Step 3: Handle code blocks that are concatenated with answer labels
        transformedContent = transformedContent.replace(
          /\\?\[\/code\]\s*([A-Z]\.\s*)\[code\s+language=(?:&quot;|")([^"&]+)(?:&quot;|")\]/gi,
          '\\[/code]</p>\n\n<p>$1</p>\n\n<p>[code language="$2"]'
        );

        // Step 4: Handle code blocks followed by answer labels
        transformedContent = transformedContent.replace(
          /\\?\[\/code\]\s+([A-Z]\.\s*)/gi,
          '\\[/code]</p>\n\n<p>$1'
        );

        // Step 5: Main transformation - match and convert code blocks
        const codeBlockRegex =
          /\[code\s+language=(?:&quot;|")([^"&]+)(?:&quot;|")\]([\s\S]*?)\\?\[\/code\]/gi;

        transformedContent = transformedContent.replace(
          codeBlockRegex,
          (match, language, code) => {
            // Stop at certain patterns that shouldn't be in code blocks
            let cleanedCode = code;

            // First, look for any trailing [/code] patterns and everything after them
            const codeEndMatch = cleanedCode.match(/\\?\[\/code\]/);
            if (codeEndMatch) {
              cleanedCode = cleanedCode.substring(0, codeEndMatch.index);
            }

            // Then check for other stop patterns
            const stopPatterns = [
              /\s+###/, // Stop at headers
              /\s+[A-Z]\.\s/, // Stop at answer labels
              /<h3>/, // Stop at h3 tags
            ];

            for (const pattern of stopPatterns) {
              const patternMatch = cleanedCode.match(pattern);
              if (patternMatch) {
                cleanedCode = cleanedCode.substring(0, patternMatch.index);
                break;
              }
            }

            return createCodeBlock(language, cleanedCode);
          }
        );

        // Step 6: Clean up any malformed HTML from preprocessing
        transformedContent = transformedContent.replace(
          /<\/p>\s*<\/p>/g,
          '</p>'
        );
        transformedContent = transformedContent.replace(/<p>\s*<p>/g, '<p>');
        transformedContent = transformedContent.replace(
          /<\/p>\s*<p>\s*<\/p>\s*<p>/g,
          '</p>\n\n<p>'
        );
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
