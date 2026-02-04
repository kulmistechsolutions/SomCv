# Fix: Clerk Phone Number Support for Somalia

## Problem
Clerk doesn't support phone verification for Somalia (+252). Users see an error: "Phone numbers from this country (Somalia) are currently not supported."

## Solution
Configure Clerk to use **email-only authentication** instead of phone numbers.

## What I Changed

### 1. Updated Sign-Up Page
- Added configuration to use email-only authentication
- Set proper routing and redirect URLs

### 2. Updated Sign-In Page
- Added configuration to use email-only authentication
- Set proper routing and redirect URLs

## Additional Configuration Needed

You also need to configure this in your **Clerk Dashboard**:

### Steps in Clerk Dashboard:

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com/
2. **Select your application**
3. **Go to "User & Authentication"** → **"Email, Phone, Username"**
4. **Disable Phone Number**:
   - Turn OFF "Phone number" as a required field
   - Keep "Email address" enabled
   - Optionally enable "Username" if you want
5. **Save changes**

### Alternative: Allow Phone but Make it Optional

If you want to keep phone numbers but make them optional:

1. In Clerk Dashboard → "User & Authentication" → "Email, Phone, Username"
2. Set Phone number to **"Optional"** instead of "Required"
3. Users can skip phone verification and use email only

## Current Configuration

The code now:
- ✅ Uses email-only authentication
- ✅ Properly routes to sign-in/sign-up pages
- ✅ Redirects to `/resumes` after authentication

## Test

1. **Restart your dev server** (if running)
2. **Try signing up** with email only
3. **Phone number field should be optional or hidden**

## Note

If you still see phone number fields, you need to update the Clerk Dashboard settings as described above. The code changes I made will work once the Dashboard is configured.
