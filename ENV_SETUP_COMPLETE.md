# Environment Variables Setup - Complete Guide

## ✅ MongoDB - CONNECTED!
Your MongoDB connection is working! Collections created:
- `resumes`
- `work_experiences`
- `educations`
- `user_subscriptions`
- `subscription_requests`

## ⚠️ Missing: Clerk Authentication Keys

The app is running but needs Clerk authentication keys. Add these to your `.env` file:

### Required Clerk Variables

```env
# Clerk Secret Key (from Clerk Dashboard)
CLERK_SECRET_KEY=pk_test_... or sk_test_...

# Clerk Publishable Key (from Clerk Dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Clerk Sign In/Up URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### How to Get Clerk Keys:

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com/
2. **Sign in or create account**
3. **Create a new application** (or select existing)
4. **Go to "API Keys"** in the sidebar
5. **Copy the keys**:
   - **Publishable Key**: Starts with `pk_test_` or `pk_live_`
   - **Secret Key**: Starts with `sk_test_` or `sk_live_`

### Complete .env File Template

```env
# MongoDB (✅ Already working!)
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/database?appName=SOMCV

# OpenAI (✅ Already configured!)
OPENAI_API_KEY=your_openai_api_key_here

# Admin WhatsApp (✅ Already configured!)
ADMIN_WHATSAPP_NUMBER=+252613609678

# Clerk Authentication (⚠️ ADD THESE)
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vercel Blob Storage (⚠️ ADD THIS if using photo uploads)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚀 Next Steps

1. **Add Clerk keys** to `.env` file
2. **Restart the dev server** (Ctrl+C, then `npm run dev`)
3. **Test the application**:
   - Sign up/Sign in should work
   - Create resumes
   - Test subscription requests

## 📝 Optional: Vercel Blob

If you want photo uploads to work, you'll also need:
- Vercel Blob token from https://vercel.com/dashboard
- Add `BLOB_READ_WRITE_TOKEN` to `.env`

## ✅ Current Status

- ✅ MongoDB: Connected and working
- ✅ Database Schema: Pushed successfully
- ✅ OpenAI: Configured
- ✅ WhatsApp: Configured
- ⚠️ Clerk: Need to add keys
- ⚠️ Vercel Blob: Optional, add if needed
