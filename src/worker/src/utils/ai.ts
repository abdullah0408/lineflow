import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { courseSystemPrompt } from "./promt";

const model = google("models/gemini-2.0-flash-exp");

export const ai = async (userPrompt: string, taskOf: string): Promise<string | null> => {

try {
    const { textStream } = await streamText({
      model,
      messages: [
        {
          role: "system",
          content: courseSystemPrompt
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