'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-gradient-to-br from-glow-cyan/20 via-glow-blue/20 to-glow-purple/20 blur-3xl"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </motion.div>
  );
}; 