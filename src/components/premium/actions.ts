"use server";

import { env } from "@/env";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { randomBytes } from "crypto";

export async function createSubscriptionRequest(data: {
  fullName: string;
  phoneNumber: string;
  plan: "pro" | "pro_plus";
}) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Generate unique request ID
    const requestId = randomBytes(8).toString("hex").toUpperCase();

    // Create subscription request in database
    await prisma.subscriptionRequest.create({
      data: {
        userId,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        plan: data.plan,
        requestId,
        status: "pending",
      },
    });

    // Create WhatsApp message
    const planName = data.plan === "pro" ? "Pro" : "Pro Plus";
    const message = `Hello! I would like to subscribe to ${planName} plan.

Full Name: ${data.fullName}
Phone Number: ${data.phoneNumber}
Plan: ${planName}
Request ID: ${requestId}

Please approve my subscription request.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const adminWhatsApp = env.ADMIN_WHATSAPP_NUMBER.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`;

    return {
      success: true,
      whatsappUrl,
      requestId,
    };
  } catch (error) {
    console.error("Error creating subscription request:", error);
    return {
      success: false,
      error: "Failed to create subscription request. Please try again.",
    };
  }
}
