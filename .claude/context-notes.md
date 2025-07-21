# Context Notes

## Key Project Information

### Architecture
- **Site Generator**: Eleventy (11ty) with Nunjucks templates
- **Search**: Pagefind for static site search functionality
- **Content**: WordPress migration with extensive transforms
- **Theme**: Dark theme with cyan accent (#19d4fe)
- **Typography**: Montserrat font family

### Important File Locations
- **Config**: `.eleventy.js` (800+ lines, comprehensive configuration)
- **Posts**: `output/posts/[slug]/index.md` with `images/` subdirectories
- **Templates**: `_includes/` with layouts, macros, and partials
- **Styles**: `styles.css` with CSS custom properties

### Development Workflow Insights
- Author uses Oh My Zsh Git aliases (`gp`, `gaa`, `gc`)
- ESLint + Prettier with Husky pre-commit hooks configured
- Live reload available during development
- WordPress posts serve at root level (not `/blog/post-slug/`)

### Key Build Commands
- `npm run dev` - Development with live reload
- `npm run build` - Production build with search indexing
- `npm run lint` / `npm run format` - Code quality tools
- `npm run search:index` - Generate search index

### Critical Implementation Details
- WordPress shortcodes converted via custom transforms
- Image paths automatically rewritten for post images
- Categories preserved exactly as written (no slug transformation)
- CSS Grid for page structure, Flexbox for components
- Responsive breakpoints: 768px, 900px, 1200px

## Decision Log
- **2025-07-21**: Established structured documentation system using custom slash commands
- **Previous**: Comprehensive CLAUDE.md already exists with full project documentation

## Future Session Notes
- Always read CLAUDE.md first for complete project context
- Check this context-notes.md for recent decisions and insights
- Update changes-log.md for all file modifications
- Use session-plan.md to track current work approach