export type CourseLayout = {
    courseTitle: string;
    courseDescription: string;
    difficultyLevel: string;
    courseStructure: {
      chapterTitle: string;
      chapterDescription: string;
      topicsCovered: {
        topicTitle: string;
        topicDescription: string;
        subtopics: string[];
      }[];
    }[];
};