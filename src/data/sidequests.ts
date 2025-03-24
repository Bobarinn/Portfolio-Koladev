export interface SideQuest { id: string; title: string; description: string; image: string; tags: string[]; demoUrl?: string; repoUrl?: string; }

export const sideQuests: SideQuest[] = [
  {
    id: "quest-1",
    title: "Reppute Flutterflow App",
    description: "A cross-platform mobile application version of Reppute built with Flutterflow, featuring user authentication, profile management, and real-time updates from Firebase backend.",
    image: "/sidequests/reppute.png",
    tags: ["Flutterflow", "Flutter", "Firebase", "Mobile App", "Android", "iOS", "Authentication"],
    demoUrl: "https://reppute.flutterflow.app/",
  },
  {
    id: "ai-3",
    title: "Learning Chatbot Agent",
    description: "A chatbot designed to help users discover relevant YouTube videos and online resources, enhancing the learning experience with curated recommendations.",
    image: "/projects/learning-chatbot.png",
    tags: ["Next.js", "LangChain", "OpenAI API", "YouTube API", "Web Automation", "Custom Framework"],
    repoUrl: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
  },
  {
    id: "code-2",
    title: "Custom RAG Pipeline",
    description: "A Retrieval-Augmented Generation system that combines a vector database with LLM to provide accurate, contextual answers from proprietary data.",
    image: "/projects/ai-rag.png",
    tags: ["Python", "LangChain", "OpenAI API", "Vector Databases", "ChromaDB", "FAISS/Pinecone"],
    repoUrl: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
  },
];
