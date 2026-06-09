# Not For Sale — Website Concept

A multi-page UI/UX concept for **wearenotforsale.org**, built as a clean, static site.
Designed to feel like a living publication people return to daily, on the Not For Sale brand kit.

> Concept / proposal. Not affiliated with or endorsed by Not For Sale. All article
> headlines and body copy are **representative placeholder content** for demonstration.

## Pages
| File | Page |
|------|------|
| `index.html` | Home — featured investigation, live "latest", filterable Frontlines feed, Most Read, founder's letter, social, FAQ |
| `projects.html` | Our Projects — filterable country grid |
| `about.html` | About — origin story, mission/vision, approach, where we work, impact |
| `team.html` | Our Team — founding members + project directors |
| `partners.html` | Partners — corporate partner grid |
| `blog.html` | A sample article (reading experience: drop cap, pull quote, progress bar, related) |

## Design system
- **Colours:** orange `#F5821F`, ink `#141210`, warm paper `#FCFAF6`
- **Type:** Playfair Display (display) + Source Serif 4 (body)
- `assets/styles.css` — full design system
- `assets/app.js` — shared engine: renders header/footer/newsletter, page content, and all artwork
- `assets/flags.js` — embedded country flags (base64)

## Self-contained by design
All imagery is **generated at runtime as inline SVG** (landscape scenes, duotone avatars) plus
embedded flags, so the site renders with **zero external image requests**. Fonts load from Google Fonts.
Drop real photography into the `.ph` / `.scene-bg` slots for production.

## UX details
Live relative timestamps · category colour-coding · count-up stats · scroll reveals ·
sticky glass nav · reading-progress bar · filterable feeds · animated FAQ accordions ·
`prefers-reduced-motion` respected · fully responsive.

## Run it
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8080
```
Deploys as-is to **GitHub Pages** (set Pages source to the repo root / branch).

## Next steps for production
- Replace placeholder copy and generated art with the CMS feed + real photography
- Swap the "N" flame badge for the official logo SVG and confirm the licensed headline typeface
- Wire `/projects/{country}/` and `/news/{slug}/` to real routes
