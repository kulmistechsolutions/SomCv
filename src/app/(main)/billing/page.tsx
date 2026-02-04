import { getUserSubscriptionLevel } from "@/lib/subscription";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import GetSubscriptionButton from "./GetSubscriptionButton";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let subscription = null;
  try {
    subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });
  } catch (error) {
    // Database connection failed - continue with null subscription
    // getUserSubscriptionLevel will handle the error and return "free"
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ MongoDB connection unavailable - billing page using free tier.");
    }
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  const planName =
    subscriptionLevel === "pro"
      ? "Pro"
      : subscriptionLevel === "pro_plus"
        ? "Pro Plus"
        : "Free";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan: <span className="font-bold">{planName}</span>
      </p>
      {subscription && subscription.status === "active" ? (
        <p className="text-sm text-muted-foreground">
          Your subscription is active. Contact support if you need to make
          changes.
        </p>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
