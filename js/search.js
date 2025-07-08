/**
 * Search Implementation using PagefindUI with Blog Card Styling
 * Uses processResult for data customization and DOM manipulation for blog card styling
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
  const pagefindUI = new PagefindUI({
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

  // Transform search results to match blog card structure
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        const resultsContainer = document.querySelector(
          '.pagefind-ui__results'
        );
        if (resultsContainer) {
          transformSearchResults(resultsContainer);
        }
      }
    });
  });

  // Start observing the search container
  observer.observe(searchElement, {
    childList: true,
    subtree: true,
  });

  /**
   * Transform PagefindUI results to match blog card structure
   */
  function transformSearchResults(resultsContainer) {
    const results = resultsContainer.querySelectorAll(
      '.pagefind-ui__result:not(.transformed)'
    );

    results.forEach((result, index) => {
      try {
        transformSingleResult(result, index);
      } catch (error) {
        console.error('Error transforming search result:', error);
      }
    });
  }

  /**
   * Transform a single search result to blog card format
   */
  function transformSingleResult(result, index) {
    // Mark as transformed to avoid re-processing
    result.classList.add('transformed');

    // Extract data from the pagefind result
    const titleElement = result.querySelector('.pagefind-ui__result-title');
    const linkElement = result.querySelector('.pagefind-ui__result-link');
    const excerptElement = result.querySelector('.pagefind-ui__result-excerpt');
    const tagsElement = result.querySelector('.pagefind-ui__result-tags');

    if (!titleElement || !linkElement) {
      console.warn('Missing required elements in search result');
      return;
    }

    const title = titleElement.textContent.trim();
    const url = linkElement.getAttribute('href');
    const excerpt = excerptElement ? excerptElement.textContent.trim() : '';

    // Extract date from meta tags if available
    let date = null;
    if (tagsElement) {
      const dateTags = tagsElement.querySelectorAll(
        '[data-pagefind-ui-meta="date"]'
      );
      if (dateTags.length > 0) {
        const dateText = dateTags[0].textContent.replace('Date: ', '').trim();
        date = new Date(dateText).toISOString().split('T')[0];
      }
    }

    // Fallback to extracting date from URL or use current date
    if (!date) {
      date = extractDateFromUrl(url) || new Date().toISOString().split('T')[0];
    }

    // Extract categories from URL structure (assuming /category/post-title/ format)
    const categories = extractCategoriesFromUrl(url);

    // Create blog card HTML structure
    const blogCardHTML = `
      <article class="blog-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <header>
          <h2 class="blog-post-title" itemprop="headline">
            <a href="${url}" itemprop="url">${title}</a>
          </h2>
          ${categories.length > 0 ? createCategoryTags(categories) : ''}
        </header>
        <div class="blog-post-excerpt" itemprop="description">
          ${excerpt}
        </div>
        <footer class="blog-post-meta">
          <time datetime="${date}" itemprop="datePublished">
            ${formatDate(date)}
          </time>
        </footer>
        <meta itemprop="author" content="Mike Henke">
      </article>
    `;

    // Create a new blog card element and insert it after the result
    const blogCard = document.createElement('div');
    blogCard.innerHTML = blogCardHTML;
    result.insertAdjacentElement('afterend', blogCard.firstElementChild);

    // Hide the original pagefind result
    result.style.display = 'none';
  }

  /**
   * Extract categories from URL (basic implementation)
   */
  function extractCategoriesFromUrl(url) {
    // This is a simple implementation - you might need to adjust based on your URL structure
    const pathSegments = url.split('/').filter((segment) => segment.length > 0);

    // Look for common category indicators in the URL
    const categoryIndicators = ['category', 'tag', 'topic'];
    const categories = [];

    pathSegments.forEach((segment, index) => {
      if (categoryIndicators.includes(segment) && pathSegments[index + 1]) {
        categories.push(pathSegments[index + 1]);
      }
    });

    // If no categories found via indicators, try to infer from common blog categories
    if (categories.length === 0) {
      const possibleCategories = [
        'Eclipse',
        'ColdFusion',
        'CFWheels',
        'JavaScript',
        'Development',
        'Programming',
        'Web Development',
        'Tutorial',
        'Guide',
      ];

      pathSegments.forEach((segment) => {
        const normalized =
          segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
        if (
          possibleCategories.some(
            (cat) =>
              normalized.includes(cat) ||
              cat.toLowerCase().includes(segment.toLowerCase())
          )
        ) {
          categories.push(normalized);
        }
      });
    }

    return categories;
  }

  /**
   * Extract date from URL (basic implementation)
   */
  function extractDateFromUrl(url) {
    // Look for date patterns in URL like /2023/01/15/ or /2023-01-15/
    const dateRegex = /\/(\d{4})[\/\-](\d{2})[\/\-](\d{2})\//;
    const match = url.match(dateRegex);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    // Try to extract year from path
    const yearRegex = /\/(\d{4})\//;
    const yearMatch = url.match(yearRegex);

    if (yearMatch) {
      return `${yearMatch[1]}-01-01`; // Default to January 1st
    }

    return null;
  }

  /**
   * Create category tags HTML
   */
  function createCategoryTags(categories) {
    const categoryElements = categories
      .map(
        (category) =>
          `<a href="/category/${category.toLowerCase()}/" class="category-tag">${category}</a>`
      )
      .join('');

    return `<div class="blog-post-categories">${categoryElements}</div>`;
  }

  /**
   * Format date for display
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
});
