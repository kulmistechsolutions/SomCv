import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApproveRejectButtons from "@/components/admin/ApproveRejectButtons";
import { requireAdmin } from "@/lib/admin";
import { getSubscriptionRequests } from "./actions";
import { formatDate } from "date-fns";
import { redirect } from "next/navigation";

export default async function SubscriptionRequestsPage() {
  // Check admin access - redirect to login if not admin
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const requests = await getSubscriptionRequests();

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Subscription Requests</h1>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-muted-foreground">No subscription requests found.</p>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {request.fullName} - {request.plan.toUpperCase()}
                  </span>
                  <span
                    className={`text-sm font-normal ${
                      request.status === "pending"
                        ? "text-yellow-600"
                        : request.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {request.status.toUpperCase()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Phone Number:</p>
                    <p>{request.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Request ID:</p>
                    <p className="font-mono text-xs">{request.requestId}</p>
                  </div>
                  <div>
                    <p className="font-semibold">User ID:</p>
                    <p className="font-mono text-xs">{request.userId}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Requested At:</p>
                    <p>{formatDate(request.createdAt, "PPp")}</p>
                  </div>
                </div>
                <ApproveRejectButtons
                  requestId={request.requestId}
                  status={request.status}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
