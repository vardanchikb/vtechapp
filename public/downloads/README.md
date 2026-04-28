# VTech App Download Files

Put release files in these folders before building/deploying the site.

## Current Windows Apps

- `windows/folder-size-explorer/`
- `windows/permission-preserving-file-copier/`
- `windows/windows-file-server-permission-auditor/`

## Suggested Files Per Release

For each app release, include:

- Installer or portable archive, for example `folder-size-explorer-1.0.0-windows-x64.zip`
- `checksums.txt`
- Optional `release-notes.txt`

After adding files, update `src/data/apps.json`:

- `downloadUrl`
- `status`
- `currentVersion`
- `releaseDate`
- `changelog`

Example public URL:

`/downloads/windows/folder-size-explorer/folder-size-explorer-1.0.0-windows-x64.zip`
