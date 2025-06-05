# Copilot Custom Instructions for Mike Henke Portfolio

You are an HTML, CSS, and JavaScript expert.

- Make the code production-ready and maintainable.
- Use modern patterns and modern solutions.
- Watch out for code smell and anti-patterns.
- Provide non-hacky solutions.
- Prefer Font Awesome icons.

## Guidelines

- Assume the development server is running in watch mode.
- Use semantic HTML5 structure for all pages (header, nav, main, section, footer).
- Use CSS Grid for overall page and section layouts (e.g., hero section, skills section, timeline).
- Use Flexbox for internal alignment within grid areas (e.g., aligning timeline items, button groups, skill cards).
- All designs use a dark theme. Use background colors such as #181a1b, #222f36, or #22313a. Accent color is #19d4fe (cyan/blue).
- Headings and important text should use a bold, modern sans-serif font.
- **Always use Montserrat as the primary font** for all text.
  - Add this Google Fonts link in the HTML `<head>`:  
    `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">`
  - In CSS, set:  
    `font-family: 'Montserrat', Arial, Helvetica, sans-serif;`
  - Use `font-weight: 700` for main headings (e.g. `.section-title`), `600` for subheadings (e.g. `<h3>` in skills cards or career entries), and `400` for body text.
  - Headings should be large and bold (e.g., `h1` in hero at ~3rem, `.section-title` as `h2` at ~2.5rem, card/entry `h3` at ~1.5rem-1.75rem).
  - Use subtle letter-spacing (0.2px–0.5px) for a clean, modern look.
- Use large, clear headings and generous spacing (padding/margins) for a professional, modern look.
- Skills section (`#skills`) should use a 3-column grid (`.skills-columns`) for skill cards (`.skills-card`) on desktop, stacked on mobile.
  - Each `.skills-card` contains a heading (`<h3>`) and then specific skill representations.
  - For programming languages: use a `div.skill-row` containing `span.skill-label.lang` and `span.skill-percent`, followed by `div.progress-bar` with an inner `span` for the visual fill.
- For skill bars (`.progress-bar`), use a gray background (e.g. `#3e4750`) with a cyan/blue progress indicator (`.progress-bar span` with `background-color: #19d4fe`).
- Buttons (`.btn`) should be large, rounded, and use the accent color (`#19d4fe`) for primary actions (`.btn-primary`); use outlined style for secondary actions (`.btn-outline`).
- For the hero section (`.hero-section`), use a CSS Grid layout: left column for headline (`.hero-text`) and buttons (`.hero-buttons`), right column for a photo (`.hero-image img`) with rounded corners and a subtle box shadow.
- Career timeline (`.career-section`) should use a two-column grid (`.career-timeline-grid`): left column (`.timeline-col`) for numbered steps (`.timeline-step` with `.step-number` and `.step-line`), right column (`.career-content-col`) for company details in `.career-entry` (containing `<h3>` for company and `<p>` for role/dates). Use Flexbox for vertical alignment of numbers and lines within `.timeline-step`.
- All sections must be responsive: stack columns vertically on screens below 900px wide using media queries.
- Use accessible alt text for all images.
- Do not use frameworks (like Bootstrap) or JavaScript for layout unless specifically requested.
- Use only modern, standards-compliant HTML and CSS.
- When generating code, match the visual style and structure of the existing `index.html` and `styles.css`.
- Do not reference or mention any blurred faces or image redactions.
- Boxed sections (`.content-section-boxed`) should have a `background-color: #22313a`, `padding: 40px`, `border-radius: 18px`, and `box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2)`.
- **Note on Git Commands**: I use Oh My Zsh Git aliases. For example, `git push` is `gp`, `git add .` is `gaa`, `git commit -m` is `gc -m`. **Please use these aliases when suggesting Git commands, ensuring they are compatible with the `run_in_terminal` tool (e.g., by prefixing with a space if necessary for your shell configuration).**
- **Note on NPM Commands**: I use Oh My Zsh npm aliases (e.g., from the `npm` plugin). For example, `npm run build` might be `npmrb`. **Please suggest these aliases when appropriate for `run_in_terminal`.**

# 🚀 Eleventy Blog + GitHub Pages + Disqus Setup

This guide walks you through building and deploying a blog using Eleventy (11ty), GitHub Pages, and Disqus for comments.

---

## ✅ Requirements

- GitHub Pages repository
- Node.js installed
- VS Code with GitHub Copilot
- Disqus shortname

---

## 1. Initialize the Project

```bash
npm init -y
npm install @11ty/eleventy --save-dev
```
