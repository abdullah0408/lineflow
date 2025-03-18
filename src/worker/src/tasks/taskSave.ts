import { prisma } from "../utils/prisma";

const saveLayout = async (id: string, layout: string, chaptersCount: number): Promise<Boolean> => {
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

export default saveLayout;