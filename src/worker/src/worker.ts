import { prisma } from "./utils/prisma";
import { EventEmitter } from "events";

// Worker synchronization variables
const workerLock = new EventEmitter();
let flag: [number, number] = [0, 0];
let turn = 0;
let noTaskCount = 0;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Database entity types.
 */
type EntityType = "course" | "chapter";

/**
 * Generic database task interface.
 */
interface Task {
  id: string;
  status: string;
}

/**
 * Fetches a pending task from the database.
 * @param entity - The entity to fetch tasks for ("course" or "chapter").
 * @returns The task found or null.
 */
const fetchTask = async (entity: EntityType): Promise<Task | null> => {
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

/**
 * Function to process course task.
 * @param id - Course task ID
 * @param status - Current status of the task
 */
const processCourseTask = async (id: string, status: string): Promise<void> => {
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
const processChapterTask = async (
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

/**
 * Processes a pending task for a given worker.
 * @param workerId - Worker identifier (0 or 1)
 * @param entity - The entity to process ("course" or "chapter")
 */
const processTask = async (
  workerId: number,
  entity: EntityType
): Promise<void> => {
  flag[workerId] = 1;
  turn = 1 - workerId;

  while (flag[1 - workerId] === 1 && turn === 1 - workerId) {
    console.log(`⏳ Worker ${workerId + 1} waiting...`);
    await new Promise((resolve) =>
      workerLock.once(`worker${2 - workerId}_done`, resolve)
    );
  }

  console.log(`✅ Worker ${workerId + 1} is working on ${entity}`);

  try {
    const task = await fetchTask(entity);

    if (!task) {
      console.log(`ℹ️ No PENDING ${entity} tasks.`);
      noTaskCount++;
    } else {
      console.log(`📌 Processing ${entity} task: ${task.id}`);
      noTaskCount = 0; // Reset counter when a task is found

      // Call the appropriate function based on the entity type
      if (entity === "course") {
        await processCourseTask(task.id, task.status);
      } else if (entity === "chapter") {
        await processChapterTask(task.id, task.status);
      }
    }
  } catch (error) {
    console.error(`❌ Error fetching PENDING ${entity} task.`, error);
  } finally {
    flag[workerId] = 0;
    workerLock.emit(`worker${workerId + 1}_done`);
  }
};

/**
 * Runs both workers sequentially.
 */
export const runWorkers = async (): Promise<void> => {
  await processTask(0, "course");
  await processTask(1, "chapter");

  if (noTaskCount == flag.length) {
    console.log("⏳ No tasks found. Waiting for 60 seconds before retrying...");
    await delay(60000);
    noTaskCount = 0; // Reset counter after waiting
  }

  setImmediate(runWorkers);
};
