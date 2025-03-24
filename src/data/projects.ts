export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'no-code' | 'code' | 'ai';
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  // No-Code Projects

  {
    id: "ai-1",
    title: "NuptAI",
    description: "A wedding planning software that uses AI to generate personalized planning schedules, budgets, and vendor suggestions based on user preferences and choices.",
    category: "no-code",
    image: "/projects/nuptai.png",
    tags: ["Bubble.io", "Stripe", "Gemini", "No-Code", "Automation", "Custom Workflows"],
    demoUrl: "https://nupt.ai/",
  },
  {
    id: "ai-2",
    title: "Xophie.ai",
    description: "An AI meeting assistant that records, transcribes, and organizes meeting notes. It leverages Make.com to monitor Firebase authentication events and sends personalized welcome emails, while integrating advanced text-to-speech and speech intelligence features.",
    category: "ai",
    image: "/projects/xophie.png",
    tags: ["Next.js","Flutterwave", "TypeScript", "Make.com", "Firebase", "AssemblyAI", "OpenAI"],
    demoUrl: "https://xophie.ai",
    repoUrl: "https://github.com/Bobarinn/xophieai",
  },
  {
    id: "nocode-5",
    title: "Traleado.com",
    description: "A dynamic marketplace platform that automates lead generation and management. It connects lead sellers with buyers through seamless real-time integrations and advanced workflow automation.",
    category: "no-code",
    image: "/projects/traleado.png",
    tags: ["Bubble.io", "API Integrations", "Workflow Automation"],
    demoUrl: "https://traleado.com",
  },
  {
    id: "nocode-2",
    title: "Blueshirt Work",
    description: "A job listing platform for blue-collar work in the Philippines, available on the Playstore. This project involved handling complex API integrations with an external database to ensure seamless functionality.",
    category: "no-code",
    image: "/projects/blueshirt.png",
    tags: ["Bubble.io", "External API", "Database Management", "Mobile App"],
    demoUrl: "https://blueshirt.work",
  },
  {
    id: "nocode-1",
    title: "Sendwork.com",
    description: "A Project Pricing and Task Management App for home service businesses. It's built to help contractors manage customer details, schedule jobs/tasks, and delegate work with a complex, robust database setup.",
    category: "no-code",
    image: "/projects/sendwork.svg",
    tags: ["Bubble.io", "Database Management", "API Integrations", "Workflow Automation"],
    demoUrl: "https://sendwork.com/",
  },
 
  {
    id: "nocode-3",
    title: "Invisible Strengths",
    description: "A job platform that promotes inclusion and support for disabled jobseekers, featuring user-friendly design and robust data handling to connect candidates with suitable opportunities.",
    category: "no-code",
    image: "/projects/invisible-strengths.png",
    tags: ["Bubble.io", "API Integrations", "Responsive Design", "Accessibility"],
    demoUrl: "https://www.invisiblestrengths.com/",
  },
  {
    id: "nocode-4",
    title: "Captain Stash (MyProfitStash)",
    description: "A dynamic web application that leverages OpenAI's API for generating interactive and personalized content.",
    category: "no-code",
    image: "/projects/myprofitstash.png",
    tags: ["Bubble.io", "OpenAI API", "Custom Workflows"],
    demoUrl: "https://myprofitstash.com/",
  },

  {
    id: "code-1",
    title: "Reppute",
    description: "A personal learning portfolio project that integrates a Firebase backend and authentication with Bubble's frontend. It also includes a cross-platform mobile app developed using Flutterflow.",
    category: "no-code",
    image: "/projects/reppute.png",
    tags: ["Bubble.io", "Firebase", "Flutterflow", "API Integrations"],
    demoUrl: "https://reppute.bubbleapps.io/version-test/",
  },

  // AI Projects
  
  {
    id: "ai-3",
    title: "Learning Chatbot Agent",
    description: "A chatbot designed to help users discover relevant YouTube videos and online resources, enhancing the learning experience with curated recommendations.",
    category: "ai",
    image: "/projects/learning-chatbot.png",
    tags: ["Next.js", "LangChain", "OpenAI API", "YouTube API", "Web Automation", "Custom Framework"],
    repoUrl: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
  },

  // Code Projects
 
  {
    id: "code-2",
    title: "Custom RAG Pipeline",
    description: "A Retrieval-Augmented Generation system that combines a vector database with LLM to provide accurate, contextual answers from proprietary data.",
    category: "code",
    image: "/projects/ai-rag.png",
    tags: ["Python", "LangChain", "OpenAI API", "Vector Databases", "ChromaDB", "FAISS/Pinecone"],
    repoUrl: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
  },
  
  // Bubble.io Plugin
  {
    id: "bubble-plugin-1",
    title: "Blueshirt Bubble Plugin",
    description: "A private Bubble.io plugin developed for the Blueshirt platform that enables direct document uploads to specific AWS S3 buckets, bypassing Bubble's standard storage limitations. The plugin also includes custom elements for generating QR code images, enhancing user interaction with the platform. The link here is a copy of the plugin, not the actual project.",
    category: "code",
    image: "/projects/bubble-plugin.png",
    tags: ["Bubble.io", "Plugin Development", "AWS S3", "QR Code Generation", "File Upload", "Custom Elements"],
    repoUrl: "https://github.com/Bobarinn/Bubble-Plugin-Trio-Plugin",
    demoUrl: "https://bubble.io/plugin/trio-plugin-1742775719689x439090325473984500",
  },
]; 