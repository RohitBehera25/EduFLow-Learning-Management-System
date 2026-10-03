// Realistic mock data for LMS platform

export const MOCK_USERS = {
  student: {
    _id: "usr_student_01",
    name: "Aman Sharma",
    email: "student@example.com",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    enrolledCoursesCount: 3,
    joinedDate: "2024-01-15"
  },
  instructor: {
    _id: "usr_inst_01",
    name: "Dr. Vikram Seth",
    email: "instructor@example.com",
    role: "instructor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    headline: "Senior Full Stack Architect & Ex-Google Tech Lead",
    bio: "Teaching 50,000+ developers worldwide. Specializing in MERN, Cloud Architecture, and Scalable Microservices.",
    totalStudents: 14200,
    totalCourses: 6,
    rating: 4.9
  },
  admin: {
    _id: "usr_admin_01",
    name: "System Admin",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
  }
};

export const MOCK_CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "web-dev", name: "Web Development" },
  { id: "backend", name: "Backend & Cloud" },
  { id: "data-science", name: "AI & Machine Learning" },
  { id: "mobile-dev", name: "Mobile App Development" },
  { id: "devops", name: "DevOps & Docker" }
];

export const MOCK_COURSES = [
  {
    _id: "course_01",
    title: "Complete MERN Stack 2026: From Scratch to Production",
    subtitle: "Master MongoDB, Express, React, Node.js with Real-World Scalable Architectures & Redux Toolkit",
    slug: "complete-mern-stack-2026",
    category: "web-dev",
    level: "Intermediate",
    rating: 4.9,
    reviewsCount: 1280,
    studentsEnrolled: 8450,
    price: 4999,
    originalPrice: 12999,
    discountPercent: 61,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    instructor: {
      _id: "usr_inst_01",
      name: "Dr. Vikram Seth",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      headline: "Senior Full Stack Architect"
    },
    language: "English / Hindi",
    lastUpdated: "January 2026",
    status: "published",
    features: [
      "48+ Hours of On-Demand HD Video",
      "Full Stack MERN Real-Time Deployment",
      "Redux Toolkit & Role-Based Access Control",
      "Cloudinary File Uploads & Nodemailer Auth",
      "Certificate of Completion",
      "Lifetime Access & Source Code"
    ],
    curriculum: [
      {
        sectionId: "sec_1",
        title: "Section 1: Modern JavaScript & React Fundamentals",
        lectures: [
          {
            lectureId: "lec_101",
            title: "1.1 Introduction to Modern Web Architecture",
            duration: "14:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isPreview: true
          },
          {
            lectureId: "lec_102",
            title: "1.2 React 18+ Hooks & Functional Component Deep Dive",
            duration: "22:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isPreview: true
          },
          {
            lectureId: "lec_103",
            title: "1.3 Tailwind CSS v3 Rapid Responsive UI Mastery",
            duration: "18:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isPreview: false
          }
        ]
      },
      {
        sectionId: "sec_2",
        title: "Section 2: Redux Toolkit & Global State Architecture",
        lectures: [
          {
            lectureId: "lec_201",
            title: "2.1 Why Redux Toolkit? Store, Slices & Dispatch",
            duration: "19:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isPreview: false
          },
          {
            lectureId: "lec_202",
            title: "2.2 AsyncThunk, API Caching & Error Handling",
            duration: "25:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            isPreview: false
          }
        ]
      },
      {
        sectionId: "sec_3",
        title: "Section 3: Node.js, Express & MongoDB Enterprise API",
        lectures: [
          {
            lectureId: "lec_301",
            title: "3.1 REST API Design & Express Middleware Pipeline",
            duration: "30:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            isPreview: false
          },
          {
            lectureId: "lec_302",
            title: "3.2 JWT Token Auth, Cookies & RBAC Protection",
            duration: "28:45",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            isPreview: false
          }
        ]
      }
    ]
  },
  {
    _id: "course_02",
    title: "Docker, Kubernetes & AWS DevOps Bootcamp",
    subtitle: "Zero to Hero in Containerization, CI/CD Pipelines, and Production Cloud Infrastructure",
    slug: "docker-kubernetes-aws-devops",
    category: "devops",
    level: "Advanced",
    rating: 4.8,
    reviewsCount: 950,
    studentsEnrolled: 5120,
    price: 5499,
    originalPrice: 14999,
    discountPercent: 63,
    thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800",
    instructor: {
      _id: "usr_inst_02",
      name: "Pooja Verma",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
      headline: "Principal DevOps Engineer"
    },
    language: "English",
    lastUpdated: "February 2026",
    status: "published",
    features: [
      "35+ Hours of Hands-on Lab Exercises",
      "Kubernetes Multi-Node Cluster Setup",
      "GitLab CI/CD & GitHub Actions Automation",
      "AWS ECS, EKS & Terraform Scripting",
      "Production Incident Post-Mortem Training"
    ],
    curriculum: [
      {
        sectionId: "sec_1",
        title: "Docker Fundamentals & Multi-Stage Builds",
        lectures: [
          { lectureId: "lec_d1", title: "Containerization concepts & Docker Engine", duration: "16:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isPreview: true },
          { lectureId: "lec_d2", title: "Optimizing Dockerfiles for Node & React apps", duration: "21:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isPreview: false }
        ]
      }
    ]
  },
  {
    _id: "course_03",
    title: "Modern React 19 & Next.js 15 Fullstack Mastery",
    subtitle: "Server Components, Server Actions, App Router, and High-Performance UI Building",
    slug: "react-19-nextjs-fullstack",
    category: "web-dev",
    level: "All Levels",
    rating: 4.95,
    reviewsCount: 2100,
    studentsEnrolled: 11200,
    price: 3999,
    originalPrice: 9999,
    discountPercent: 60,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    instructor: {
      _id: "usr_inst_01",
      name: "Dr. Vikram Seth",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      headline: "Senior Full Stack Architect"
    },
    language: "English",
    lastUpdated: "March 2026",
    status: "published",
    features: [
      "40+ Hours of Modern React Architecture",
      "React Server Components & Streaming SSR",
      "TypeScript strict mode integration",
      "PostgreSQL + Prisma ORM database pipeline"
    ],
    curriculum: [
      {
        sectionId: "sec_1",
        title: "React 19 Core Paradigm Shift",
        lectures: [
          { lectureId: "lec_r1", title: "React Compiler & Action Hooks (useActionState)", duration: "18:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isPreview: true },
          { lectureId: "lec_r2", title: "useOptimistic and Server Actions in Depth", duration: "24:50", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isPreview: false }
        ]
      }
    ]
  },
  {
    _id: "course_04",
    title: "Artificial Intelligence & Large Language Models (LLMs)",
    subtitle: "Build Generative AI Apps with LangChain, OpenAI APIs, Vector Databases & Python",
    slug: "ai-llm-application-development",
    category: "data-science",
    level: "Intermediate",
    rating: 4.88,
    reviewsCount: 840,
    studentsEnrolled: 4300,
    price: 6499,
    originalPrice: 16999,
    discountPercent: 62,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    instructor: {
      _id: "usr_inst_03",
      name: "Ananya Roy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
      headline: "AI Research Scientist"
    },
    language: "English",
    lastUpdated: "January 2026",
    status: "published",
    features: [
      "Fine-tuning Open-Source Models (Llama 3)",
      "RAG (Retrieval Augmented Generation) Pipelines",
      "ChromaDB & Pinecone Vector Indices",
      "Autonomous Agentic Workflows"
    ],
    curriculum: [
      {
        sectionId: "sec_1",
        title: "Prompt Engineering & LLM APIs",
        lectures: [
          { lectureId: "lec_ai1", title: "Understanding Embeddings & Tokens", duration: "15:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isPreview: true }
        ]
      }
    ]
  }
];

export const MOCK_ENROLLED_COURSES = [
  {
    courseId: "course_01",
    enrolledAt: "2026-02-10",
    progressPercent: 45,
    completedLectures: ["lec_101", "lec_102"],
    lastWatchedLectureId: "lec_103",
    courseDetails: MOCK_COURSES[0]
  },
  {
    courseId: "course_03",
    enrolledAt: "2026-03-01",
    progressPercent: 15,
    completedLectures: ["lec_r1"],
    lastWatchedLectureId: "lec_r2",
    courseDetails: MOCK_COURSES[2]
  }
];
