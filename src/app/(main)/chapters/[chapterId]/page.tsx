// src/app/(main)/chapters/[chapterId]/page.tsx
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";

const Page = async ({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) => {
  const { chapterId } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
  });

  if (!chapter) {
    return <div className="p-4 text-red-500">Chapter not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
      <p className="text-muted-foreground mb-6">
        {chapter.description}
      </p>
      <ReactMarkdown>{chapter.content || ""}</ReactMarkdown>
    </div>
  );
};

export default Page;
