import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserId, isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CopyButton } from "@/components/ui/copy-button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default async function AdminDebugPage() {
  const { userId: clerkUserId } = await auth();
  const userId = await getCurrentUserId();
  const adminStatus = await isAdmin();

  if (!clerkUserId) {
    redirect("/sign-in?redirect_url=/admin/debug");
  }

  // Get admin IDs from env (for debugging)
  const adminIds = process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [];

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Admin Login Debug Info
          </CardTitle>
          <CardDescription>
            Diagnostic information to help fix admin login issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Authentication Status */}
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              {clerkUserId ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Signed In
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  Not Signed In
                </>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              Clerk User ID: <code className="bg-muted px-1 py-0.5 rounded">{clerkUserId || "None"}</code>
            </p>
          </div>

          {/* Your User ID */}
          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <h3 className="font-semibold">Your Clerk User ID:</h3>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-background px-3 py-2 rounded border flex-1 break-all font-mono">
                {userId || "Not available"}
              </code>
              {userId && <CopyButton value={userId} />}
            </div>
            <p className="text-xs text-muted-foreground">
              Copy this ID and add it to ADMIN_USER_IDS in your .env file
            </p>
          </div>

          {/* Admin Status */}
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              {adminStatus ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Admin Access: GRANTED
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  Admin Access: DENIED
                </>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              {adminStatus
                ? "You have admin access! You can access admin pages."
                : "Your User ID is not in the admin list. Add it to ADMIN_USER_IDS in .env"}
            </p>
          </div>

          {/* Admin IDs from .env */}
          <div className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">Admin User IDs from .env:</h3>
            {adminIds.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No admin IDs found. Add ADMIN_USER_IDS to your .env file.
              </p>
            ) : (
              <div className="space-y-1">
                {adminIds.map((id, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded border ${
                      id === userId
                        ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                        : "bg-muted"
                    }`}
                  >
                    <code className="text-xs font-mono">
                      {id}
                      {id === userId && (
                        <span className="ml-2 text-green-600 font-semibold">← This is you!</span>
                      )}
                    </code>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comparison */}
          {userId && adminIds.length > 0 && !adminStatus && (
            <div className="rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 p-4">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                Why Access is Denied:
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-yellow-900 dark:text-yellow-100">
                  Your User ID: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 py-0.5 rounded">{userId}</code>
                </p>
                <p className="text-yellow-900 dark:text-yellow-100">
                  Admin IDs in .env: {adminIds.map((id) => `"${id}"`).join(", ")}
                </p>
                <p className="text-yellow-900 dark:text-yellow-100 font-semibold mt-2">
                  They don&apos;t match! Make sure your User ID is exactly the same in the .env file.
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="rounded-lg border p-4 space-y-2 bg-background">
            <h3 className="font-semibold">How to Fix:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Copy your User ID from above</li>
              <li>Open your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file</li>
              <li>Find the line: <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USER_IDS=...</code></li>
              <li>Replace it with: <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USER_IDS={userId || "your_user_id"}</code></li>
              <li>Save the file</li>
              <li><strong>Restart your dev server</strong> (Ctrl+C, then npm run dev)</li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
