# VTech App Website

Official static website for `vtech-app.com`, built with Astro for Cloudflare Pages.

VTech App is an independent free software provider focused on practical utilities for Windows users, technicians, and system administrators. The site is a static software catalog, download portal, donation page, and support/feedback entry point.

Public contact email: `vtechinf1@gmail.com`.

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

## Contact Form Email

The contact API sends email through Resend and requires a `RESEND_API_KEY` secret.

For local Cloudflare development, create `.dev.vars` from the example file and set the real key:

```bash
cp .dev.vars.example .dev.vars
```

For Cloudflare Pages dashboard deploys, add `RESEND_API_KEY` in the Pages project settings under production environment variables.

For direct Worker deploys with the generated Wrangler config, set the secret after building:

```bash
npm run build
npx wrangler secret put RESEND_API_KEY --config wrangler.deploy.json
```

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

Static release files can be placed in `public/downloads/`. The current Windows app folders are:

- `public/downloads/windows/folder-size-explorer/`
- `public/downloads/windows/permission-preserving-file-copier/`
- `public/downloads/windows/windows-file-server-permission-auditor/`

When an app is released:

1. Upload large release artifacts to GitHub Releases or Cloudflare R2. Cloudflare Pages has a 25 MiB per-file asset limit, so do not place large installers in `public/`.
2. Keep small metadata files such as `checksums.txt` and optional release notes in the matching folder under `public/downloads/`.
3. Update `downloadUrl` in `src/data/apps.json` using the GitHub Release or R2 URL.
4. Update `status`, `currentVersion`, `releaseDate`, and `changelog`.
5. Update page logic if downloads should become active for released apps.

Future download hosting can use Cloudflare R2 or GitHub Releases. If download tracking is needed later, prefer privacy-conscious aggregate tracking and document it in the privacy policy before enabling it.

## Donations

Donation links use the VTech App Ko-fi page: `https://ko-fi.com/vtechapp`.
