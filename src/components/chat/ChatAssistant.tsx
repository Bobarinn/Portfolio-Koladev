'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquareIcon, X, Send, Maximize2, Minimize2, Trash2, AlertCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define message limit constants
const MAX_MESSAGES_PER_SESSION = 25;
const LOCAL_STORAGE_KEY = 'portfolio_chat_usage';
const CHAT_HISTORY_KEY = 'portfolio_chat_history';

type MessageType = {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  timestamp?: string;
};

type UsageData = {
  messageCount: number;
  lastReset: number;
};

type ChatSession = {
  sessionId: string;
  timestamp: string;
  messages: MessageType[];
  isActive: boolean;
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate session ID
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Load chat history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as ChatSession[];
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage
  const saveChatHistory = (newHistory: ChatSession[]) => {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(newHistory));
    setChatHistory(newHistory);
  };

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load usage data from localStorage on mount
  useEffect(() => {
    const storedUsage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsage) {
      const parsedUsage = JSON.parse(storedUsage) as UsageData;
      
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
  
  // Prevent body scrolling when chat is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen]);

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
    
    if (!isOpen && messages.length === 0) {
      const sessionId = generateSessionId();
      setCurrentSessionId(sessionId);
      showWelcomeMessage(sessionId);
    }
  };

  const showWelcomeMessage = (sessionId: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const welcomeMessage: MessageType = {
        role: 'assistant',
        content: "Hi there! I'm Kolade's portfolio assistant. I can help you learn about his MBA/MSIS journey, internship opportunities, projects, and how we can work together. What would you like to know?",
        id: 'welcome-message',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      
      // Save to chat history
      const newSession: ChatSession = {
        sessionId,
        timestamp: new Date().toISOString(),
        messages: [welcomeMessage],
        isActive: true
      };
      saveChatHistory([...chatHistory, newSession]);
      
      setIsTyping(false);
    }, 800);
  };

  const resetChat = () => {
    // Mark current session as inactive
    if (currentSessionId) {
      const updatedHistory = chatHistory.map(session => 
        session.sessionId === currentSessionId 
          ? { ...session, isActive: false }
          : session
      );
      saveChatHistory(updatedHistory);
    }
    
    setMessages([]);
    const newSessionId = generateSessionId();
    setCurrentSessionId(newSessionId);
    showWelcomeMessage(newSessionId);
  };

  const exportChatHistory = () => {
    const dataStr = JSON.stringify(chatHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat_history_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportChatHistoryAsExcel = async () => {
    try {
      const response = await fetch('/api/export-chat');
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chat_history_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to export chat history');
      }
    } catch (error) {
      console.error('Error exporting chat history:', error);
    }
  };

  const toggleExpand = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '' || isLoading || limitReached) return;
    
    const userMessage: MessageType = {
      role: 'user',
      content: input.trim(),
      id: `user-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      updateUsageCount();
      
      const apiMessages = [
        ...messages.map(({ role, content }) => ({ role, content })),
        { role: userMessage.role, content: userMessage.content }
      ];
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          sessionId: currentSessionId,
        }),
      });
      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '', id: assistantMessageId, timestamp: new Date().toISOString() }
      ]);
      
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      
      let assistantResponse = '';
      
      try {
        while (true) {
          const { value, done } = await reader.read();
          
          if (done) {
            break;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          assistantResponse += chunk;
          
          setMessages(prev => {
            return prev.map(msg => 
              msg.id === assistantMessageId
                ? { ...msg, content: assistantResponse }
                : msg
            );
          });
        }
      } finally {
        reader.releaseLock();
      }
      
      // Update chat history with new messages
      const assistantMsg: MessageType = {
        role: 'assistant',
        content: assistantResponse,
        id: assistantMessageId,
        timestamp: new Date().toISOString()
      };
      const updatedHistory = chatHistory.map(session => 
        session.sessionId === currentSessionId 
          ? { 
              ...session, 
              messages: [...session.messages, userMessage as MessageType, assistantMsg as MessageType]
            }
          : session
      );
      saveChatHistory(updatedHistory);
      
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.',
          id: `error-${Date.now()}`,
          timestamp: new Date().toISOString()
        }
      ]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "fixed z-50 flex flex-col items-end",
      isMobile && isOpen ? "inset-0" : "bottom-4 right-4"
    )}>
      {/* Chat bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 20, scale: 0.9 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              'flex flex-col flex-1 border border-glow-blue/30 bg-[#0b0b19]/95 backdrop-blur-md shadow-lg',
              isMobile 
                ? 'w-full h-full rounded-none'
                : cn(
                  'mb-2 rounded-lg',
                  isExpanded 
                    ? 'w-[400px] sm:w-[500px] md:w-[600px] min-h-[600px] max-h-[600px]' 
                    : 'w-[350px] min-h-[500px] max-h-[500px]'
                )
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-glow-blue/30 bg-gradient-to-r from-glow-blue/40 to-glow-purple/40 px-4 py-3 shadow-md">
              <div className="flex items-center gap-2">
                <MessageSquareIcon size={18} className="text-glow-cyan" />
                <h3 className="font-medium text-white">MBA Portfolio Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-white hover:text-white hover:bg-white/10"
                      title="Export chat history"
                    >
                      <Download size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-sm border border-border/50">
                    <DropdownMenuItem 
                      onClick={exportChatHistory}
                      className="text-white hover:bg-glow-blue/20 cursor-pointer"
                    >
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={exportChatHistoryAsExcel}
                      className="text-white hover:bg-glow-blue/20 cursor-pointer"
                    >
                      Export as Excel (CSV)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-white hover:text-white hover:bg-white/10"
                  onClick={resetChat}
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </Button>
                {!isMobile && (
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
                )}
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

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-glow-cyan rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-glow-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-glow-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm">Kolade is typing...</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Usage limit warning */}
            {limitReached && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 mx-4 mb-4 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-400">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">Message limit reached</span>
                </div>
                <p className="text-xs text-yellow-300 mt-1">
                  You&apos;ve reached the daily message limit. Please try again tomorrow or contact Kolade directly.
                </p>
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-glow-blue/30">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none bg-background/50 border-border/50 text-white placeholder:text-muted-foreground"
                  disabled={isLoading || limitReached}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={input.trim() === '' || isLoading || limitReached}
                  className="bg-glow-blue hover:bg-glow-blue/80 text-white"
                >
                  <Send size={16} />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="w-14 h-14 bg-gradient-to-r from-glow-blue to-glow-purple rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
        >
          <MessageSquareIcon size={24} />
        </motion.button>
      )}
    </div>
  );
}; 