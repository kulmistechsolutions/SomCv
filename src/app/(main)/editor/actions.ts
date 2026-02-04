"use server";

import { env } from "@/env";
import { canCreateResume, canUseCustomizations } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;

  console.log("received values", values);

  const { photo, workExperiences, educations, languages, references, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level",
      );
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== existingResume?.colorHex);

  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error("Customizations not allowed for this subscription level");
  }

  let newPhotoUrl: string | undefined | null = undefined;
  let photoUploadWarning: string | undefined = undefined;

  if (photo instanceof File) {
    if (!env.BLOB_READ_WRITE_TOKEN) {
      // Photo upload is not configured - skip photo upload but allow resume to save
      photoUploadWarning = "Photo upload is not configured. Your resume was saved without the photo. To enable photo uploads, add BLOB_READ_WRITE_TOKEN to your environment variables.";
      // Keep existing photo URL if available, otherwise set to undefined
      newPhotoUrl = existingResume?.photoUrl ?? undefined;
    } else {
      if (existingResume?.photoUrl) {
        await del(existingResume.photoUrl);
      }

      const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
        access: "public",
      });

      newPhotoUrl = blob.url;
    }
  } else if (photo === null) {
    if (existingResume?.photoUrl && env.BLOB_READ_WRITE_TOKEN) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  const resume = id
    ? await prisma.resume.update({
        where: { id },
        data: {
          ...resumeValues,
          photoUrl: newPhotoUrl,
          workExperiences: {
            deleteMany: {},
            create: workExperiences?.map((exp) => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : undefined,
              endDate: exp.endDate ? new Date(exp.endDate) : undefined,
            })),
          },
          educations: {
            deleteMany: {},
            create: educations?.map((edu) => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate) : undefined,
              endDate: edu.endDate ? new Date(edu.endDate) : undefined,
            })),
          },
          languages: {
            deleteMany: {},
            create: languages?.map((lang) => ({
              name: lang.name,
              level: lang.level,
            })) || [],
          },
          references: {
            deleteMany: {},
            create: references?.map((ref) => ({
              name: ref.name,
              jobTitle: ref.jobTitle,
              company: ref.company,
              phone: ref.phone,
              email: ref.email,
              relationship: ref.relationship,
            })) || [],
          },
          updatedAt: new Date(),
        },
      })
    : await prisma.resume.create({
        data: {
          ...resumeValues,
          userId,
          photoUrl: newPhotoUrl,
          workExperiences: {
            create: workExperiences?.map((exp) => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate) : undefined,
              endDate: exp.endDate ? new Date(exp.endDate) : undefined,
            })),
          },
          educations: {
            create: educations?.map((edu) => ({
              ...edu,
              startDate: edu.startDate ? new Date(edu.startDate) : undefined,
              endDate: edu.endDate ? new Date(edu.endDate) : undefined,
            })),
          },
          languages: {
            create: languages?.map((lang) => ({
              name: lang.name,
              level: lang.level,
            })) || [],
          },
          references: {
            create: references?.map((ref) => ({
              name: ref.name,
              jobTitle: ref.jobTitle,
              company: ref.company,
              phone: ref.phone,
              email: ref.email,
              relationship: ref.relationship,
            })) || [],
          },
        },
      });

  // Return resume with optional warning
  return {
    ...resume,
    photoUploadWarning,
  };
}
