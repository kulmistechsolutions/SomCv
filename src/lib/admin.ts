/**
 * Admin authentication and authorization utilities
 */
import { auth } from "@clerk/nextjs/server";
import { env } from "@/env";

/**
 * Get the list of admin user IDs from environment variable
 */
function getAdminUserIds(): string[] {
  const adminIds = env.ADMIN_USER_IDS;
  if (!adminIds) return [];
  
  // Split by comma and trim whitespace
  return adminIds.split(",").map((id) => id.trim()).filter(Boolean);
}

/**
 * Check if the current user is an admin
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();
  
  if (!userId) return false;
  
  const adminIds = getAdminUserIds();
  return adminIds.includes(userId);
}

/**
 * Get the current user's ID
 * @returns user ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Require admin access - throws error if user is not admin
 * @throws Error if user is not authenticated or not an admin
 */
export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized: Please sign in");
  }
  
  const adminIds = getAdminUserIds();
  
  if (!adminIds.includes(userId)) {
    throw new Error("Forbidden: Admin access required");
  }
  
  return userId;
}
