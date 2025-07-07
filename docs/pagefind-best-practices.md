# Complete Guide: Pagefind + Nunjucks External Script Architecture

## Overview

The external script file approach is the gold standard for integrating Pagefind with Nunjucks-based static sites. This method completely eliminates template parsing conflicts while providing better performance, maintainability, and debugging capabilities.

## File Structure

```
src/
├── _includes/
│   ├── scripts-search.njk           # Script inclusion template
│   └── search-config.njk            # Configuration template
├── js/
│   ├── search.js                    # Main search functionality
│   ├── search-config.js             # Generated configuration
│   └── search-utils.js              # Utility functions
├── _data/
│   └── search.json                  # Search settings
└── assets/
    └── css/
        └── search.css               # Search styling
```

## Step-by-Step Implementation

### 1. Configuration Data File

**`_data/search.json`**
```json
{
  "debounceMs": 300,
  "excerptLength": 300,
  "pageSize": 8,
  "showImages": false,
  "showFilters": false,
  "resetStyles": false,
  "translations": {
    "placeholder": "Search articles, posts, and pages...",
    "clear_search": "Clear",
    "load_more": "Load more results",
    "zero_results": "No results found",
    "many_results": "results found",
    "one_result": "result found"
  },
  "shortcuts": {
    "search": "ctrl+k",
    "escape": "escape"
  }
}
```

### 2. Configuration Template

**`_includes/search-config.njk`**
```html
<script>
// Generate configuration at build time
window.SEARCH_CONFIG = {
  ...{{ search | dump | safe }},
  bundlePath: '{{ "/pagefind/" | url }}',
  searchPath: '{{ "/search/" | url }}',
  baseUrl: '{{ site.url | default("") }}',
  isSearchPage: {{ 'true' if page.url == '/search/' else 'false' }},
  currentPath: '{{ page.url }}',
  buildTime: '{{ "now" | date("iso") }}'
};
</script>
```

### 3. Script Inclusion Template

**`_includes/scripts-search.njk`**
```html
<!-- Search functionality scripts -->
<link rel="preload" href="{{ '/pagefind/pagefind-ui.js' | url }}" as="script">
<link rel="preload" href="{{ '/js/search.js' | url }}" as="script">

<!-- Configuration must load first -->
{% include "search-config.njk" %}

<!-- Pagefind UI library -->
<script src="{{ '/pagefind/pagefind-ui.js' | url }}" defer></script>

<!-- Main search functionality -->
<script src="{{ '/js/search.js' | url }}" defer></script>

<!-- Optional: Search utilities -->
<script src="{{ '/js/search-utils.js' | url }}" defer></script>
```

### 4. Main Search JavaScript

**`js/search.js`**
```javascript
/**
 * Main Search Functionality
 * Handles Pagefind integration with enhanced features
 */

class SearchManager {
    constructor(config) {
        this.config = config || window.SEARCH_CONFIG;
        this.pagefindUI = null;
        this.observer = null;
        this.searchElement = null;
        this.isInitialized = false;
        
        // Bind methods
        this.enhanceResults = this.enhanceResults.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        this.handleMutations = this.handleMutations.bind(this);
    }
    
    /**
     * Initialize the search functionality
     */
    init() {
        if (this.isInitialized) return;
        
        this.searchElement = document.getElementById('search');
        if (!this.searchElement) {
            console.warn('Search element not found');
            return;
        }
        
        this.setupPagefind();
        this.setupKeyboardShortcuts();
        this.setupMutationObserver();
        this.isInitialized = true;
        
        console.log('Search initialized:', this.config);
    }
    
    /**
     * Setup Pagefind with configuration
     */
    setupPagefind() {
        const searchConfig = {
            element: "#search",
            processResult: this.processResult.bind(this),
            showFilters: this.config.showFilters,
            debounceTimeoutMs: this.config.debounceMs,
            excerptLength: 25, // Pagefind length (we override in processResult)
            pageSize: this.config.pageSize,
            showImages: this.config.showImages,
            resetStyles: this.config.resetStyles,
            autofocus: this.config.isSearchPage,
            bundlePath: this.config.bundlePath,
            translations: this.config.translations
        };
        
        try {
            this.pagefindUI = new PagefindUI(searchConfig);
        } catch (error) {
            console.error('Failed to initialize Pagefind:', error);
        }
    }
    
    /**
     * Process individual search results
     */
    processResult(result) {
        // Extract and normalize categories
        const categories = this.extractCategories(result);
        
        // Generate clean excerpt
        const excerpt = this.generateExcerpt(result);
        
        // Add metadata
        result.meta = result.meta || {};
        result.meta.categories = categories;
        result.meta.categoryCount = categories.length;
        result.meta.cleanExcerpt = excerpt;
        result.meta.isBlogPost = this.detectBlogPost(result.url);
        result.meta.postType = this.detectPostType(result.url);
        
        if (excerpt) {
            result.excerpt = excerpt;
        }
        
        return result;
    }
    
    /**
     * Extract categories from result filters
     */
    extractCategories(result) {
        if (!result.filters?.category) return [];
        
        return Array.isArray(result.filters.category) 
            ? result.filters.category 
            : [result.filters.category];
    }
    
    /**
     * Generate clean excerpt from content
     */
    generateExcerpt(result) {
        if (result.meta?.custom_excerpt) {
            return result.meta.custom_excerpt;
        }
        
        if (!result.raw_content) return '';
        
        let excerpt = result.raw_content
            // Remove date prefixes
            .replace(/^.*?Published on.*?\d{4}\.?\s*/i, '')
            // Remove code blocks
            .replace(/\[code[^\]]*\][\s\S]*?\[\/code\]/gi, ' ')
            .replace(/<div class="code-block">[\s\S]*?<\/div>/gi, ' ')
            .replace(/\[(?:\/)?code[^\]]*\]/gi, ' ')
            // Remove HTML tags
            .replace(/<[^>]*>/g, ' ')
            // Decode HTML entities
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            // Clean whitespace
            .replace(/\s+/g, ' ')
            .trim();
        
        // Truncate if too long
        if (excerpt.length > this.config.excerptLength) {
            const truncated = excerpt.substring(0, this.config.excerptLength);
            const lastSpace = truncated.lastIndexOf(' ');
            excerpt = (lastSpace > this.config.excerptLength * 0.8) 
                ? truncated.substring(0, lastSpace) + '...'
                : truncated + '...';
        }
        
        return excerpt;
    }
    
    /**
     * Detect if URL represents a blog post
     */
    detectBlogPost(url) {
        return /^\/[^\/]+\/$/.test(url) && 
               !url.includes('/search/') && 
               !url.includes('/category/') && 
               !url.includes('/tag/') &&
               url !== '/';
    }
    
    /**
     * Detect post type from URL
     */
    detectPostType(url) {
        if (url.includes('/blog/')) return 'blog';
        if (url.includes('/docs/')) return 'documentation';
        if (url.includes('/tutorial/')) return 'tutorial';
        if (url.includes('/guide/')) return 'guide';
        if (this.detectBlogPost(url)) return 'post';
        return 'page';
    }
    
    /**
     * Setup mutation observer for result enhancement
     */
    setupMutationObserver() {
        this.observer = new MutationObserver(this.handleMutations);
        this.observer.observe(this.searchElement, { 
            childList: true, 
            subtree: true 
        });
    }
    
    /**
     * Handle DOM mutations
     */
    handleMutations(mutations) {
        let resultsChanged = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && 
                mutation.target.classList.contains('pagefind-ui__results')) {
                resultsChanged = true;
            }
        });
        
        if (resultsChanged) {
            // Delay to ensure DOM is ready
            setTimeout(this.enhanceResults, 100);
        }
    }
    
    /**
     * Enhance search results with additional features
     */
    enhanceResults() {
        const unenhancedResults = document.querySelectorAll(
            '.pagefind-ui__result:not([data-enhanced])'
        );
        
        unenhancedResults.forEach(result => {
            this.enhanceResult(result);
        });
    }
    
    /**
     * Enhance individual result
     */
    enhanceResult(result) {
        const link = result.querySelector('.pagefind-ui__result-link');
        if (!link) return;
        
        const url = link.getAttribute('href');
        const postType = this.detectPostType(url);
        const isBlogPost = this.detectBlogPost(url);
        
        // Add CSS classes for styling
        result.classList.add(`search-result-${postType}`);
        if (isBlogPost) {
            result.classList.add('search-result-blog-post');
        }
        
        // Add metadata attributes
        result.dataset.postType = postType;
        result.dataset.url = url;
        
        // Add categories if available
        this.addCategories(result);
        
        // Add reading time estimate
        this.addReadingTime(result);
        
        // Mark as enhanced
        result.setAttribute('data-enhanced', 'true');
    }
    
    /**
     * Add category links to result
     */
    addCategories(result) {
        // This would typically come from the processResult metadata
        // For now, we'll simulate category detection
        const categories = this.extractCategoriesFromDOM(result);
        
        if (categories.length > 0) {
            result.dataset.categories = categories.join(',');
            result.dataset.categoryCount = categories.length;
            
            const categoryContainer = document.createElement('div');
            categoryContainer.className = 'result-categories';
            categoryContainer.setAttribute('aria-label', `Categories: ${categories.join(', ')}`);
            
            categories.forEach(category => {
                const categoryLink = document.createElement('a');
                categoryLink.href = `/category/${category.toLowerCase().replace(/\s+/g, '-')}/`;
                categoryLink.className = 'category-tag';
                categoryLink.textContent = category;
                categoryLink.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                categoryContainer.appendChild(categoryLink);
            });
            
            const title = result.querySelector('.pagefind-ui__result-title');
            if (title) {
                title.insertAdjacentElement('afterend', categoryContainer);
            }
        }
    }
    
    /**
     * Extract categories from DOM (placeholder implementation)
     */
    extractCategoriesFromDOM(result) {
        // This would typically use data from processResult
        // For now, return empty array
        return [];
    }
    
    /**
     * Add reading time estimate
     */
    addReadingTime(result) {
        const excerpt = result.querySelector('.pagefind-ui__result-excerpt');
        if (!excerpt) return;
        
        const wordCount = excerpt.textContent.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assume 200 WPM
        
        if (readingTime > 0) {
            const readingTimeEl = document.createElement('span');
            readingTimeEl.className = 'reading-time';
            readingTimeEl.textContent = `${readingTime} min read`;
            readingTimeEl.setAttribute('aria-label', `Estimated reading time: ${readingTime} minutes`);
            
            excerpt.insertAdjacentElement('afterend', readingTimeEl);
        }
    }
    
    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', this.handleKeyboard);
    }
    
    /**
     * Handle keyboard shortcuts
     */
    handleKeyboard(event) {
        // Search shortcut (Ctrl/Cmd + K)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            this.focusSearch();
        }
        
        // Clear search on Escape
        if (event.key === 'Escape') {
            this.clearSearch();
        }
    }
    
    /**
     * Focus search input
     */
    focusSearch() {
        const searchInput = document.querySelector('.pagefind-ui__search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    /**
     * Clear search
     */
    clearSearch() {
        const searchInput = document.querySelector('.pagefind-ui__search-input');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
    
    /**
     * Cleanup resources
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        document.removeEventListener('keydown', this.handleKeyboard);
        this.isInitialized = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const searchManager = new SearchManager();
    searchManager.init();
    
    // Make available globally for debugging
    window.searchManager = searchManager;
});
```

### 5. Utility Functions

**`js/search-utils.js`**
```javascript
/**
 * Search Utility Functions
 * Reusable helper functions for search functionality
 */

window.SearchUtils = {
    /**
     * Debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Sanitize HTML content
     */
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    /**
     * Generate slug from text
     */
    generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },
    
    /**
     * Calculate reading time
     */
    calculateReadingTime(text, wpm = 200) {
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    },
    
    /**
     * Format date for display
     */
    formatDate(date, options = {}) {
        const defaults = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('en-US', {...defaults, ...options});
    },
    
    /**
     * Highlight search terms in text
     */
    highlightSearchTerms(text, searchTerms) {
        if (!searchTerms || !searchTerms.length) return text;
        
        const regex = new RegExp(`(${searchTerms.join('|')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
};
```

### 6. CSS Styling

**`assets/css/search.css`**
```css
/* Search Results Enhancement */
.search-result-blog-post {
    border-left: 3px solid var(--primary-color, #0066cc);
    padding-left: 1rem;
}

.search-result-documentation {
    border-left: 3px solid var(--docs-color, #28a745);
    padding-left: 1rem;
}

.result-categories {
    margin: 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
}

.category-tag {
    background: var(--tag-bg, #f1f3f4);
    color: var(--tag-text, #202124);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    text-decoration: none;
    transition: background-color 0.2s;
}

.category-tag:hover {
    background: var(--tag-hover-bg, #e8eaed);
}

.reading-time {
    color: var(--muted-text, #6c757d);
    font-size: 0.875rem;
    margin-left: 0.5rem;
}

.pagefind-ui__search-input {
    border: 2px solid var(--border-color, #e1e5e9);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: border-color 0.2s;
}

.pagefind-ui__search-input:focus {
    outline: none;
    border-color: var(--primary-color, #0066cc);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.pagefind-ui__result {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: var(--result-bg, #ffffff);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;
}

.pagefind-ui__result:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

### 7. Build Integration

**`eleventy.config.js`**
```javascript
module.exports = function(eleventyConfig) {
    // Copy search assets
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets/