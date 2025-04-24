"use server";

import { ChapterCard } from '@/components/ChapterCard';
import { prisma } from '@/lib/prisma';
import React from 'react';
// import { Button } from '@/components/ui/button';
import ApproveLayoutButton from '@/components/ApproveLayoutButton';

interface PageParams {
  courseId: string;
}

const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const { courseId } = await params;

  // Fetch course details
  const course = await prisma.course.findUnique({
    select: {
      title: true,
      description: true,
      status: true,
    },
    where: {
      id: courseId,
    },
  });

  // Fetch chapters
  const chaptersData = await prisma.chapter.findMany({
    select: {
      id: true,
      layout: true,
      chapterNumber: true,
    },
    where: {
      courseId: courseId,
    },
    orderBy: {
      chapterNumber: 'asc',
    },
  });

  // Parse layout JSON if needed
  const chapters = chaptersData.map((chapter) => ({
    id: chapter.id,
    layout: typeof chapter.layout === "string" ? JSON.parse(chapter.layout) : chapter.layout,
    chapterNumber: chapter.chapterNumber,
  }));

  console.log("Chapters:", chapters);
  console.log("Course ID:", courseId);

  return (
    <div className="w-full p-6">
      {/* Course Details */}
      {course && (
        <div className="mb-6 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-white">{course.description}</p>
        </div>
      )}

      {/* Chapter List */}
      {chapters.length > 0 ? (
        chapters.map((chapter) => (
          <div key={chapter.id} className="mb-4">
            <ChapterCard layout={chapter.layout} chapterId={chapter.id} chapterNumber={chapter.chapterNumber} />
          </div>
        ))
      ) : (
        <p>No chapters found.</p>
      )}

      {/* Approve Layout Button */}
      {course?.status === "LAYOUT_SUCCESS" && (
        <div className="mt-6">
          <ApproveLayoutButton courseId={courseId} />
        </div>
      )}
    </div>
  );
};

export default Page;
