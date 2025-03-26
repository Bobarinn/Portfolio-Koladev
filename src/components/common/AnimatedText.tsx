'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  speed?: number;
}

export const AnimatedText = ({ 
  text, 
  className, 
  once = true,
  speed = 0.05
}: AnimatedTextProps) => {
  const { ref, inView } = useInView({ 
    triggerOnce: once, 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // More eager trigger
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      // Force a slight delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Handle empty text case
  if (!text || text.trim() === '') {
    return <span className={className}>&nbsp;</span>;
  }

  const words = text.split(' ');

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: speed, 
        delayChildren: 0.04 * i,
      },
    }),
  };

  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      animate={inView || hasAnimated ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${index}-${word}`}
          className="mr-1.5"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}; 