import { prisma } from "../utils/prisma";

export type EntityType = "course" | "chapter";
export type CourseStatus = "PENDING" | "LAYOUT_PROCESSING" | "LAYOUT_FAILED" | "LAYOUT_SUCCESS" | "LAYOUT_APPROVED" | "EXTRACTING_CHAPTERS" | "EXTRACTING_CHAPTERS_FAILED" | "EXTRACTING_CHAPTERS_SUCCESS" | "PROCESSING_CHAPTERS" | "PROCESSING_CHAPTERS_FAILED" | "PROCESSING_CHAPTERS_SUCCESS";
export type ChapterStatus = "PENDING" | "PROCESSING_CHAPTER" | "PROCESSING_CHAPTER_FAILED" | "PROCESSING_CHAPTER_SUCCESS";
export interface Task {
  id: string;
  status: string;
}

/**
 * Fetches a pending task from the database.
 * @param entity - The entity to fetch tasks for ("course" or "chapter").
 * @returns The task found or null.
 */
export const fetchTask = async (entity: EntityType, status: CourseStatus | ChapterStatus): Promise<Task | null> => {
  if (entity === "course") {
    return await prisma.course.findFirst({
      where: { status: status as CourseStatus },
      orderBy: { createdAt: "asc" },
      select: { id: true, status: true },
    });
  } else if (entity === "chapter") {
    return await prisma.chapter.findFirst({
      where: { status: status as ChapterStatus },
      orderBy: { createdAt: "asc" },
      select: { id: true, status: true },
    });
  }
  return null;
};
