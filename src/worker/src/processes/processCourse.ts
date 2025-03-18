import generateLayout from "../ai/generateLayout";
import saveLayout from "../tasks/taskSave";

/**
 * Fetches course details and generates a layout using AI.
 * @param id - The course ID
 * @param title - Course title
 * @param description - Course description or null
 * @param difficulty - Course difficulty or null
 * @returns A promise that resolves to true if the layout was generated and saved successfully, false otherwise.
 */
const generateCourseLayout = async (
  id: string,
  title: string,
  description: string | null,
  difficulty: string | null
): Promise<boolean> => {
  if (id) {
    const layout = await generateLayout(title, description, difficulty);
    console.log(`Generated layout for course ${id}`);
    const e = await saveLayout(id, layout);
    if (e) return true;
  }
  return false;
};

export default generateCourseLayout;
