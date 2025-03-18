import generateLayout from "../ai/generateLayout";
import { saveChapter } from "./taskSave";
import layoutValidator from "../validators/layoutValidator";
import { type CourseLayout } from "../utils/types";
import generateContent from "../ai/generateContent";
/**
 * Fetches course details and generates a layout using AI.
 * @param id - The course ID
 * @param title - Course title
 * @param description - Course description or null
 * @param difficulty - Course difficulty or null
 * @returns A promise that resolves to true if the layout was generated and saved successfully, false otherwise.
 */
const generateChapterContent = async (
  id: string,
  courseTitle: string,
  courseDescription: string | null,
  courseDifficulty: string | null,
  title: string,
  description: string,
  layout: any
): Promise<boolean> => {
  if (id && courseTitle && title && description && layout) {
    let content = await generateContent(courseTitle, courseDescription, courseDifficulty, title, description, layout);

    console.log(`Generated layout for course ${id}`);
    if (content) {
        content = content.trim();
      if (content.length > 0) {
        if (content.startsWith("```markdown") && layout.endsWith("```")) {
            content = content.slice(7, -3).trim();
        }
          const e = await saveChapter(
            id,
            content,
          );
          if (e) return true;
      }
    }
    console.error(`❌ Error saving layout for course ${id}: Layout is empty`);
    return false;
  }
  console.error(`❌ Error generating layout for course ${id}: ID is empty`);
  return false;
};

export default generateChapterContent;
