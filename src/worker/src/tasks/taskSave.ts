import { prisma } from "../utils/prisma";

const saveLayout = async (id: string, layout: string): Promise<Boolean> => {
    try {
        await prisma.course.update({
            where: { id },
            data: { layout, status: "LAYOUT_SUCCESS" },
        })
        console.log(`✅ Layout saved for course ${id}`);
        return true;
    } catch (error) {
        console.error(`❌ Error saving layout for course ${id}: ${error}`);
        return false;
    }
};

export default saveLayout;