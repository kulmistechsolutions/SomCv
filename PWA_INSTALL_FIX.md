# PWA Install Prompt Fix

## What I've Added

1. **PWA Install Button Component** (`src/components/PWAInstallButton.tsx`)
   - Shows a floating "Install App" button when the browser detects the app is installable
   - Handles the `beforeinstallprompt` event
   - Only shows when the app can be installed

2. **Improved Service Worker**
   - Added icon caching
   - Better error handling

3. **Placeholder Icons Created**
   - SVG placeholder icons created (temporary)
   - **IMPORTANT:** You need PNG icons for PWA to work properly

## Why Install Prompt Might Not Show

The install prompt requires ALL of these:

1. ✅ **Manifest.json** - Created
2. ✅ **Service Worker** - Registered
3. ✅ **HTTPS** - Required (localhost works for testing)
4. ❌ **Icons** - **MISSING** (This is the main issue!)

## Fix: Generate PNG Icons

### Quick Fix - Use Online Tool:

1. **Go to:** https://realfavicongenerator.net/
2. **Upload:** `src/assets/logo.png`
3. **Configure:**
   - App name: SomCV
   - Theme color: #16a34a
4. **Generate** and download
5. **Extract PNG files** to `public/` directory:
   - `icon-72x72.png`
   - `icon-96x96.png`
   - `icon-128x128.png`
   - `icon-144x144.png`
   - `icon-152x152.png`
   - `icon-192x192.png` ⚠️ **REQUIRED**
   - `icon-384x384.png`
   - `icon-512x512.png` ⚠️ **REQUIRED**

### After Adding Icons:

1. **Clear browser cache**
2. **Reload the page**
3. **The install button should appear** in the bottom-right corner
4. **Or the browser's native install prompt** will appear

## Testing

1. **Open Chrome DevTools** (F12)
2. **Go to Application tab**
3. **Check:**
   - Manifest: Should show your manifest
   - Service Workers: Should show registered
   - Icons: Should show all icons loaded

## Current Status

- ✅ Install button component created
- ✅ Service worker registered
- ✅ Manifest configured
- ⚠️ Icons missing (SVG placeholders created, but need PNG)

## Next Steps

1. Generate PNG icons using the online tool
2. Place them in `public/` directory
3. Restart dev server
4. Test install prompt

The install button will automatically appear when:
- All PWA requirements are met
- Browser detects the app is installable
- User hasn't already installed the app
