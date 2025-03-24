'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'blue' | 'purple';
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  onClick?: () => void;
  href?: string;
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, glowColor = 'blue', className, variant = 'default', size = 'default', onClick, href, ...props }, ref) => {
    const glowMap = {
      cyan: {
        glow: 'from-glow-cyan/80 to-glow-cyan/0',
        border: 'border-glow-cyan',
        hoverBg: 'hover:bg-glow-cyan/20',
        shadow: 'shadow-glow-cyan/50'
      },
      blue: {
        glow: 'from-glow-blue/80 to-glow-blue/0',
        border: 'border-glow-blue',
        hoverBg: 'hover:bg-glow-blue/20',
        shadow: 'shadow-glow-blue/50'
      },
      purple: {
        glow: 'from-glow-purple/80 to-glow-purple/0',
        border: 'border-glow-purple',
        hoverBg: 'hover:bg-glow-purple/20',
        shadow: 'shadow-glow-purple/50'
      },
    };

    return (
      <div className="relative w-full sm:w-auto group">
        {/* Static glow effect */}
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-lg bg-gradient-to-r blur-md opacity-30 transition-opacity duration-300 group-hover:opacity-60',
            glowMap[glowColor].glow
          )}
        />

        {/* Additional hover glow effect */}
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-lg bg-gradient-to-r blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-40',
            glowMap[glowColor].glow
          )}
        />

        {href ? (
          <Button
            asChild
            variant={variant}
            size={size}
            className={cn(
              'relative z-10 overflow-hidden font-semibold transition-all duration-300',
              {
                [`${glowMap[glowColor].border} text-white ${glowMap[glowColor].hoverBg}`]: 
                  variant === 'outline',
                'shadow-lg hover:shadow-xl hover:scale-[1.02]': 
                  variant === 'default',
                [`hover:${glowMap[glowColor].shadow}`]: true
              },
              className
            )}
            onClick={onClick}
            {...props}
          >
            <a href={href}>{children}</a>
          </Button>
        ) : (
          <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
              'relative z-10 overflow-hidden font-semibold transition-all duration-300',
              {
                [`${glowMap[glowColor].border} text-white ${glowMap[glowColor].hoverBg}`]: 
                  variant === 'outline',
                'shadow-lg hover:shadow-xl hover:scale-[1.02]': 
                  variant === 'default',
                [`hover:${glowMap[glowColor].shadow}`]: true
              },
              className
            )}
            onClick={onClick}
            {...props}
          >
            {children}
          </Button>
        )}
      </div>
    );
  }
);

GlowingButton.displayName = 'GlowingButton'; 