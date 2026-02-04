import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserId } from "@/lib/admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

export default async function MyUserIdPage() {
  const { userId: clerkUserId } = await auth();
  
  if (!clerkUserId) {
    redirect("/sign-in");
  }

  const userId = await getCurrentUserId();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6" />
            <CardTitle>Your User ID</CardTitle>
          </div>
          <CardDescription>
            Use this ID to grant yourself admin access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-semibold mb-2">Clerk User ID:</p>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-background px-3 py-2 rounded border flex-1 break-all font-mono">
                {userId || "Not available"}
              </code>
              {userId && (
                <CopyButton value={userId} />
              )}
            </div>
          </div>
          
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-semibold">How to become an admin:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Copy your User ID above</li>
              <li>Open your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file</li>
              <li>Add this line: <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USER_IDS=your_user_id_here</code></li>
              <li>If there are multiple admins, separate IDs with commas: <code className="bg-muted px-1 py-0.5 rounded">ADMIN_USER_IDS=user1,user2,user3</code></li>
              <li>Restart your dev server</li>
              <li>Visit <code className="bg-muted px-1 py-0.5 rounded">/admin</code> to access the admin dashboard</li>
            </ol>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Note:</strong> After adding your User ID to <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">ADMIN_USER_IDS</code> in your <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">.env</code> file and restarting the server, you&apos;ll be able to access admin pages.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
