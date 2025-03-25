'use client';

import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { HTMLProps } from 'react';

type MessageProps = {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
  className?: string;
} & HTMLProps<HTMLDivElement>;

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
            <span className="text-white font-bold">K</span>
          </div>
        </Avatar>
      )}
      
      <div
        className={cn(
          'max-w-[80%] overflow-hidden p-3 text-sm shadow-md',
          isUser 
            ? 'bg-gradient-to-br from-glow-blue to-glow-purple text-white font-medium rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
            : 'bg-card/95 border border-border/50 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg'
        )}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
      </div>
      
      {isUser && (
        <Avatar className="ml-2 h-8 w-8 bg-gradient-to-br from-glow-purple to-glow-blue border border-glow-purple/40 shadow-sm flex-shrink-0">
          <div className="text-xs font-semibold text-white">You</div>
        </Avatar>
      )}
    </div>
  );
}; 