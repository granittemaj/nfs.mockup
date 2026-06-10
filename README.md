# Not For Sale — Website Concept

A multi-page UI/UX concept for **wearenotforsale.org**, built as a clean, static site.
Designed to feel like a living publication people return to daily, on the Not For Sale brand kit.

> Concept / proposal. Not affiliated with or endorsed by Not For Sale. All article
> headlines and body copy are **representative placeholder content** for demonstration.

## Pages / templates
| File | Page | Type |
|------|------|------|
| `index.html` | Home (publication) | page |
| `projects.html` | Projects index (filterable) | archive |
| `project.html` | Single project — `?c=slug` | CPT template |
| `partners.html` | Partners index | archive |
| `partner.html` | Single partner — `?p=slug` | CPT template |
| `about.html` | About | page |
| `team.html` | Our Team | page |
| `news.html` | News index (filterable) | archive |
| `blog.html` | Single article / explainer | CPT template |


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
