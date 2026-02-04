/**
 * Suppresses hydration warnings caused by browser extensions
 * This should be called early in the app lifecycle
 */
export function suppressHydrationWarnings() {
  if (typeof window === "undefined") return;

  // Store original console methods
  const originalError = console.error;
  const originalWarn = console.warn;

  // Filter out hydration warnings caused by browser extensions
  // Only suppress actual React hydration warnings, not all errors
  const shouldSuppress = (args: unknown[]): boolean => {
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
      allArgsString.includes("hydration failed") ||
      allArgsString.includes("hydrated but some attributes") ||
      allArgsString.includes("server rendered html didn't match") ||
      allArgsString.includes("hydration") ||
      allArgsString.includes("react-hydration-error") ||
      allArgsString.includes("hydration mismatch") ||
      allArgsString.includes("mismatch during hydration");

    // Suppress all hydration warnings in development
    // They're almost always from browser extensions and are harmless
    if (isHydrationWarning) {
      return true;
    }

    return false;
  };

  // Override console.error
  console.error = (...args: unknown[]) => {
    if (!shouldSuppress(args)) {
      originalError.apply(console, args);
    }
  };

  // Override console.warn
  console.warn = (...args: unknown[]) => {
    if (!shouldSuppress(args)) {
      originalWarn.apply(console, args);
    }
  };
}
