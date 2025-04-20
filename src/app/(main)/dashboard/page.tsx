"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateCourseDialog } from "@/components/CreateCourseDialog";
import CourseList from "@/components/CourseList";

export default function Home() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to CourseForge</h1>
          <p className="text-muted-foreground">Create and manage AI-powered courses with ease.</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)} 
          size="lg"
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Course
        </Button>
      </div>

      {/* Server Component Rendering the Course List */}
      <CourseList />

      <CreateCourseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
