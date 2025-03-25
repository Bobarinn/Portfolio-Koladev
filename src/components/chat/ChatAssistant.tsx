'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { MessageSquareIcon, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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
      }, 1000);
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
    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });
      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      // Create a new message for the assistant's response
      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Get the index of the new assistant message
      const assistantMessageIndex = messages.length;
      
      // Read the streaming response
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      
      let done = false;
      let assistantResponse = '';
      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (value) {
          const text = decoder.decode(value);
          assistantResponse += text;
          
          // Update the message with the accumulated response
          setMessages(prev => {
            const updated = [...prev];
            if (updated[assistantMessageIndex]) {
              updated[assistantMessageIndex] = {
                ...updated[assistantMessageIndex],
                content: assistantResponse,
              };
            }
            return updated;
          });
        }
      }
      
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
              'mb-2 flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card/95 backdrop-blur-md shadow-lg',
              isExpanded 
                ? 'w-[400px] sm:w-[500px] md:w-[600px] h-[600px]' 
                : 'w-[350px] h-[500px]'
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-glow-blue/30 to-glow-purple/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageSquareIcon size={18} className="text-glow-cyan" />
                <h3 className="font-medium text-foreground">Portfolio Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-foreground/80 hover:text-foreground hover:bg-card/60"
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
                  className="h-7 w-7 p-0 text-foreground/80 hover:text-foreground hover:bg-card/60"
                  onClick={toggleChat}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Messages container */}
            <div className={cn(
              'flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-glow-blue/20 scrollbar-track-transparent',
              isExpanded ? 'min-h-[510px]' : 'min-h-[410px]'
            )}>
              {messages.length === 0 && !isTyping ? (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-glow-blue/10 p-4 mb-4">
                    <MessageSquareIcon size={32} className="text-glow-blue/70" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Hi there! I can answer questions about working with Kolade.
                  </p>
                  <p className="text-sm text-muted-foreground max-w-[240px]">
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
                        <Image src="/icon.png" alt="Kolade Abobarin" width={32} height={32} />
                      </Avatar>
                      
                      <div className="bg-card/80 backdrop-blur-sm border border-border/30 text-foreground rounded-tl-lg rounded-tr-lg rounded-br-lg p-3">
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
            <div className="p-3 border-t border-border/50 bg-card/50">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="min-h-10 max-h-32 bg-background/80 border-border/30 focus-visible:border-glow-blue/50 focus-visible:ring-glow-blue/20 text-foreground placeholder:text-muted-foreground/70 resize-none rounded-l-md rounded-r-none"
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