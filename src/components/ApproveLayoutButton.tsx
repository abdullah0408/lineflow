"use client";
import { useTransition } from "react";
import { updateCourseStatus } from "@/lib/updateCourseStatus";
import { Button } from "@/components/ui/button";

interface ApproveLayoutButtonProps {
  courseId: string;
}

const ApproveLayoutButton: React.FC<ApproveLayoutButtonProps> = ({ courseId }) => {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      const result = await updateCourseStatus(courseId);
      if (!result.success) {
        alert("Failed to update course status.");
      }
    });
  };

  return (
    <Button onClick={handleApprove} disabled={isPending}>
      {isPending ? "Approving..." : "Approve Layout"}
    </Button>
  );
};

export default ApproveLayoutButton;
