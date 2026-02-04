"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("Service Worker registered:", registration);
          
          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log("New service worker available");
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }

    // Check if PWA is installable
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.matchMedia("(display-mode: standalone)").matches === false
    ) {
      // Check if manifest is accessible
      fetch("/manifest.json")
        .then((res) => {
          if (res.ok) {
            console.log("✅ PWA manifest is accessible");
          } else {
            console.warn("⚠️ PWA manifest not accessible:", res.status);
          }
        })
        .catch((err) => {
          console.warn("PWA manifest check failed:", err);
        });
    }
  }, []);

  return null;
}
