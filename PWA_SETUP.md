# PWA Setup Guide for SomCV

## Overview
SomCV is now configured as a Progressive Web App (PWA), making it installable on mobile devices and desktop browsers.

## What's Included

### 1. Manifest File (`public/manifest.json`)
- Defines app name, icons, theme colors, and display mode
- Enables "Add to Home Screen" functionality

### 2. Service Worker (`public/sw.js`)
- Enables offline functionality
- Caches static assets for faster loading
- Provides basic offline support

### 3. PWA Registration Component (`src/components/PWARegister.tsx`)
- Automatically registers the service worker
- Handles service worker updates

## Required Icons

You need to generate the following icon sizes and place them in the `public/` directory:

- `icon-72x72.png` (72x72 pixels)
- `icon-96x96.png` (96x96 pixels)
- `icon-128x128.png` (128x128 pixels)
- `icon-144x144.png` (144x144 pixels)
- `icon-152x152.png` (152x152 pixels)
- `icon-192x192.png` (192x192 pixels) - **Required**
- `icon-384x384.png` (384x384 pixels)
- `icon-512x512.png` (512x512 pixels) - **Required**

## How to Generate Icons

### Option 1: Online Tool (Easiest)
1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo (`src/assets/logo.png`)
3. Configure settings:
   - App name: SomCV
   - Theme color: #16a34a (green)
4. Generate and download
5. Extract icons to `public/` directory

### Option 2: Using ImageMagick
If you have ImageMagick installed:

```bash
# Install ImageMagick first (if not installed)
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generate all icon sizes
convert src/assets/logo.png -resize 512x512 -background white -gravity center -extent 512x512 public/icon-512x512.png
convert src/assets/logo.png -resize 384x384 -background white -gravity center -extent 384x384 public/icon-384x384.png
convert src/assets/logo.png -resize 192x192 -background white -gravity center -extent 192x192 public/icon-192x192.png
convert src/assets/logo.png -resize 152x152 -background white -gravity center -extent 152x152 public/icon-152x152.png
convert src/assets/logo.png -resize 144x144 -background white -gravity center -extent 144x144 public/icon-144x144.png
convert src/assets/logo.png -resize 128x128 -background white -gravity center -extent 128x128 public/icon-128x128.png
convert src/assets/logo.png -resize 96x96 -background white -gravity center -extent 96x96 public/icon-96x96.png
convert src/assets/logo.png -resize 72x72 -background white -gravity center -extent 72x72 public/icon-72x72.png
```

### Option 3: Using Node.js with Sharp
```bash
npm install sharp --save-dev
```

Then create a script:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  sharp('src/assets/logo.png')
    .resize(size, size, { 
      fit: 'contain', 
      background: { r: 255, g: 255, b: 255, alpha: 1 } 
    })
    .toFile(`public/icon-${size}x${size}.png`)
    .then(() => console.log(`Generated icon-${size}x${size}.png`))
    .catch(err => console.error(`Error generating ${size}x${size}:`, err));
});
```

### Option 4: Use the HTML Generator
1. Open `public/generate-icons.html` in a browser
2. Upload your logo
3. Click "Generate Icons"
4. Download each generated icon

## Testing PWA Installation

### Desktop (Chrome/Edge)
1. Open the app in Chrome or Edge
2. Look for the install icon in the address bar
3. Click to install
4. The app will open in its own window

### Mobile (Android)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. The app icon will appear on your home screen

### Mobile (iOS/Safari)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app icon will appear on your home screen

## PWA Features

✅ **Installable** - Users can install the app on their devices
✅ **Offline Support** - Basic offline functionality via service worker
✅ **App-like Experience** - Standalone display mode
✅ **Fast Loading** - Cached assets for faster performance
✅ **Theme Color** - Green (#16a34a) theme matching brand

## Troubleshooting

### Icons not showing
- Ensure all icon files are in the `public/` directory
- Check that file names match exactly (case-sensitive)
- Verify icons are valid PNG files

### Service Worker not registering
- Check browser console for errors
- Ensure you're using HTTPS (or localhost for development)
- Verify `public/sw.js` exists and is accessible

### Install prompt not appearing
- Ensure manifest.json is valid
- Check that required icons (192x192 and 512x512) exist
- Verify service worker is registered
- App must be served over HTTPS (except localhost)

## Next Steps

1. Generate and add all required icons
2. Test installation on different devices
3. Customize manifest.json if needed
4. Enhance service worker for better offline support (optional)

## Additional Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Next.js PWA Guide](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
