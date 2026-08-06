# Suraj Plachikaad Suresh Kumar — Portfolio

A clean, multi-page portfolio site (Home, Experience, Education, Skills, Patents)
with a light/dark theme toggle. Plain HTML/CSS/JS — no build tools, no
dependencies, no external services.

## Maintain it with ease

Edit **one** file for almost everything:

- `assets/js/content.js` — name, intro, hobbies, jobs, education, skills, patents.

Anything marked `TODO` is a placeholder — replace it with your real text.

### Two things that are *not* in `content.js`

| What | Where | Why |
|---|---|---|
| Page titles, `<meta>` description, Open Graph / link-preview tags | the `<head>` of each `.html` file | Search crawlers and social-media scrapers don't run JavaScript, so these must be static HTML |
| The short static intro on the home page | `index.html`, inside `<section id="hero">` | Same reason — it's the fallback that's readable without JS. Keep it roughly in sync with `home.intro` |

### Add a photo

1. Drop the image in `images/` — **lowercase filename**, resized to ~1600px.
   See `images/README.txt` for the one-liner that does both.
2. In `content.js`, reference it, e.g. `photo: "images/profile.jpg"`.
3. For the home gallery, add `{ src: "...", alt: "..." }` to `home.gallery`.
   Alt text is read aloud by screen readers — write a real description.

### Add your patents

`content.js` has a `patents: []` array with a commented-out example directly
above it showing every field. Until you fill it in, `patents.html` shows a
"coming soon" note rather than an empty page.

### Add a CV

Drop a PDF at `assets/cv.pdf` and set `cvUrl: "assets/cv.pdf"` in `content.js`.
The download button appears automatically; leave `cvUrl` empty to hide it.

## Preview locally

```bash
python3 -m http.server
```

then visit <http://localhost:8000>. (Opening `index.html` directly mostly works,
but a local server matches production more closely.)

## Host on GitHub Pages

`.github/workflows/static.yml` deploys automatically on every push to
**`master`**. Repo → Settings → Pages → Source: **GitHub Actions**.

The site is live at <https://surajps.github.io/Portfolio_SPSK/>.

## Layout

| Path | Purpose |
|---|---|
| `index.html` | Home — intro, "now", stats, hobbies, gallery, contact |
| `experience.html` | Zig-zag timeline of roles |
| `education.html` | Degrees |
| `skills.html` | Proficiency tiers + technical toolkit |
| `patents.html` | Patents |
| `assets/js/content.js` | **All the content** |
| `assets/js/main.js` | Rendering, theme, nav, lightbox |
| `assets/css/style.css` | Styling, light + dark themes |
| `assets/favicon.svg` | Browser-tab icon |
