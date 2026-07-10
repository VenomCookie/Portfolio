# Yousuf Shahabuddin, Design Engineering Portfolio

Static site for **design.yousufshahabuddin.com**, hosted on GitHub Pages.
No build step, no framework. Just HTML, CSS and JavaScript (mostly the game)

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

## Performance note
The `assets/images` folder is large (multi-MB PNGs). Lazy-loading is already on, but
compressing the covers to roughly 1600px wide WebP/JPEG would cut load time a lot.
`cwebp -q 80 in.png -o out.webp` or an online squoosh pass will do it.
