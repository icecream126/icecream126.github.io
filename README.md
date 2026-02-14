# Academic Homepage Template

A clean, responsive personal academic homepage. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools.

**[Live Demo](https://icecream126.github.io)**

## Features

- **Single-page layout** — Hero, About, News, Publications, CV
- **3 theme modes** — Light, Dark, and fully Custom (color picker)
- **Dynamic content** — All content rendered from `config.js`; no HTML editing needed
- **Publication tools** — Filter by type, live search, BibTeX copy-to-clipboard
- **Mobile responsive** — Hamburger menu, optimized layouts for all screen sizes
- **Animations** — Typing effect, scroll reveals, particle background, progress bar
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation, `prefers-reduced-motion` support
- **Print-friendly** — Clean output when printing (hides nav, particles, controls)
- **SEO ready** — Meta tags, Open Graph tags

## Quick Start

### Fork & Customize

1. **Fork** this repository
2. **Edit `config.js`** — Update your name, bio, publications, education, social links
3. **Replace `assets/img/profile.svg`** with your photo (`.jpg` or `.png`, then update the path in `config.js`)
4. **Replace `assets/cv/cv.pdf`** with your actual CV
5. **Push** — GitHub Pages will deploy automatically

That's it! No `npm install`, no build step.

### Local Testing

```bash
# Option 1: Python
python -m http.server 8000
# Then open http://localhost:8000

# Option 2: Node
npx serve .

# Option 3: PHP
php -S localhost:8000
```

## File Structure

```
├── index.html              # Page skeleton (section containers only)
├── config.js               # ← EDIT THIS FILE to customize everything
├── css/
│   ├── themes.css          # Light / Dark / Custom theme CSS variables
│   ├── style.css           # Layout, typography, components
│   └── responsive.css      # Mobile / tablet breakpoints
├── js/
│   ├── render.js           # Builds DOM from config.js data
│   ├── theme.js            # Theme switching, color picker, localStorage
│   ├── animations.js       # Scroll reveals, typing, particles, progress bar
│   └── main.js             # Navigation, pub filter/search, BibTeX copy
├── assets/
│   ├── img/profile.svg     # Your profile photo (replace this)
│   └── cv/cv.pdf           # Your CV (replace this)
└── README.md
```

## Customization Guide

### config.js Reference

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Your full name |
| `firstName` | string | First name (shown in nav logo) |
| `title` | string | Your title (e.g., "ML Researcher") |
| `affiliation` | string | Your institution |
| `affiliationUrl` | string | Link to institution |
| `bio` | string | HTML-supported bio paragraph |
| `profilePhoto` | string | Path to your photo |
| `social` | object | `email`, `github`, `linkedin`, `googleScholar`, `twitter`, `semanticScholar` |
| `cvPath` | string | Path to CV PDF |
| `news` | array | `{ date, text }` — supports HTML in `text` |
| `publications` | array | See below |
| `education` | array | `{ degree, institution, period, description }` |
| `experience` | array | `{ role, organization, period, description }` |
| `defaultTheme` | string | `"light"`, `"dark"`, or `"system"` |
| `customColors` | object | Default colors for the custom theme picker |

### Publication Object

```js
{
    title: "Paper Title",
    authors: ["Author One", "Author Two"],
    highlightAuthor: "Author One",      // Highlighted in indigo
    venue: "Full Venue Name (Abbrev)",
    venueShort: "ICML",                 // Shown on badge
    year: 2026,
    type: "conference",                 // "conference" | "journal" | "preprint"
    links: {
        pdf: "https://...",
        code: "https://github.com/...",
        project: "https://...",         // Leave empty string to hide
    },
    bibtex: `@inproceedings{...}`,
}
```

### Themes

- **Light/Dark toggle**: Click the moon/sun icon in the navbar
- **Custom colors**: Click the palette icon, pick your colors, click "Apply Custom Theme"
- Colors persist in `localStorage` across sessions
- System preference is respected when `defaultTheme` is `"system"`

## External Dependencies (CDN)

- [Google Fonts](https://fonts.google.com/) — Inter + Source Serif 4
- [Font Awesome 6](https://fontawesome.com/) — UI icons
- [Academicons](https://jpswalsh.github.io/academicons/) — Academic icons (Google Scholar, etc.)

No npm packages. No build tools.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties, Intersection Observer, and backdrop-filter.

## License

MIT — free to use and modify. Attribution appreciated but not required.
