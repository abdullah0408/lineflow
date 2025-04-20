"use server";
import { prisma } from '@/lib/prisma';

export const updateCourseStatus = async (courseId: string) => {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { status: "LAYOUT_APPROVED" },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update course status:", error);
    return { success: false, error: "Database update failed." };
  }
};
