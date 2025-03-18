import { ai } from "../utils/ai";

const f = async (title: string, description: string | null, difficulty: string | null): Promise<string | null> => {
    console.log(`📐 Generating layout for course: ${title}`);
    let prompt = `Generate a structured course outline based on the following details:` +
    `\nCourse Title: ${title}`
    if (description) prompt += `\nCourse Description: ${description}`
    if (difficulty) prompt += `\nCourse Difficulty: ${difficulty}`
    const layout = await ai(prompt, "course");
    return layout;
}

export default f;

