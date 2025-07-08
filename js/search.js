/**
 * Search Implementation using Pagefind API with Custom Blog Card Templates
 * Uses the Pagefind API directly to render custom HTML instead of PagefindUI
 */

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const searchContainer = document.getElementById('search');
  if (!searchContainer) {
    console.error('Search element not found');
    return;
  }

  console.log('Initializing custom Pagefind search...');

  // Initialize Pagefind
  await initializePagefind();

  async function initializePagefind() {
    try {
      console.log('Loading Pagefind...');
      
      // Import Pagefind dynamically
      const pagefind = await import('/pagefind/pagefind.js');
      
      // Store in window for global access
      window.pagefind = pagefind;
      
      console.log('Pagefind loaded successfully, creating search interface...');
      createSearchInterface();
      
    } catch (error) {
      console.error('Failed to load Pagefind:', error);
      // Fallback: create basic search interface with error message
      createSearchInterface(true);
    }
  }

  /**
   * Create the search input and results container
   */
  function createSearchInterface(hasError = false) {
    searchContainer.innerHTML = `
      <input 
        type="text" 
        id="search-input" 
        class="search-input" 
        placeholder="Search articles..."
        autocomplete="off"
        aria-label="Search articles"
        ${hasError ? 'disabled' : ''}
      >
      <div id="search-results" class="search-results" role="region" aria-live="polite">
        ${hasError ? '<p class="search-message">❌ Search is currently unavailable</p>' : ''}
      </div>
    `;

    if (hasError) return;

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    let searchTimeout;
    
    // Add event listener for search input
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length === 0) {
        searchResults.innerHTML = '';
        return;
      }
      
      if (query.length < 2) {
        searchResults.innerHTML = '<p class="search-message">Type at least 2 characters to search...</p>';
        return;
      }
      
      // Debounce the search
      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });
  }

  /**
   * Perform search using Pagefind API
   */
  async function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    
    try {
      searchResults.innerHTML = '<p class="search-message">🔍 Searching...</p>';
      
      // Check if Pagefind is available
      if (!window.pagefind) {
        throw new Error('Pagefind is not loaded');
      }
      
      // Perform the search using Pagefind API
      const search = await window.pagefind.search(query);
      
      if (search.results.length === 0) {
        searchResults.innerHTML = '<p class="search-message">❌ No results found</p>';
        return;
      }
      
      // Load the first 10 results
      const resultLimit = Math.min(search.results.length, 10);
      const results = await Promise.all(
        search.results.slice(0, resultLimit).map(r => r.data())
      );
      
      // Render results as blog cards
      renderBlogCards(results);
      
    } catch (error) {
      console.error('Search error:', error);
      if (error.message.includes('Pagefind is not loaded')) {
        searchResults.innerHTML = '<p class="search-message">❌ Search is loading. Please try again in a moment.</p>';
      } else {
        searchResults.innerHTML = '<p class="search-message">❌ Search failed. Please try again.</p>';
      }
    }
  }

  /**
   * Render search results as blog cards
   */
  function renderBlogCards(results) {
    const searchResults = document.getElementById('search-results');
    
    const blogCardsHTML = results.map(result => {
      return createBlogCard(result);
    }).join('');
    
    searchResults.innerHTML = blogCardsHTML;
  }

  /**
   * Create individual blog card HTML
   */
  function createBlogCard(result) {
    // Extract metadata
    const title = result.meta.title || extractTitleFromContent(result.content);
    const url = result.url;
    const excerpt = result.excerpt || extractExcerpt(result.content);
    const date = result.meta.date || extractDateFromUrl(url) || getCurrentDate();
    const category = result.meta.category || extractCategoryFromUrl(url);
    
    // Format the date
    const formattedDate = formatDate(date);
    
    // Create category tags if available
    const categoryTags = category ? createCategoryTags([category]) : '';
    
    return `
      <article class="blog-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <header>
          <h2 class="blog-post-title" itemprop="headline">
            <a href="${url}" itemprop="url">${title}</a>
          </h2>
          ${categoryTags}
        </header>
        <div class="blog-post-excerpt" itemprop="description">
          <p class="blog-post-excerpt">${excerpt}</p>
        </div>
        <footer class="blog-post-meta">
          <p class="blog-post-date">
            <em>Published on 
              <time datetime="${date}" itemprop="datePublished" data-pagefind-meta="date">
                ${formattedDate}
              </time>
            </em>
          </p>
        </footer>
        <meta itemprop="author" content="Mike Henke">
      </article>
    `;
  }

  /**
   * Extract title from content if not in meta
   */
  function extractTitleFromContent(content) {
    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (titleMatch) {
      return titleMatch[1].replace(/<[^>]*>/g, '').trim();
    }
    return 'Untitled';
  }

  /**
   * Extract excerpt from content
   */
  function extractExcerpt(content) {
    // Remove HTML tags and get first 150 characters
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  /**
   * Extract date from URL
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
      return `${yearMatch[1]}-01-01`;
    }

    return null;
  }

  /**
   * Extract category from URL
   */
  function extractCategoryFromUrl(url) {
    const pathSegments = url.split('/').filter(segment => segment.length > 0);
    
    // Look for category in URL path
    const categoryIndex = pathSegments.findIndex(segment => segment === 'category');
    if (categoryIndex !== -1 && pathSegments[categoryIndex + 1]) {
      return pathSegments[categoryIndex + 1];
    }
    
    // Check for common categories in the URL
    const commonCategories = ['ColdFusion', 'JavaScript', 'Eclipse', 'CFWheels', 'Development'];
    for (const category of commonCategories) {
      if (url.toLowerCase().includes(category.toLowerCase())) {
        return category;
      }
    }
    
    return null;
  }

  /**
   * Get current date in ISO format
   */
  function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Create category tags HTML
   */
  function createCategoryTags(categories) {
    if (!categories || categories.length === 0) {
      return '';
    }
    
    const categoryElements = categories
      .map(category => `<a href="/category/${category.trim()}/" class="category-tag">${category}</a>`)
      .join('');

    return `<div class="blog-post-categories">${categoryElements}</div>`;
  }

  /**
   * Format date for display
   */
  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  }
});