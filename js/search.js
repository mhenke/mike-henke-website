/**
 * Simple Search Implementation using PagefindUI
 * Uses processResult for customization and relies on PagefindUI's built-in rendering
 */

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const searchElement = document.getElementById('search');
  if (!searchElement) {
    console.error('Search element not found');
    return;
  }

  console.log('Initializing PagefindUI...');

  // Initialize PagefindUI with processResult for data customization
  new PagefindUI({
    element: '#search',
    showImages: false,
    showFilters: false,
    pageSize: 8,
    debounceTimeoutMs: 300,
    processResult: function (result) {
      console.log('processResult called for:', result);

      // Clean up the excerpt if it exists
      if (result.excerpt) {
        result.excerpt = result.excerpt
          .replace(/<[^>]*>/g, ' ') // Remove HTML tags
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      }

      // Use custom excerpt if available
      if (result.meta?.custom_excerpt) {
        result.excerpt = result.meta.custom_excerpt;
      }

      // Ensure we have a clean title
      if (result.meta?.title) {
        result.title = result.meta.title;
      }

      // Clean up categories - convert to array if needed
      if (result.meta?.category) {
        result.categories = Array.isArray(result.meta.category)
          ? result.meta.category
          : [result.meta.category];
      }

      // Clean up date
      if (result.meta?.date) {
        result.date = result.meta.date;
      }

      console.log('Processed result:', {
        title: result.title,
        url: result.url,
        excerpt: result.excerpt,
        categories: result.categories,
        date: result.date,
      });

      return result;
    },
  });

  console.log('PagefindUI initialized successfully');
});
