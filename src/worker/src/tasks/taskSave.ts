import { prisma } from "../utils/prisma";

export const saveLayout = async (id: string, layout: string, chaptersCount: number): Promise<boolean> => {
    try {
        await prisma.course.update({
            where: { id },
            data: { layout, status: "LAYOUT_SUCCESS", numberOfChapters: chaptersCount },
        })
        console.log(`✅ Layout saved for course ${id}`);
        return true;
    } catch (error) {
        console.error(`❌ Error saving layout for course ${id}: ${error}`);
        return false;
    }
};

export const saveChapter = async (id: string, content: string): Promise<boolean> => {
    try {
        await prisma.chapter.update({
            where: { id },
            data: { content, status: "PROCESSING_CHAPTER_SUCCESS" },
        })
        console.log(`✅ Content saved for chapter ${id}`);
        return true;
    } catch (error) {
        console.error(`❌ Error saving content for chapter ${id}: ${error}`);
        return false;
    }
}
