import { fetchTask } from "../tasks/taskFetcher";
import { processCourseTask } from "../tasks/taskProcessor";

export const courseWorker = async (): Promise<void | null> => {
  const task = await fetchTask("course");
  if (!task) {
    console.log("ℹ️ No PENDING course tasks.");
    return null;
  }

  await processCourseTask(task.id, task.status);
};
