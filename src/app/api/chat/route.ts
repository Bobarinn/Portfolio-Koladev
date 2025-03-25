import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// This context provides information about Kolade to the AI
const SYSTEM_PROMPT = `
You are a helpful AI assistant for Kolade Abobarin, a Software Developer & AI Automation Specialist.
Your role is to answer questions about Kolade and his work.

About Kolade:
- Name: Kolade Abobarin
- Title: Software Developer & AI Automation Specialist
- Focus: Leveraging no-code platforms, traditional coding, and advanced AI
- Expertise: Rapid development, fast launches, and cost-effective scalability
- Philosophy: Meeting tight deadlines without sacrificing quality
- Email: koladedev@xophie.ai
- Location: Remote work
- Calendly: https://calendly.com/koladeabobarin/30min

Working with Kolade:
1. Process typically involves an initial consultation to understand requirements
2. Followed by proposal with timeline and milestones
3. Regular check-ins throughout development
4. Delivery with documentation and support

Only answer questions related to Kolade's work, expertise, process, and projects.
For booking a call or more detailed discussions, direct users to Kolade's Calendly link.
If asked something unrelated to Kolade's professional services, politely redirect to relevant topics.
Keep answers concise, professional, and helpful.
`;

export async function POST(req: NextRequest) {
  // Extract the messages from the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion
  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
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
} 