/**
 * Script to populate ONLY skills in Supabase database
 * Run with: npx tsx scripts/populate-skills-only.ts
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
    
    console.log(`Found ${existing.length} existing skills`);
    
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

async function main() {
  console.log('🚀 Starting skills population...\n');
  console.log(`Using base URL: ${BASE_URL}\n`);

  try {
    await populateSkills();
    console.log('\n✨ Skills population completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during skills population:', error);
    process.exit(1);
  }
}

main();






