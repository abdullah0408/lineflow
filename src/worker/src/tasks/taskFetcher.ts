import { prisma } from "../utils/prisma";

export type EntityType = "course" | "chapter";

export interface Task {
  id: string;
  status: string;
}

/**
 * Fetches a pending task from the database.
 * @param entity - The entity to fetch tasks for ("course" or "chapter").
 * @returns The task found or null.
 */
export const fetchTask = async (entity: EntityType): Promise<Task | null> => {
  if (entity === "course") {
    return await prisma.course.findFirst({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      select: { id: true, status: true },
    });
  } else if (entity === "chapter") {
    return await prisma.chapter.findFirst({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      select: { id: true, status: true },
    });
  }
  return null;
};