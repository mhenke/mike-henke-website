/**
 * Search Enhancements
 * Adds search results count display similar to mobile search interface
 */

document.addEventListener('DOMContentLoaded', function () {
  // Wait for Pagefind to initialize
  setTimeout(function () {
    enhanceSearchResults();
  }, 1000);
});

function enhanceSearchResults() {
  const searchContainer = document.getElementById('search');
  if (!searchContainer) return;

  // Create observer to watch for search results changes
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        updateResultsCount();
      }
    });
  });

  // Start observing
  observer.observe(searchContainer, {
    childList: true,
    subtree: true,
  });

  // Also listen for input changes
  const searchInput = searchContainer.querySelector(
    'input[type="search"], .pagefind-ui__search-input'
  );
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      setTimeout(updateResultsCount, 500); // Delay to allow search to complete
    });
  }
}

function updateResultsCount() {
  const searchContainer = document.getElementById('search');
  if (!searchContainer) return;

  const searchInput = searchContainer.querySelector(
    'input[type="search"], .pagefind-ui__search-input'
  );
  const resultsContainer = searchContainer.querySelector(
    '.pagefind-ui__results'
  );

  if (!searchInput || !resultsContainer) return;

  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    removeResultsCount();
    return;
  }

  // Count actual result items
  const resultItems = resultsContainer.querySelectorAll('.pagefind-ui__result');
  const resultCount = resultItems.length;

  if (resultCount === 0) {
    removeResultsCount();
    return;
  }

  // Create or update results count element
  let countElement = searchContainer.querySelector('.search-results-count');
  if (!countElement) {
    countElement = document.createElement('div');
    countElement.className = 'search-results-count';

    // Insert before results container
    resultsContainer.parentNode.insertBefore(countElement, resultsContainer);
  }

  // Update content with highlighted search term
  const pluralText = resultCount === 1 ? 'result' : 'results';
  countElement.innerHTML = `${resultCount} ${pluralText} for "<span class="search-term">${escapeHtml(searchTerm)}</span>"`;

  // Add visible class for animation
  countElement.classList.add('visible');
}

function removeResultsCount() {
  const countElement = document.querySelector('.search-results-count');
  if (countElement) {
    countElement.remove();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Alternative implementation for custom search setups
function createCustomResultsCount(
  containerId,
  searchInputId,
  resultsContainerId
) {
  const container = document.getElementById(containerId);
  const searchInput = document.getElementById(searchInputId);
  const resultsContainer = document.getElementById(resultsContainerId);

  if (!container || !searchInput || !resultsContainer) return;

  // Create results count element
  const countElement = document.createElement('div');
  countElement.id = 'search-results-count';
  countElement.className = 'search-results-count';

  // Insert after search input
  searchInput.parentNode.insertBefore(countElement, searchInput.nextSibling);

  // Function to update count
  function updateCount() {
    const searchTerm = searchInput.value.trim();
    const resultItems = resultsContainer.querySelectorAll(
      '.search-result-item, .blog-post-card'
    );
    const resultCount = resultItems.length;

    if (searchTerm && resultCount > 0) {
      const pluralText = resultCount === 1 ? 'result' : 'results';
      countElement.innerHTML = `${resultCount} ${pluralText} for "<span class="search-term">${escapeHtml(searchTerm)}</span>"`;
      countElement.classList.add('visible');
    } else {
      countElement.classList.remove('visible');
    }
  }

  // Listen for search input changes
  searchInput.addEventListener('input', function () {
    setTimeout(updateCount, 300);
  });

  // Listen for results container changes
  const observer = new MutationObserver(updateCount);
  observer.observe(resultsContainer, {
    childList: true,
    subtree: true,
  });
}

// Export for manual initialization if needed
window.searchEnhancements = {
  enhance: enhanceSearchResults,
  createCustomResultsCount: createCustomResultsCount,
};
