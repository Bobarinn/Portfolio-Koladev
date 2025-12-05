import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';
import { getProfileServer, getProjectsServer, getSkillsServer, getSideQuestsServer } from '@/lib/data-loader';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Cache the system prompt to reduce latency and cost
let cachedSystemPrompt: string | null = null;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ConversationSummary = {
  topics: string[];
  userIntent: string;
  hasBookingRequest: boolean;
  hasInternshipInquiry: boolean;
};

type Conversation = {
  sessionId: string;
  timestamp: string;
  userEmail: string;
  messageCount: number;
  messages: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
  summary: ConversationSummary;
};

// Function to save chat conversation
const saveChatConversation = async (messages: ChatMessage[], sessionId: string) => {
  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Create chat history file path
    const chatHistoryPath = path.join(dataDir, 'chat_history.json');
    
    // Read existing chat history or create new array
    let chatHistory: Conversation[] = [];
    try {
      const existingData = await readFile(chatHistoryPath, 'utf-8');
      chatHistory = JSON.parse(existingData);
    } catch {
      chatHistory = [];
    }

    // Create conversation entry
    const conversation: Conversation = {
      sessionId,
      timestamp: new Date().toISOString(),
      userEmail: messages.find(m => m.role === 'user')?.content?.includes('@') ? 
        messages.find(m => m.role === 'user')?.content.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || 'Unknown' : 'Unknown',
      messageCount: messages.length,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date().toISOString()
      })),
      summary: {
        topics: extractTopics(messages),
        userIntent: extractUserIntent(messages),
        hasBookingRequest: messages.some(m => 
          m.content.toLowerCase().includes('book') || 
          m.content.toLowerCase().includes('schedule') ||
          m.content.toLowerCase().includes('call')
        ),
        hasInternshipInquiry: messages.some(m => 
          m.content.toLowerCase().includes('internship') || 
          m.content.toLowerCase().includes('mba') ||
          m.content.toLowerCase().includes('summer 2026')
        )
      }
    };

    // Add to chat history
    chatHistory.push(conversation);

    // Save back to file
    await writeFile(chatHistoryPath, JSON.stringify(chatHistory, null, 2));
    
    console.log(`Chat conversation saved for session: ${sessionId}`);
  } catch (error) {
    console.error('Error saving chat conversation:', error);
  }
};

// Function to extract topics from conversation
const extractTopics = (messages: ChatMessage[]): string[] => {
  const topics = new Set<string>();
  const content = messages.map(m => m.content.toLowerCase()).join(' ');
  
  if (content.includes('internship') || content.includes('mba')) topics.add('Internship/MBA');
  if (content.includes('project') || content.includes('build')) topics.add('Project Discussion');
  if (content.includes('skill') || content.includes('technology')) topics.add('Skills/Technology');
  if (content.includes('resume') || content.includes('experience')) topics.add('Resume/Experience');
  if (content.includes('book') || content.includes('schedule')) topics.add('Booking Request');
  if (content.includes('ai') || content.includes('artificial intelligence')) topics.add('AI/ML');
  if (content.includes('no-code') || content.includes('bubble')) topics.add('No-Code');
  if (content.includes('product') || content.includes('management')) topics.add('Product Management');
  
  return Array.from(topics);
};

// Function to extract user intent
const extractUserIntent = (messages: ChatMessage[]): string => {
  const content = messages.map(m => m.content.toLowerCase()).join(' ');
  
  if (content.includes('internship') && content.includes('available')) return 'Internship Inquiry';
  if (content.includes('project') && content.includes('build')) return 'Project Discussion';
  if (content.includes('book') || content.includes('schedule')) return 'Booking Request';
  if (content.includes('skill') || content.includes('experience')) return 'Skills/Experience Inquiry';
  if (content.includes('resume') || content.includes('background')) return 'Resume/Background Request';
  
  return 'General Inquiry';
};

// Function to create system prompt
const createSystemPrompt = async () => {
  if (cachedSystemPrompt) {
    return cachedSystemPrompt;
  }

  // Fetch data from Supabase
  const [profileData, projectsData, skillsData, sideQuestsData] = await Promise.all([
    getProfileServer(),
    getProjectsServer(),
    getSkillsServer(),
    getSideQuestsServer(),
  ]);

  // Prepare project data
  const projectData = projectsData.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: (p.tags || []).join(', '),
    demoUrl: p.demoUrl || 'Not available',
    repoUrl: p.repoUrl || 'Not available',
  }));

  // Prepare skills data
  const skillsFormatted = skillsData.map(category => ({
    category: category.name,
    description: category.description,
    skills: category.skills.map((skill: { name: string; proficiency: number }) => `${skill.name} (${skill.proficiency}/10)`).join(', ')
  }));

  // Prepare sidequest data
  const sideQuestData = sideQuestsData.map(sq => ({
    title: sq.title,
    description: sq.description,
    tags: (sq.tags || []).join(', '),
    demoUrl: sq.demoUrl || 'Not available',
    repoUrl: sq.repoUrl || 'Not available',
  }));

  // Create the system prompt
  const systemPrompt = `
You are a helpful AI assistant for Kolade Abobarin, a Builder, MBA/MSIS Candidate, and Product-Driven Developer.
Your role is to answer questions about Kolade and his work, help clients with their projects, and provide insights about his MBA/MSIS journey and internship opportunities.

## About Kolade:
- **Name:** ${profileData?.name || 'Kolade Abobarin'} (Kolade for short and preferred)
- **Nickname:** ${profileData?.nickname || 'Kay'}
- **Title:** ${profileData?.title || ''}
- **Focus:** ${profileData?.tagline || ''}
- **Expertise:** ${profileData?.description || ''}
- **Email:** ${profileData?.email || ''}
- **Phone:** ${profileData?.phone || ''}
- **Location:** ${profileData?.location || ''}
- **Calendly:** ${profileData?.calendly_url || 'https://calendly.com/koladeabobarin/30min'}
- **Socials:** GitHub: ${profileData?.github || 'https://github.com/Bobarinn'}, LinkedIn: ${profileData?.linkedin || 'https://www.linkedin.com/in/koladeabobarin/'}
- **Work schedule:** ${profileData?.work_schedule || ''}

## Academic & Professional Background:
- **Current Status:** Dual MBA/MSIS candidate at Baylor University
- **Program Focus:** Business Administration (MBA) + Management Information Systems (MSIS)
- **Academic Interests:** Product Management, AI Strategy, Innovation, Digital Transformation
- **Career Transition:** From software development to business strategy and product leadership
- **Unique Value:** Combines technical expertise with strategic business thinking

## Education:
(Education details are available in Kolade's profile and resume)

## Work Experience:
(Work experience details are available in Kolade's profile and resume)

## Current Projects:
See the projects section below for details.

## Leadership & Volunteering:
(Leadership and volunteering details are available in Kolade's profile and resume)

## Certifications:
(Certification details are available in Kolade's profile and resume)

## Technical Skills:
See the skills section below for details.

## MBA Internship Status & Goals:
- **Target Period:** Summer 2026 MBA internship opportunities
- **Preferred Roles:** Product Management, AI Strategy, Innovation, Digital Transformation
- **Target Industries:** Tech companies, consulting firms, startups, enterprise software
- **Key Strengths:** Technical background + business acumen, rapid prototyping, AI integration
- **Availability:** Open to both full-time roles and project-based contracts
- **Geographic Flexibility:** Remote work preferred, open to relocation for right opportunity

## Business & Strategic Skills:
- **Product Strategy:** Market analysis, user research, product roadmapping, go-to-market planning
- **AI Strategy:** AI implementation, automation strategies, data-driven decision making
- **Innovation:** Rapid prototyping, MVP development, lean startup methodology
- **Leadership:** Cross-functional team collaboration, stakeholder management, project leadership
- **Analytics:** Data analysis, KPI tracking, performance optimization, business intelligence

## Working with Kolade:
1. **Initial Consultation:** Understanding business requirements and strategic objectives
2. **Strategic Planning:** Proposal with timeline, milestones, and success metrics
3. **Execution:** Regular check-ins with progress updates and stakeholder communication
4. **Delivery:** Complete solution with documentation, training, and ongoing support

## KOLADE'S PROJECTS:
${JSON.stringify(projectData, null, 2)}

## KOLADE'S SKILLS:
${JSON.stringify(skillsFormatted, null, 2)}

## KOLADE'S SIDE QUESTS:
${JSON.stringify(sideQuestData, null, 2)}

## FORMATTING INSTRUCTIONS:
- Use **bold text** for emphasis and importance
- Use *italics* sparingly for secondary emphasis
- Format links as [link text](URL)
- IMPORTANT: When mentioning the Calendly link, you MUST use this EXACT format: [book a call](${profileData?.calendly_url || 'https://calendly.com/koladeabobarin/30min'})
- Keep your responses compact and well-organized
- Lists should be tight and concise:
  - Use numbered lists (1., 2., etc.) for sequential steps
  - Use bullet points (- ) for non-sequential items
  - Avoid excessive spacing between list items
- Use "##" for main headings and "###" for subheadings, followed immediately by content
- Use > for quote blocks when sharing testimonials or important statements
- Use \`code\` or \`\`\` code blocks \`\`\` when discussing technical concepts
- Use horizontal rules (---) to separate major sections when appropriate
- Only use linebreaks when truly necessary to separate different topics
- Keep paragraphs short and to the point
- Aim for a clean, professional layout with minimal wasted space

## SPECIAL INSTRUCTIONS FOR MBA/INTERNSHIP QUESTIONS:
When asked about Kolade's MBA journey or internship opportunities, emphasize:
- His unique combination of technical expertise and business education
- Experience leading product launches from concept to execution
- Ability to bridge technical and business requirements
- Strategic thinking combined with hands-on implementation skills
- Interest in roles that leverage both his technical background and business acumen
- His proven track record of scaling teams and delivering $100K+ in business value

## SPECIAL INSTRUCTIONS FOR AVAILABILITY QUESTIONS:
When asked about Kolade's availability, ALWAYS use this exact format in your response:
"Kolade's availability can be checked and booked through his [Calendly link](${profileData?.calendly_url || 'https://calendly.com/koladeabobarin/30min'}). This will provide you with the most up-to-date slots for consultations and discussions about your projects or internship opportunities. Feel free to schedule a time that works best for you!"

## SPECIAL INSTRUCTIONS FOR INTERNSHIP QUESTIONS:
When asked about internship opportunities, mention that Kolade is actively seeking Summer 2026 MBA internship roles in Product Management, AI Strategy, or Innovation. Emphasize his technical background combined with strategic thinking and his ability to build scalable, AI-powered tools. Highlight his experience leading multiple product launches and his understanding of both technical implementation and business strategy.

Only answer questions related to Kolade's work, expertise, process, projects, MBA/MSIS journey, or internship opportunities.
For booking a call or more detailed discussions, you MUST include this exact text: "You can [book a call](${profileData?.calendly_url || 'https://calendly.com/koladeabobarin/30min'}) with Kolade to discuss your project or internship opportunity."
If asked something unrelated to Kolade's professional services, politely redirect to relevant topics.
Keep answers concise, professional, and helpful.
`;

  // Cache the prompt
  cachedSystemPrompt = systemPrompt;
  return systemPrompt;
};

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    // Extract the messages from the request
    const { messages, sessionId } = await req.json();

    // Get the system prompt (uses cached version if available)
    const SYSTEM_PROMPT = await createSystemPrompt();

    // Ask OpenAI for a streaming chat completion
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
    });

    // Transform the stream into a text-decoder friendly stream
    const textEncoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            fullResponse += text;
            controller.enqueue(textEncoder.encode(text));
          }
        }
        
        // Save the complete conversation after the response is finished
        if (sessionId) {
          const completeMessages = [
            ...messages,
            { role: 'assistant', content: fullResponse }
          ];
          await saveChatConversation(completeMessages, sessionId);
        }
        
        controller.close();
      },
    });

    // Return the response as a readable stream
    return new Response(readable);
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 