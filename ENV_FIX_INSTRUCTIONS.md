# Fix Environment Variables - Manual Instructions

## Error
```
Invalid environment variables: {
  BLOB_READ_WRITE_TOKEN: [ 'Required' ],
  NEXT_PUBLIC_BASE_URL: [ 'Required' ]
}
```

## Quick Fix

Open your `.env` file and make sure these two lines exist with proper values:

### Required Fix:

1. **Find or add this line:**
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

2. **Find or add this line (can be empty):**
   ```
   BLOB_READ_WRITE_TOKEN=
   ```

### Complete .env File Should Look Like:

```env
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database?appName=SOMCV
OPENAI_API_KEY=your_openai_api_key_here
ADMIN_WHATSAPP_NUMBER=+1234567890

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vercel Blob Storage (optional - for photo uploads)
BLOB_READ_WRITE_TOKEN=

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Important Notes

- `BLOB_READ_WRITE_TOKEN` can be **empty** (just `=`) - photo uploads won't work but the app will run
- `NEXT_PUBLIC_BASE_URL` **must have a value** - set it to `http://localhost:3000`
- Make sure there are **no extra spaces** around the `=` sign
- Make sure there are **no quotes** around the values

## After Fixing

1. **Save the `.env` file**
2. **Restart your dev server**:
   - Press `Ctrl+C` to stop
   - Run `npm run dev` again

The error should be resolved!
