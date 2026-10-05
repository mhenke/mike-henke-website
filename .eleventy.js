const { DateTime } = require("luxon");
const { URL } = require("url");

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
  const isProduction = process.env.NODE_ENV === "production";
  const isDevelopment = !isProduction;

  // Helper: generate URL path for WordPress post images
  function imagePath(postSlug, imageName) {
    return `/blog/${postSlug}/images/${imageName}`;
  }

  // Expose environment to templates for conditional rendering
  eleventyConfig.addGlobalData("site.environment", () =>
    isDevelopment ? "development" : "production",
  );

  // Build performance monitoring
  let buildStartTime;
  eleventyConfig.on("eleventy.before", function () {
    buildStartTime = Date.now();
    if (isDevelopment) {
      console.warn("🚀 Starting Eleventy build...");
    }
  });

  eleventyConfig.on("eleventy.after", function () {
    if (buildStartTime && isDevelopment) {
      const buildTime = Date.now() - buildStartTime;
      console.warn(`✅ Build completed in ${buildTime}ms`);
    }
  });
  // Date filter using Luxon
  eleventyConfig.addFilter("date", (dateObj, format) => {
    if (dateObj === "now") {
      return DateTime.now().toFormat(format);
    }
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Slugify filter for category URLs - no manipulation, use as-is
  eleventyConfig.addFilter("slugify", function (str) {
    return str.trim();
  });

  // Category slug filter - no manipulation, preserve exactly as written
  eleventyConfig.addFilter("categorySlug", function (category) {
    if (!category) return "";
    return category.trim();
  });

  // absoluteUrl filter
  eleventyConfig.addFilter("absoluteUrl", function (url, base) {
    try {
      // Access global data via this.ctx.site if base is not provided or invalid
      if (
        !base ||
        !(
          URL.canParse(base) ||
          (typeof base === "string" && base.startsWith("http"))
        )
      ) {
        const siteUrl = this.ctx?.site?.url;
        if (siteUrl) {
          base = siteUrl;
        } else {
          console.warn(
            "Base URL for absoluteUrl filter is not defined in site data. Falling back to relative URL.",
          );
          return url;
        }
      }
      return new URL(url, base).href;
    } catch (urlError) {
      console.error(
        `Error creating absolute URL for ${url} with base ${base}:`,
        urlError,
      );
      return url;
    }
  });

  // Filter collection by category
  eleventyConfig.addFilter("filterByCategory", function (collection, category) {
    if (!collection || !Array.isArray(collection)) return [];
    return collection.filter((item) => {
      if (!item.data || !item.data.category) return false;
      return item.data.category === category;
    });
  });

  // Markdown image processing - modify markdown-it to handle image paths
  eleventyConfig.amendLibrary("md", function (mdLib) {
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
          const srcIndex = token.attrIndex("src");

          if (srcIndex >= 0) {
            const src = token.attrs[srcIndex][1];

            // Only process relative image paths that start with 'images/'
            if (src && src.startsWith("images/")) {
              // Extract post slug from available data
              let postSlug = "";

              if (
                env?.page?.inputPath &&
                env.page.inputPath.includes("output/posts/")
              ) {
                const pathParts = env.page.inputPath.split("/");
                const outputIndex = pathParts.indexOf("output");
                if (
                  outputIndex !== -1 &&
                  pathParts[outputIndex + 1] === "posts"
                ) {
                  postSlug = pathParts[outputIndex + 2];
                }
              }

              if (postSlug) {
                const imageName = src.replace("images/", "");
                // Route images to /blog/slug/images/ under the blog prefix
                const newSrc = imagePath(postSlug, imageName);
                token.attrs[srcIndex][1] = newSrc;
              }
            }
          }

          // Ensure we always render the image tag properly
          const token_o = tokens[idx];
          let aIndex = token_o.attrIndex("alt");
          let alt = "";

          if (aIndex >= 0) {
            alt = token_o.attrs[aIndex][1] || "";
          } else if (token_o.content) {
            alt = token_o.content;
          }

          // Get the final src value safely
          const finalSrc =
            srcIndex >= 0 && token_o.attrs[srcIndex]
              ? token_o.attrs[srcIndex][1]
              : "";

          // Return a proper HTML img tag
          return `<img src="${finalSrc}" alt="${alt}" loading="lazy">`;
        } catch (renderError) {
          console.error(
            "⚠️ Warning: Error rendering image in markdown:",
            renderError.message,
          );
          // Fallback to default renderer
          return defaultImageRenderer(tokens, idx, options, env, self);
        }
      };

      // Custom renderer for fenced code blocks with .code-block wrapper, header, language badge, and copy button
      mdLib.renderer.rules.fence = function (tokens, idx) {
        const token = tokens[idx];
        const info = token.info ? token.info.trim() : "";
        const rawLang = info ? info.split(/\s+/g)[0] : "";
        const safeLang = /^[a-zA-Z0-9_-]+$/.test(rawLang)
          ? rawLang.toLowerCase()
          : "";

        const languageMap = {
          coldfusion: "coldfusion",
          cfml: "coldfusion",
          cfscript: "javascript",
          javascript: "javascript",
          js: "javascript",
          java: "java",
          sql: "sql",
          xml: "xml",
          html: "html",
          css: "css",
          python: "python",
          bash: "bash",
          shell: "bash",
          json: "json",
        };

        const prismLang = languageMap[safeLang] || safeLang || "none";
        const displayLang = mdLib.utils.escapeHtml(
          (safeLang || "code").toUpperCase(),
        );
        const escapedCode = mdLib.utils.escapeHtml(token.content);

        return `<div class="code-block">
  <div class="code-header">
    <span class="code-language" aria-hidden="true">${displayLang}</span>
    <button class="code-copy" onclick="copyCode(this)" aria-label="Copy code">
      <i class="ph ph-copy" aria-hidden="true"></i>
    </button>
  </div>
  <pre class="line-numbers"><code class="language-${prismLang}">${escapedCode}</code></pre>
</div>\n`;
      };
    } catch (error) {
      console.error(
        "⚠️ Warning: Could not configure markdown renderer:",
        error.message,
      );
    }
  });

  // Custom filter for blog excerpts that removes code blocks and decodes HTML entities
  eleventyConfig.addFilter("blogExcerpt", function (content, length = 300) {
    if (!content) return "";

    // First, remove code blocks completely (both original [code] syntax and generated HTML)
    let cleanContent = content
      // Remove [code] blocks that haven't been processed yet
      .replace(/\[code[^\]]*\][\s\S]*?\[\/code\]/gi, " ")
      // Remove generated code block HTML
      .replace(/<div class="code-block">[\s\S]*?<\/div>/gi, " ")
      // Remove any remaining [code] orphan tags
      .replace(/\[(?:\/)?code[^\]]*\]/gi, " ")
      // Remove HTML tags
      .replace(/<[^>]*>/g, " ")
      // Decode HTML entities
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&") // Keep this last to avoid double-decoding
      // Clean up whitespace
      .replace(/\s+/g, " ")
      .trim();

    // Truncate to specified length
    if (cleanContent.length > length) {
      // Find the last complete word within the length limit
      const truncated = cleanContent.substring(0, length);
      const lastSpace = truncated.lastIndexOf(" ");

      if (lastSpace > length * 0.8) {
        // If we found a space reasonably close to the end
        return truncated.substring(0, lastSpace) + "...";
      } else {
        return truncated + "...";
      }
    }

    return cleanContent;
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("_redirects"); // Netlify redirects
  eleventyConfig.addPassthroughCopy({ _pagefind: "pagefind" });
  eleventyConfig.addPassthroughCopy("assets"); // Assets folder including images
  eleventyConfig.addPassthroughCopy("js"); // JavaScript files for search functionality

  // Copy WordPress post images to their new locations
  const fs = require("fs");
  const path = require("path");

  // Comprehensive passthrough copy for post images
  // We need to set these up during config, not during build
  try {
    const postsDir = "./output/posts/";

    // Check directory existence only once
    if (!fs.existsSync(postsDir)) {
      if (isDevelopment) {
        console.warn(
          "📝 Note: No output/posts directory found. Skipping image setup.",
        );
      }
    } else {
      let postDirs = [];
      try {
        // More efficient directory reading
        postDirs = fs
          .readdirSync(postsDir, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);
      } catch (readError) {
        console.error(
          "⚠️ Warning: Could not read posts directory:",
          readError.message,
        );
        return;
      }

      // Batch process with fewer file system calls
      let configuredCount = 0;
      const imageConfigs = [];

      for (const postSlug of postDirs) {
        try {
          const imagesPath = path.join(postsDir, postSlug, "images");
          if (fs.existsSync(imagesPath)) {
            imageConfigs.push({
              [`output/posts/${postSlug}/images`]: `blog/${postSlug}/images`,
            });
            configuredCount++;
          }
        } catch (copyError) {
          console.error(
            `⚠️ Warning: Could not check images for ${postSlug}:`,
            copyError.message,
          );
        }
      }

      // Add all configurations at once
      imageConfigs.forEach((config) => {
        eleventyConfig.addPassthroughCopy(config);
      });

      if (isDevelopment && configuredCount > 0) {
        console.warn(
          `✅ Configured image copying for ${configuredCount} posts with images`,
        );
      }
    }
  } catch (setupError) {
    console.error(
      "⚠️ Warning: Error during image configuration setup:",
      setupError,
    );
  }

  // WordPress export collections
  eleventyConfig.addCollection("wordpressPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("output/posts/*/index.md")
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  // Add custom permalink for WordPress posts to route them under /blog/
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      // Only apply to WordPress posts
      if (data.page?.inputPath?.includes("output/posts/")) {
        const pathParts = data.page.inputPath.split("/");
        const outputIndex = pathParts.indexOf("output");
        if (outputIndex !== -1 && pathParts[outputIndex + 1] === "posts") {
          const postSlug = pathParts[outputIndex + 2];
          return `/blog/${postSlug}/`;
        }
      }
      return data.permalink;
    },
  });

  eleventyConfig.addCollection("wordpressPages", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("output/pages/*/index.md")
      .sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
      });
  });

  // Combined posts collection (regular + WordPress)
  eleventyConfig.addCollection("allPosts", function (collectionApi) {
    const regularPosts = collectionApi.getFilteredByGlob("posts/*.md");
    const wordpressPosts = collectionApi.getFilteredByGlob(
      "output/posts/*/index.md",
    );
    return [...regularPosts, ...wordpressPosts].sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Category collections for filtering
  eleventyConfig.addCollection("allCategories", function (collectionApi) {
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

  eleventyConfig.addCollection("postsByCategory", function (collectionApi) {
    const postsByCategory = {};
    const allPosts = collectionApi.getFilteredByGlob([
      "posts/*.md",
      "output/posts/*/index.md",
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
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add(".git/**");

  return {
    // No pathPrefix needed for custom domain
    pathPrefix: "",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
