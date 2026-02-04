import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdmin, getCurrentUserId } from "@/lib/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import { getSubscriptionRequests } from "./subscription-requests/actions";

export default async function AdminDashboard() {
  // Check admin access - redirect to login if not admin
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const userId = await getCurrentUserId();
  
  // Get requests (this will also check admin access)
  let requests = [];
  let pendingCount = 0;
  let approvedCount = 0;
  let rejectedCount = 0;
  
  try {
    requests = await getSubscriptionRequests();
    pendingCount = requests.filter((r) => r.status === "pending").length;
    approvedCount = requests.filter((r) => r.status === "approved").length;
    rejectedCount = requests.filter((r) => r.status === "rejected").length;
  } catch (error) {
    // If there's an error, just show zeros
    console.error("Error loading subscription requests:", error);
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage subscription requests and system settings
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">
              Successfully approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">
              Rejected requests
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage subscription requests and view system information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/subscription-requests">
                <Users className="mr-2 h-4 w-4" />
                View All Requests
              </Link>
            </Button>
          </div>
          
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm font-semibold mb-2">Your User ID:</p>
            <code className="text-xs bg-background px-2 py-1 rounded border block w-full break-all">
              {userId || "Not available"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Add this ID to ADMIN_USER_IDS in your .env file to grant admin access
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
