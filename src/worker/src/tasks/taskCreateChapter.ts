import { console } from "inspector";
import { prisma } from "../utils/prisma";
import { type CourseLayout } from "../utils/types";
/**
 * Function to process course task.
 * @param id - Course task ID
 * @param status - Current status of the task
 */
export const createChapterTask = async (
  id: string,
  status: string
): Promise<boolean> => {
  console.log(`🎓 Creating Chapter from layout: ${id} with status ${status}`);
  // Update the course status to indicate it is being processed.
  const task = await prisma.course.update({
    where: { id, status: "LAYOUT_APPROVED" },
    data: { status: "EXTRACTING_CHAPTERS" },
    select: { layout: true, title: true, description: true, difficulty: true },
  });
  if (!task) {
    console.log(
      `🚧 [INFO] Task of extracting chapters for courseId:(${id}) is already picked by another instance.`
    );
    return false;
  }
  if (!task.layout) {
    console.log(`❌ Error extracting chapters for course ${id}: No layout found.`);
    return false;
  }
    console.log(
        `📝 Task details - Title: ${task.title}, Description: ${task.description}, Difficulty: ${task.difficulty}`
    );
    try {
        if (typeof task.layout === 'string') {
            const layout: CourseLayout = JSON.parse(task.layout);
            for (let i = 0; i < layout.courseStructure.length; i++) {
                await prisma.chapter.create({
                    data: {
                        courseId: id,
                        courseTitle: task.title,
                        courseDescription: task.description ? task.description : null,
                        courseDifficulty: task.difficulty ? task.difficulty : null,
                        title: layout.courseStructure[i].chapterTitle,
                        description: layout.courseStructure[i].chapterDescription,
                        status: "PENDING",
                        chapterNumber: i + 1,
                        layout: layout.courseStructure[i],
                    }
                });
            }
            await prisma.course.update({
                where: { id },
                data: { status: "EXTRACTING_CHAPTERS_SUCCESS" },
            });
            
        } else {
            console.log(`Expected layout to be a string but got ${typeof task.layout}`);
            return false;
        }

        return true;
    } catch (error) {
        console.error(`❌ Error extracting chapters for course ${id}: ${error}`);
        return false;
    }
};


