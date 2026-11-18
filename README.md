# Praatishthaa Goyal — Portfolio

A zero-dependency, no-build-step interactive portfolio: plain HTML, CSS and vanilla JS.

## Deploy on Vercel

**Option A: drag and drop (fastest)**
1. Go to https://vercel.com/new and sign in.
2. Drag this whole folder onto the page (or use "Import" with a GitHub repo, see B).
3. Framework preset: **Other**. Leave build command and output directory empty. Deploy.

**Option B: GitHub**
1. Push this folder to a new GitHub repo.
2. On Vercel: Add New → Project → import the repo → Deploy (no settings needed).

**Option C: CLI**
```
npm i -g vercel
cd portfolio
vercel --prod
```

## Run locally
```
python3 -m http.server 8000
# open http://localhost:8000
```
Add `?skipboot` to the URL to skip the boot animation while developing.

## Edit your content
- **Text and sections:** `index.html`
- **Email, GitHub link, resume filename, skills list, accent colours:** the `CONFIG` and `SKILLS` blocks at the top of `script.js`
- **Colours, fonts, spacing:** the `:root` tokens at the top of `style.css`
- **Resume:** replace `Praatishthaa_Goyal_Resume.pdf` with a new file of the same name

## What's inside
- Living network background that reacts to your cursor (click empty space to send packets)
- Boot sequence, scramble-text headings, custom cursor, magnetic buttons, tilt cards
- K-Means playground, Sentinel IPS traffic simulator, drag-to-compare coral slider, Nourivo steps-to-meals demo
- Command palette (Ctrl/⌘ + K), a working terminal (`help`), light/dark theme, 5 accent colours
- Easter eggs: Konami code, `sudo hire praatishthaa`, `matrix`, `coffee`
