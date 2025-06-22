const { DateTime } = require('luxon');
const { URL } = require('url');

module.exports = function (eleventyConfig) {
  // Simplified code block transform
  eleventyConfig.addTransform(
    'codeBlockTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      function createCodeBlock(language, code) {
        // Clean and normalize the code content
        const cleanCode = code
          .trim()
          // Remove HTML paragraph tags that might have been added
          .replace(/<\/?p[^>]*>/gi, '')
          // Decode HTML entities
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

        // Debug: Log the language variable to see what it contains
        if (language.includes('"') || language.includes("'")) {
          console.log(
            '🐛 Language with quotes detected:',
            JSON.stringify(language)
          );
        }

        const prismClass =
          languageMap[language.toLowerCase()] ||
          `language-${language.toLowerCase()}`;

        return `<div class="code-block">
  <div class="code-header">
    <span class="code-language">${language.toUpperCase()}</span>
    <button class="code-copy" onclick="copyCode(this)" aria-label="Copy code">
      <i class="fas fa-copy"></i>
    </button>
  </div>
  <pre class="line-numbers"><code class="${prismClass}">${escapedCode}</code></pre>
</div>`;
      }

      let result = content;

      // Step 1: Remove ALL backslashes around brackets completely
      result = result.replace(/\\+(\[)/g, '$1');
      result = result.replace(/(\])\\+/g, '$1');
      result = result.replace(/\\+(\])/g, '$1');

      // Step 2: Handle the main patterns
      // Pattern 1: [code language="lang"]content[/code]
      result = result.replace(
        /\[code\s+language\s*=\s*["'""]([^"'""]+)["'"""][^\]]*\]([\s\S]*?)\[\/code\]/gi,
        (match, language, code) => {
          // Clean the language of any remaining quotes
          const cleanLanguage = language.replace(/^["'""]|["'""]$/g, '');
          return createCodeBlock(cleanLanguage, code);
        }
      );

      // Pattern 2: [code language=lang] (without quotes)
      result = result.replace(
        /\[code\s+language\s*=\s*([^\s\]]+)[^\]]*\]([\s\S]*?)\[\/code\]/gi,
        (match, language, code) => createCodeBlock(language, code)
      );

      // Pattern 3: [code="lang"] (alternate syntax)
      result = result.replace(
        /\[code\s*=\s*["'""]([^"'""]+)["'""]\s*\]([\s\S]*?)\[\/code\]/gi,
        (match, language, code) => {
          // Clean the language of any remaining quotes
          const cleanLanguage = language.replace(/^["'""]|["'""]$/g, '');
          return createCodeBlock(cleanLanguage, code);
        }
      );

      // Step 3: Clean up any remaining orphaned tags
      result = result.replace(/\[(?:\/)?code[^\]]*\]/gi, '');

      // Step 4: Clean up excessive paragraph tags
      result = result.replace(/<\/p>\s*<\/p>/g, '</p>');
      result = result.replace(/<p>\s*<p>/g, '<p>');
      result = result.replace(/<p>\s*<\/p>/g, '');

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

  // Debug transform to see what content we're getting
  eleventyConfig.addTransform('debugContent', function (content, outputPath) {
    if (outputPath && outputPath.includes('cfwheels-application-part-3')) {
      console.log('🔍 CFWheels Part 3 content check:');
      console.log(
        'Has ![](images/cfwheels3_4.jpg):',
        content.includes('![](images/cfwheels3_4.jpg)')
      );
      console.log('Has <img src=:', content.includes('<img src='));
      console.log('File extension processed as:', this.inputPath || 'unknown');
    }
    return content;
  });

  // Markdown image processing - modify markdown-it to handle image paths
  eleventyConfig.amendLibrary('md', function (mdLib) {
    // Override the default image renderer
    const defaultImageRenderer =
      mdLib.renderer.rules.image ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    mdLib.renderer.rules.image = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const srcIndex = token.attrIndex('src');
      const altIndex = token.attrIndex('alt');

      if (srcIndex >= 0) {
        const src = token.attrs[srcIndex][1];

        // Log all images for CFWheels part 3 post
        if (
          env?.page?.inputPath &&
          env.page.inputPath.includes('cfwheels-application-part-3')
        ) {
          console.log('🎯 CFWheels Part 3 image found:', src);
        }

        // Only process relative image paths that start with 'images/'
        if (src.startsWith('images/')) {
          const pathPrefix =
            process.env?.NODE_ENV === 'production' ? '/mike-henke-website' : '';

          // Extract post slug from available data
          let postSlug = '';

          if (
            env?.page?.inputPath &&
            env.page.inputPath.includes('output/posts/')
          ) {
            const pathParts = env.page.inputPath.split('/');
            const outputIndex = pathParts.indexOf('output');
            if (outputIndex !== -1 && pathParts[outputIndex + 1] === 'posts') {
              postSlug = pathParts[outputIndex + 2];
            }
          }

          if (postSlug) {
            const imageName = src.replace('images/', '');
            // Route images to the blog directory structure
            const newSrc = `${pathPrefix}/blog/${postSlug}/images/${imageName}`;
            token.attrs[srcIndex][1] = newSrc;

            if (
              env?.page?.inputPath &&
              env.page.inputPath.includes('cfwheels-application-part-3')
            ) {
              console.log(
                '🔄 CFWheels Part 3 image transformed:',
                src,
                '→',
                newSrc
              );
            }
          }
        }
      }

      // Ensure we always render the image tag properly
      const token_o = tokens[idx];
      let aIndex = token_o.attrIndex('alt');
      let alt = '';

      if (aIndex >= 0) {
        alt = token_o.attrs[aIndex][1];
      } else if (token_o.content) {
        alt = token_o.content;
      }

      // Get the final src value
      const finalSrc = token_o.attrs[srcIndex][1];

      // Return a proper HTML img tag
      return `<img src="${finalSrc}" alt="${alt}" loading="lazy">`;
    };
  });

  // Remove the markdown image transform since we're handling it in markdown-it now

  // Image path transform for WordPress posts
  eleventyConfig.addTransform(
    'imagePathTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Only transform WordPress post pages
      if (outputPath.includes('/blog/') || outputPath.includes('/posts/')) {
        const pathPrefix =
          process.env?.NODE_ENV === 'production' ? '/mike-henke-website' : '';

        // Transform relative image paths to absolute paths
        content = content.replace(
          /<img([^>]*)\ssrc=["']images\/([^"']+)["']/g,
          (match, attrs, imageName) => {
            // Extract the post slug from the output path
            const pathParts = outputPath.split('/');
            const postSlug = pathParts[pathParts.length - 2]; // Get the directory name

            const newPath = `${pathPrefix}/blog/${postSlug}/images/${imageName}`;
            return `<img${attrs} src="${newPath}"`;
          }
        );

        // Also handle markdown-style images that might have been converted
        content = content.replace(
          /src=["']\.\/images\/([^"']+)["']/g,
          (match, imageName) => {
            const pathParts = outputPath.split('/');
            const postSlug = pathParts[pathParts.length - 2];

            const newPath = `${pathPrefix}/blog/${postSlug}/images/${imageName}`;
            return `src="${newPath}"`;
          }
        );
      }

      return content;
    }
  );

  // Fallback transform to convert any remaining markdown images that weren't processed by markdown-it
  eleventyConfig.addTransform(
    'fallbackImageTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
        return content;
      }

      // Only process WordPress post pages
      if (outputPath.includes('/blog/') || outputPath.includes('/posts/')) {
        const pathPrefix =
          process.env?.NODE_ENV === 'production' ? '/mike-henke-website' : '';

        // Transform remaining markdown image syntax to HTML img tags
        content = content.replace(
          /!\[\]\(images\/([^)]+)\)/g,
          (match, imageName) => {
            // Extract the post slug from the output path
            const pathParts = outputPath.split('/');
            let postSlug = '';

            // Find the post slug in the path
            for (let i = 0; i < pathParts.length; i++) {
              if (pathParts[i] === 'blog' && pathParts[i + 1]) {
                postSlug = pathParts[i + 1];
                break;
              }
            }

            if (postSlug) {
              const newSrc = `${pathPrefix}/blog/${postSlug}/images/${imageName}`;

              if (outputPath.includes('cfwheels-application-part-3')) {
                console.log(
                  '🔄 Fallback image transform:',
                  match,
                  '→',
                  `<img src="${newSrc}" alt="" loading="lazy">`
                );
              }

              return `<img src="${newSrc}" alt="" loading="lazy">`;
            }

            return match; // Return unchanged if we can't determine the post slug
          }
        );
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

  // Podcast and embed transform
  eleventyConfig.addTransform(
    'podcastEmbedTransform',
    function (content, outputPath) {
      if (!outputPath || !outputPath.endsWith('.html')) {
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
  <audio controls preload="metadata" style="width: 100%; max-width: 600px;">
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
            return `<div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000; margin: 20px 0;">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
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

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy({ _pagefind: 'pagefind' });
  eleventyConfig.addPassthroughCopy('assets'); // Assets folder including images

  // Copy WordPress post images to blog directory structure
  // Instead of copying to output/posts/*, we copy to blog/* to match the URL structure
  const fs = require('fs');
  const path = require('path');
  const glob = require('glob');

  // Find all image directories in output/posts/*/images/
  const imageDirs = glob.sync('output/posts/*/images/');

  imageDirs.forEach((dir) => {
    // Extract post slug from path: output/posts/POST-SLUG/images/
    const postSlug = dir.split('/')[2];

    // Set up passthrough copy from source to blog destination
    eleventyConfig.addPassthroughCopy({
      [`output/posts/${postSlug}/images/`]: `blog/${postSlug}/images/`,
    });
  });

  // WordPress export collections
  eleventyConfig.addCollection('wordpressPosts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('output/posts/*/index.md')
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  // Add custom permalink for WordPress posts to route them to /blog/
  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: (data) => {
      // Only apply to WordPress posts
      if (data.page?.inputPath?.includes('output/posts/')) {
        const pathParts = data.page.inputPath.split('/');
        const outputIndex = pathParts.indexOf('output');
        if (outputIndex !== -1 && pathParts[outputIndex + 1] === 'posts') {
          const postSlug = pathParts[outputIndex + 2];
          return `/blog/${postSlug}/`;
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
