module.exports = function (eleventyConfig) {
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
