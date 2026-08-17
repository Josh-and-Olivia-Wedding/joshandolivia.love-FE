# Gallery operator workflow

This project uses a two-step CLI workflow to add named photo/video galleries. Guest uploads remain in `src/media-data.json` and are not migrated.

## Prerequisites

- Node.js and `npm install` (includes `sharp` for ingest)
- `ffmpeg` on PATH (required for video ingest)
- AWS CLI with profile `personal` (required for publish sync)

## 1. Ingest (local staging only)

Scan a folder, build webp thumbnails/compressed images, transcode videos to mp4, and write `.gallery-staging/{slug}/`.

```bash
npm run ingest-gallery -- \
  --folder /path/to/photos \
  --name "Ceremony" \
  --date 2024-01-13
```

Dry-run (no disk writes):

```bash
npm run ingest-gallery -- \
  --folder /path/to/photos \
  --name "Ceremony" \
  --date 2024-01-13 \
  --dry-run
```

### Staging layout

```
.gallery-staging/{slug}/
  thumbnails/*.webp
  compressed/*.webp      # images only
  videos/*.mp4           # transcoded videos
  media.json             # GalleryMediaRecord[]
```

Ingest does **not** upload to S3 or edit `src/galleries.json`. Re-running ingest **overwrites** the staging directory for that slug.

## 2. Inspect staging

Confirm `media.json` and derivative files look correct before publishing.

## 3. Publish (S3 + catalog)

Sync staging to S3, then write catalog JSON and the CRA static media map.

```bash
npm run publish-gallery -- \
  --slug 2024-01-13-ceremony \
  --name "Ceremony" \
  --date 2024-01-13
```

Options:

| Flag | Effect |
|------|--------|
| `--dry-run` | Print plan only; no AWS, no catalog writes |
| `--skip-s3` | Write catalog files without calling AWS |
| `--delete` | Pass `--delete` to `aws s3 sync` (removes S3 keys absent from staging) |

`--skip-s3` and `--delete` cannot be used together.

S3 destination: `s3://sideris-wedding-images/uploads/galleries/{slug}/` (profile `personal`, region `us-east-2`). `media.json` is excluded from sync.

## 4. Commit and rebuild

After a successful publish, commit:

- `src/galleries.json`
- `src/galleries/{slug}.json`
- `src/scripts/gallery-media-files.ts`

Then rebuild and deploy. The gallery appears at `#/gallery/{slug}`.

## Reserved slug

`guest-uploads` is reserved for the legacy guest gallery. Do not use it for new batches.

## Environment variables

| Variable | CLI | Purpose |
|----------|-----|---------|
| `INGEST_FFMPEG_BIN` | ingest | Override ffmpeg executable |
| `INGEST_STAGING_ROOT` | ingest | Override staging root (default `.gallery-staging/`) |
| `PUBLISH_STAGING_ROOT` | publish | Override staging root for publish |
| `PUBLISH_SRC_ROOT` | publish | Override `src/` root (default `./src`) |
| `PUBLISH_AWS_BIN` | publish | Override AWS CLI executable |
