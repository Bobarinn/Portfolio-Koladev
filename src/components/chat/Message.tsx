'use client';

import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { HTMLProps } from 'react';
import Image from 'next/image';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import type { ComponentPropsWithoutRef } from 'react';

type MessageProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
    id?: string;
  };
  className?: string;
} & HTMLProps<HTMLDivElement>;

// Define custom components for ReactMarkdown
const MarkdownComponents: Partial<Components> = {
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-none space-y-3 my-4" {...props}>{children}</ol>
  ),
  
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-none space-y-3 my-4" {...props}>{children}</ul>
  ),
  
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="flex gap-3 items-start pl-4" {...props}>
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="leading-relaxed mb-4 last:mb-0" {...props}>{children}</p>
  ),
  
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-base font-semibold mt-6 mb-3 first:mt-0" {...props}>{children}</h2>
  ),
  
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-sm font-semibold mt-4 mb-2" {...props}>{children}</h3>
  ),
  
  strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground/90" {...props}>{children}</strong>
  ),
  
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const childrenText = Array.isArray(children) 
      ? children.join('') 
      : String(children || '');
      
    const isCalendlyLink = 
      href?.includes('calendly') || 
      childrenText.toLowerCase().includes('book a call') ||
      childrenText.toLowerCase().includes('availability');
    
    if (isCalendlyLink) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="calendly-link"
          {...props}
        >
          <span className="icon">
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              stroke="currentColor" 
              fill="none" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className="text">{children}</span>
        </a>
      );
    }
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[rgb(var(--glow-cyan-rgb))] font-medium underline underline-offset-2 hover:text-white hover:bg-[rgba(var(--glow-blue-rgb),0.2)] hover:decoration-2 px-0.5 rounded transition-all duration-200"
        {...props}
      >
        {children}
      </a>
    );
  },
  
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
    const match = /language-(\w+)/.exec(className || '');
    const isInline = !match;
    return isInline ? (
      <code className="bg-[#1a1a2e] px-1.5 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-[#1a1a2e] p-3 rounded-md text-sm my-4 overflow-x-auto">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-2 border-glow-blue/50 pl-4 italic my-4" {...props}>
      {children}
    </blockquote>
  ),
};

export const Message = ({ message, className, ...props }: MessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start mb-4',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
      {...props}
    >
      {!isUser && (
        <Avatar className="mr-2 h-8 w-8 border border-glow-cyan/30 bg-card/30 backdrop-blur-sm shadow-sm flex-shrink-0">
          <div className="bg-gradient-to-br from-glow-blue to-glow-cyan rounded-full h-full w-full flex items-center justify-center">
            <Image src="/profile.jpg" alt="Kolade Abobarin" width={32} height={32} className="rounded-full" />
          </div>
        </Avatar>
      )}
      
      <div
        className={cn(
          'message-container max-w-[80%] overflow-hidden text-sm shadow-md',
          isUser 
            ? 'bg-gradient-to-br from-glow-blue to-glow-purple text-white font-medium rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
            : 'bg-card/95 border border-border/50 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg'
        )}
      >
        <div className={isUser ? "message-content p-1" : "message-content p-3"}>
          {isUser ? (
            <p className="whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </p>
          ) : (
            <div className="prose prose-sm max-w-none space-y-4">
              <div
                className={cn(
                  "prose-sm max-w-none",
                  "text-sm leading-relaxed",
                  "space-y-4",
                  "[&_ul]:space-y-3",
                  "[&_ul]:my-4",
                  "[&_p]:leading-relaxed",
                  "[&_p:last-child]:mb-0",
                  "[&_strong]:font-semibold",
                  "[&_strong]:text-foreground/90"
                )}
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
        
        {/* Add copy button for AI responses */}
        {!isUser && (
          <Button
            variant="ghost"
            size="icon"
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(message.content);
              toast.success("Message copied to clipboard");
            }}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      
      {isUser && (
        <Avatar className="ml-2 h-8 w-8 items-center justify-center bg-gradient-to-br from-glow-purple to-glow-blue border border-glow-purple/40 shadow-sm flex-shrink-0">
          <div className="text-xs items-center justify-center font-semibold text-white">You</div>
        </Avatar>
      )}
    </div>
  );
};