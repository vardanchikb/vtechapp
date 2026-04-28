# VTech App Website

Official static website for `vtech-app.com`, built with Astro for Cloudflare Pages.

VTech App is an independent free software provider focused on practical utilities for Windows users, technicians, and system administrators. The site is a static software catalog, download portal, donation page, and support/feedback entry point.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Astro writes the production build to `dist`.

## Cloudflare Pages

Use these deployment settings:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`

## App Catalog

Apps are defined in `src/data/apps.json`. To add a new app, add an object with:

- `name`
- `slug`
- `platform`
- `status`
- `shortDescription`
- `longDescription`
- `currentVersion`
- `releaseDate`
- `icon`
- `screenshots`
- `downloadUrl`
- `donationUrl`
- `sourceUrl`
- `changelog`
- `supportEmail`
- `tags`

Individual app detail pages are generated from this data at `/apps/{slug}/`.

## Icons and Screenshots

Put app icons in `public/icons/` and screenshots in `public/screenshots/`. Use root-relative paths in `apps.json`, for example:

```json
"/icons/placeholder-app.svg"
```

## Releasing Downloads

All current apps are marked Coming Soon and have inactive download buttons. When an app is released:

1. Upload the real release artifact to the official hosting location.
2. Update `downloadUrl` in `src/data/apps.json`.
3. Update `status`, `currentVersion`, `releaseDate`, and `changelog`.
4. Update page logic if downloads should become active for released apps.

Future download hosting can use Cloudflare R2 or GitHub Releases. If download tracking is needed later, prefer privacy-conscious aggregate tracking and document it in the privacy policy before enabling it.

## Donations

Donation links currently use a placeholder Buy Me a Coffee URL. Replace `https://www.buymeacoffee.com/vtechapp` in `src/data/apps.json` and `src/pages/donate.astro` when the final donation page is ready.
