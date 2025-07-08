const { DateTime } = require('luxon');
const { URL } = require('url');
const purgeCSS = require('eleventy-plugin-purgecss');

/**
 * MAINTAINABILITY NOTE: This configuration file is becoming quite large (650+ lines).
 * Consider splitting into modules:
 * - transforms/ (for content transforms)
 * - filters/ (for template filters)
 * - collections/ (for data collections)
 * - utils/ (for helper functions)
 */

module.exports = function (eleventyConfig) {
  // Environment detection - simplified to dev/prod only
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = !isProduction;

  // Build performance monitoring
  let buildStartTime;
  eleventyConfig.on('eleventy.before', function () {
    buildStartTime = Date.now();
    if (isDevelopment) {
      console.log('🚀 Starting Eleventy build...');
    }
  });

  eleventyConfig.on('eleventy.after', function () {
    if (buildStartTime && isDevelopment) {
      const buildTime = Date.now() - buildStartTime;
      console.log(`✅ Build completed in ${buildTime}ms`);
    }
  });
  // Optimized code block transform
  eleventyConfig.addTransform(
    'codeBlockTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Skip if no code blocks present
      if (!content.includes('[code')) {
        return content;
      }

      function createCodeBlock(language, code) {
        // Clean and normalize the code content
        const cleanCode = code
          .trim()
          .replace(/<\/?p[^>]*>/gi, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        // Escape for HTML display
        const escapedCode = cleanCode
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

        // Clean the language for display
        let cleanLanguage = language
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/^["'""`""]|["'""`""]$/g, '')
          .trim();

        // Language mapping for Prism
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

        const prismClass =
          languageMap[cleanLanguage.toLowerCase()] ||
          `language-${cleanLanguage.toLowerCase()}`;

        return `<div class="code-block">
  <div class="code-header">
    <span class="code-language">${cleanLanguage.toUpperCase()}</span>
    <button class="code-copy" onclick="copyCode(this)" aria-label="Copy code">
      <i class="fas fa-copy"></i>
    </button>
  </div>
  <pre class="line-numbers"><code class="${prismClass}">${escapedCode}</code></pre>
</div>`;
      }

      let result = content;

      // Remove backslashes around brackets
      result = result.replace(/\\+(\[|\])/g, '$1');

      // Process code blocks with single regex pass
      result = result
        // Pattern 1: [code language="lang"]content[/code]
        .replace(
          /\[code\s+language\s*=\s*["'""]([^"'""]+)["'"""][^\]]*\]([\s\S]*?)\[\/code\]/gi,
          (match, language, code) => {
            const cleanLanguage = language.replace(/^["'""]|["'""]$/g, '');
            return createCodeBlock(cleanLanguage, code);
          }
        )
        // Pattern 2: [code language=lang] (without quotes)
        .replace(
          /\[code\s+language\s*=\s*([^\s\]]+)[^\]]*\]([\s\S]*?)\[\/code\]/gi,
          (match, language, code) => createCodeBlock(language, code)
        )
        // Pattern 3: [code="lang"] (alternate syntax)
        .replace(
          /\[code\s*=\s*["'""]([^"'""]+)["'""]\s*\]([\s\S]*?)\[\/code\]/gi,
          (match, language, code) => {
            const cleanLanguage = language.replace(/^["'""]|["'""]$/g, '');
            return createCodeBlock(cleanLanguage, code);
          }
        );

      // Clean up remaining orphaned tags and excessive paragraphs
      result = result
        .replace(/\[(?:\/)?code[^\]]*\]/gi, '')
        .replace(/<\/p>\s*<\/p>/g, '</p>')
        .replace(/<p>\s*<p>/g, '<p>')
        .replace(/<p>\s*<\/p>/g, '');

      return result;
    }
  );

  // Podcast and embed transform - MUST run before wordpressShortcodeProcessor
  eleventyConfig.addTransform(
    'podcastEmbedTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Early return if no podcast or embed content present
      if (!content.includes('[podcast') && !content.includes('[embed')) {
        return content;
      }

      let result = content;

      // Step 1: Remove backslashes around brackets for podcast and embed tags
      result = result.replace(
        /\\+(\[(?:podcast|embed|\/podcast|\/embed)\])/g,
        '$1'
      );

      // Step 2: Handle podcast tags - convert to HTML5 audio player
      result = result.replace(
        /\[podcast\](.*?)\[\/podcast\]/gi,
        (match, audioUrl) => {
          const cleanUrl = audioUrl.trim();
          return `<div class="podcast-player">
  <audio controls preload="metadata">
    <source src="${cleanUrl}" type="audio/mpeg">
    <p>Your browser does not support the audio element. <a href="${cleanUrl}">Download the podcast</a></p>
  </audio>
</div>`;
        }
      );

      // Step 3: Handle embed tags - convert YouTube URLs to embeds
      result = result.replace(
        /\[embed\](.*?)\[\/embed\]/gi,
        (match, embedUrl) => {
          const cleanUrl = embedUrl.trim();

          // Extract YouTube video ID from various YouTube URL formats
          const youtubeRegex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
          const youtubeMatch = cleanUrl.match(youtubeRegex);

          if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            return `<div class="video-embed">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>`;
          }

          // If not YouTube, return a generic embed link
          return `<div class="generic-embed">
  <p><a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">View embedded content: ${cleanUrl}</a></p>
</div>`;
        }
      );

      return result;
    }
  );

  // Date filter using Luxon
  eleventyConfig.addFilter('date', (dateObj, format) => {
    if (dateObj === 'now') {
      return DateTime.now().toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Slugify filter for category URLs - no manipulation, use as-is
  eleventyConfig.addFilter('slugify', function (str) {
    return str.trim();
  });

  // Category slug filter - no manipulation, preserve exactly as written
  eleventyConfig.addFilter('categorySlug', function (category) {
    if (!category) return '';
    return category.trim();
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

  // Markdown image processing - modify markdown-it to handle image paths
  eleventyConfig.amendLibrary('md', function (mdLib) {
    try {
      // Override the default image renderer
      const defaultImageRenderer =
        mdLib.renderer.rules.image ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options);
        };

      mdLib.renderer.rules.image = function (tokens, idx, options, env, self) {
        try {
          const token = tokens[idx];
          const srcIndex = token.attrIndex('src');

          if (srcIndex >= 0) {
            const src = token.attrs[srcIndex][1];

            // Only process relative image paths that start with 'images/'
            if (src && src.startsWith('images/')) {
              const pathPrefix = '';

              // Extract post slug from available data
              let postSlug = '';

              if (
                env?.page?.inputPath &&
                env.page.inputPath.includes('output/posts/')
              ) {
                const pathParts = env.page.inputPath.split('/');
                const outputIndex = pathParts.indexOf('output');
                if (
                  outputIndex !== -1 &&
                  pathParts[outputIndex + 1] === 'posts'
                ) {
                  postSlug = pathParts[outputIndex + 2];
                }
              }

              if (postSlug) {
                const imageName = src.replace('images/', '');
                // Route images to the root directory structure (not /blog/)
                const newSrc = `${pathPrefix}/${postSlug}/images/${imageName}`;
                token.attrs[srcIndex][1] = newSrc;
              }
            }
          }

          // Ensure we always render the image tag properly
          const token_o = tokens[idx];
          let aIndex = token_o.attrIndex('alt');
          let alt = '';

          if (aIndex >= 0) {
            alt = token_o.attrs[aIndex][1] || '';
          } else if (token_o.content) {
            alt = token_o.content;
          }

          // Get the final src value safely
          const finalSrc =
            srcIndex >= 0 && token_o.attrs[srcIndex]
              ? token_o.attrs[srcIndex][1]
              : '';

          // Return a proper HTML img tag
          return `<img src="${finalSrc}" alt="${alt}" loading="lazy">`;
        } catch (renderError) {
          console.warn(
            '⚠️ Warning: Error rendering image in markdown:',
            renderError.message
          );
          // Fallback to default renderer
          return defaultImageRenderer(tokens, idx, options, env, self);
        }
      };
    } catch (error) {
      console.warn(
        '⚠️ Warning: Could not configure markdown image renderer:',
        error.message
      );
    }
  });

  // Remove the markdown image transform since we're handling it in markdown-it now

  // Combined image processing transform for WordPress posts
  eleventyConfig.addTransform(
    'combinedImageTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Early return if no image content to process
      if (!content.includes('images/') && !content.includes('![](')) {
        return content;
      }

      // Only transform WordPress post pages (now at root level)
      if (
        outputPath.includes('output/posts/') ||
        outputPath.match(/\/_site\/[^\/]+\/index\.html$/)
      ) {
        const pathPrefix = '';

        // Extract the post slug from the output path
        const pathParts = outputPath.split('/');
        let postSlug = '';

        // For root-level posts, find the slug differently
        if (outputPath.includes('_site/')) {
          // Extract from _site/post-slug/index.html pattern
          const siteIndex = pathParts.indexOf('_site');
          if (
            siteIndex !== -1 &&
            pathParts[siteIndex + 1] &&
            pathParts[siteIndex + 1] !== 'blog' &&
            pathParts[siteIndex + 1] !== 'category' &&
            pathParts[siteIndex + 1] !== 'search' &&
            pathParts[siteIndex + 1] !== 'wordpress-pages'
          ) {
            postSlug = pathParts[siteIndex + 1];
          }
        } else if (outputPath.includes('output/posts/')) {
          // Extract from source path during processing
          const outputIndex = pathParts.indexOf('output');
          if (outputIndex !== -1 && pathParts[outputIndex + 1] === 'posts') {
            postSlug = pathParts[outputIndex + 2];
          }
        }

        if (postSlug) {
          // Transform all image variations in one pass - route to root level
          content = content
            // HTML img tags with relative paths
            .replace(
              /<img([^>]*)\ssrc=["']images\/([^"']+)["']/g,
              (match, attrs, imageName) => {
                const newPath = `${pathPrefix}/${postSlug}/images/${imageName}`;
                return `<img${attrs} src="${newPath}"`;
              }
            )
            // Markdown-style images with relative paths
            .replace(
              /src=["']\.\/images\/([^"']+)["']/g,
              (match, imageName) => {
                const newPath = `${pathPrefix}/${postSlug}/images/${imageName}`;
                return `src="${newPath}"`;
              }
            )
            // Remaining markdown image syntax
            .replace(/!\[\]\(images\/([^)]+)\)/g, (match, imageName) => {
              const newSrc = `${pathPrefix}/${postSlug}/images/${imageName}`;
              return `<img src="${newSrc}" alt="" loading="lazy">`;
            });
        }
      }

      return content;
    }
  );

  // HTML entity decoding transform for blog content
  eleventyConfig.addTransform(
    'htmlEntityDecoder',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Early return if no HTML entities to decode
      if (
        !content.includes('&quot;') &&
        !content.includes('&#39;') &&
        !content.includes('&apos;')
      ) {
        return content;
      }

      // Only apply to blog post pages to avoid affecting other content
      if (outputPath.includes('/blog/') || outputPath.includes('/posts/')) {
        // Split content by code blocks to avoid decoding entities within them
        const codeBlockRegex = /<div class="code-block">.*?<\/div>/gs;
        const parts = content.split(codeBlockRegex);
        const codeBlocks = content.match(codeBlockRegex) || [];

        // Decode HTML entities only in non-code-block content
        const decodedParts = parts.map((part) => {
          return part
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'");
          // Note: NOT decoding &lt;, &gt;, &amp; as these might be needed for proper HTML display
        });

        // Reassemble content with original code blocks
        let result = '';
        for (let i = 0; i < decodedParts.length; i++) {
          result += decodedParts[i];
          if (i < codeBlocks.length) {
            result += codeBlocks[i];
          }
        }

        return result;
      }

      return content;
    }
  );

  // Custom filter for blog excerpts that removes code blocks and decodes HTML entities
  eleventyConfig.addFilter('blogExcerpt', function (content, length = 300) {
    if (!content) return '';

    // First, remove code blocks completely (both original [code] syntax and generated HTML)
    let cleanContent = content
      // Remove [code] blocks that haven't been processed yet
      .replace(/\[code[^\]]*\][\s\S]*?\[\/code\]/gi, ' ')
      // Remove generated code block HTML
      .replace(/<div class="code-block">[\s\S]*?<\/div>/gi, ' ')
      // Remove any remaining [code] orphan tags
      .replace(/\[(?:\/)?code[^\]]*\]/gi, ' ')
      // Remove HTML tags
      .replace(/<[^>]*>/g, ' ')
      // Decode HTML entities
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&') // Keep this last to avoid double-decoding
      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Truncate to specified length
    if (cleanContent.length > length) {
      // Find the last complete word within the length limit
      const truncated = cleanContent.substring(0, length);
      const lastSpace = truncated.lastIndexOf(' ');

      if (lastSpace > length * 0.8) {
        // If we found a space reasonably close to the end
        return truncated.substring(0, lastSpace) + '...';
      } else {
        return truncated + '...';
      }
    }

    return cleanContent;
  });

  // WordPress shortcode processor transform
  eleventyConfig.addTransform(
    'wordpressShortcodeProcessor',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Early return if no shortcodes present
      if (!content.includes('[') || !content.includes(']')) {
        return content;
      }

      let result = content;

      // Remove escaped backslashes from shortcodes first
      result = result.replace(/\\(\[|\])/g, '$1');

      // Process common WordPress shortcodes and convert to HTML or remove

      // Layout shortcodes - convert to semantic HTML
      result = result.replace(/\[row\]/g, '<div class="row">');
      result = result.replace(/\[\/row\]/g, '</div>');
      result = result.replace(/\[span(\d+)\]/g, '<div class="span-$1">');
      result = result.replace(/\[\/span(\d+)\]/g, '</div>');

      // Remove page blocks and layout wrapper shortcodes
      result = result.replace(/\[page_block[^\]]*\]/g, '');
      result = result.replace(/\[\/page_block\]/g, '');
      result = result.replace(
        /\[lazy_load_box[^\]]*\]/g,
        '<div class="content-box">'
      );
      result = result.replace(/\[\/lazy_load_box\]/g, '</div>');

      // Convert title boxes to proper headings
      result = result.replace(
        /\[title_box title="([^"]*)"[^\]]*\]/g,
        '<h2 class="section-title">$1</h2>'
      );

      // Convert service boxes to article elements
      result = result.replace(
        /\[service_box title="([^"]*)"[^>]*text="([^"]*)"[^\]]*\]/g,
        '<article class="service-box"><h3>$1</h3><p>$2</p></article>'
      );

      // Convert buttons to proper HTML
      result = result.replace(
        /\[button text="([^"]*)" link="([^"]*)"[^\]]*\]/g,
        '<a href="$2" class="btn btn-primary">$1</a>'
      );

      // Remove masonry view shortcodes (complex layout that needs manual handling)
      result = result.replace(
        /\[masonry_view[^\]]*\]/g,
        '<!-- Masonry view content removed -->'
      );

      // Remove content box wrapper shortcodes
      result = result.replace(
        /\[content_box[^\]]*\]/g,
        '<div class="content-section">'
      );
      result = result.replace(/\[\/content_box\]/g, '</div>');

      // Remove extra wrap shortcodes
      result = result.replace(/\[extra_wrap\]/g, '');
      result = result.replace(/\[\/extra_wrap\]/g, '');

      // Clean up any remaining unprocessed shortcodes
      result = result.replace(/\[[a-zA-Z_-]+[^\]]*\]/g, '');
      result = result.replace(/\[\/[a-zA-Z_-]+\]/g, '');

      return result;
    }
  );

  // Add PurgeCSS plugin for production builds only
  if (isProduction) {
    // Import your PurgeCSS configuration
    const purgeCSSConfig = require('./purgecss.config.js');
    
    eleventyConfig.addPlugin(purgeCSS, {
      // Direct PurgeCSS configuration options
      content: purgeCSSConfig.content,
      safelist: purgeCSSConfig.safelist,
      defaultExtractor: purgeCSSConfig.defaultExtractor,
      keyframes: purgeCSSConfig.keyframes,
      fontFace: purgeCSSConfig.fontFace,
      variables: purgeCSSConfig.variables,
      // Eleventy-specific options
      quiet: false, // Show what's being processed
    });
  }

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('_redirects'); // Netlify redirects
  eleventyConfig.addPassthroughCopy({ _pagefind: 'pagefind' });
  eleventyConfig.addPassthroughCopy('assets'); // Assets folder including images
  eleventyConfig.addPassthroughCopy('js'); // JavaScript files for search functionality

  // Copy WordPress post images to their new locations
  const fs = require('fs');
  const path = require('path');

  // Comprehensive passthrough copy for post images
  // We need to set these up during config, not during build
  try {
    const postsDir = './output/posts/';

    // Check directory existence only once
    if (!fs.existsSync(postsDir)) {
      if (isDevelopment) {
        console.log(
          '📝 Note: No output/posts directory found. Skipping image setup.'
        );
      }
      return;
    }

    let postDirs = [];
    try {
      // More efficient directory reading
      postDirs = fs
        .readdirSync(postsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch (readError) {
      console.warn(
        '⚠️ Warning: Could not read posts directory:',
        readError.message
      );
      return;
    }

    // Batch process with fewer file system calls
    let configuredCount = 0;
    const imageConfigs = [];

    for (const postSlug of postDirs) {
      try {
        const imagesPath = path.join(postsDir, postSlug, 'images');
        if (fs.existsSync(imagesPath)) {
          imageConfigs.push({
            [`output/posts/${postSlug}/images`]: `${postSlug}/images`,
          });
          configuredCount++;
        }
      } catch (copyError) {
        console.warn(
          `⚠️ Warning: Could not check images for ${postSlug}:`,
          copyError.message
        );
      }
    }

    // Add all configurations at once
    imageConfigs.forEach((config) => {
      eleventyConfig.addPassthroughCopy(config);
    });

    if (isDevelopment && configuredCount > 0) {
      console.log(
        `✅ Configured image copying for ${configuredCount} posts with images`
      );
    }
  } catch (error) {
    console.warn(
      '⚠️ Warning: Error during image configuration setup:',
      error.message
    );
  }

  // WordPress export collections
  eleventyConfig.addCollection('wordpressPosts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('output/posts/*/index.md')
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  // Add custom permalink for WordPress posts to route them to root level
  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: (data) => {
      // Only apply to WordPress posts
      if (data.page?.inputPath?.includes('output/posts/')) {
        const pathParts = data.page.inputPath.split('/');
        const outputIndex = pathParts.indexOf('output');
        if (outputIndex !== -1 && pathParts[outputIndex + 1] === 'posts') {
          const postSlug = pathParts[outputIndex + 2];
          return `/${postSlug}/`; // Root level structure
        }
      }
      return data.permalink;
    },
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
          // Use category exactly as written, no manipulation
          let slug = category.trim();

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

  // Performance optimizations for production builds
  if (isProduction) {
    eleventyConfig.setQuietMode(true);
  }

  // Ignore docs folder to prevent template processing of instruction files
  eleventyConfig.ignores.add('docs/**');

  return {
    // No pathPrefix needed for custom domain
    pathPrefix: '',
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
