import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
  {
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript, including variables, loops, and functions.",
    difficulty: "Beginner",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Mastering React",
    description: "A complete guide to React, including hooks, state management, and performance optimization.",
    difficulty: "Advanced",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Python for Data Science",
    description: "Learn how to use Python for data analysis, visualization, and machine learning.",
    difficulty: "Intermediate",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Full Stack Web Development",
    description: "A deep dive into frontend and backend development using modern technologies.",
    difficulty: "Advanced",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Database Management with SQL",
    description: "Understand relational databases and learn SQL for efficient data management.",
    difficulty: "Beginner",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Machine Learning Basics",
    description: "Introduction to ML concepts, supervised and unsupervised learning, and model evaluation.",
    difficulty: "Intermediate",
    layout: { sections: 6 },
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Cybersecurity Essentials",
    description: "Learn about network security, cryptography, and ethical hacking techniques.",
    difficulty: "Advanced",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Cloud Computing with AWS",
    description: "Explore cloud infrastructure, services, and deployment models using AWS.",
    difficulty: "Intermediate",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "DevOps Fundamentals",
    description: "Learn CI/CD, automation, containerization, and cloud deployment techniques.",
    difficulty: "Advanced",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Data Structures and Algorithms",
    description: "Master sorting, searching, and advanced data structures for efficient coding.",
    difficulty: "Advanced",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Blockchain and Cryptocurrency",
    description: "Understand blockchain technology, smart contracts, and cryptocurrencies.",
    difficulty: "Intermediate",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Internet of Things (IoT) Basics",
    description: "Learn IoT architecture, protocols, and applications for smart devices.",
    difficulty: "Beginner",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Artificial Intelligence Concepts",
    description: "Explore AI techniques, neural networks, and real-world applications.",
    difficulty: "Advanced",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Game Development with Unity",
    description: "Learn Unity engine, C# scripting, and game design fundamentals.",
    difficulty: "Intermediate",
    userId: "cm8eu6yww0000jl03043yjof1"
  },
  {
    title: "Mobile App Development with Flutter",
    description: "Develop cross-platform mobile applications using Flutter and Dart.",
    difficulty: "Beginner",
    userId: "cm8eu6yww0000jl03043yjof1"
  }
];

async function seedCourses() {
  try {
    await prisma.course.createMany({ data: courses });
    console.log("Courses added successfully!");
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCourses();
