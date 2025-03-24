export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  proficiency: number; // 1-10
}

export const skillCategories: SkillCategory[] = [
  {
    id: "no-code",
    name: "No-Code",
    description: "Building fully functional applications without traditional coding using visual development platforms.",
    skills: [
      { name: "Bubble.io", icon: "bubble", proficiency: 10 },
      { name: "Database Design", icon: "database", proficiency: 10 },
      { name: "API Integrations", icon: "api", proficiency: 10 },
      { name: "Workflow Automation", icon: "workflow", proficiency: 10 },
      { name: "FlutterFlow", icon: "flutterflow", proficiency: 9 },
      { name: "Responsive Design", icon: "responsive", proficiency: 9 },
      { name: "User Authentication", icon: "auth", proficiency: 10 },
      { name: "Payment Processing", icon: "payment", proficiency: 9 },
    ],
  },
  {
    id: "code",
    name: "Code",
    description: "Developing custom applications and services using modern programming languages and frameworks.",
    skills: [
      { name: "JavaScript", icon: "javascript", proficiency: 10 },
      { name: "HTML/CSS", icon: "html", proficiency: 10 },
      { name: "Python", icon: "python", proficiency: 8 },
      { name: "Next.js", icon: "nextjs", proficiency: 10 },
      { name: "Firebase", icon: "firebase", proficiency: 10 },
      { name: "REST APIs", icon: "api", proficiency: 8 },
      { name: "Git", icon: "git", proficiency: 8 },
      { name: "Responsive Web Design", icon: "responsive", proficiency: 10 },
      { name: "Mobile App Development", icon: "mobile", proficiency: 9 },
    ],
  },
  {
    id: "ai",
    name: "AI/ML",
    description: "Leveraging artificial intelligence and machine learning technologies to build intelligent applications.",
    skills: [
      { name: "OpenAI API", icon: "openai", proficiency: 10 },
      { name: "AI Integration", icon: "ai", proficiency: 10 },
      { name: "Prompt Engineering", icon: "prompt", proficiency: 10 },
      { name: "Langchain", icon: "langchain", proficiency: 8 },
      { name: "Hugging Face", icon: "huggingface", proficiency: 9 },
      { name: "Chatbot Development", icon: "chatbot", proficiency: 9 },
      { name: "AI Workflow Automation", icon: "workflow", proficiency: 10 },
    ],
  },
];
