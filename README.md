# Mike Henke - Web & Mobile Developer

This is a personal portfolio website for Mike Henke, showcasing his skills, experience, and portfolio projects. The website is built using [Eleventy](https://www.11ty.dev/) static site generator with modern HTML5, CSS3, and follows comprehensive design and accessibility guidelines.

## Project Structure

- `index.html`: The main landing page with hero section, about, skills, career timeline, portfolio, and contact sections.
- `blog.njk`: Template for the blog listing page displaying all posts.
- `search.njk`: Template for the search page with Pagefind integration.
- `posts/`: Directory containing individual blog posts in Markdown format.
- `styles.css`: Comprehensive CSS file with custom properties, CSS Grid, Flexbox, and modern styling.
- `assets/`: Static assets including SVG files and other resources.
- `_data/site.json`: Global site data including the production URL.
- `_includes/`: Directory for Eleventy layouts and partials.
  - `layouts/base.njk`: The main base layout with navigation, search integration, and footer.
  - `layouts/post.njk`: The specialized layout for individual blog posts with Disqus comments.
- `.eleventy.js`: Eleventy configuration with custom filters and build settings.
- `package.json`: Project dependencies including Eleventy and Pagefind.
- `_site/`: The generated static site output directory.
- `.github/copilot-instructions.md`: Detailed coding guidelines and design system documentation.

## Features

### Core Functionality

- **Static Site Generation**: Built with Eleventy for optimal performance and simplicity.
- **Integrated Blog**: Markdown-based blog system with automatic post listing and individual post pages.
- **Advanced Search**: Case-insensitive site search powered by [Pagefind](https://pagefind.app/) with debounced input and autofocus.
- **Responsive Design**: Mobile-first approach with progressive enhancement for desktop experiences.

### Modern CSS Architecture

- **CSS Custom Properties System**: Comprehensive design token system for colors, typography, spacing, shadows, and transitions.
- **CSS Grid & Flexbox**: Modern layout systems for hero sections, skills grids, navigation, and content organization.
- **Fluid Typography**: Responsive font scaling using `clamp()` functions for optimal readability across devices.
- **Component-Based Styling**: Modular CSS with reusable button systems, card components, and section layouts.

### Performance & Accessibility

- **Hardware Acceleration**: GPU-optimized animations using `transform3d()` and `will-change` properties.
- **Progressive Enhancement**: Separate interaction patterns for hover-capable and touch devices.
- **Accessibility First**: Semantic HTML5, proper ARIA labels, keyboard navigation, and WCAG-compliant color contrast.
- **Touch-Friendly Design**: 44px minimum touch targets and mobile-optimized interactions.
- **Smooth Animations**: Respects `prefers-reduced-motion` for users who prefer minimal animations.

### Technical Highlights

- **Semantic HTML Structure**: Proper use of header, nav, main, section, and footer elements.
- **Dark Theme Design**: Consistent dark color scheme with cyan accent color (#19d4fe).
- **Custom Font Integration**: Montserrat font family with appropriate weights and letter-spacing.
- **Optimized Performance**: Efficient CSS selectors, hardware acceleration, and progressive loading.
- **Cross-Browser Compatibility**: Modern CSS with appropriate fallbacks for older browsers.

### Content Sections

- **Hero Section**: Eye-catching introduction with profile image and call-to-action buttons.
- **Skills Showcase**: Interactive skill cards with progress bars and technology icons.
- **Career Timeline**: Professional experience displayed in an elegant numbered timeline.
- **Portfolio Gallery**: Project highlights with hover effects and detailed descriptions.
- **Contact Information**: Professional contact details with enhanced typography.
- **Blog System**: Full-featured blog with search capabilities and comment integration.

## How to Use

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mhenke/mike-henke-website.git
   cd mike-henke-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   This will start Eleventy's development server with live reload at `http://localhost:8080`

4. **View the website:**
   Open your browser and navigate to the local development URL (typically `http://localhost:8080`)

### Building for Production

To build the static site for deployment:

```bash
npm run build
```

This command will:

- Generate the static site using Eleventy
- Create the Pagefind search index
- Output everything to the `_site` directory

### Available Scripts

- `npm start`: Start the development server with live reload
- `npm run build`: Build the production site with search indexing
- `npm test`: Run tests (currently displays a placeholder message)

### Development Tips

- **Live Reload**: The development server automatically refreshes when you make changes to files
- **Search Functionality**: The search feature requires a full build (`npm run build`) to generate the search index
- **CSS Architecture**: The project uses CSS custom properties extensively - modify variables in `:root` for consistent theming
- **Content Updates**: Blog posts are added as Markdown files in the `posts/` directory

## Technologies Used

### Core Technologies

- **HTML5**: Semantic markup with accessibility best practices
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox, and animations
- **JavaScript**: Minimal, progressive enhancement for search functionality

### Build Tools & Frameworks

- **[Eleventy (11ty)](https://www.11ty.dev/)**: Fast, flexible static site generator
- **[Nunjucks](https://mozilla.github.io/nunjucks/)**: Templating engine for dynamic content generation
- **[Luxon](https://moment.github.io/luxon/)**: Modern date manipulation and formatting library
- **[Pagefind](https://pagefind.app/)**: Static site search with case-insensitive functionality

### Styling & Assets

- **Google Fonts**: Montserrat font family with multiple weights (400, 600, 700)
- **Font Awesome**: Icon library for UI elements and visual enhancement
- **CSS Custom Properties**: Comprehensive design token system for maintainable styling
- **Progressive Enhancement**: Touch-friendly interactions and hover states

### Development Features

- **Node.js & NPM**: Package management and build scripts
- **Live Reload**: Development server with automatic browser refresh
- **Optimized Build**: Production-ready output with compressed assets

## Architecture & Design System

### CSS Custom Properties

The project uses a comprehensive design token system:

- **Color System**: Primary, background, surface, and text color variations
- **Typography Scale**: Fluid font sizes using `clamp()` for responsive design
- **Spacing System**: Consistent spacing scale for margins, padding, and gaps
- **Component Tokens**: Shadows, border-radius, and transition timing

### Layout Strategy

- **Mobile-First**: Progressive enhancement from mobile to desktop
- **CSS Grid**: Used for main page layouts (hero, skills grid, timeline)
- **Flexbox**: Used for component-level alignment and button groups
- **Semantic Structure**: Proper HTML5 sectioning elements with accessibility considerations

### Performance Optimizations

- **Hardware Acceleration**: Strategic use of `transform3d()` for smooth animations
- **Efficient Selectors**: Optimized CSS specificity and selector performance
- **Progressive Enhancement**: Feature detection for hover capabilities
- **Reduced Motion**: Respects user preference for reduced animations

## Deployment

### GitHub Pages

The website is automatically deployed to GitHub Pages using the built-in GitHub Actions workflow. The production site is available at:

**[https://mhenke.github.io/mike-henke-website/](https://mhenke.github.io/mike-henke-website/)**

### Deployment Process

1. Push changes to the main branch
2. GitHub Actions automatically runs the build process
3. Generated site is deployed to the `gh-pages` branch
4. GitHub Pages serves the site from the `gh-pages` branch

### Build Configuration

- **Path Prefix**: Configured for GitHub Pages subdirectory deployment
- **Asset Processing**: Static assets are properly copied and processed
- **Search Index**: Pagefind generates search functionality during build

## Contributing

When contributing to this project, please follow the established coding guidelines:

1. **CSS Architecture**: Use the existing custom properties system
2. **Responsive Design**: Follow mobile-first approach with progressive enhancement
3. **Accessibility**: Maintain semantic HTML and WCAG compliance
4. **Performance**: Consider hardware acceleration and efficient selectors
5. **Testing**: Test across different devices and screen sizes

## License

This project is licensed under the ISC License - see the package.json file for details.
