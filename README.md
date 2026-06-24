# Yousuf Shahabuddin, Design Engineering Portfolio

Static site for **design.yousufshahabuddin.com**, hosted on GitHub Pages.
No build step, no framework. Just HTML, CSS and a little vanilla JavaScript.

## Design language
An engineering drawing sheet: cool "print" ground, ink linework, IBM Plex Mono
for the technical voice (title block, callouts, specs), Archivo for headline weight,
and the brand teal `#3BD8B1` used the way a CAD viewport uses it, as the active /
selection colour. The signature is the title block in the footer plus the
dimension-line annotations on the hero portrait.

## Files
```
index.html      Home: hero, selected work, capabilities, about, contact
projects.html   Full index of all work, with discipline filters
project.html    Case-study template (reads ?p=SLUG from the URL)
style.css       The whole design system
app.js          Renders grids, filters, case studies, lightbox, reveals
projects.js     ALL PROJECT CONTENT lives here. This is the only file you edit
                to add or change a project.
.nojekyll       Tells GitHub Pages not to run Jekyll (your image filenames have
                spaces and parentheses, which Jekyll can mishandle).
CNAME           Custom domain.
assets/         Your images, videos, docs, CV.
```

## Deploying
1. Replace the old files in your repo with these. **Delete the old `script.js`**
   (replaced by `app.js`) and the old `assets/projects.json` (data now lives in
   `projects.js`).
2. Commit and push to the branch GitHub Pages serves (Settings, Pages).
3. Pages redeploys in a minute or two.

## Adding or editing a project
Open `projects.js` and copy an existing block. Fields:

| field | meaning |
|---|---|
| `slug` | unique id, becomes `project.html?p=SLUG` |
| `title`, `tagline`, `year`, `role` | header content |
| `disciplines` | array. Drives the filter chips. Keep to: Product Design, Embedded, UX & Research, Sustainability, CAD & Prototyping |
| `tools` | array of tools / methods shown as chips |
| `featured` | `true` puts it on the home page |
| `order` | higher number shows first |
| `cover`, `overlayTitle` | grid image and hover label |
| `brief`, `contribution[]`, `outcome` | the case-study copy |
| `images[]`, `videos[]` | gallery media |
| `pdf` | embed a report instead of a gallery |
| `collaborators[]` | `{ name, url }` |

## Two things to do before you call this done
These are content jobs only you can do, and they matter more than any styling:

1. **Replace the poster "covers" with clean hero shots.** Right now several covers
   are dense A3 coursework posters. One clean render or photo per project, ideally
   16:10, makes the grid look professional. The posters still belong inside the case
   study gallery, just not as the cover.
2. **Add hard numbers.** Where the copy is qualitative (Pocket Shaver mass saving,
   HydroMorph waste reduction, anything with a measurable result), put the real
   figure in. Recruiters scan for quantified outcomes. Search `projects.js` for the
   `outcome` and `contribution` fields.

## Performance note
The `assets/images` folder is large (multi-MB PNGs). Lazy-loading is already on, but
compressing the covers to roughly 1600px wide WebP/JPEG would cut load time a lot.
`cwebp -q 80 in.png -o out.webp` or an online squoosh pass will do it.
