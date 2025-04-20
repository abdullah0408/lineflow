"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string | null;
    difficulty: string | null;
    status: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  // Define button text and disabled state based on status
  let buttonText = "In Progress";
  let buttonLink: string | null = null;
  let isDisabled = true;

  switch (course.status) {
    case "PENDING":
      buttonText = "In Queue";
      break;
    case "LAYOUT_FAILED":
    case "EXTRACTING_CHAPTERS_FAILED":
    case "PROCESSING_CHAPTERS_FAILED":
      buttonText = "Failed";
      break;
    case "LAYOUT_APPROVED":
    case "LAYOUT_SUCCESS":
    case "EXTRACTING_CHAPTERS":
    case "EXTRACTING_CHAPTERS_SUCCESS":
    case "PROCESSING_CHAPTERS":
      buttonText = "Check Layout";
      buttonLink = `/courses/layout/${course.id}`;
      isDisabled = false;
      break;
    case "PROCESSING_CHAPTERS_SUCCESS":
      buttonText = "Ready";
      buttonLink = `/courses/publish/${course.id}`;
      isDisabled = false;
      break;
    default:
      buttonText = course.status.replace(/_/g, " "); // Default fallback
  }

  // Handle card click navigation
  const handleCardClick = () => {
    router.push(`/courses/${course.id}`);
  };

  return (
    <Card
      className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:border-primary/20 overflow-hidden border-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pt-4 px-4">
        <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="text-xs font-medium px-2 py-1 rounded-md"
          >
            {course.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs font-medium text-muted-foreground"
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click event
            if (buttonLink) router.push(buttonLink);
          }}
        >
          {buttonText}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 hover:bg-accent text-muted-foreground"
              onClick={(e) => e.stopPropagation()} // Prevent card click
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
