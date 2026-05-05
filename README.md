# MugenSec — agency landing site

A single-folder static site you can deploy today. No build step. No npm install.

## Files

- `index.html` — the landing page (all sections in one file you can edit).
- `script.js` — mobile nav toggle, footer year stamp.
- `favicon.svg` — site icon.
- `robots.txt`, `sitemap.xml` — basic SEO.
- `_headers` — security headers for **Cloudflare Pages**.
- `netlify.toml` — security headers if you deploy on **Netlify** instead.
- `privacy.html`, `terms.html` — placeholder legal pages. **Replace before launch.**

## Local preview (any of these work)

- Just double-click `index.html` and it opens in your browser.
- Or run a tiny local server (better for testing the form and headers):
  ```
  cd D:\ClaudeAgency\mugensec-site
  python -m http.server 8000
  ```
  Then open http://localhost:8000.

## Things to edit before going live

Open `index.html` and search-and-replace these:

1. **Phone number** — `+91 XXXXX XXXXX` (footer).
2. **Email** — `hello@mugensec.com` if you set up a custom domain email.
3. **Form endpoint** — replace `https://formspree.io/f/YOUR_FORM_ID` with your real Formspree form (free at formspree.io). Or swap to Web3Forms / your own backend.
4. **Pricing** — sanity-check the package numbers match what you're actually quoting.
5. **OG image** — add an `og:image` meta tag pointing to a 1200x630 social preview.
6. **Replace `privacy.html` and `terms.html`** with your real policies (have a lawyer or CA look over the security and liability clauses).
7. **WhatsApp link** — change `wa.me/91XXXXXXXXXX` in the footer.

## Deploying — Cloudflare Pages (recommended)

1. Sign up at https://dash.cloudflare.com (free).
2. Pages → "Create a project" → "Direct Upload".
3. Drag the entire `mugensec-site` folder.
4. Pick a project name (this becomes `your-name.pages.dev` until you connect a custom domain).
5. After deploy, add a custom domain in Pages → Custom Domains. Cloudflare handles SSL automatically.

The `_headers` file is read automatically by Cloudflare Pages.

## Deploying — Netlify (alternate)

1. Sign up at https://netlify.com (free).
2. Sites → "Add new site" → "Deploy manually" → drag the `mugensec-site` folder.
3. Custom domain in Site settings → Domain management.

The `netlify.toml` is read automatically by Netlify.

## Verify after deploy

Run these and aim for:

- https://pagespeed.web.dev — Lighthouse Performance, SEO, Accessibility ≥ 90 each.
- https://securityheaders.com — Grade A or A+.
- https://observatory.mozilla.org — Grade B+ or higher.
- https://www.ssllabs.com/ssltest/ — Grade A.

If any of these grade lower than expected, the most common fixes are: tightening the CSP in `_headers`, adding `og:image`, and improving alt text on any images you add.

## Switching to production-grade later

Tailwind CDN is fine for a launch site but stops at ~maintenance scale. When you want the proper client-project starter, ask Claude to convert this to **Astro + Tailwind CLI** — same look, faster, build-time CSS purging, component reuse for client projects.

## Quick edits checklist

- [ ] Phone number in footer
- [ ] WhatsApp number in footer
- [ ] Formspree (or alt) form endpoint in `index.html`
- [ ] Email address (optional — using `hello@mugensec.com` requires email hosting)
- [ ] Real privacy and terms pages
- [ ] OG image (`og:image` meta + a 1200x630 image in the folder)
- [ ] Custom domain (mugensec.com) connected to your host
