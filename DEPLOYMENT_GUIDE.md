# Deployment Guide for SomCV

This guide will help you deploy your SomCV application to Vercel (recommended) or other platforms.

## Prerequisites

- ✅ Build is successful (`npm run build` works)
- ✅ All environment variables are configured
- ✅ Database is set up and accessible
- ✅ Git repository initialized (optional but recommended)

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest platform for Next.js applications and is made by the Next.js creators.

### Step 1: Prepare Your Code

1. **Make sure your code is committed to Git:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   ```

2. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Method A: Using Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "Add New Project"**
4. **Import your Git repository**
5. **Configure the project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

6. **Add Environment Variables:**
   Click "Environment Variables" and add all variables from your `.env` file:

   **Server-side variables:**
   ```
   DATABASE_URL=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key (optional)
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token (optional)
   ADMIN_WHATSAPP_NUMBER=252613609678
   ADMIN_USER_IDS=your_user_id_1,your_user_id_2 (optional)
   ```

   **Client-side variables (NEXT_PUBLIC_*):**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
   ```

7. **Click "Deploy"**
8. **Wait for deployment to complete** (usually 2-5 minutes)

#### Method B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **somcv** (or your choice)
   - Directory? **./**
   - Override settings? **No**

5. **Add environment variables:**
   ```bash
   vercel env add DATABASE_URL
   vercel env add CLERK_SECRET_KEY
   vercel env add OPENAI_API_KEY
   # ... add all other variables
   ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Step 3: Configure Database

1. **Ensure your MongoDB database is accessible from the internet**
2. **Update DATABASE_URL** in Vercel environment variables if needed
3. **Run Prisma migrations** (if needed):
   ```bash
   npx prisma migrate deploy
   ```
   Or use Vercel's build command to auto-generate Prisma Client:
   - The `postinstall` script in `package.json` already runs `prisma generate`

### Step 4: Update Clerk URLs

1. **Go to [Clerk Dashboard](https://dashboard.clerk.com)**
2. **Navigate to your application**
3. **Update URLs:**
   - **Frontend API**: `https://your-app.vercel.app`
   - **Allowed Origins**: `https://your-app.vercel.app`
   - **Redirect URLs**: 
     - `https://your-app.vercel.app/sign-in`
     - `https://your-app.vercel.app/sign-up`

### Step 5: Update Environment Variables

After deployment, update `NEXT_PUBLIC_BASE_URL` in Vercel:
```
NEXT_PUBLIC_BASE_URL=https://your-actual-vercel-url.vercel.app
```

Then redeploy or the app will auto-redeploy on the next push.

## Option 2: Deploy to Other Platforms

### Railway

1. **Go to [railway.app](https://railway.app)**
2. **Create new project from GitHub**
3. **Add environment variables**
4. **Deploy**

### Render

1. **Go to [render.com](https://render.com)**
2. **Create new Web Service**
3. **Connect your Git repository**
4. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add environment variables**
6. **Deploy**

### Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Import from Git**
3. **Configure build:**
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Add environment variables**
5. **Deploy**

## Post-Deployment Checklist

- [ ] Test the deployed application
- [ ] Verify authentication works (Clerk)
- [ ] Test database connections
- [ ] Test AI features (OpenAI/Google AI)
- [ ] Test photo uploads (if BLOB_READ_WRITE_TOKEN is set)
- [ ] Verify PWA installation works
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Configure SSL (automatic on Vercel)

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Verify all environment variables** are set
3. **Check Node.js version** (should be 18+)
4. **Run `npm run build` locally** to see errors

### Database Connection Issues

1. **Verify DATABASE_URL** is correct
2. **Check MongoDB IP whitelist** (allow all IPs: `0.0.0.0/0`)
3. **Verify database credentials**

### Environment Variables Not Working

1. **Redeploy** after adding new variables
2. **Check variable names** (case-sensitive)
3. **Verify NEXT_PUBLIC_* variables** are in client section

### PWA Not Working

1. **Generate and upload icon files** to `public/` directory
2. **Verify manifest.json** is accessible
3. **Check service worker** registration

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

## Environment Variables Reference

Copy these to your deployment platform:

### Required Server Variables:
- `DATABASE_URL`
- `CLERK_SECRET_KEY`
- `OPENAI_API_KEY`
- `ADMIN_WHATSAPP_NUMBER`

### Optional Server Variables:
- `GOOGLE_AI_API_KEY` (for fallback AI)
- `BLOB_READ_WRITE_TOKEN` (for photo uploads)
- `ADMIN_USER_IDS` (comma-separated Clerk user IDs)

### Required Client Variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_BASE_URL`

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Ensure database is accessible from the internet
