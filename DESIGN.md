---
name: Mike Henke Website
description: Personal portfolio and tech blog for a senior software engineer
colors:
  electric-cyan: "#19d4fe"
  electric-cyan-dark: "#0fb8e0"
  near-black: "#181a1b"
  steel-gray: "#22313a"
  carbon: "#2a2a2a"
  white: "#ffffff"
  light-gray: "#cfd8dc"
  slate-border: "#3e4750"
  cyan-glow: "rgba(25, 212, 254, 0.1)"
  cyan-glow-light: "rgba(25, 212, 254, 0.05)"
  cyan-focus: "rgba(25, 212, 254, 0.4)"
  error-red: "#f87171"
  orange-accent: "#ff6b35"
  code-comment: "#6a9955"
  code-keyword: "#569cd6"
  code-string: "#ce9178"
typography:
  display:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 7vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "clamp(0.2px, 0.5vw, 0.3px)"
  headline:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.75rem, 6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.5rem, 5vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)"
    fontWeight: 400
    letterSpacing: "clamp(0.3px, 0.8vw, 0.5px)"
rounded:
  xxs: "2px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "14px"
  xl: "20px"
  16: "16px"
  pill: "999px"
spacing:
  xs: "clamp(0.25rem, 1vw, 0.5rem)"
  sm: "clamp(0.5rem, 2vw, 0.75rem)"
  md: "clamp(0.75rem, 2.5vw, 1rem)"
  lg: "clamp(1rem, 3vw, 1.5rem)"
  xl: "clamp(1.25rem, 4vw, 2rem)"
  2xl: "clamp(1.5rem, 5vw, 2.5rem)"
  3xl: "clamp(2rem, 6vw, 3rem)"
  4xl: "clamp(2.5rem, 7vw, 4rem)"
  5xl: "clamp(3rem, 8vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.electric-cyan}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.md}"
    padding: "clamp(0.75rem, 2.5vw, 1rem) clamp(1.25rem, 4vw, 2rem)"
  button-primary-hover:
    backgroundColor: "{colors.electric-cyan-dark}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.electric-cyan}"
    rounded: "{rounded.md}"
    padding: "clamp(0.75rem, 2.5vw, 1rem) clamp(1.25rem, 4vw, 2rem)"
  card:
    backgroundColor: "{colors.carbon}"
    rounded: "{rounded.lg}"
    border: "2.5px solid {colors.slate-border}"
    padding: "clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 4vw, 2rem)"
  card-hover:
    borderColor: "{colors.electric-cyan-dark}"
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)"
  timeline-card:
    backgroundColor: "{colors.carbon}"
    rounded: "{rounded.16}"
    border: "2.5px solid {colors.slate-border}"
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)"
  nav-dropdown:
    backgroundColor: "{colors.steel-gray}"
    rounded: "{rounded.sm}"
    border: "1px solid {colors.slate-border}"
  tag-category:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.xs}"
    border: "1px solid {colors.electric-cyan}"
    padding: "clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)"
---

# Design System: Mike Henke Website

## 1. Overview

**Creative North Star: "The Terminal Professional"**

A personal portfolio that reads like a senior engineer's terminal: dark, focused, no decorative noise. The design communicates competence through restraint — every element earns its place. This is not a marketing site; it's a technical credential. The aesthetic says "I build production systems" as clearly as the content does.

The palette is electric cyan against near-black: the colors of a well-configured IDE, a terminal with syntax highlighting, a professional who spends their day in the command line. The typography is Geist — a geometric sans with enough personality to be distinctive without being decorative. Interactions are tactile and confident: hover states that lift, shadows that breathe, transitions that feel mechanical and precise.

**Key Characteristics:**

- Dark theme as professional default — not edgy, honest. Senior engineers work in dark terminals.
- Single decisive accent (electric cyan) used sparingly — its rarity is the point.
- Ambient shadows create depth without decoration — surfaces float above the background.
- Fluid clamp() spacing and typography throughout — no breakpoint chaos.
- Reduced motion respected — the site works for everyone, not just able-bodied users.

## 2. Colors: The Electric & Industrial Palette

The palette reads as terminal-native: a dark IDE with syntax highlighting. Electric cyan is the accent that cuts through the darkness; everything else stays muted to let it land.

### Primary

- **Electric Cyan** (#19d4fe): The decisive accent. Used for interactive elements (links, buttons, focus states), the primary brand color, and any element that needs to be noticed. On near-black, this cyan has maximum contrast without being aggressive.
- **Electric Cyan Dark** (#0fb8e0): The hover/active state for electric cyan. Slightly deeper, still readable. Used on button hover, link hover, border accent on focused cards.

### Neutral

- **Near-Black** (#181a1b): The canvas. Not pure black — a slight blue undertone makes it feel less harsh, more like a well-calibrated terminal background.
- **Steel Gray** (#22313a): Surface color for navbar, footer, and elevated sections. Slightly lighter than background to create tonal separation without shadows.
- **Carbon** (#2a2a2a): Lighter surface for cards, code blocks, and nested content. Creates depth hierarchy through tonal layering.
- **White** (#ffffff): Primary text. Maximum contrast against the dark background — no gray-on-dark that sacrifices readability.
- **Light Gray** (#cfd8dc): Secondary text. Used for metadata, captions, and supporting copy where full contrast would be harsh.
- **Slate Border** (#3e4750): Borders and dividers. Subtle enough to not compete with content, visible enough to define boundaries.

### Functional

- **Cyan Glow** (rgba(25, 212, 254, 0.1)): Translucent cyan for hover backgrounds and accent tints. Lets the accent color work without full opacity.
- **Cyan Glow Light** (rgba(25, 212, 254, 0.05)): Even more translucent for subtle hover states and ambient highlights.
- **Cyan Focus** (rgba(25, 212, 254, 0.4)): Focus ring color for keyboard navigation. High-visibility cyan with transparency.
- **Error Red** (#f87171): Validation errors and alert states. Softer than pure red — still readable on dark backgrounds.

### Code Syntax

- **Comment Green** (#6a9955): Code comments in syntax-highlighted blocks.
- **Keyword Blue** (#569cd6): Code keywords in syntax-highlighted blocks.
- **String Orange** (#ce9178): Code strings in syntax-highlighted blocks.

### Named Rules

**The Rarity Rule.** Electric cyan appears on ≤10% of any given screen. Its scarcity is what makes it read as decisive, not decorative. If cyan is everywhere, it's noise — not signal.

## 3. Typography

**Display Font:** Geist (with Arial, Helvetica, sans-serif fallback)
**Body Font:** Geist (single family, weight contrast only)
**Mono Font:** system monospace for code blocks only

**Character:** Geometric sans with personality. Geist is not a training-data default — it has distinctive geometric construction that reads as engineered, not templated. Single-family with committed weight contrast (400 body, 500 medium, 600 semibold, 700 bold) is stronger than a timid display+body pair.

### Hierarchy

- **Display** (700, clamp(2rem, 7vw, 2.75rem), 1.2 line-height): Hero headlines and major section titles. Large enough to establish hierarchy, clamped to prevent overflow on mobile.
- **Headline** (700, clamp(1.75rem, 6vw, 2.25rem), 1.2 line-height): Section headings (h2). Establishes content structure.
- **Title** (700, clamp(1.5rem, 5vw, 1.875rem), 1.3 line-height): Card titles, h3/h4. One step below headline.
- **Body** (400, clamp(0.9rem, 2.5vw, 1rem), 1.7 line-height): Prose content. Max line length capped at 65ch via CSS. Line-height 1.7 for comfortable reading.
- **Label** (400, clamp(0.7rem, 1.5vw, 0.8rem), wide letter-spacing): Metadata, tags, timestamps. Small and tracked for visual hierarchy without being loud.

### Named Rules

**The No-Decoration Rule.** Typography carries the hierarchy through size and weight alone. No italic for emphasis (it's overused), no uppercase for drama (it's aggressive), no letter-spacing manipulation beyond subtle tracking on labels.

## 4. Elevation

The system uses ambient shadows to create depth — surfaces appear to float above the background without harsh borders or heavy outlines. Shadows are present at rest AND enhanced on hover; they're not only triggered by interaction.

### Shadow Vocabulary

- **Shadow MD** (`0 4px 12px rgba(0, 0, 0, 0.25)`): Default card shadow. Subtle lift that separates cards from the background.
- **Shadow LG** (`0 8px 24px rgba(0, 0, 0, 0.3)`): Enhanced shadow for hover states and elevated elements. Deeper, more diffuse.
- **Shadow Accent** (`0 4px 20px rgba(25, 212, 254, 0.12)`): Tight cyan glow for hero images and timeline markers. Subtle — reads as ambient light, not a glow stick.
- **Shadow Accent SM** (`0 2px 8px rgba(25, 212, 254, 0.25)`): Small cyan glow for accent elements on hover.
- **Shadow Accent LG** (`0 6px 16px rgba(25, 212, 254, 0.22)`): Medium cyan glow for hover states on featured elements.

### Named Rules

**The Ambient Rule.** Shadows exist at rest, not just on hover. A card without its shadow feels like it's sitting on the surface, not floating above it. Hover enhances the shadow; it doesn't create it.

**No shadow glow on timeline cards.** Timeline content cards use shadow-md only — no accent glow. The border and surface color provide separation.

## 5. Components

### Buttons

- **Shape:** 8px radius (md) — not too round (that reads as playful), not sharp (that reads as aggressive). Confident and professional.
- **Primary:** Electric cyan background, near-black text. Full padding (md vertical, xl horizontal). Lifts on hover with darker cyan and shadow-lg.
- **Outline:** Transparent background, electric cyan border and text. Fills with cyan on hover, text goes white.
- **Hover / Focus:** All buttons lift (translateY(-2px)) and gain shadow-lg on hover. Focus uses cyan-focus ring (3px, offset 2px).

### Cards / Containers

- **Corner Style:** 14px radius (lg) — rounded enough to feel modern, not pill-shaped. Blog cards and education items use this.
- **Timeline cards:** 16px radius — slightly tighter than section cards to differentiate hierarchy.
- **Background:** Carbon (#2a2a2a) for blog cards and timeline content; Steel Gray for author bio.
- **Shadow Strategy:** Shadow-md at rest for blog cards, shadow-lg on hover. Timeline cards use shadow-md at rest only.
- **Border:** 2.5px solid slate-border at rest, transitions to electric-cyan-dark on hover for blog cards.
- **Internal Padding:** lg (1rem–1.5rem) horizontal, xl (1.25rem–2rem) vertical.

### Navigation

- **Style:** Sticky navbar with backdrop-filter blur (10px). Steel gray at 95% opacity — feels like a terminal title bar.
- **Typography:** Geist medium, 16px equivalent. Links have subtle underline animation on hover.
- **Mobile:** Slide-out menu from right, 280px wide, full viewport height with blur backdrop.
- **Dropdown:** Positioned absolutely, steel gray background, appears below toggle with opacity/transform transition.

### Tags / Chips

- **Style:** Transparent background, white text, 1px electric cyan border, 4px radius (xs).
- **Hover:** Fills with electric cyan, text goes near-black.
- **Used for:** Category labels on blog posts.

### Back to Top

- **Shape:** 44x44px circular button (touch target compliant).
- **Style:** Electric cyan background, near-black icon, fixed bottom-right.
- **Behavior:** Hidden until scrolled (opacity 0, visibility hidden, translateY 20px), appears when visible class added.

### Author Bio

- **Layout:** Flex row (image left, content right) on desktop; column on mobile.
- **Style:** Steel gray background, 14px radius, 2px slate border.
- **Image:** 80px circular avatar with 3px slate border.

### Footer

- **Style:** Single inline row, 5 links (Home, About, Career, Blog, Contact) with bullet separators, copyright line below.
- **Type:** Statement footer — compact, no columns. Closes the page rather than indexing it.

## 6. Do's and Don'ts

### Do:

- **Do** use electric cyan sparingly — the rarity rule. It should feel like a signal, not a flood.
- **Do** keep the dark theme. It's professional default, not aesthetic choice.
- **Do** use Geist at multiple weights. The single-family-with-weight-contrast approach is intentional.
- **Do** use ambient shadows at rest. Cards should float, not sit.
- **Do** respect reduced motion. Every animation has a instant/crossfade fallback.
- **Do** cap body line length at 65ch. Prose should be readable, not a horizontal scan.
- **Do** use fluid clamp() spacing and typography. No breakpoint chaos.
- **Do** keep hero description left-aligned. Balanced asymmetry reads more honestly than perfect centering.

### Don't:

- **Don't** use gradient text. Solid colors only. Emphasis through weight and size, not gradient effects.
- **Don't** use border-left as a colored stripe on cards or blockquotes. Full borders or background tints, not side stripes.
- **Don't** use glassmorphism. The site is terminal-native, not glassy.
- **Don't** use AI slop aesthetics: generic gradient heroes, stock photo beach/desk setups, "Hello I'm a Full Stack Developer" prose.
- **Don't** use card grids with identical icon+heading+text patterns. Each card should earn its space.
- **Don't** use tiny uppercase tracked eyebrows above every section. One named kicker as brand system is voice; repeating it is AI grammar.
- **Don't** use numbered section scaffolding (01 / 02 / 03). Numbers earn their place only in ordered sequences like the career timeline.
- **Don't** pair cyan with purple or pink. The palette is cyan-on-near-black — no neon rainbow.
- **Don't** use border-radius above 20px on section containers. Timeline cards cap at 16px.
- **Don't** use bounce or elastic easing. Ease-out-quart only — mechanical and precise.
- **Don't** use shadow glow on timeline content cards. Elevation via border and surface lightness only.
