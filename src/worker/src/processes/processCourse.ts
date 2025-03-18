import generateLayout from "../ai/generateLayout";
import saveLayout from "../tasks/taskSave";

/**
 * Fetches course details and generates a layout using AI.
 * @param id - The course ID
 * @returns The generated layout or null if course not found
 */
const generateCourseLayout = async (id: string, title: string, description: string | null, difficulty: string | null): Promise<Boolean> => {
    if (id) {
        const layout = await generateLayout(title, description, difficulty);
        console.log(`Generated layout for course ${id}`);
        const e = await saveLayout(id, layout);
        if (e) return true;
    }

    return false;
};

export default generateCourseLayout;
