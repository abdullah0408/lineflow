"use server"

import { prisma } from "./prisma";

export async function handleSubmit(title: string, description: string | null, difficulty: string | null, userId: string) {
  return await prisma.course.create({
    data: {
        title,
        description,
        difficulty,
        userId
    }
  });
}