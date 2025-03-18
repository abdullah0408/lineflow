import generateLayout from "../ai/generateLayout";
import { saveLayout } from "./taskSave";
import layoutValidator from "../validators/layoutValidator";
import { type CourseLayout } from "../utils/types";

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
    let layout = await generateLayout(title, description, difficulty);
    console.log(`Generated layout for course ${id}`);
    if (layout) {
      layout = layout.trim();
      if (layout.length > 0) {
        if (layout.startsWith("```json") && layout.endsWith("```")) {
          layout = layout.slice(7, -3).trim();
        }
        if (!layout.startsWith("{") || !layout.endsWith("}")) {
          console.log(
            `❌ [ERROR] Invalid JSON format received from GEMINI for courseId: ${id}`
          );
          return false;
        }
        const JSONlayout: CourseLayout = JSON.parse(layout);

        const v = await layoutValidator(JSONlayout, id);
        if (v) {
          const e = await saveLayout(id, layout, JSONlayout.courseStructure.length);
          if (e) return true;
        }
      }
    }
    console.error(`❌ Error saving layout for course ${id}: Layout is empty`);
    return false;
  }
  console.error(`❌ Error generating layout for course ${id}: ID is empty`);
  return false;
};

export default generateCourseLayout;
