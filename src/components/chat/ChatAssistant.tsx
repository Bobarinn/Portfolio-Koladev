'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { MessageSquareIcon, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MessageType = {
  role: 'user' | 'assistant';
  content: string;
};

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add initial welcome message if opening with no messages
    if (!isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { 
            role: 'assistant', 
            content: "Hi there! I'm Kolade's portfolio assistant. How can I help you today?" 
          }
        ]);
        setIsTyping(false);
      }, 800);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '' || isLoading) return;
    
    // Add user message to chat
    const userMessage: MessageType = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // For demo purpose using mock responses
      const demoResponses = [
        "I'd be happy to tell you about Kolade's expertise in software development!",
        "Kolade specializes in creating modern web applications using Next.js, React, and AI integrations.",
        "You can schedule a consultation with Kolade through his Calendly link. Would you like me to provide that for you?",
        "Feel free to explore the portfolio section to see examples of Kolade's previous work.",
        "Kolade typically starts projects with an initial consultation to understand requirements, followed by a detailed proposal with timeline and milestones."
      ];
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pick a random response for demo purposes
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      
      // Create a new message for the assistant's response
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add an error message
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
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
              'mb-2 flex flex-col overflow-hidden rounded-lg border border-glow-blue/30 bg-[#0b0b19]/95 backdrop-blur-md shadow-lg',
              isExpanded 
                ? 'w-[400px] sm:w-[500px] md:w-[600px] h-[600px]' 
                : 'w-[350px] h-[500px]'
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
            <div className={cn(
              'flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-glow-blue/20 scrollbar-track-transparent bg-[#0b0b19]',
              isExpanded ? 'min-h-[510px]' : 'min-h-[410px]'
            )}>
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
                    <Message key={index} message={message} />
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
                  
                  <div ref={messagesEndRef} className="h-2" />
                </>
              )}
            </div>

            {/* Input form */}
            <div className="p-3 border-t border-glow-blue/30 bg-[#0f0f24]">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="min-h-10 max-h-32 bg-[#090919] text-white border-glow-blue/20 focus-visible:border-glow-blue/50 focus-visible:ring-glow-blue/20 placeholder:text-gray-500 resize-none rounded-l-md rounded-r-none"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 bg-gradient-to-r from-glow-blue to-glow-purple hover:from-glow-blue/90 hover:to-glow-purple/90 text-white p-2 shadow-md shadow-glow-blue/20 rounded-l-none rounded-r-md"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Send size={18} />
                  )}
                </Button>
              </form>
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