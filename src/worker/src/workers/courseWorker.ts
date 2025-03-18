import { fetchTask } from "../tasks/taskFetcher";
import { processCourseTask } from "../tasks/taskProcessor";

export const courseWorker = async (): Promise<boolean> => {
  const task = await fetchTask("course", "PENDING");
  if (!task) {
    console.log("ℹ️ No PENDING course tasks.");
    return false;
  }
  return await processCourseTask(task.id, task.status);
};
