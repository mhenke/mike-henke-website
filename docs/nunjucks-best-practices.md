# Project Context

This is an Eleventy-based static site generator project using Nunjucks templates and Pagefind for search functionality. The project follows modern JAMstack architecture with focus on performance and accessibility.

## Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **Template Engine**: Nunjucks
- **Search**: Pagefind
- **CSS**: PostCSS/Tailwind (if applicable)
- **JavaScript**: Vanilla ES6+ for client-side functionality

## Project Structure

```
src/
├── _includes/
│   ├── layouts/          # Base layouts (base.njk, page.njk, post.njk)
│   ├── components/       # Reusable components (navigation.njk, footer.njk)
│   └── macros/          # Nunjucks macros (meta.njk, utils.njk)
├── _data/               # Global data files
├── assets/              # CSS, JS, images
└── content/             # Markdown content files
```

## Build Commands

- **Development**: `npm start` or `npm run dev`
- **Production build**: `npm run build`
- **Clean build**: `npm run clean && npm run build`

## Code Standards and Guidelines

### Nunjucks Templates

1. **Layout Inheritance**: Use clear hierarchy - base.njk → page.njk → specific templates
2. **Component Organization**: Place reusable components in `_includes/components/`
3. **Macro Usage**: Create macros for repeated HTML patterns, store in `_includes/macros/`
4. **Data Safety**: Always validate data exists before using: `{% if data.property %}`
5. **Performance**: Cache expensive operations outside loops, use `{% set %}` for repeated calculations
6. **Whitespace Control**: Use `{%-` and `-%}` to control whitespace in output

### Template Naming Conventions

- **Layouts**: `base.njk`, `page.njk`, `post.njk`
- **Components**: `navigation.njk`, `footer.njk`, `search.njk`
- **Macros**: `meta.njk`, `card.njk`, `utils.njk`
- **Pages**: Use descriptive names matching content structure

### Content Structure

- **Front Matter**: Always include `title`, `description`, `date` for posts
- **Permalinks**: Use clean URLs: `/blog/post-title/`
- **Collections**: Tag content appropriately for collections
- **SEO**: Include meta descriptions and OpenGraph tags

### Pagefind Integration

1. **Search Body**: Wrap main content in `data-pagefind-body`
2. **Metadata**: Use `data-pagefind-meta` for title, tags, date
3. **Exclusions**: Use `data-pagefind-ignore` for navigation, footers
4. **Search Component**: Place search UI in dedicated component file

### JavaScript and CSS

- **ES6+**: Use modern JavaScript features
- **No jQuery**: Prefer vanilla JavaScript
- **Progressive Enhancement**: Ensure base functionality without JS
- **CSS**: Use utility-first approach if using Tailwind

## Coding Patterns

### Macro Creation

```njk
<!-- Always include default parameters -->
{% macro componentName(required, optional="default") %}
<!-- macro content -->
{% endmacro %}
```

### Data Validation

```njk
<!-- Check data existence before use -->
{% if collections.posts and collections.posts.length > 0 %}
  <!-- content -->
{% endif %}
```

### Filter Usage

```njk
<!-- Chain filters appropriately -->
{{ content | striptags | truncate(150) | safe }}
```

### Loop Optimization

```njk
<!-- Cache expensive operations -->
{% set sortedPosts = collections.posts | reverse %}
{% for post in sortedPosts %}
  <!-- loop content -->
{% endfor %}
```

## File Organization Rules

### Template Files

- One layout per file
- Components should be single-purpose
- Macros grouped by functionality
- Include documentation comments for complex templates

### Data Files

- Use `.js` for dynamic data, `.json` for static data
- Global site data in `_data/site.js`
- Collection-specific data in separate files

### Content Files

- Use consistent front matter structure
- Include required fields: title, description, date
- Use semantic file naming

## Quality Standards

### Performance

- Minimize template processing in loops
- Use computed data for complex calculations
- Cache repeated operations
- Optimize image handling

### Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### SEO

- Include meta descriptions
- Use proper heading hierarchy
- Generate sitemaps
- Implement structured data where appropriate

## Testing and Validation

### Template Testing

- Validate all data paths work with missing data
- Test with various content lengths
- Verify search functionality works
- Check responsive design

### Content Validation

- Ensure all required front matter fields exist
- Validate internal links work
- Check image alt text presence
- Verify permalink structure

## Common Patterns to Follow

### Error Handling

```njk
{% set fallbackValue = data.field or "default" %}
```

### Conditional Rendering

```njk
{% if condition %}
  <!-- content -->
{% endif %}
```

### Safe Content Output

```njk
<!-- For user content -->
{{ content | escape }}

<!-- For trusted HTML -->
{{ content | safe }}
```

## Avoid These Anti-Patterns

1. **Deep nesting**: Keep template inheritance shallow
2. **Complex logic**: Move to computed data or filters
3. **Repeated processing**: Cache expensive operations
4. **Missing validation**: Always check data existence
5. **Unsafe output**: Escape user-generated content
6. **Poor search structure**: Ensure Pagefind can index content properly

## Documentation Requirements

- Comment complex template logic
- Document macro parameters
- Explain data dependencies
- Note performance considerations
- Include usage examples for components

## Version Control

- Use semantic commit messages
- Include template changes in commit descriptions
- Test builds before committing
- Document breaking changes in templates
