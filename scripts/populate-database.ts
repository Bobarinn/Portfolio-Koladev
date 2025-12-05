/**
 * Script to populate Supabase database with data from hardcoded files
 * Run with: npx tsx scripts/populate-database.ts
 */

import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('Error: ADMIN_PASSWORD or NEXT_PUBLIC_ADMIN_PASSWORD must be set');
  process.exit(1);
}

async function makeRequest(endpoint: string, method: string, body?: any) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_PASSWORD}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to ${method} ${endpoint}: ${response.status} ${error}`);
  }

  return response.json();
}

async function populateProfile() {
  console.log('📝 Populating profile...');
  
  const profileData = {
    name: "Kolade Victor Abobarin",
    nickname: "Kay",
    title: "MBA/MSIS Candidate | Product-Driven Developer",
    tagline: "From Idea to Scalable Product — Code, No-Code & AI",
    aim: "Actively seeking Summer 2026 MBA internship opportunities to build innovative products at the intersection of tech and business.",
    description: "MBA/MSIS candidate with 3+ years of experience leading AI-driven product innovation across global teams. Skilled in defining vision, roadmaps, and metrics that connect business outcomes with technologies like LLMs, RAG, and agentic AI.",
    summary: "I build scalable digital solutions using no-code platforms, traditional coding, and AI. My focus is on rapid development and cost-effective scalability, with experience leading multiple product launches from concept to execution.",
    work_schedule: "I work 24/7, but my best hours are between 9 AM and 11 PM GMT+1. I'm available for meetings at any time. I am Open to full time role, as well as project based contracts, but that depends on if i have other engagements or not",
    email: "koladeabobarin@gmail.com",
    phone: "254-447-4042",
    location: "Waco, Texas and All of United States",
    calendly_url: "https://calendly.com/koladeabobarin/30min",
    resume_url: "/resume.pdf",
    linkedin: "https://www.linkedin.com/in/koladeabobarin/",
    github: "https://github.com/Bobarinn",
    about_me: "Product Strategy, Roadmapping, Agile Product Lifecycle, AI/ML Product Management, LLMs, Agentic AI, Retrieval-Augmented Generation (RAG), Data Analytics (Python, SQL), Generative AI, Cloud Platforms (GCP, Firebase), Business Case Development, Stakeholder Management, Process Optimization, Vibe Coding",
  };

  try {
    // Check if profile exists
    const existing = await makeRequest('/api/admin/profile', 'GET').catch(() => null);
    
    if (existing) {
      // Update existing profile
      await makeRequest('/api/admin/profile', 'PUT', { ...profileData, id: existing.id });
      console.log('✅ Profile updated');
    } else {
      // Create new profile
      await makeRequest('/api/admin/profile', 'POST', profileData);
      console.log('✅ Profile created');
    }
  } catch (error) {
    console.error('❌ Error populating profile:', error);
  }
}

// Helper function to check if we should skip (idempotent mode)
const SKIP_EXISTING = process.env.SKIP_EXISTING === 'true';

async function populateExperience() {
  console.log('💼 Populating experience...');
  
  const experiences = [
    {
      company: "DI9ITAL LIMITED",
      role: "Senior Software Developer & Product Lead",
      location: "Bristol, UK",
      duration: "Mar 2025 – Jun 2025",
      description: "Led client discovery and product planning sessions to translate user needs into technical requirements and product roadmaps.",
      achievements: [
        "Led client discovery and product planning sessions to translate user needs into technical requirements and product roadmaps, reducing engineering rework by 30% through clearer scope alignment",
        "Designed scalable, customer-centric product systems using reusable component libraries and metrics-driven user flows, improving onboarding efficiency by 50% and ensuring consistent, high-quality customer experiences",
        "Streamlined development processes by introducing structured code reviews and stage-gate approvals, cutting delivery cycle time by 50% and engineering costs by 25%"
      ],
      display_order: 1,
    },
    {
      company: "WE MAKE MVP INC.",
      role: "Senior Software Developer",
      location: "Kyiv, Ukraine",
      duration: "Jul 2024 – Feb 2025",
      description: "Managed a global cross-functional team of 12+ engineers and designers to deliver MVPs from concept to launch.",
      achievements: [
        "Managed a global cross-functional team of 12+ engineers and designers to deliver MVPs from concept to launch, defining success metrics and aligning sprints with product strategy, ensuring 100% on-time delivery",
        "Designed and built AI-powered product features by writing detailed functional specifications for task and budget generation tools leveraging Gemini API, achieving 99% output accuracy and reducing manual input errors",
        "Improved program quality and launch readiness by implementing QA pipelines and bug tracking processes, ensuring all releases met scope, timeline, and performance metrics"
      ],
      display_order: 2,
    },
    {
      company: "BLUESHIRT INC.",
      role: "Lead Front-End Developer & Product Lead",
      location: "Quezon City, Philippines",
      duration: "Jan 2024 – Jun 2024",
      description: "Led migration of legacy data and features from Bubble to a node.js backend.",
      achievements: [
        "Led migration of legacy data and features from Bubble to a node.js backend, achieving 99% uptime through a 3-month dual-run plan",
        "Prioritized product backlog using analytics and user feedback, improving load speed by 150% and doubling monthly active users",
        "Collaborated with backend engineering teams to design and launch scalable ML/OCR pipelines, leveraging data insights to improve resume parsing accuracy by 35% and enhance recruiter and applicant experience"
      ],
      display_order: 3,
    },
    {
      company: "BLUESHIRT INC.",
      role: "Software Developer",
      location: "Quezon City, Philippines",
      duration: "Jul 2022 – Dec 2023",
      description: "Revamped the job seeker onboarding experience and designed algorithms to curate job recommendations.",
      achievements: [
        "Revamped the job seeker onboarding experience and designed algorithms to curate job recommendations based on skills and experience, improving job match accuracy by 40%",
        "Partnered with marketing to align campaign messaging with landing and onboarding pages and localize the app in Tagalog, driving a 45% MoM increase in visitor-to-sign-up conversion"
      ],
      display_order: 4,
    },
    {
      company: "AZA GLOBAL INC.",
      role: "Product Manager",
      location: "Lagos, Nigeria",
      duration: "Jan 2022 – Jun 2022",
      description: "Owned full product lifecycle for QPay, a fintech product.",
      achievements: [
        "Owned full product lifecycle for QPay, a fintech product, leading customer discovery, defining roadmap and success metrics, writing PR/FAQ and business cases, and driving go-to-market execution, achieving 500+ users and $5K+ transactions within the first month",
        "Partnered with engineering, legal, and finance to design and implement KYC/AML and fraud-control frameworks, ensuring regulatory compliance and lowering chargeback risk by over 40%",
        "Established a two-week release cadence with active risk tracking and stakeholder updates, instrumenting key user funnels to prioritize high-impact improvements and reducing time from sign-up to first transaction to under 24 hours"
      ],
      display_order: 5,
    },
  ];

  try {
    const existing = await makeRequest('/api/admin/experience', 'GET');
    const existingArray = Array.isArray(existing) ? existing : [];
    
    if (SKIP_EXISTING && existingArray.length > 0) {
      console.log(`⏭️  Skipping experience (${existingArray.length} entries already exist)`);
      return;
    }
    
    // Delete existing entries
    for (const exp of existingArray) {
      if (exp && exp.id) {
        await makeRequest(`/api/admin/experience?id=${exp.id}`, 'DELETE');
      }
    }

    // Create new entries
    for (const exp of experiences) {
      await makeRequest('/api/admin/experience', 'POST', exp);
    }
    console.log(`✅ Created ${experiences.length} experience entries`);
  } catch (error) {
    console.error('❌ Error populating experience:', error);
    throw error;
  }
}

async function populateEducation() {
  console.log('🎓 Populating education...');
  
  const educations = [
    {
      institution: "Baylor University",
      school: "Baylor University",
      degree: "Master of Business Administration (MBA) & M.Sc. in Information Systems",
      location: "Waco, Texas",
      year: "Expected Graduation: 05/27",
      period: "Expected Graduation: 05/27",
      gpa: null,
      relevant_coursework: [
        "Information Systems Design",
        "Corporate Finance",
        "Business & Customer Analytics",
        "Database Management",
        "Python"
      ],
      display_order: 1,
    },
    {
      institution: "Obafemi Awolowo University",
      school: "Obafemi Awolowo University",
      degree: "BSc. Civil Engineering",
      location: "Ile-Ife, Nigeria",
      year: "Dec 2021",
      period: "Aug 2016 – Dec 2021",
      gpa: "3.3",
      relevant_coursework: [],
      display_order: 2,
    },
  ];

  try {
    const existing = await makeRequest('/api/admin/education', 'GET');
    const existingArray = Array.isArray(existing) ? existing : [];
    
    if (SKIP_EXISTING && existingArray.length > 0) {
      console.log(`⏭️  Skipping education (${existingArray.length} entries already exist)`);
      return;
    }
    
    // Delete existing entries
    for (const edu of existingArray) {
      if (edu && edu.id) {
        await makeRequest(`/api/admin/education?id=${edu.id}`, 'DELETE');
      }
    }

    // Create new entries
    for (const edu of educations) {
      await makeRequest('/api/admin/education', 'POST', edu);
    }
    console.log(`✅ Created ${educations.length} education entries`);
  } catch (error) {
    console.error('❌ Error populating education:', error);
    throw error;
  }
}

async function populateProjects() {
  console.log('🚀 Populating projects...');
  
  const projects = [
    {
      name: "NuptAI",
      title: "NuptAI",
      description: "A wedding planning software that uses AI to generate personalized planning schedules, budgets, and vendor suggestions based on user preferences and choices.",
      category: "no-code",
      image: "/projects/nuptai.png",
      images: ["/projects/nuptai.png"],
      tags: ["Bubble.io", "Stripe", "Gemini", "No-Code", "Automation", "Custom Workflows"],
      demo_url: "https://nupt.ai/",
      display_order: 1,
    },
    {
      name: "Xophie.ai",
      title: "Xophie.ai",
      description: "An AI meeting assistant that records, transcribes, and organizes meeting notes. It leverages AssemblyAI, Recall.ai, Zoom API SDK, Firebase auth, and cloud functions to bring about a well-rounded application for advanced speech-to-text intelligence and seamless meeting management.",
      category: "ai",
      image: "/projects/xophie.png",
      images: ["/projects/xophie.png"],
      tags: ["Next.js", "Flutterwave", "TypeScript", "Firebase", "AssemblyAI", "Recall.ai", "Zoom SDK"],
      demo_url: "https://xophie.ai",
      repo_url: "https://github.com/Bobarinn/xophieai",
      display_order: 2,
    },
    {
      name: "Traleado.com",
      title: "Traleado.com",
      description: "A dynamic marketplace platform that automates lead generation and management. It connects lead sellers with buyers through seamless real-time integrations and advanced workflow automation.",
      category: "no-code",
      image: "/projects/traleado.png",
      images: ["/projects/traleado.png"],
      tags: ["Bubble.io", "API Integrations", "Workflow Automation"],
      demo_url: "https://traleado.com",
      display_order: 3,
    },
    {
      name: "Blueshirt Work",
      title: "Blueshirt Work",
      description: "A job listing platform for blue-collar work in the Philippines, available on the Playstore. This project involved handling complex API integrations with an external database to ensure seamless functionality.",
      category: "no-code",
      image: "/projects/blueshirt.png",
      images: ["/projects/blueshirt.png"],
      tags: ["Bubble.io", "External API", "Database Management", "Mobile App"],
      demo_url: "https://blueshirt.work",
      display_order: 4,
    },
    {
      name: "Sendwork.com",
      title: "Sendwork.com",
      description: "A Project Pricing and Task Management App for home service businesses. It's built to help contractors manage customer details, schedule jobs/tasks, and delegate work with a complex, robust database setup.",
      category: "no-code",
      image: "/projects/sendwork.svg",
      images: ["/projects/sendwork.svg"],
      tags: ["Bubble.io", "Database Management", "API Integrations", "Workflow Automation"],
      demo_url: "https://sendwork.com/",
      display_order: 5,
    },
    {
      name: "Invisible Strengths",
      title: "Invisible Strengths",
      description: "A job platform that promotes inclusion and support for disabled jobseekers, featuring user-friendly design and robust data handling to connect candidates with suitable opportunities.",
      category: "no-code",
      image: "/projects/invisible-strengths.png",
      images: ["/projects/invisible-strengths.png"],
      tags: ["Bubble.io", "API Integrations", "Responsive Design", "Accessibility"],
      demo_url: "https://www.invisiblestrengths.com/",
      display_order: 6,
    },
    {
      name: "Captain Stash (MyProfitStash)",
      title: "Captain Stash (MyProfitStash)",
      description: "A dynamic web application that leverages OpenAI's API for generating interactive and personalized content.",
      category: "no-code",
      image: "/projects/myprofitstash.png",
      images: ["/projects/myprofitstash.png"],
      tags: ["Bubble.io", "OpenAI API", "Custom Workflows"],
      demo_url: "https://myprofitstash.com/",
      display_order: 7,
    },
    {
      name: "Reppute",
      title: "Reppute",
      description: "A personal learning portfolio project that integrates a Firebase backend and authentication with Bubble's frontend. It also includes a cross-platform mobile app developed using Flutterflow.",
      category: "no-code",
      image: "/projects/reppute.png",
      images: ["/projects/reppute.png"],
      tags: ["Bubble.io", "Firebase", "Flutterflow", "API Integrations"],
      demo_url: "https://reppute.bubbleapps.io/version-test/",
      display_order: 8,
    },
    {
      name: "Learning Chatbot Agent",
      title: "Learning Chatbot Agent",
      description: "A chatbot designed to help users discover relevant YouTube videos and online resources, enhancing the learning experience with curated recommendations.",
      category: "ai",
      image: "/projects/learning-chatbot.png",
      images: ["/projects/learning-chatbot.png"],
      tags: ["Next.js", "LangChain", "OpenAI API", "YouTube API", "Web Automation", "Custom Framework"],
      repo_url: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
      display_order: 9,
    },
    {
      name: "Custom RAG Pipeline",
      title: "Custom RAG Pipeline",
      description: "A Retrieval-Augmented Generation system that combines a vector database with LLM to provide accurate, contextual answers from proprietary data.",
      category: "code",
      image: "/projects/ai-rag.png",
      images: ["/projects/ai-rag.png"],
      tags: ["Python", "LangChain", "OpenAI API", "Vector Databases", "ChromaDB", "FAISS/Pinecone"],
      repo_url: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
      display_order: 10,
    },
    {
      name: "Blueshirt Bubble Plugin",
      title: "Blueshirt Bubble Plugin",
      description: "A private Bubble.io plugin developed for the Blueshirt platform that enables direct document uploads to specific AWS S3 buckets, bypassing Bubble's standard storage limitations. The plugin also includes custom elements for generating QR code images, enhancing user interaction with the platform. The link here is a copy of the plugin, not the actual project.",
      category: "code",
      image: "/projects/bubble-plugin.png",
      images: ["/projects/bubble-plugin.png"],
      tags: ["Bubble.io", "Plugin Development", "AWS S3", "QR Code Generation", "File Upload", "Custom Elements"],
      repo_url: "https://github.com/Bobarinn/Bubble-Plugin-Trio-Plugin",
      demo_url: "https://bubble.io/plugin/trio-plugin-1742775719689x439090325473984500",
      display_order: 11,
    },
  ];

  try {
    const existing = await makeRequest('/api/admin/projects', 'GET');
    const existingArray = Array.isArray(existing) ? existing : [];
    
    if (SKIP_EXISTING && existingArray.length > 0) {
      console.log(`⏭️  Skipping projects (${existingArray.length} entries already exist)`);
      return;
    }
    
    // Delete existing entries
    for (const proj of existingArray) {
      if (proj && proj.id) {
        await makeRequest(`/api/admin/projects?id=${proj.id}`, 'DELETE');
      }
    }

    // Create new entries
    for (const proj of projects) {
      await makeRequest('/api/admin/projects', 'POST', proj);
    }
    console.log(`✅ Created ${projects.length} project entries`);
  } catch (error) {
    console.error('❌ Error populating projects:', error);
    throw error;
  }
}

async function populateSkills() {
  console.log('🛠️  Populating skills...');
  
  const skills = [
    // No-Code
    { name: "Bubble.io", category: "no-code", icon: "bubble", proficiency: 10, display_order: 1 },
    { name: "Database Design", category: "no-code", icon: "database", proficiency: 10, display_order: 2 },
    { name: "API Integrations", category: "no-code", icon: "api", proficiency: 10, display_order: 3 },
    { name: "Workflow Automation", category: "no-code", icon: "workflow", proficiency: 10, display_order: 4 },
    { name: "FlutterFlow", category: "no-code", icon: "flutterflow", proficiency: 9, display_order: 5 },
    { name: "Responsive Design", category: "no-code", icon: "responsive", proficiency: 9, display_order: 6 },
    { name: "User Authentication", category: "no-code", icon: "auth", proficiency: 10, display_order: 7 },
    { name: "Payment Processing", category: "no-code", icon: "payment", proficiency: 9, display_order: 8 },
    
    // Code
    { name: "JavaScript", category: "code", icon: "javascript", proficiency: 10, display_order: 1 },
    { name: "HTML/CSS", category: "code", icon: "html", proficiency: 10, display_order: 2 },
    { name: "Python", category: "code", icon: "python", proficiency: 8, display_order: 3 },
    { name: "Next.js", category: "code", icon: "nextjs", proficiency: 10, display_order: 4 },
    { name: "Firebase", category: "code", icon: "firebase", proficiency: 10, display_order: 5 },
    { name: "REST APIs", category: "code", icon: "api", proficiency: 8, display_order: 6 },
    { name: "Git", category: "code", icon: "git", proficiency: 8, display_order: 7 },
    { name: "Responsive Web Design", category: "code", icon: "responsive", proficiency: 10, display_order: 8 },
    { name: "Mobile App Development", category: "code", icon: "mobile", proficiency: 9, display_order: 9 },
    
    // AI
    { name: "OpenAI API", category: "ai", icon: "openai", proficiency: 10, display_order: 1 },
    { name: "AI Integration", category: "ai", icon: "ai", proficiency: 10, display_order: 2 },
    { name: "Prompt Engineering", category: "ai", icon: "prompt", proficiency: 10, display_order: 3 },
    { name: "Langchain", category: "ai", icon: "langchain", proficiency: 8, display_order: 4 },
    { name: "Hugging Face", category: "ai", icon: "huggingface", proficiency: 9, display_order: 5 },
    { name: "Chatbot Development", category: "ai", icon: "chatbot", proficiency: 9, display_order: 6 },
    { name: "AI Workflow Automation", category: "ai", icon: "workflow", proficiency: 10, display_order: 7 },
  ];

  try {
    const response = await makeRequest('/api/admin/skills', 'GET');
    // Skills API returns { data, grouped }, so we need to use response.data
    const existing = Array.isArray(response) ? response : (response.data || []);
    
    if (SKIP_EXISTING && existing.length > 0) {
      console.log(`⏭️  Skipping skills (${existing.length} entries already exist)`);
      return;
    }
    
    // Delete existing entries
    for (const skill of existing) {
      if (skill && skill.id) {
        await makeRequest(`/api/admin/skills?id=${skill.id}`, 'DELETE');
      }
    }

    // Create new entries
    for (const skill of skills) {
      await makeRequest('/api/admin/skills', 'POST', skill);
    }
    console.log(`✅ Created ${skills.length} skill entries`);
  } catch (error) {
    console.error('❌ Error populating skills:', error);
    throw error;
  }
}

async function populateSideQuests() {
  console.log('🎮 Populating sidequests...');
  
  const sidequests = [
    {
      title: "Reppute Flutterflow App",
      description: "A cross-platform mobile application version of Reppute built with Flutterflow, featuring user authentication, profile management, and real-time updates from Firebase backend.",
      image: "/sidequests/reppute.png",
      images: ["/sidequests/reppute.png"],
      tags: ["Flutterflow", "Flutter", "Firebase", "Mobile App", "Android", "iOS", "Authentication"],
      demo_url: "https://reppute.flutterflow.app/",
      display_order: 1,
    },
    {
      title: "Learning Chatbot Agent",
      description: "A chatbot designed to help users discover relevant YouTube videos and online resources, enhancing the learning experience with curated recommendations.",
      image: "/projects/learning-chatbot.png",
      images: ["/projects/learning-chatbot.png"],
      tags: ["Next.js", "LangChain", "OpenAI API", "YouTube API", "Web Automation", "Custom Framework"],
      repo_url: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
      display_order: 2,
    },
    {
      title: "Custom RAG Pipeline",
      description: "A Retrieval-Augmented Generation system that combines a vector database with LLM to provide accurate, contextual answers from proprietary data.",
      image: "/projects/ai-rag.png",
      images: ["/projects/ai-rag.png"],
      tags: ["Python", "LangChain", "OpenAI API", "Vector Databases", "ChromaDB", "FAISS/Pinecone"],
      repo_url: "https://github.com/Bobarinn/Advanced-RAG-Techniques",
      display_order: 3,
    },
  ];

  try {
    const existing = await makeRequest('/api/admin/sidequests', 'GET');
    const existingArray = Array.isArray(existing) ? existing : [];
    
    if (SKIP_EXISTING && existingArray.length > 0) {
      console.log(`⏭️  Skipping sidequests (${existingArray.length} entries already exist)`);
      return;
    }
    
    // Delete existing entries
    for (const sq of existingArray) {
      if (sq && sq.id) {
        await makeRequest(`/api/admin/sidequests?id=${sq.id}`, 'DELETE');
      }
    }

    // Create new entries
    for (const sq of sidequests) {
      await makeRequest('/api/admin/sidequests', 'POST', sq);
    }
    console.log(`✅ Created ${sidequests.length} sidequest entries`);
  } catch (error) {
    console.error('❌ Error populating sidequests:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting database population...\n');
  console.log(`Using base URL: ${BASE_URL}\n`);

  try {
    await populateProfile();
    await populateExperience();
    await populateEducation();
    await populateProjects();
    await populateSkills();
    await populateSideQuests();
    
    console.log('\n✨ Database population completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during database population:', error);
    process.exit(1);
  }
}

main();

