import { EventEmitter } from "events";
import { courseWorker } from "./workers/courseWorker";
import { chapterWorker } from "./workers/chapterWorkers";
import { createChapterWorker } from "./workers/chapterWorkers";
import { delay } from "./utils/delay";

// Worker synchronization variables
const workerLock = new EventEmitter();
const flag: [number, number, number] = [0, 0, 0];
let turn = 0;
let noTaskCount = 0;

/**
 * Processes a pending task for a given worker.
 */
const processTask = async (workerId: number, entity: "course" | "chapter" | "module"): Promise<void> => {
  flag[workerId] = 1;
  turn = (workerId + 1) % 3;

  while (flag[(workerId + 1) % 3] === 1 && turn === (workerId + 1) % 3) {
    console.log(`⏳ Worker ${workerId + 1} waiting...`);
    await new Promise<void>((resolve) => workerLock.once(`worker${(workerId + 2) % 3 + 1}_done`, resolve));
  }

  console.log(`✅ Worker ${workerId + 1} is working on ${entity}`);

  try {
    if (entity === "course") {
      const task = await courseWorker();
      if (!task) noTaskCount++;
      console.log(noTaskCount)
    } else if (entity === "chapter") {
      const task = await chapterWorker();
      if (!task) noTaskCount++;
      console.log(noTaskCount)
    } else {
      const task = await createChapterWorker();
      if (!task) noTaskCount++;
      console.log(noTaskCount)
    }
  } catch (error) {
    console.error(`❌ Error processing ${entity} task.`, error);
  } finally {
    flag[workerId] = 0;
    workerLock.emit(`worker${workerId + 1}_done`);
  }
};

/**
 * Runs all workers sequentially.
 */
export const runWorkers = async (): Promise<void> => {
  await processTask(0, "course");
  await processTask(1, "chapter");
  await processTask(2, "module");

  if (noTaskCount >= flag.length) {
    console.log("⏳ No tasks found. Waiting for 60 seconds before retrying...");
    await delay(600);
    noTaskCount = 0;
  }

  setImmediate(runWorkers);
};
