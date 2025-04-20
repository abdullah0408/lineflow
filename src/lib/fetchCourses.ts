"use server"

import { prisma } from "./prisma";

export async function fetchCourses() {
  return await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      status: true,
    },
  });
}