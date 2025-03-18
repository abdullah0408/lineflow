import { EventEmitter } from "events";
import { courseWorker } from "./workers/courseWorker";
import { chapterWorker } from "./workers/chapterWorker";
import { delay } from "./utils/delay";

// Worker synchronization variables
const workerLock = new EventEmitter();
let flag: [number, number] = [0, 0];
let turn = 0;
let noTaskCount = 0;

/**
 * Processes a pending task for a given worker.
 */
const processTask = async (workerId: number, entity: "course" | "chapter"): Promise<void> => {
  flag[workerId] = 1;
  turn = 1 - workerId;

  while (flag[1 - workerId] === 1 && turn === 1 - workerId) {
    console.log(`⏳ Worker ${workerId + 1} waiting...`);
    await new Promise<void>((resolve) => workerLock.once(`worker${2 - workerId}_done`, resolve));
  }

  console.log(`✅ Worker ${workerId + 1} is working on ${entity}`);

  try {
    if (entity === "course") {
      const task = await courseWorker();
      if (!task) noTaskCount++;
    } else {
      const task = await chapterWorker();
      if (!task) noTaskCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${entity} task.`, error);
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

  if (noTaskCount >= flag.length) {
    console.log("⏳ No tasks found. Waiting for 60 seconds before retrying...");
    await delay(60000);
    noTaskCount = 0;
  }

  setImmediate(runWorkers);
};
