"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if running as PWA (iOS)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
      console.log("PWA install prompt available!");
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    // Check if app was just installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
      console.log("PWA installed successfully!");
    });

    // Debug: Check PWA requirements (always show in dev)
    const checkPWARequirements = async () => {
      console.log("🔍 PWA Debug Info:");
      console.log("✅ Service Worker:", "serviceWorker" in navigator ? "Available" : "Not Available");
      console.log("✅ Standalone mode:", window.matchMedia("(display-mode: standalone)").matches ? "Yes (Already Installed)" : "No");
      console.log("✅ Manifest:", document.querySelector('link[rel="manifest"]') ? "Found" : "Missing");
      
      // Check if icons exist
      const icon192 = await fetch("/icon-192x192.png").then(res => res.ok).catch(() => false);
      const icon512 = await fetch("/icon-512x512.png").then(res => res.ok).catch(() => false);
      
      console.log(icon192 ? "✅ Icon 192x192: Found" : "❌ Icon 192x192: Missing (REQUIRED)");
      console.log(icon512 ? "✅ Icon 512x512: Found" : "❌ Icon 512x512: Missing (REQUIRED)");
      
      if (!icon192 || !icon512) {
        console.warn("⚠️ PWA install prompt won't work without PNG icons!");
        console.warn("📝 Solution: Visit /generate-png-icons.html to create PNG icons");
      }
    };
    
    checkPWARequirements();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // Don't show button if already installed or prompt not available
  if (isInstalled || !showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4">
      <Button
        onClick={handleInstallClick}
        size="lg"
        className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:from-green-700 hover:to-green-600 transition-all"
      >
        <Download className="mr-2 h-4 w-4" />
        Install App
      </Button>
    </div>
  );
}
