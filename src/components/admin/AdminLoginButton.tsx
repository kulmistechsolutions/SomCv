"use client";

import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AdminLoginButton() {
  const { isSignedIn } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on client after mount to avoid hydration mismatch
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    async function checkAdminStatus() {
      if (!isSignedIn) {
        return;
      }

      try {
        const response = await fetch("/api/admin/check");
        const data = await response.json();
        setIsAdmin(data.isAdmin || false);
      } catch {
        setIsAdmin(false);
      }
    }

    checkAdminStatus();
  }, [isSignedIn, isMounted]);

  // Always return null during SSR and initial render to avoid hydration mismatch
  if (!isMounted || !isSignedIn || !isAdmin) {
    return null;
  }

  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/admin">
        <Shield className="mr-2 h-4 w-4" />
        Admin
      </Link>
    </Button>
  );
}
