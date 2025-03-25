'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { MessageSquareIcon, X, Send, Maximize2, Minimize2, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define message limit constants
const MAX_MESSAGES_PER_SESSION = 25;
const LOCAL_STORAGE_KEY = 'portfolio_chat_usage';

type MessageType = {
  role: 'user' | 'assistant';
  content: string;
  id?: string; // Adding an id to track messages more reliably
};

type UsageData = {
  messageCount: number;
  lastReset: number;
};

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [usageLimit, setUsageLimit] = useState<UsageData>({ messageCount: 0, lastReset: Date.now() });
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load usage data from localStorage on mount
  useEffect(() => {
    const storedUsage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsage) {
      const parsedUsage = JSON.parse(storedUsage) as UsageData;
      
      // Reset count if it's been more than 7 days
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsedUsage.lastReset > oneWeekMs) {
        const resetUsage = { messageCount: 0, lastReset: Date.now() };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resetUsage));
        setUsageLimit(resetUsage);
        setLimitReached(false);
      } else {
        setUsageLimit(parsedUsage);
        setLimitReached(parsedUsage.messageCount >= MAX_MESSAGES_PER_SESSION);
      }
    }
  }, []);

  // Update localStorage when message count changes
  const updateUsageCount = (increment: boolean = true) => {
    const newCount = increment ? usageLimit.messageCount + 1 : usageLimit.messageCount;
    const newUsage = { ...usageLimit, messageCount: newCount };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUsage));
    setUsageLimit(newUsage);
    
    if (newCount >= MAX_MESSAGES_PER_SESSION) {
      setLimitReached(true);
    }
  };

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add initial welcome message if opening with no messages
    if (!isOpen && messages.length === 0) {
      showWelcomeMessage();
    }
  };

  const showWelcomeMessage = () => {
    setIsTyping(true);
    setTimeout(() => {
      const welcomeMessage: MessageType = {
        role: 'assistant',
        content: "Hi there! I'm Kolade's portfolio assistant. How can I help you today?",
        id: 'welcome-message'
      };
      setMessages([welcomeMessage]);
      setIsTyping(false);
    }, 800);
  };

  const resetChat = () => {
    setMessages([]);
    showWelcomeMessage();
    // Note: This doesn't reset the usage limit
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Process message content to ensure Calendly links are properly formatted
  const processMessageContent = (content: string): string => {
    // Look for markdown links that contain calendly URLs but might not be rendered correctly
    const linkRegex = /\[(.*?)\]\((https?:\/\/calendly\.com\/[^)]+)\)/g;
    return content.replace(linkRegex, (match, text, url) => {
      // Ensure there's a space before the link if it's not at the start of the text
      // This helps ReactMarkdown properly parse the link
      return ` [${text}](${url}) `;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '' || isLoading || limitReached) return;
    
    // Create user message with a unique ID
    const userMessage: MessageType = {
      role: 'user',
      content: input.trim(),
      id: `user-${Date.now()}`
    };
    
    // Add the user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // Update usage count before sending the message
      updateUsageCount();
      
      // Create messages array for API request (strip IDs as they're not needed for API)
      const apiMessages = [
        ...messages.map(({ role, content }) => ({ role, content })),
        { role: userMessage.role, content: userMessage.content }
      ];
      
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });
      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      // Create a placeholder for assistant response with unique ID
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '', id: assistantMessageId }
      ]);
      
      // Read the streaming response
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      
      let assistantResponse = '';
      
      try {
        while (true) {
          const { value, done } = await reader.read();
          
          if (done) {
            break;
          }
          
          // Decode and accumulate the chunk of text
          const chunk = decoder.decode(value, { stream: true });
          assistantResponse += chunk;
          
          // Update the message with the accumulated response
          setMessages(prev => {
            return prev.map(msg => 
              msg.id === assistantMessageId
                ? { ...msg, content: assistantResponse }
                : msg
            );
          });
        }
      } finally {
        // Make sure to close the reader
        reader.releaseLock();
      }
      
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add an error message
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.',
          id: `error-${Date.now()}`
        }
      ]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              'mb-2 flex flex-col flex-1 rounded-lg border border-glow-blue/30 bg-[#0b0b19]/95 backdrop-blur-md shadow-lg',
              isExpanded 
                ? 'w-[400px] sm:w-[500px] md:w-[600px] min-h-[600px] max-h-[600px]' 
                : 'w-[350px] min-h-[500px] max-h-[500px]'
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-glow-blue/30 bg-gradient-to-r from-glow-blue/40 to-glow-purple/40 px-4 py-3 shadow-md">
              <div className="flex items-center gap-2">
                <MessageSquareIcon size={18} className="text-glow-cyan" />
                <h3 className="font-medium text-white">Portfolio Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white hover:text-white hover:bg-white/10"
                  onClick={resetChat}
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white hover:text-white hover:bg-white/10"
                  onClick={toggleExpand}
                >
                  {isExpanded ? 
                    <Minimize2 size={16} /> : 
                    <Maximize2 size={16} />
                  }
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white hover:text-white hover:bg-white/10"
                  onClick={toggleChat}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-glow-blue/20 scrollbar-track-transparent bg-[#0b0b19]">
              {messages.length === 0 && !isTyping ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-glow-blue/10 p-4 mb-4">
                    <MessageSquareIcon size={32} className="text-glow-blue/70" />
                  </div>
                  <p className="text-sm font-medium text-white mb-2">
                    Hi there! I can answer questions about working with Kolade.
                  </p>
                  <p className="text-sm text-gray-400 max-w-[240px]">
                    Ask me about his expertise, process, or how to book a consultation.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <Message 
                      key={message.id || index} 
                      message={{
                        ...message,
                        content: message.role === 'assistant' 
                          ? processMessageContent(message.content)
                          : message.content
                      }} 
                    />
                  ))}
                  
                  {isTyping && (
                    <div className="flex w-full items-start mb-4">
                      <Avatar className="mr-2 h-8 w-8 border border-glow-cyan/30 bg-card/30 backdrop-blur-sm shadow-sm flex-shrink-0">
                        <div className="bg-gradient-to-br from-glow-blue to-glow-cyan rounded-full h-full w-full flex items-center justify-center">
                          <span className="text-white font-bold">K</span>
                        </div>
                      </Avatar>
                      
                      <div className="bg-card/95 border border-border/50 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg p-3 shadow-md">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Usage limit notification */}
                  {limitReached && (
                    <div className="bg-red-900/30 border border-red-500/50 text-white rounded-lg p-3 my-2 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <p className="text-sm">
                        You`&apos;`ve reached the daily message limit. Please come back tomorrow to continue chatting.
                      </p>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} className="h-2" />
                </>
              )}
            </div>

            {/* Input form */}
            <div className="p-3 border-t border-glow-blue/30 rounded-b-lg bg-[#0f0f24]">
              <form
                onSubmit={handleSubmit}
                className="flex items-stretch gap-0"
              >
                <div className="flex-1 relative rounded-l-md overflow-hidden">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder={limitReached ? "Message limit reached" : "Type your message..."}
                    className="min-h-10 h-10 py-2 max-h-32 w-full bg-[#090919] text-white border-glow-blue/20 focus-visible:border-glow-blue/50 focus-visible:ring-glow-blue/20 placeholder:text-gray-500 resize-none border-r-0 rounded-r-none rounded-l-md"
                    rows={1}
                    disabled={limitReached}
                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as React.FormEvent);
                      }
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 bg-gradient-to-r from-glow-blue to-glow-purple hover:from-glow-blue/90 hover:to-glow-purple/90 text-white p-2 border border-glow-blue/20 shadow-md shadow-glow-blue/20 rounded-l-none rounded-r-md"
                  disabled={isLoading || !input.trim() || limitReached}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Send size={18} />
                  )}
                </Button>
              </form>
              
              {/* Message count indicator */}
              {!limitReached && (
                <div className="mt-1.5 flex justify-end">
                  <span className="text-xs text-gray-400">
                    {usageLimit.messageCount}/{MAX_MESSAGES_PER_SESSION} messages used this week
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-glow-blue to-glow-purple shadow-lg hover:shadow-glow-blue/30 transition-all chat-button-hover"
        >
          <MessageSquareIcon size={24} className="text-white" />
        </motion.button>
      )}
    </div>
  );
}; 