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
import { MoreVertical } from "lucide-react";

type CourseCardProps = {
  title: string;
  description: string;
  status: string;
};

function CourseCard({ title, description, status }: CourseCardProps) {
  return (
    <Card className="max-w-xs min-h-64 text-left">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 leading-tight">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-base text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button disabled className="h-8 px-3 text-sm">
          {status}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
