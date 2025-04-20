"use client";
import { CourseCard } from "@/components/CourseCard";
import { fetchCourses } from "@/lib/fetchCourses";
import { useEffect, useState } from "react";

export default function CourseList() {
    const [courses, setCourses] = useState<{ id: string; title: string; description: string | null; difficulty: string | null; status: string; }[]>([]);

    useEffect(() => {
        async function loadCourses() {
            const fetchedCourses: { id: string; title: string; description: string | null; difficulty: string | null; status: string; }[] = await fetchCourses();
            setCourses(fetchedCourses);
        }
        loadCourses();
    }, []);
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}
