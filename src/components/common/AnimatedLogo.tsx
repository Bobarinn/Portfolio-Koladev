'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AnimatedLogoProps {
  onClick?: () => void;
  className?: string;
  showImageInterval?: number; // Time in ms between showing the image
  imageDuration?: number; // Time in ms to show the image
  hideDomainName?: boolean; // Whether to hide the domain name text
}

export const AnimatedLogo = ({
  onClick,
  className = '',
  showImageInterval = 10000, // Show image every 10 seconds by default
  imageDuration = 5000, // Show image for 5 seconds by default (increased from 3s)
  hideDomainName = false
}: AnimatedLogoProps) => {
  const [showImage, setShowImage] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  // Continuously update rotation when not showing image
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      // Only rotate when not showing image
      if (!showImage) {
        // Rotate about 18 degrees per second (360 degrees in 20 seconds)
        setRotationDegrees(prev => (prev + elapsed * 0.018) % 360);
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [showImage]);

  // Toggle image display at regular intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowImage(true);
      
      // Hide the image after the specified duration
      const timerId = setTimeout(() => {
        setShowImage(false);
      }, imageDuration);
      
      return () => clearTimeout(timerId);
    }, showImageInterval);
    
    return () => clearInterval(intervalId);
  }, [imageDuration, showImageInterval]);

  return (
    <div 
      className={`flex items-center cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div
        className={`
          relative mr-3 
          bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple 
          rounded-full h-8 
          flex items-center justify-start
          group-hover:shadow-lg group-hover:shadow-glow-blue/20 
          transition-all duration-300
          ${showImage ? 'w-24 border border-glow-blue/30' : 'w-8'}
        `}
        style={{ 
          transition: 'width 0.5s ease-in-out',
          backdropFilter: showImage ? 'blur(8px)' : 'none',
          background: showImage 
            ? 'linear-gradient(to right, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))' 
            : 'linear-gradient(to right, rgb(6, 182, 212), rgb(59, 130, 246), rgb(168, 85, 247))'
        }}
      >
        {/* Always visible 'K' - with conditional rotation */}
        <div 
          className="bg-background h-6 w-6 rounded-full flex items-center justify-center z-10 ml-1"
          style={{ 
            transform: `rotate(${rotationDegrees}deg)`,
            transition: showImage ? 'transform 0.5s ease-out' : 'none',
            boxShadow: showImage ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        >
          <span className="text-sm font-bold">K</span>
        </div>
        
        {/* Profile image that appears occasionally */}
        <AnimatePresence mode="wait">
          {showImage && (
            <motion.div
              key="profile-image"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute right-1 bg-background h-6 w-6 rounded-full overflow-hidden flex items-center justify-center border border-glow-blue/30"
              style={{
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)'
              }}
            >
              <Image 
                src="/profile.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!hideDomainName && (
        <h3 className="text-lg font-bold group-hover:text-glow-blue transition-colors duration-300">koladev.dev</h3>
      )}
    </div>
  );
}; 