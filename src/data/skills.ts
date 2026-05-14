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
    id: "code",
    name: "Code",
    description: "Developing custom applications and services using modern programming languages.",
    skills: [
      { name: "JavaScript", icon: "javascript", proficiency: 10 },
      { name: "Python", icon: "python", proficiency: 9 },
      { name: "SQL", icon: "database", proficiency: 9 },
    ],
  },
  {
    id: "backend-data",
    name: "Backend & Data",
    description: "Database management and backend services for scalable application infrastructure.",
    skills: [
      { name: "Oracle SQL", icon: "database", proficiency: 8 },
      { name: "Firebase", icon: "firebase", proficiency: 10 },
      { name: "Supabase", icon: "supabase", proficiency: 9 },
      { name: "Xano", icon: "xano", proficiency: 9 },
    ],
  },
  {
    id: "ai",
    name: "AI/ML",
    description: "Building intelligent applications with AI tools and frameworks.",
    skills: [
      { name: "Claude Code", icon: "claude", proficiency: 10 },
      { name: "Codex", icon: "codex", proficiency: 9 },
      { name: "Langchain", icon: "langchain", proficiency: 9 },
      { name: "MCP", icon: "mcp", proficiency: 8 },
    ],
  },
];
