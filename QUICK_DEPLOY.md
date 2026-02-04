# 🚀 Quick Deployment Guide - SomCV

## Step 1: Complete Vercel Build ✅
Your build is already in progress. Wait for it to complete.

## Step 2: Set Environment Variables in Vercel

Go to your Vercel project dashboard and add these environment variables:

### Required Server Variables:
```
DATABASE_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
ADMIN_WHATSAPP_NUMBER=252613609678
```

### Optional Server Variables:
```
GOOGLE_AI_API_KEY=your_google_ai_api_key (optional)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token (optional)
ADMIN_USER_IDS=your_user_id_1,your_user_id_2 (optional)
```

### Required Client Variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

**⚠️ Important:** Replace `https://your-app.vercel.app` with your actual Vercel URL after first deployment!

## Step 3: Configure Clerk URLs

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Settings** → **Domains**
4. Add your Vercel URL: `https://your-app.vercel.app`
5. Update **Redirect URLs**:
   - `https://your-app.vercel.app/sign-in`
   - `https://your-app.vercel.app/sign-up`

## Step 4: Verify MongoDB Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **Add IP Address**
3. Add `0.0.0.0/0` to allow all IPs (or Vercel's IP ranges)
4. Verify your `DATABASE_URL` is correct

## Step 5: Test Deployment

After deployment completes:
- [ ] Visit your Vercel URL
- [ ] Test sign-up/sign-in
- [ ] Create a resume
- [ ] Test AI features
- [ ] Test PWA installation

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Clerk Dashboard**: https://dashboard.clerk.com
- **MongoDB Atlas**: https://cloud.mongodb.com
