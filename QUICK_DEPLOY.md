# Quick Deployment Steps

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

## Step 2: Login to Vercel
```bash
vercel login
```
This will open your browser to authenticate.

## Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time)
- Project name? **somcv** (or press Enter for default)
- Directory? **./** (press Enter)
- Override settings? **No** (press Enter)

## Step 4: Add Environment Variables

After first deployment, add your environment variables:

```bash
# Required Server Variables
vercel env add DATABASE_URL
vercel env add CLERK_SECRET_KEY
vercel env add OPENAI_API_KEY
vercel env add ADMIN_WHATSAPP_NUMBER

# Optional Server Variables
vercel env add GOOGLE_AI_API_KEY
vercel env add BLOB_READ_WRITE_TOKEN
vercel env add ADMIN_USER_IDS

# Required Client Variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL
vercel env add NEXT_PUBLIC_BASE_URL
```

For each variable, paste the value from your `.env` file.

**Important:** For `NEXT_PUBLIC_BASE_URL`, wait until after first deployment, then use your Vercel URL:
```
https://your-app-name.vercel.app
```

## Step 5: Deploy to Production
```bash
vercel --prod
```

## Step 6: Update Clerk URLs

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to your application
3. Update these URLs to your Vercel URL:
   - Frontend API: `https://your-app.vercel.app`
   - Allowed Origins: `https://your-app.vercel.app`
   - Redirect URLs: 
     - `https://your-app.vercel.app/sign-in`
     - `https://your-app.vercel.app/sign-up`

## Step 7: Update NEXT_PUBLIC_BASE_URL

After you know your Vercel URL:
```bash
vercel env add NEXT_PUBLIC_BASE_URL production
# Enter: https://your-actual-url.vercel.app
```

Then redeploy:
```bash
vercel --prod
```

## That's it! 🎉

Your app should now be live at: `https://your-app.vercel.app`

## Troubleshooting

**Build fails?**
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Make sure DATABASE_URL is accessible from internet

**Database connection error?**
- Check MongoDB IP whitelist (allow `0.0.0.0/0`)
- Verify DATABASE_URL is correct

**Clerk authentication not working?**
- Update Clerk dashboard URLs
- Verify NEXT_PUBLIC_BASE_URL matches your Vercel URL
