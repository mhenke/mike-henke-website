const { DateTime } = require('luxon');
const { URL } = require('url');

module.exports = function (eleventyConfig) {
  // Date filter using Luxon
  eleventyConfig.addFilter('date', (dateObj, format) => {
    if (dateObj === 'now') {
      return DateTime.now().toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
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

  return {
    pathPrefix:
      process.env.NODE_ENV === 'production' ? '/mike-henke-website/' : '/',
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
