/**
 * Simple Search Implementation
 */

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const searchElement = document.getElementById('search');
  if (!searchElement) {
    console.error('Search element not found');
    return;
  }

  // Basic Pagefind configuration
  const searchConfig = {
    element: '#search',
    showSubResults: false,
    showFilters: false,
    debounceTimeoutMs: 300,
    pageSize: 10,
    showImages: false,
    resetStyles: false,
    bundlePath: '/pagefind/',
    translations: {
      placeholder: 'Search blog posts and articles...',
      clear_search: 'Clear',
      load_more: 'Load more',
      zero_results: 'No results found.',
      many_results: 'results found',
      one_result: 'result found',
    },
  };

  try {
    new PagefindUI(searchConfig);
    console.log('Search initialized successfully');
  } catch (error) {
    console.error('Failed to initialize search:', error);
  }
});
