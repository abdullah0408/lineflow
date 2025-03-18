import { prisma } from "../utils/prisma";
import processCourse from "../processes/processCourse"
/**
 * Function to process course task.
 * @param id - Course task ID
 * @param status - Current status of the task
 */
export const processCourseTask = async (id: string, status: string): Promise<void> => {
  console.log(`🎓 Processing course task: ${id} with status ${status}`);
  // Implement your course task processing logic here
  const task = await prisma.course.update({
    where: { id, status: "PENDING" },
    data: { status: "LAYOUT_PROCESSING" },
    select: { title: true, description: true, difficulty: true },
  });
  if (!task){
    console.log(`🚧 [INFO] Task of generating course layout for courseId:(${id}) is already picked by another instance.`)
    return;
  }
  console.log(`📝 Task details - Title: ${task.title}, Description: ${task.description}, Difficulty: ${task.difficulty}`);
  const e = processCourse(id, task.title, task.description, task.difficulty);
  if (!e) console.log(`❌ Error processing course task ${id}`);
  else console.log(`✅ Course task ${id} completed.`);
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