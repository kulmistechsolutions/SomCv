# Fix: Clerk Phone Number Error for Somalia

## Problem
You're still seeing: "Phone numbers from this country (Somalia) are currently not supported."

## Solution: Configure Clerk Dashboard

You **MUST** configure this in the Clerk Dashboard. Code changes alone won't fix it.

### Step-by-Step Instructions:

1. **Go to Clerk Dashboard**
   - Visit: https://dashboard.clerk.com/
   - Sign in to your account

2. **Select Your Application**
   - Click on your application (the one you're using for SOMCV)

3. **Navigate to Authentication Settings**
   - In the left sidebar, click **"User & Authentication"**
   - Then click **"Email, Phone, Username"**

4. **Disable Phone Number Requirement**
   - Find the **"Phone number"** section
   - Change it from **"Required"** to **"Optional"** or **"Off"**
   - If you want email-only, set it to **"Off"**

5. **Save Changes**
   - Click **"Save"** or **"Apply"** button
   - Wait a few seconds for changes to propagate

6. **Test Again**
   - Go back to your app
   - Try signing up again
   - Phone number should now be optional or hidden

## Alternative: Make Phone Optional

If you want to keep phone numbers but make them optional:

1. In Clerk Dashboard → "User & Authentication" → "Email, Phone, Username"
2. Set Phone number to **"Optional"**
3. Users can skip phone verification and use email only

## After Configuration

1. **Clear your browser cache** (optional but recommended)
2. **Restart your dev server**:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```
3. **Try signing up again** - it should work with email only

## Important Notes

- ⚠️ **Code changes alone won't fix this** - you MUST update Clerk Dashboard
- ⚠️ Changes in Clerk Dashboard take a few seconds to apply
- ⚠️ You may need to clear browser cache or use incognito mode to test

## Still Not Working?

If it's still not working after updating Clerk Dashboard:

1. **Wait 1-2 minutes** for changes to propagate
2. **Clear browser cache** or use **incognito/private mode**
3. **Check Clerk Dashboard** to confirm settings were saved
4. **Try a different browser** to rule out browser-specific issues

## Current Code Status

✅ Code is already configured for email-only authentication
✅ Sign-in and Sign-up pages are ready
✅ Just need Clerk Dashboard configuration
