# Database Population Script

This script populates your Supabase database with data from the hardcoded TypeScript files.

## Prerequisites

1. Make sure your Next.js dev server is running:
   ```bash
   npm run dev
   ```

2. Ensure you have the following environment variables set in `.env.local`:
   - `NEXT_PUBLIC_ADMIN_PASSWORD` or `ADMIN_PASSWORD` - Your admin password
   - `NEXT_PUBLIC_SITE_URL` (optional) - Defaults to `http://localhost:3000`

3. Make sure your Supabase database schema is set up (run the SQL from `supabase/schema.sql`)

## Usage

### Populate all data

Run the full population script:

```bash
npm run populate
```

Or directly with tsx:

```bash
npx tsx scripts/populate-database.ts
```

### Populate only skills

If you just need to populate skills:

```bash
npm run populate:skills
```

Or directly with tsx:

```bash
npx tsx scripts/populate-skills-only.ts
```

### Idempotent mode (skip existing entries)

To avoid recreating existing entries, set the `SKIP_EXISTING` environment variable:

```bash
SKIP_EXISTING=true npm run populate
```

This will skip populating sections that already have data.

## What it does

The script will:
1. ✅ Populate profile information
2. ✅ Create all experience entries
3. ✅ Create all education entries
4. ✅ Create all projects
5. ✅ Create all skills
6. ✅ Create all sidequests

**Note:** The script will delete existing entries before creating new ones to avoid duplicates.

## Troubleshooting

- **"Server is not running"**: Start your dev server with `npm run dev` first
- **"Unauthorized"**: Check that your `ADMIN_PASSWORD` environment variable is set correctly
- **"Failed to fetch"**: Make sure the server is running on the correct port (default: 3000)

