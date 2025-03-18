import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { courseSystemPrompt, chapterSystemPrompt } from "./promt";

const model = google("models/gemini-2.0-flash-thinking-exp-01-21");

export const ai = async (userPrompt: string, taskOf: string): Promise<string | null> => {
  const systemPrompt = taskOf === "course" ? courseSystemPrompt : chapterSystemPrompt;
try {
    const { textStream } = streamText({
      model,
      maxTokens: 65536,
      temperature: 0.7,
      maxRetries: 5,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });
  
    let finalText = "";
    for await (const text of textStream) {
      process.stdout.write(text);
      finalText += text;
    }
  
    return finalText;
} catch (error) {
    console.error(`❌ Error generating layout for ${taskOf}: ${error}`);
    return null;
}
};

// ai("Generate a structured course outline based on the following details:\nCourse Title: Introduction to AI\nCourse Description: Learn the basics of artificial intelligence\nCourse Difficulty: Intermediate", "course");