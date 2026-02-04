import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    try {
      const subscription = await prisma.userSubscription.findUnique({
        where: {
          userId,
        },
      });

      // If no subscription or inactive, return free
      if (!subscription || subscription.status !== "active") {
        return "free";
      }

      // Check if subscription has expired (if expiresAt is set)
      if (subscription.expiresAt && subscription.expiresAt < new Date()) {
        return "free";
      }

      // Return the plan from subscription
      if (subscription.plan === "pro") {
        return "pro";
      }

      if (subscription.plan === "pro_plus") {
        return "pro_plus";
      }

      // Default to free
      return "free";
    } catch (error) {
      // If database connection fails, default to free tier
      // This prevents the app from crashing when MongoDB is unavailable
      // Only log once to reduce console noise
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ MongoDB connection unavailable - using free tier. Fix connection to restore full functionality.");
      }
      return "free";
    }
  },
);
