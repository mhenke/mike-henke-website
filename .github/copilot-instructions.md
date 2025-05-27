# Copilot Custom Instructions for Mike Henke Portfolio

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
  - Use `font-weight: 700` for main headings, `600` for subheadings, and `400` for body text.
  - Headings should be large and bold (e.g., `h1` at 3rem, `h2` at 2.5rem, etc.).
  - Use subtle letter-spacing (0.2px–0.5px) for a clean, modern look.
- Use large, clear headings and generous spacing (padding/margins) for a professional, modern look.
- Skills section should use 3 columns (Programming Languages, Frameworks, Methodologies) on desktop, stacked on mobile.
- For skill bars, use a gray background with a cyan/blue progress indicator.
- Buttons should be large, rounded, and use the accent color for primary actions; use outlined style for secondary actions.
- For the hero section, use a two-column grid: left for headline and buttons, right for a photo with rounded corners and a subtle box shadow.
- Career timeline should use a two-column grid: left for numbered steps with a vertical line, right for company details. Use Flexbox for vertical alignment of numbers and lines.
- All sections must be responsive: stack columns vertically on screens below 900px wide.
- Use accessible alt text for all images.
- Do not use frameworks (like Bootstrap) or JavaScript for layout unless specifically requested.
- Use only modern, standards-compliant HTML and CSS.
- When generating code, match the visual style and structure shown in the screenshots provided.
- Do not reference or mention any blurred faces or image redactions.
