# Fix: Missing Environment Variables

## Error
```
Invalid environment variables: {
  BLOB_READ_WRITE_TOKEN: [ 'Required' ],
  NEXT_PUBLIC_BASE_URL: [ 'Required' ]
}
```

## Solution

### Option 1: Add Placeholder Values (Quick Fix)

Open your `.env` file and ensure these lines exist with values:

```env
# Vercel Blob Storage (optional - only needed for photo uploads)
BLOB_READ_WRITE_TOKEN=

# Base URL (required)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Note:** `BLOB_READ_WRITE_TOKEN` can be empty if you don't need photo uploads. The app will work without it, but photo uploads won't function.

### Option 2: Get Vercel Blob Token (For Photo Uploads)

If you want photo uploads to work:

1. Go to https://vercel.com/dashboard
2. Navigate to your project (or create one)
3. Go to **Settings** → **Storage** → **Blob**
4. Create a new Blob store or use existing one
5. Copy the **Read/Write Token**
6. Add it to `.env`:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
   ```

## What I Changed

1. ✅ Made `BLOB_READ_WRITE_TOKEN` optional in `src/env.ts`
2. ✅ Added checks in code to handle missing blob token gracefully
3. ✅ Updated photo upload code to show helpful error if token is missing

## After Fixing

1. **Restart your dev server**:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

2. **Test the app** - it should work now!

## Current Status

- ✅ `BLOB_READ_WRITE_TOKEN`: Now optional (can be empty)
- ⚠️ `NEXT_PUBLIC_BASE_URL`: Must be set to `http://localhost:3000`

## Quick Fix Command

Just add this line to your `.env` file:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

And ensure `BLOB_READ_WRITE_TOKEN=` exists (can be empty).
