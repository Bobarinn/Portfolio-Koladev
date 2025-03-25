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
        'flex w-full items-start gap-2 px-4 py-2',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
      {...props}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border border-border/50 bg-card/30 backdrop-blur-sm">
          <Image src="/icon.png" alt="Kolade Abobarin" width={32} height={32} />
        </Avatar>
      )}
      
      <div
        className={cn(
          'max-w-[80%] overflow-hidden rounded-lg p-3 text-sm',
          isUser 
            ? 'bg-glow-blue/90 text-primary-foreground' 
            : 'bg-card/60 backdrop-blur-sm border border-border/50'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 bg-glow-purple/20 border border-glow-purple/30">
          <div className="text-xs font-semibold">You</div>
        </Avatar>
      )}
    </div>
  );
}; 