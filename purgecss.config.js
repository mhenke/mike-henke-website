module.exports = {
  // Content files to scan for used CSS selectors
  // OPTION 1: Conservative narrowing (recommended for stability)
  // content: [
  //   './_site/**/*.html', // Final built output (most important)
  //   './_includes/**/*.njk', // All Nunjucks templates
  //   './index.html', // Root HTML file
  //   './*.njk', // Root-level templates (blog.njk, search.njk, etc.)
  //   './js/**/*.js', // Specific JS directory only
  //   './assets/**/*.js', // Asset JS files only
  // ],

  // OPTION 2: Aggressive narrowing (uncomment to use instead)
  content: [
    './_site/**/*.html', // Final output only
    './_includes/**/*.njk', // Templates only
  ],

  // CSS files to purge
  css: [
    './styles.css',
    './assets/css/search.css'
  ],

  // Safelist important classes that might be dynamically generated
  safelist: [
    // Font Awesome classes
    /^fa-/,
    /^fas$/,
    /^far$/,
    /^fab$/,

    // Your custom design system classes based on your coding guidelines
    'hero-section',
    'hero-text',
    'hero-buttons',
    'hero-image',
    'skills-columns',
    'skills-card',
    'skill-row',
    'skill-label',
    'skill-percent',
    'progress-bar',
    'career-section',
    'career-timeline-grid',
    'timeline-col',
    'career-content-col',
    'timeline-step',
    'step-number',
    'step-line',
    'career-entry',
    'content-section-boxed',
    'section-title',

    // Button classes
    'btn',
    'btn-primary',
    'btn-outline',

    // Language indicator classes for code blocks
    'lang',

    // Search and Pagefind classes
    /^pagefind/,
    'search-container',
    'search-input',
    'search-result',
    'result-categories',
    'category-tag',
    'reading-time',
    'search-icon',
    'search-wrapper',

    // Animation and state classes that might be added via JS
    'active',
    'show',
    'hide',
    'visible',
    'hidden',

    // Responsive utility classes if you use them
    /^sm:/,
    /^md:/,
    /^lg:/,
    /^xl:/,

    // HTML elements that might not be caught
    'html',
    'body',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'a',
    'img',
    'div',
    'span',
    'header',
    'main',
    'section',
    'footer',
    'nav',
    'article',
    'aside',
  ],

  // Enable extraction of complex selectors
  defaultExtractor: (content) => {
    // Enhanced extractor for Nunjucks templates
    const selectors = [];

    // Match standard CSS classes and IDs
    const standardMatches = content.match(/[A-Za-z0-9_-]+/g) || [];
    selectors.push(...standardMatches);

    // Match classes in HTML class attributes
    const classMatches = content.match(/class=["'][^"']*["']/g) || [];
    classMatches.forEach((match) => {
      const classes = match.replace(/class=["']|["']/g, '').split(/\s+/);
      selectors.push(...classes.filter((cls) => cls.length > 0));
    });

    // Match Nunjucks variables that might contain class names
    const nunjucksMatches = content.match(/\{\{[^}]*\}\}/g) || [];
    nunjucksMatches.forEach((match) => {
      const innerContent = match.replace(/[{}]/g, '');
      const possibleClasses = innerContent.match(/[A-Za-z0-9_-]+/g) || [];
      selectors.push(...possibleClasses);
    });

    return [...new Set(selectors)]; // Remove duplicates
  },

  // Keep keyframes and font-face rules
  keyframes: true,
  fontFace: true,

  // Enable variables support for CSS custom properties
  variables: true,
};
