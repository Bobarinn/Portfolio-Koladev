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
              'mb-2 flex w-[350px] flex-col overflow-hidden rounded-lg border border-border/50 bg-card/90 backdrop-blur-md shadow-lg',
              isMaximized && 'sm:w-[450px] h-[500px]'
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-gradient-to-r from-glow-blue/10 to-glow-purple/10 px-4 py-2">
              <div className="flex items-center gap-2">
                <MessageSquareIcon size={18} className="text-glow-cyan" />
                <h3 className="text-sm font-medium">Ask me anything</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={toggleMaximize}
                >
                  {isMaximized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={toggleChat}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Messages container */}
            <div className={cn('flex-1 overflow-y-auto', isMaximized ? 'h-[400px]' : 'h-[300px]')}>
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-4 text-center text-muted-foreground">
                  <MessageSquareIcon size={32} className="mb-2 text-glow-blue/50" />
                  <p className="text-sm">
                    Hi there! I can answer questions about working with Kolade and his projects.
                  </p>
                  <p className="mt-1 text-xs">Ask me about his expertise, process, or availability.</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <Message key={index} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 border-t border-border/50 bg-card/30 p-2"
            >
              <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="min-h-10 max-h-32 bg-background/50 border-border/50 text-sm"
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
                className="h-10 w-10 bg-glow-blue hover:bg-glow-blue/90 p-2"
                disabled={isLoading || !input.trim()}
              >
                <Send size={18} />
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-glow-blue/90 shadow-lg hover:bg-glow-blue transition-colors"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageSquareIcon size={22} className="text-white" />
        )}
      </motion.button>
    </div>
  );
}; 