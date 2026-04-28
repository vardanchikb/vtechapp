# VTech App Download Files

Put small release metadata files in these folders before building/deploying the site.

Do not put large installers here. Cloudflare Pages has a 25 MiB per-file static
asset limit, so large `.exe` or `.zip` releases should be uploaded to GitHub
Releases or Cloudflare R2 instead.

## Current Windows Apps

- `windows/folder-size-explorer/`
- `windows/permission-preserving-file-copier/`
- `windows/windows-file-server-permission-auditor/`

## Suggested Files Per Release

For each app release, include small metadata here:

- `checksums.txt`
- Optional `release-notes.txt`

After adding files, update `src/data/apps.json`:

- `downloadUrl`
- `status`
- `currentVersion`
- `releaseDate`
- `changelog`

Example public metadata URL:

`/downloads/windows/folder-size-explorer/checksums.txt`
