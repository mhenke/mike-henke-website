# Mike Henke - Web & Mobile Developer

This is a personal portfolio website for Mike Henke, showcasing his skills, experience, and portfolio projects. The website is built using [Eleventy](https://www.11ty.dev/), HTML, and CSS, following specific design and coding guidelines.

## Project Structure

- `index.html`: The main landing page content.
- `blog.njk`: Template for the blog listing page.
- `search.njk`: Template for the search page.
- `posts/`: Directory containing individual blog posts in Markdown format.
- `styles.css`: The main CSS file for styling the website.
- `_data/site.json`: Global site data, like the site URL.
- `_includes/`: Directory for Eleventy layouts and partials.
  - `layouts/base.njk`: The main base layout for all pages.
  - `layouts/post.njk`: The layout for individual blog posts.
- `.eleventy.js`: Eleventy configuration file.
- `package.json`: Defines project dependencies and scripts.
- `_site/`: The output directory where the static site is generated.
- `.github/copilot-instructions.md`: Contains detailed instructions for AI-assisted development.
- `.github/workflows/deploy.yml`: GitHub Actions workflow for building and deploying the site to GitHub Pages.

## Features

- **Static Site Generation**: Built with Eleventy for performance and simplicity.
- **Blog**: Integrated blog with Markdown-based posts.
- **Search**: Site search functionality powered by [Pagefind](https://pagefind.app/).
- **Responsive Design**: The website is designed to be responsive and works well on different screen sizes.
- **Semantic HTML5**: Uses modern HTML5 tags for better structure and accessibility.
- **CSS Grid and Flexbox**: For layout and alignment, ensuring a modern and maintainable codebase.
- **Dark Theme**: Consistent dark theme with a cyan/blue accent color (#19d4fe).
- **Custom Fonts**: Uses Montserrat from Google Fonts.
- **Skills Section**: Displays a list of skills with progress bars.
- **Career Timeline**: Highlights professional experience in a structured timeline.
- **Portfolio Section**: Lists notable projects.
- **Contact Section**: Provides contact information.
- **Automated Deployment**: Continuous deployment to GitHub Pages via GitHub Actions.

## How to Use

### Prerequisites
- Node.js and npm installed.

### Local Development
1. Clone the repository to your local machine.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Eleventy development server:
   ```bash
   npm start 
   ```
   (This command might be `eleventy --serve` or similar, depending on your `package.json` scripts. If `npm start` is not defined, you can run `npx @11ty/eleventy --serve`)
4. Open your browser to the local development URL (usually `http://localhost:8080`).

### Building for Production
To build the static site for deployment:
```bash
npm run build
```
This will generate the site in the `_site` directory.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- [Eleventy (11ty)](https://www.11ty.dev/) - Static Site Generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating language used by Eleventy
- [Luxon](https://moment.github.io/luxon/) - For date formatting
- [Pagefind](https://pagefind.app/) - Static site search library
- Google Fonts (Montserrat)
- Font Awesome for icons

## License

This project is licensed under the MIT License.

## Production URL

The website is hosted on GitHub Pages and can be viewed at: [https://mhenke.github.io/mike-henke-website/](https://mhenke.github.io/mike-henke-website/)
