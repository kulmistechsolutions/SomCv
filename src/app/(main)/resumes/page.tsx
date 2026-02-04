import { canCreateResume } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeDataInclude, ResumeServerData } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";
import ResumeItem from "./ResumeItem";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let resumes: ResumeServerData[] = [];
  let totalCount = 0;
  let subscriptionLevel: Awaited<ReturnType<typeof getUserSubscriptionLevel>> = "free";

  try {
    [resumes, totalCount, subscriptionLevel] = await Promise.all([
      prisma.resume.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: resumeDataInclude,
      }),
      prisma.resume.count({
        where: {
          userId,
        },
      }),
      getUserSubscriptionLevel(userId),
    ]);
  } catch {
    // Database connection failed - app will work with empty resume list
    // getUserSubscriptionLevel has its own error handling and will return "free"
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ MongoDB connection unavailable - showing empty resume list.");
    }
    subscriptionLevel = await getUserSubscriptionLevel(userId);
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResumeButton
        canCreate={canCreateResume(subscriptionLevel, totalCount)}
      />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total: {totalCount}</p>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
