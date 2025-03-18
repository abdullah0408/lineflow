import { ai } from "../utils/ai";
import { prisma } from "../utils/prisma";
const f = async (
    courseTitle: string,
    courseDescription: string | null,
    courseDifficulty: string | null,
    title: string,
    description: string,
    layout: any // Change type to `any` to avoid unnecessary parsing
  ): Promise<string | null> => {
    console.log(`🎓 Creating Chapter Content: ${title}`);
  
    let prompt =
      `Generate comprehensive chapter content for:` +
      `\nCourse Title: ${courseTitle}` +
      (courseDescription ? `\nCourse Description: ${courseDescription}` : "") +
      `\n4. Maintain depth appropriate for ${courseDifficulty || "intermediate"} level` +
      `\nChapter Title: ${title}` +
      `\nChapter Description: ${description}` +
      `\n\nRequired structure:` +
      `\n## [Chapter Title]` +
      `\n### Overview` +
      `\n[1-2 paragraph chapter summary]` +
      `\n\n### Key Concepts` +
      `\n[3-5 core concepts with explanations]` +
      `\n\n${layout.topicsCovered
        .map(
          (topic: any) =>
            `\n### ${topic.topicTitle}
  ${topic.topicDescription}
  ${topic.subtopics.map((sub: string) => `- ${sub}`).join("\n")}`
        )
        .join("\n\n")}` +
      `\n\nExpand each subtopic into detailed sections with examples. Include practical exercises where appropriate.`;
  
    const chapterLayout = await ai(prompt, "chapter");
    return chapterLayout;
  };
  
    export default f;