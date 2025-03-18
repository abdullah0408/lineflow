import { fetchTask } from "../tasks/taskFetcher";
import { processChapterTask } from "../tasks/taskProcessor";
import { createChapterTask } from "../tasks/taskCreateChapter";

export const chapterWorker = async (): Promise<void | null> => {
  const task = await fetchTask("chapter", "PENDING");
  if (!task) {
    console.log("ℹ️ No PENDING chapter tasks.");
    return null;
  }

  await processChapterTask(task.id, task.status);
};

export const createChapterWorker = async (): Promise<boolean> => {
  const task = await fetchTask("course", "LAYOUT_APPROVED");
  if (!task) {
    console.log("ℹ️ No LAYOUT_APPROVED course tasks.");
    return false;
  }

  return await createChapterTask(task.id, task.status);
}