'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquareIcon, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
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
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className={cn(
              'mb-2 flex flex-col overflow-hidden rounded-lg border border-glow-blue/20 bg-card/95 backdrop-blur-md shadow-lg',
              isMaximized ? 'w-[350px] sm:w-[450px] h-[500px]' : 'w-[350px] h-[400px]'
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-glow-blue/20 to-glow-purple/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageSquareIcon size={18} className="text-glow-cyan" />
                <h3 className="font-medium text-foreground">Ask me anything</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-foreground/80 hover:text-foreground hover:bg-card/60"
                  onClick={toggleMaximize}
                >
                  {isMaximized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
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
              'flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-glow-blue/20 scrollbar-track-transparent',
              isMaximized ? 'min-h-[410px]' : 'min-h-[310px]'
            )}>
              {messages.length === 0 ? (
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
                  <div ref={messagesEndRef} className="h-2" />
                </>
              )}
            </div>

            {/* Input form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 border-t border-border/50 bg-card/50 p-3"
            >
              <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="min-h-10 max-h-32 bg-background/80 border-border/30 focus-visible:border-glow-blue/50 text-foreground placeholder:text-muted-foreground/70 resize-none"
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
                className="h-10 w-10 bg-glow-blue hover:bg-glow-blue/90 text-white p-2 shadow-md shadow-glow-blue/20"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-glow-blue to-glow-purple shadow-lg hover:shadow-glow-blue/30 transition-all"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquareIcon size={24} className="text-white" />
        )}
      </motion.button>
    </div>
  );
}; 