import { fetchTask } from "../tasks/taskFetcher";
import { processChapterTask } from "../tasks/taskProcessor";

export const chapterWorker = async (): Promise<void | null> => {
  const task = await fetchTask("chapter");
  if (!task) {
    console.log("ℹ️ No PENDING chapter tasks.");
    return null;
  }

  await processChapterTask(task.id, task.status);
};
