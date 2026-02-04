"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function approveSubscriptionRequest(requestId: string) {
  // Require admin access
  await requireAdmin();

  const request = await prisma.subscriptionRequest.findUnique({
    where: { requestId },
  });

  if (!request) {
    throw new Error("Subscription request not found");
  }

  if (request.status !== "pending") {
    throw new Error(`Request is already ${request.status}. Cannot approve a request that is not pending.`);
  }

  // Update request status
  await prisma.subscriptionRequest.update({
    where: { requestId },
    data: { status: "approved" },
  });

  // Create or update user subscription
  await prisma.userSubscription.upsert({
    where: { userId: request.userId },
    create: {
      userId: request.userId,
      plan: request.plan,
      status: "active",
    },
    update: {
      plan: request.plan,
      status: "active",
    },
  });

  return { success: true };
}

export async function rejectSubscriptionRequest(requestId: string) {
  // Require admin access
  await requireAdmin();

  const request = await prisma.subscriptionRequest.findUnique({
    where: { requestId },
  });

  if (!request) {
    throw new Error("Subscription request not found");
  }

  if (request.status !== "pending") {
    throw new Error(`Request is already ${request.status}. Cannot reject a request that is not pending.`);
  }

  // Update request status
  await prisma.subscriptionRequest.update({
    where: { requestId },
    data: { status: "rejected" },
  });

  return { success: true };
}

export async function getSubscriptionRequests() {
  // Require admin access
  await requireAdmin();

  const requests = await prisma.subscriptionRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100, // Limit to recent 100 requests
  });

  return requests;
}
