import { ai } from "../utils/ai";
const f = async (
    courseTitle: string,
    courseDescription: string | null,
    courseDifficulty: string | null,
    title: string,
    description: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layout: any // Change type to `any` to avoid unnecessary parsing
  ): Promise<string | null> => {
    console.log(`🎓 Creating Chapter Content: ${title}`);
  
    const prompt =
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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