import { prisma } from "../utils/prisma";
import processCourse from "./taskProcessCourse";
import processChapter from "./taskProcessChapter";
/**
 * Function to process course task.
 * @param id - Course task ID
 * @param status - Current status of the task
 */
export const processCourseTask = async (id: string, status: string): Promise<boolean> => {
  console.log(`🎓 Processing course task: ${id} with status ${status}`);
  // Update the course status to indicate it is being processed.
  const task = await prisma.course.update({
    where: { id, status: "PENDING" },
    data: { status: "LAYOUT_PROCESSING" },
    select: { title: true, description: true, difficulty: true },
  });
  if (!task) {
    console.log(
      `🚧 [INFO] Task of generating course layout for courseId:(${id}) is already picked by another instance.`
    );
    return false;
  }
  console.log(
    `📝 Task details - Title: ${task.title}, Description: ${task.description}, Difficulty: ${task.difficulty}`
  );
  // Await the asynchronous processCourse function.
  const e = await processCourse(id, task.title, task.description, task.difficulty);
  if (!e) console.log(`❌ Error processing course task ${id}`);
  else console.log(`✅ Course task ${id} completed.`);
  return true;
};

/**
 * Function to process chapter task.
 * @param id - Chapter task ID
 * @param status - Current status of the task
 */
export const processChapterTask = async (id: string, status: string): Promise<boolean> => {
  console.log(`📖 Processing chapter task: ${id} with status ${status}`);
  const task = await prisma.chapter.update({
    where: { id, status: "PENDING" },
    data: { status: "PROCESSING_CHAPTER" },
  });
  if (!task) {
    console.log(
      `🚧 [INFO] Task of processing chapter for chapterId:(${id}) is already picked by another instance.`
    );
    return false;
  }
  console.log(`📝 Task details - CourseId: ${task.courseId}, Title: ${task.title}`)
  // Await the asynchronous processChapter function.
  const e = await processChapter(id, task.courseTitle, task.courseDescription, task.courseDifficulty, task.title, task.description, task.layout);
  if (!e) console.log(`❌ Error processing chapter task ${id}`);
  else console.log(`✅ chapter task ${id} completed.`);
  return true;
};
