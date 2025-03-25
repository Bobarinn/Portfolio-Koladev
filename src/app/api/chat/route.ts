import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { sideQuests } from '@/data/sidequests';

// Cache the system prompt to reduce latency and cost
let cachedSystemPrompt: string | null = null;

// Function to create system prompt
const createSystemPrompt = () => {
  if (cachedSystemPrompt) {
    return cachedSystemPrompt;
  }

  // Prepare project data
  const projectData = projects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags.join(', '),
    demoUrl: p.demoUrl || 'Not available',
    repoUrl: p.repoUrl || 'Not available',
  }));

  // Prepare skills data
  const skillsData = skillCategories.map(category => ({
    category: category.name,
    description: category.description,
    skills: category.skills.map(skill => `${skill.name} (${skill.proficiency}/10)`).join(', ')
  }));

  // Prepare sidequest data
  const sideQuestData = sideQuests.map(sq => ({
    title: sq.title,
    description: sq.description,
    tags: sq.tags.join(', '),
    demoUrl: sq.demoUrl || 'Not available',
    repoUrl: sq.repoUrl || 'Not available',
  }));

  // Create the system prompt
  const systemPrompt = `
You are a helpful AI assistant for Kolade Abobarin, a Software Developer & AI Automation Specialist.
Your role is to answer questions about Kolade and his work, and clients with their projects, you can generate plans, user flows,CJM , when asked or prompted.

About Kolade:
- Name: ${profile.name} (Kolade for short and preferred)
- Nickname: ${profile.nickname}
- Title: ${profile.title}
- Focus: ${profile.tagline}
- Expertise: ${profile.description}
- Email: ${profile.email}
- Location: ${profile.location}
- Calendly: ${profile.calendlyUrl}
- Socials: ${profile.socials.map(social => `${social.name}: ${social.url}`).join(', ')}
- Work schedule: ${profile.workSchedule}

Working with Kolade:
1. Process typically involves an initial consultation to understand requirements
2. Followed by proposal with timeline and milestones
3. Regular check-ins throughout development
4. Delivery with documentation and support

KOLADE'S PROJECTS:
${JSON.stringify(projectData, null, 2)}

KOLADE'S SKILLS:
${JSON.stringify(skillsData, null, 2)}

KOLADE'S SIDE QUESTS:
${JSON.stringify(sideQuestData, null, 2)}

FORMATTING INSTRUCTIONS:
- Use **bold text** for emphasis and importance
- Use *italics* sparingly for secondary emphasis
- Format links as [link text](URL)
- IMPORTANT: When mentioning the Calendly link, you MUST use this EXACT format: [book a call](${profile.calendlyUrl})
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

Only answer questions related to Kolade's work, expertise, process, and projects.
For booking a call or more detailed discussions, you MUST include this exact text: "You can [book a call](${profile.calendlyUrl}) with Kolade to discuss your project."
If asked something unrelated to Kolade's professional services, politely redirect to relevant topics.
Keep answers concise, professional, and helpful.

SPECIAL INSTRUCTIONS FOR AVAILABILITY QUESTIONS:
When asked about Kolade's availability, ALWAYS use this exact format in your response:
"Kolade's availability can be checked and booked through his [Calendly link](${profile.calendlyUrl}). This will provide you with the most up-to-date slots for consultations and discussions about your projects. Feel free to schedule a time that works best for you!"
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
    const { messages } = await req.json();

    // Get the system prompt (uses cached version if available)
    const SYSTEM_PROMPT = createSystemPrompt();

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
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            controller.enqueue(textEncoder.encode(text));
          }
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