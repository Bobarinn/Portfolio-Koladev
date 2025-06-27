import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

type Conversation = {
  sessionId: string;
  timestamp: string;
  userEmail: string;
  messageCount: number;
  messages: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
  summary: {
    topics: string[];
    userIntent: string;
    hasBookingRequest: boolean;
    hasInternshipInquiry: boolean;
  };
};

export async function GET() {
  try {
    const chatHistoryPath = path.join(process.cwd(), 'data', 'chat_history.json');
    
    if (!existsSync(chatHistoryPath)) {
      return new Response(JSON.stringify({ error: 'No chat history found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const chatData = await readFile(chatHistoryPath, 'utf-8');
    const chatHistory: Conversation[] = JSON.parse(chatData);

    // Convert to CSV format for Excel compatibility
    let csvContent = 'Session ID,Timestamp,User Email,Message Count,Topics,User Intent,Has Booking Request,Has Internship Inquiry,First User Message,First Assistant Response\n';

    chatHistory.forEach((conversation) => {
      const firstUserMessage = conversation.messages.find((m) => m.role === 'user')?.content?.substring(0, 100) || '';
      const firstAssistantResponse = conversation.messages.find((m) => m.role === 'assistant')?.content?.substring(0, 100) || '';
      
      const row = [
        conversation.sessionId,
        conversation.timestamp,
        conversation.userEmail,
        conversation.messageCount,
        conversation.summary.topics.join('; '),
        conversation.summary.userIntent,
        conversation.summary.hasBookingRequest ? 'Yes' : 'No',
        conversation.summary.hasInternshipInquiry ? 'Yes' : 'No',
        `"${firstUserMessage.replace(/"/g, '""')}"`,
        `"${firstAssistantResponse.replace(/"/g, '""')}"`
      ].join(',');
      
      csvContent += row + '\n';
    });

    // Return as CSV file
    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="chat_history_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('Error exporting chat history:', error);
    return new Response(JSON.stringify({ error: 'Failed to export chat history' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 