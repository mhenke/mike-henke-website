# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Mike Henke's personal portfolio website built with Eleventy (11ty), featuring a dark theme design with blog functionality and search powered by Pagefind. The site includes a professional portfolio showcase, career timeline, skills section, and migrated WordPress content.

## Key Development Commands

### Development

- `npm run dev` - Start development server with watch mode and live reload
- `npm run dev:search` - Development server with search indexing enabled
- `npm run clean` - Clean the `_site` output directory

### Building

- `npm run build` - Full production build with search indexing
- `npm run build:production` - Production build only (without search)
- `npm run build:dev` - Development build without search indexing
- `npm run dev:search` - Start development server with search indexing enabled

### Search & Indexing

- `npm run search:index` - Generate Pagefind search index for `_site` directory

### Code Quality

- `npm run lint` - Run ESLint on all JS files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changes
- `npm run validate` - Run both linting and format checking

### CSS Management

- `npm run css:cleanup` - Run PurgeCSS cleanup script

## Architecture Overview

### Static Site Generator (Eleventy)

- **Configuration**: `.eleventy.js` (comprehensive 800+ line config)
- **Template Engine**: Nunjucks (`.njk`) for layouts and templates
- **Markdown Processing**: Enhanced with custom transforms for WordPress content
- **Output**: Static files generated to `_site/` directory

### Directory Structure

- `_includes/` - Eleventy templates, layouts, and reusable components
  - `layouts/` - Base page layouts (`base.njk`, `post.njk`)
  - `macros/` - Reusable template components (blog cards, navigation, etc.)
  - `partials/` - Page sections (head, footer, scripts, search config)
- `_data/` - Global data files (site configuration, search config)
- `output/posts/` - WordPress migrated blog posts (markdown with images)
- `assets/` - Static assets (images, resume, icons)
- `js/` - Client-side JavaScript for search functionality
- `styles.css` - Main stylesheet with CSS custom properties

### WordPress Content Migration

The site includes extensive WordPress content processing:

- **Post Structure**: `output/posts/[slug]/index.md` with associated `images/` folders
- **URL Routing**: WordPress posts serve at root level (`/post-slug/` not `/blog/post-slug/`)
- **Content Transforms**: Multiple Eleventy transforms handle WordPress shortcodes, image paths, HTML entities, and code blocks
- **Collections**: Organized by categories, dates, and post types

### Search Implementation

- **Engine**: Pagefind for static site search
- **Integration**: Search page at `/search/` with JavaScript-powered interface
- **Indexing**: Automated during production builds

### Design System

- **Theme**: Dark theme with cyan accent (#19d4fe)
- **Typography**: Montserrat font family (400, 600, 700 weights)
- **Layout**: CSS Grid for page structure, Flexbox for component alignment
- **Responsive**: Mobile-first approach with breakpoints at 768px, 900px, 1200px
- **Components**: Skill cards, career timeline, hero section, blog cards

### Content Processing Pipeline

1. **Code Blocks**: Custom transform converts `[code language="..."]` to HTML with syntax highlighting
2. **Images**: Automated path rewriting for WordPress post images
3. **Shortcodes**: WordPress shortcode conversion to semantic HTML
4. **URLs**: Malformed URL fixing and protocol updates
5. **HTML Entities**: Selective decoding while preserving code block integrity

### Performance Optimizations

- **CSS**: PurgeCSS integration for unused style removal
- **Images**: Lazy loading and optimized paths
- **Build**: Environment-specific optimizations (quiet mode in production)
- **Caching**: Pagefind includes built-in search result caching

## Important Implementation Notes

### Blog Post Development

- WordPress posts are in `output/posts/[slug]/index.md` format
- Images must be in corresponding `images/` subdirectories
- Use frontmatter for title, date, categories, and tags
- Categories are preserved exactly as written (no slug transformation)

### Image Handling

- Post images are automatically copied from `output/posts/[slug]/images/` to `_site/[slug]/images/`
- Relative image paths in markdown (`images/filename.jpg`) are rewritten to absolute paths
- Main site images go in `assets/` directory

### Custom Filters & Collections

- `blogExcerpt` - Strips code blocks and HTML for clean post previews
- `wordpressPosts` - All migrated WordPress content
- `allPosts` - Combined collection of regular and WordPress posts
- `postsByCategory` - Posts organized by category with exact category names

### Styling Guidelines

- Follow existing dark theme pattern (#181a1b, #222f36, #22313a backgrounds)
- Use CSS custom properties defined in `styles.css`
- Maintain responsive design patterns established in the codebase
- Ensure accessibility compliance (WCAG 2.1 AA)

### Development Workflow Notes

- The author uses Oh My Zsh aliases for Git (`gp` for push, `gaa` for add, `gc` for commit)
- ESLint and Prettier are configured with Husky pre-commit hooks
- Live reload is available during development via Eleventy's built-in server

## Testing

Currently uses placeholder test command (`echo "Add tests here"`). Testing framework needs to be implemented.
