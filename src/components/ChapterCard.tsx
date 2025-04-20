"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import React, { useState } from "react";

export interface ChapterLayout {
  chapterTitle: string;
  chapterDescription: string;
  topicsCovered: {
    topicTitle: string;
    topicDescription: string;
    subtopics: string[];
  }[];
}

interface ChapterCardProps {
  layout: ChapterLayout;
  chapterId: string;
  chapterNumber: number;
}

export function ChapterCard({ layout, chapterId, chapterNumber }: ChapterCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [subtopicExpanded, setSubtopicExpanded] = useState<Record<number, boolean>>({});

  const handleNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/chapters/${chapterId}`);
  };

  return (
    <Card
      className="flex flex-col gap-4 p-4 transition-all duration-200 hover:shadow-lg hover:border-primary/20 cursor-pointer border-2"
      onClick={handleNavigation}
    >
      {/* Chapter Header */}
      <div className="flex items-center gap-4">
        {/* Chapter Number */}
        <div className="w-10 h-10 flex items-center justify-center text-white font-semibold">
          {chapterNumber}.
        </div>

        <div className="flex-1">
          <CardHeader className="p-0">
            <h3 className="text-lg font-semibold">{layout.chapterTitle}</h3>
          </CardHeader>
          <CardContent className="p-0 mt-1">
            <p className="text-sm text-muted-foreground">{layout.chapterDescription}</p>
          </CardContent>
        </div>

        {/* Expand/Collapse Icon */}
        <Button
          variant="ghost"
          className="p-2 hover:bg-accent"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      {/* Topics Covered - Expandable */}
      {expanded && (
        <div className="mt-2">
          <h4 className="text-md font-semibold">Topics Covered:</h4>
          <ul className="list-disc pl-5 space-y-2">
            {layout.topicsCovered.map((topic, index) => (
              <li key={index}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{topic.topicTitle}</p>
                  <Button
                    variant="ghost"
                    className="p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubtopicExpanded((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }));
                    }}
                  >
                    {subtopicExpanded[index] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{topic.topicDescription}</p>
                {subtopicExpanded[index] && topic.subtopics.length > 0 && (
                  <ul className="list-circle pl-5 mt-1 text-sm text-muted-foreground">
                    {topic.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex}>{subtopic}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}