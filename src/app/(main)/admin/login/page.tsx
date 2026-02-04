import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { getCurrentUserId, isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, LogIn, User, XCircle } from "lucide-react";

export default async function AdminLoginPage() {
  const { userId: clerkUserId } = await auth();
  const userId = await getCurrentUserId();
  const adminStatus = await isAdmin();

  // If not signed in, show sign-in prompt
  if (!clerkUserId) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <CardTitle>Admin Login</CardTitle>
            </div>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground mb-4">
                You need to sign in with Clerk to access admin features.
              </p>
              <Button asChild className="w-full">
                <Link href="/sign-in?redirect_url=/admin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  // If signed in but not admin, show setup instructions
  if (!adminStatus) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <CardTitle>Admin Access Required</CardTitle>
            </div>
            <CardDescription>
              Your account is not configured as an admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 p-4 rounded-lg border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <XCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-900 dark:text-red-100">
                <strong>Access Denied:</strong> Your user ID is not in the admin list.
              </p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4 space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Your User ID:
                </p>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-background px-3 py-2 rounded border flex-1 break-all font-mono">
                    {userId || "Not available"}
                  </code>
                  {userId && <CopyButton value={userId} />}
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-2 bg-background">
                <p className="text-sm font-semibold">How to get admin access:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Copy your User ID above</li>
                  <li>Open your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file in the project root</li>
                  <li>Add or update this line: <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USER_IDS=your_user_id_here</code></li>
                  <li>If there are multiple admins, separate IDs with commas: <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USER_IDS=user1,user2,user3</code></li>
                  <li>Save the <code className="bg-muted px-1 py-0.5 rounded">.env</code> file</li>
                  <li>Restart your dev server (stop with Ctrl+C, then run <code className="bg-muted px-1 py-0.5 rounded">npm run dev</code> again)</li>
                  <li>Refresh this page</li>
                </ol>
              </div>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Note:</strong> After adding your User ID to <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">ADMIN_USER_IDS</code> in your <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">.env</code> file and restarting the server, you&apos;ll be able to access admin pages.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">Go Home</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/resumes">My Resumes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  // If admin, redirect to dashboard
  redirect("/admin");
}
