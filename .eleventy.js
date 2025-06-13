const { DateTime } = require('luxon');
const { URL } = require('url');

module.exports = function (eleventyConfig) {
  // Code block transform - Convert [code language="..."] shortcodes to Prism-ready HTML
  eleventyConfig.addTransform(
    'codeBlockTransform',
    function (content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        // Match HTML-encoded code blocks: <p>[code language="..."]</p><p>content</p><p>[/code]</p>
        const htmlCodeBlockRegex =
          /<p>\[code\s+language=&quot;([^&]+)&quot;\]<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>\[\/code\]<\/p>/gi;

        // Also match single-line HTML encoded blocks: <p>[code language="..."] content [/code]</p>
        const singleLineRegex =
          /<p>\[code\s+language=&quot;([^&]+)&quot;\]\s*([\s\S]*?)\s*\[\/code\]<\/p>/gi;

        // Function to create code block HTML
        function createCodeBlock(language, code) {
          // Clean up the code content
          const cleanCode = code
            .trim()
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
            coldfusion: 'language-cfscript',
            cfml: 'language-cfscript',
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

        // Apply both transformations
        let transformedContent = content;

        // Transform multi-paragraph HTML-encoded blocks
        transformedContent = transformedContent.replace(
          htmlCodeBlockRegex,
          (match, language, code) => {
            return createCodeBlock(language, code);
          }
        );

        // Transform single-line HTML-encoded blocks
        transformedContent = transformedContent.replace(
          singleLineRegex,
          (match, language, code) => {
            return createCodeBlock(language, code);
          }
        );

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
