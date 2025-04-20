import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
  {
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript, including variables, loops, and functions.",
    difficulty: "Beginner",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Mastering React",
    description: "A complete guide to React, including hooks, state management, and performance optimization.",
    difficulty: "Advanced",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Python for Data Science",
    description: "Learn how to use Python for data analysis, visualization, and machine learning.",
    difficulty: "Intermediate",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Full Stack Web Development",
    description: "A deep dive into frontend and backend development using modern technologies.",
    difficulty: "Advanced",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Database Management with SQL",
    description: "Understand relational databases and learn SQL for efficient data management.",
    difficulty: "Beginner",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Machine Learning Basics",
    description: "Introduction to ML concepts, supervised and unsupervised learning, and model evaluation.",
    difficulty: "Intermediate",
    layout: { sections: 6 },
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Cybersecurity Essentials",
    description: "Learn about network security, cryptography, and ethical hacking techniques.",
    difficulty: "Advanced",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Cloud Computing with AWS",
    description: "Explore cloud infrastructure, services, and deployment models using AWS.",
    difficulty: "Intermediate",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "DevOps Fundamentals",
    description: "Learn CI/CD, automation, containerization, and cloud deployment techniques.",
    difficulty: "Advanced",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Data Structures and Algorithms",
    description: "Master sorting, searching, and advanced data structures for efficient coding.",
    difficulty: "Advanced",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Blockchain and Cryptocurrency",
    description: "Understand blockchain technology, smart contracts, and cryptocurrencies.",
    difficulty: "Intermediate",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Internet of Things (IoT) Basics",
    description: "Learn IoT architecture, protocols, and applications for smart devices.",
    difficulty: "Beginner",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Artificial Intelligence Concepts",
    description: "Explore AI techniques, neural networks, and real-world applications.",
    difficulty: "Advanced",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Game Development with Unity",
    description: "Learn Unity engine, C# scripting, and game design fundamentals.",
    difficulty: "Intermediate",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
  },
  {
    title: "Mobile App Development with Flutter",
    description: "Develop cross-platform mobile applications using Flutter and Dart.",
    difficulty: "Beginner",
    userId: "user_29w83sxmDNGwOuEthce5gg56FcC"
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
