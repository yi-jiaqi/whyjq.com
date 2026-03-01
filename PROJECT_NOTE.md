# Project Overview (whyjq)

## What this project does
This is a static, front‑end portfolio/interactive gallery for Jiaqi Yi. The main entry (`index.html`) renders a responsive grid that is dynamically sized to the viewport and populated with project cards, images, and links sourced from `objects.js`. Users can click into categories or individual projects, and the URL query parameter `code` drives which category/project is displayed. The grid layout is generated and filled at runtime, including multi‑cell image placements and text/link blocks. A PDF modal viewer is available for project documents, and a Three.js canvas renders a subtle animated point‑cloud/torus‑knot “cloud” in the background. The overall site is styled with custom CSS plus a pattern background library.

Key behaviors you’ll see in the UI:
- Responsive grid creation and placement logic on load and on resize.
- Category/project selection driven by `?code=` in the URL.
- Auto‑hover animation on elements until the user interacts.
- PDF viewing in a full‑screen modal (canvas rendered via PDF.js).
- Animated background effect using Three.js + noise.

## Code stack notes
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework).
- **Rendering/Animation:** Three.js (r83) for the background canvas; Noise.js for procedural movement.
- **PDF viewing:** PDF.js (2.6.347) renders PDFs into a canvas and provides paging/scroll logic.
- **Styling:** Custom `styles.css` plus `pattern.min.css` for dotted pattern background. Google Material Symbols font is loaded.
- **Data/content:** Project metadata, categories, and elements live in `objects.js`.
- **Assets:** `images/`, `icons/`, and `pdfs/` contain visual and document assets.

## Main entrypoints and files
- `index.html` — primary site entry; creates the grid, loads scripts, background canvas, and PDF modal.
- `scripts.js` — grid sizing, layout, category routing, and auto‑hover logic.
- `basicFunctions.js` + `IntegratedFunctions.js` — reusable placement and layout helpers.
- `objects.js` — project data/content and category definitions.
- `pdfViewer.js` — PDF modal viewer logic for in‑site document viewing.
- `cloud.js` — Three.js animated background.
- `styles.css` — layout and presentation.

If you want a deeper breakdown of how the grid placement algorithms work or a map of specific data structures in `objects.js`, tell me which area to focus on.

---

## Operational Notes (DIY Website)

### 1) GitHub syncing (what is uploaded + codebase contents)
**What I can see locally:**
- There is **no `.git` directory** in this folder, so `/Users/jiaqiyi/MyProjects/whyjq` (relative path: `.`) is **not currently a Git repository**. That means I cannot see a remote URL, branch, or what is tracked/untracked here.
- I also don’t see a `.gitignore`, so if you initialize Git here, **everything in the folder is eligible to be tracked**, including large assets (images/pdfs). (Relative paths: `.gitignore` not present, `images/`, `pdfs/` exist.)

**If you are syncing from another folder:**
- Your Git sync “uploads” whatever is tracked by Git in that repo. If you want to confirm the exact tracked set, check in the actual repo folder for `.git/` and run `git status` there.

**Current codebase contents (high‑level):**
- Site entry and layout: `index.html`, `styles.css`, `scripts.js` (relative paths).
- Content and data: `objects.js` is the single source of truth for projects/categories (relative path: `objects.js`).
- Utilities: `basicFunctions.js`, `IntegratedFunctions.js` (relative paths).
- PDF viewer: `pdfViewer.js`, `viewer.html` (relative paths).
- Visual background: `cloud.js` (relative path: `cloud.js`).
- Assets: `images/`, `icons/`, `pdfs/` (relative paths).
- Additional experiments/subprojects: `arrival/`, `mandala/`, `doodletest/`, `final/` (relative paths).

### 2) AWS deploying (what’s in repo + auto‑reload on push)
**AWS‑related info I see in this project:**
- There is an **AWS Serverless Framework config** under `arrival/serverless.yml` (relative path: `arrival/serverless.yml`).
- It defines an AWS Lambda + API Gateway endpoint (`service: chatgpt-api`) with environment variables and IAM role ARN.
- This appears **separate** from the main static site (the main site is pure HTML/CSS/JS).

**Auto‑deploy on git push?**
- I do **not** see any GitHub Actions or other CI/CD configuration in this folder (no `.github/workflows/`).
- So there is **no evidence of auto‑deploy** on push **from this folder**.
- If you currently deploy via AWS Amplify or other AWS services, it’s **not configured here**. The only AWS config I can see is the Serverless project in `arrival/`.

**Security note:**
- `arrival/serverless.yml` contains a **literal API key** in `provider.environment.OPENAI_API_KEY`. If this repo is public or shared, that key should be rotated and removed from versioned files.

### 3) Content upload simplify (make “where to put projects” explicit)
**Current single source of truth:**
- Projects and categories are defined in `objects.js` (relative path: `objects.js`).
- Each project object includes `id`, `coverPicture`, `tags`, and `elements` (array of content blocks).

**Where to add a project (explicit):**
- Add a new object inside `projectObjects` in `objects.js` (relative path: `objects.js`).
- The `elements` array controls what shows on the project page and uses `kind` values like `text`, `picture`, and `link`.

**Related code references:**
- Rendering entry: `index.html` (relative path: `index.html`) calls `setupGrid`.
- Project selection and grid population: `scripts.js` → `setupGrid()` / `fillGrid()` (relative path: `scripts.js`).
- Element placement: `basicFunctions.js` + `IntegratedFunctions.js` (relative paths).

If you want, I can add a short **“How to add a project”** section (template block) directly into `objects.js` or into a new `CONTENT_GUIDE.md` in the repo root for quick future reference.
