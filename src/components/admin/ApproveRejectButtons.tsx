"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { approveSubscriptionRequest, rejectSubscriptionRequest } from "@/app/(main)/admin/subscription-requests/actions";
import { useRouter } from "next/navigation";

interface ApproveRejectButtonsProps {
  requestId: string;
  status: string;
}

export default function ApproveRejectButtons({ requestId, status }: ApproveRejectButtonsProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  // Don't show buttons if request is not pending
  if (status !== "pending") {
    return null;
  }

  const handleApprove = async () => {
    try {
      setIsApproving(true);
      await approveSubscriptionRequest(requestId);
      
      toast({
        title: "Success",
        description: "Subscription request approved successfully!",
        variant: "default",
      });
      
      // Refresh the page to show updated status
      router.refresh();
    } catch (error) {
      console.error("Error approving request:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to approve request. It may have already been processed.",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsRejecting(true);
      await rejectSubscriptionRequest(requestId);
      
      toast({
        title: "Success",
        description: "Subscription request rejected.",
        variant: "default",
      });
      
      // Refresh the page to show updated status
      router.refresh();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reject request. It may have already been processed.",
        variant: "destructive",
      });
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
      >
        {isApproving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Approving...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Approve
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={handleReject}
        disabled={isApproving || isRejecting}
      >
        {isRejecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Rejecting...
          </>
        ) : (
          <>
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </>
        )}
      </Button>
    </div>
  );
}
