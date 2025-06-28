# Mike Henke Portfolio Website

A professional portfolio website built with Eleventy (11ty), showcasing career progression, skills, and projects. Features a modern dark theme with responsive design and accessibility-first approach.

## 🚀 Features

- **Modern Design**: Dark theme with cyan accent colors (#19d4fe)
- **Responsive Layout**: Mobile-first CSS Grid and Flexbox
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML
- **Performance**: Optimized images and minimal JavaScript
- **SEO Ready**: Meta tags, structured data, and search functionality
- **Progressive Enhancement**: Works without JavaScript

### Key Sections

- **Hero**: Professional introduction with call-to-action buttons
- **Skills**: Programming languages with animated progress bars
- **Technologies**: Framework icons with hover animations
- **Expertise**: Certifications and specializations
- **Career Timeline**: Union Pacific Railroad progression (2016-Present)
- **Contact**: Professional contact information

## 🛠️ Local Development

### Prerequisites

- Node.js (v16 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/mhenke/mike-henke-website.git
cd mike-henke-website

# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build
```

### Available Scripts

- `npm run start` - Start development server with live reload
- `npm run build` - Build production site
- `npm run clean` - Clean output directory
- `npm run serve` - Serve built site locally

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Commit your changes:

   ```bash
   git add .
   git commit -m "Describe your change"
   git push
   ```

2. GitHub Actions automatically builds and deploys the `_site/` output to GitHub Pages.

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy _site/ directory to your hosting provider
```

## 📝 Writing Blog Posts

- Add new Markdown files to `output/posts/` directory
- Use frontmatter for title, date, and metadata
- Reference images from `/assets/images/` if needed
- Blog posts are automatically generated and listed

## 📦 Project Structure

```
├── _includes/           # Eleventy templates and partials
│   ├── layouts/        # Page layouts (base-optimized.njk, post.njk)
│   └── partials/       # Reusable components (navigation, footer, scripts)
├── assets/             # Static assets (images, icons, resume)
├── output/posts/       # Blog posts (markdown files)
├── styles.css          # Main stylesheet with CSS custom properties
├── index.html          # Homepage template (Nunjucks)
├── blog.njk            # Blog listing page template
├── search.njk          # Search page template
└── _site/              # Generated static site (do not edit directly)
```

## 🎨 Customization

### Styling

- Main stylesheet: `styles.css`
- CSS custom properties for consistent theming
- Responsive breakpoints at 768px, 900px, and 1200px
- Montserrat font family with proper font weights

### Content

- Update personal information in `index.html`
- Add blog posts to `output/posts/` directory
- Replace resume PDF in `assets/resume.pdf`
- Update profile images in `assets/`

### Navigation

- Mobile hamburger menu with smooth animations
- Accessible keyboard navigation
- Focus management and screen reader support

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Open a Pull Request

Follow the coding style and accessibility guidelines in `styles.css` and the custom instructions.

## 👨‍💻 Author

**Mike Henke**

- LinkedIn: [linkedin.com/in/henkemike](https://linkedin.com/in/henkemike)
- GitHub: [github.com/mhenke](https://github.com/mhenke)
- Email: henke.mike@gmail.com

## 📄 License

MIT License. See `LICENSE` file for details.

---

Built with ❤️ using [Eleventy](https://www.11ty.dev/)
