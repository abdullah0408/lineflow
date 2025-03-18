import { prisma } from "../utils/prisma";

/**
 * Function to process course task.
 * @param id - Course task ID
 * @param status - Current status of the task
 */
export const processCourseTask = async (id: string, status: string): Promise<void> => {
  console.log(`🎓 Processing course task: ${id} with status ${status}`);
  // Implement your course task processing logic here
  await prisma.course.update({
    where: { id },
    data: { status: "LAYOUT_SUCCESS" },
  });
  console.log(`✅ Course task ${id} completed.`);
};

/**
 * Function to process chapter task.
 * @param id - Chapter task ID
 * @param status - Current status of the task
 */
export const processChapterTask = async (
  id: string,
  status: string
): Promise<void> => {
  console.log(`📖 Processing chapter task: ${id} with status ${status}`);
  // Implement your chapter task processing logic here
  await prisma.chapter.update({
    where: { id },
    data: { status: "PROCESSING_CHAPTER_SUCCESS" },
  });
  console.log(`✅ Chapter task ${id} completed.`);
};