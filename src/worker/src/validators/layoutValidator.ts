import { type CourseLayout } from "../utils/types";


const layoutValidator = async (
  layout: CourseLayout,
  id: string
): Promise<boolean> => {
  if (
    !layout.courseTitle ||
    !layout.courseDescription ||
    !layout.difficultyLevel ||
    !Array.isArray(layout.courseStructure)
  ) {
    console.log(
      `❌ [ERROR] Parsed JSON is missing required fields for courseId: ${id}`
    );
    return false;
  }
  for (const chapter of layout.courseStructure) {
    if (
      !chapter.chapterTitle ||
      !chapter.chapterDescription ||
      !Array.isArray(chapter.topicsCovered)
    ) {
      console.log(
        `❌ [ERROR] Invalid chapter structure in AI response for courseId: ${id}`
      );
      return false;
    }

    for (const topic of chapter.topicsCovered) {
      if (
        !topic.topicTitle ||
        !topic.topicDescription ||
        !Array.isArray(topic.subtopics)
      ) {
        console.log(
          `❌ [ERROR] Invalid topic structure in AI response for courseId: ${id}`
        );
        return false;
      }
    }
  }
  console.log(
    `✅ [SUCCESS] Valid course layout generated for courseId: ${id}`
  );
  return true;
};

export default layoutValidator;
