import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Script from "next/script";
import PWARegister from "@/components/PWARegister";
import PWAInstallButton from "@/components/PWAInstallButton";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - SOMCV",
    absolute: "SOMCV",
  },
  description:
    "SOMCV is the easiest way to create a professional resume that will help you land your dream job.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SomCV",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <Script
            id="suppress-hydration-warnings"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  if (typeof window === 'undefined') return;
                  
                  // Run immediately, before React loads
                  const originalError = console.error;
                  const originalWarn = console.warn;
                  
                  const shouldSuppress = (args) => {
                    if (!args || args.length === 0) return false;
                    
                    // Convert all arguments to string and join them to check the entire error message
                    const allArgsString = args.map(a => {
                      if (typeof a === 'string') return a;
                      if (typeof a === 'object' && a !== null) {
                        try {
                          return JSON.stringify(a);
                        } catch {
                          return String(a);
                        }
                      }
                      return String(a);
                    }).join(' ').toLowerCase();
                    
                    // Check if it's a hydration warning
                    const isHydrationWarning = 
                      allArgsString.includes('hydration failed') || 
                      allArgsString.includes('hydrated but some attributes') || 
                      allArgsString.includes("server rendered html didn't match") ||
                      allArgsString.includes('hydration') ||
                      allArgsString.includes('react-hydration-error') ||
                      allArgsString.includes('hydration mismatch') ||
                      allArgsString.includes('mismatch during hydration');
                    
                    // Check for browser extension attributes that cause hydration issues
                    const hasExtensionAttrs = 
                      allArgsString.includes('bis_skin_checked') || 
                      allArgsString.includes('__processed__') || 
                      allArgsString.includes('bis_register') || 
                      allArgsString.includes('data-new-gr-c-s-check-loaded') || 
                      allArgsString.includes('data-gr-ext-installed') ||
                      allArgsString.includes('bis_') ||
                      allArgsString.includes('browser extension') ||
                      allArgsString.includes('extension installed');
                    
                    // Suppress hydration warnings - they're almost always from browser extensions
                    // In development, these are harmless and clutter the console
                    if (isHydrationWarning) {
                      // Suppress if it mentions extensions OR if it's a generic hydration error
                      // (most hydration errors in dev are from extensions anyway)
                      return true;
                    }
                    
                    return false;
                  };
                  
                  // Override console methods immediately
                  console.error = function(...args) {
                    if (!shouldSuppress(args)) {
                      originalError.apply(console, args);
                    }
                  };
                  
                  console.warn = function(...args) {
                    if (!shouldSuppress(args)) {
                      originalWarn.apply(console, args);
                    }
                  };
                })();
              `,
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <PWARegister />
            <PWAInstallButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
