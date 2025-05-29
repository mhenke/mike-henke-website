const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  // Date filter using Luxon
  eleventyConfig.addFilter('date', (dateObj, format) => {
    // Ensure dateObj is a Date object before formatting
    // If dateObj is 'now', use current DateTime
    if (dateObj === 'now') {
      return DateTime.now().toFormat(format);
    }
    // Otherwise, attempt to convert from JS Date
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('styles.css');
  eleventyConfig.addPassthroughCopy('profile.jpg'); // If you have other static assets like images
  eleventyConfig.addPassthroughCopy({ _pagefind: 'pagefind' });

  return {
    dir: {
      input: '.', // Source files are in the root
      includes: '_includes', // For layouts, partials
      data: '_data', // For global data files
      output: '_site', // Output directory
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
