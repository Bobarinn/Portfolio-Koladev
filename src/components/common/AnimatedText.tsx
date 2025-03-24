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
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasAnimated(true);
    }
  }, [inView]);

  const words = text.split(' ');

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: 0.04 * i },
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
    <motion.span
      ref={ref}
      className={cn('flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-1.5"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}; 