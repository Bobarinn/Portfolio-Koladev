// src/components/sections/HeroSection.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { AnimatedText } from '@/components/common/AnimatedText';
import { GlowingButton } from '@/components/common/GlowingButton';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from 'lucide-react';

export const HeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mount state to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    // Show profile picture after a delay
    const timer = setTimeout(() => {
      setShowProfile(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    github: <GitHubLogoIcon className="h-5 w-5" />,
    linkedin: <LinkedInLogoIcon className="h-5 w-5" />,
    twitter: <TwitterLogoIcon className="h-5 w-5" />,
    calendar: <CalendarIcon className="h-5 w-5" />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Pre-calculate dot positions and sizes with reduced count for better performance
  const dotProps = [...Array(12)].map((_, i) => {
    // Use deterministic seeds for positioning to prevent hydration errors
    const idx = i + 1;
    return {
      key: `dot-${i}`,
      className: `dot dot-${i % 3}`,
      style: {
        // Use consistent syntax for style properties (all percentages or all decimals)
        left: `${(idx * 7) % 100}%`,
        top: `${(idx * 9) % 100}%`,
        width: `${(idx % 5) + 2}px`, 
        height: `${(idx % 4) + 2}px`,
        opacity: 0.4,
      },
      initial: { opacity: 0 },
      animate: { opacity: 0.4 },
      transition: {
        duration: 0.5,
      }
    };
  });

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-start items-center px-4 overflow-x-hidden pt-16 md:pt-12" ref={scrollRef}>
      {/* Enhanced Background Elements - Simplified with reduced animations */}
      <div className="absolute inset-0 z-0 max-w-full">
        {/* Static grid background */}
        <div className="grid-background max-w-full">
          <div className="grid opacity-70"></div>
        </div>
        
        {/* Reduced number of glowing orbs with slower animations */}
        <div className="glowing-orbs max-w-full">
          {[...Array(3)].map((_, i) => (
            <div 
              key={`orb-${i}`} 
              className={`orb orb-${i} opacity-60`}
              style={{ 
                animationDuration: `${30 + i * 10}s`,
                filter: 'blur(30px)'
              }}
            />
          ))}
        </div>
        
        {/* Tech dots - Only render on client side to prevent hydration errors */}
        {isMounted && (
          <div className="tech-dots max-w-full">
            {dotProps.map((props) => (
              <motion.div 
                key={props.key}
                className={props.className}
                style={props.style}
                initial={props.initial}
                animate={props.animate}
                transition={props.transition}
              />
            ))}
          </div>
        )}
        
        {/* Simplified circuit lines - fewer and more static */}
        <div className="circuit-lines opacity-60 max-w-full">
          {[...Array(5)].map((_, i) => (
            <div 
              key={`line-${i}`} 
              className={`line line-${i}`}
              style={{
                animationDuration: '0s', // No animation
                opacity: 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto text-center z-10 relative w-full flex flex-col h-full py-6 md:py-4 mt-[-8vh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col h-full"
        >
          <div className="space-y-2 md:space-y-3">
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              {/* Profile Image - smaller on mobile */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={showProfile ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.2 
                }}
                className="mb-4 md:mb-3 relative"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple p-1 bg-gradient-to-r from-glow-cyan/20 via-glow-blue/20 to-glow-purple/20 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple opacity-30 animate-pulse"></div>
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src="/profile.jpg"
                      alt="Kolade Abobarin"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating Elements Around Image - slowed down */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center text-glow-blue" 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs">✨</span>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-1 -left-1 w-4 h-4 md:w-5 md:h-5 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center text-glow-purple" 
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs">⚡</span>
                </motion.div>
              </motion.div>
            
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                <AnimatedText 
                  text={`Hi, I'm ${profile.name}`} 
                  className="inline-flex justify-center text-center mb-1"
                  speed={0.04}
                />
                <br />
                <span className="bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple bg-clip-text text-transparent animate-flow-right">
                  <AnimatedText 
                    text={profile.title} 
                    className="inline-flex justify-center text-center"
                    speed={0.04}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                <AnimatedText 
                  text={profile.tagline} 
                  className="inline-flex justify-center text-center"
                  speed={0.02}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-3 md:mb-4">
                {profile.description}
              </p>
            </motion.div>
          </div>
              
          <div className="mt-4">
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                <GlowingButton 
                  onClick={handleScrollToProjects}
                  glowColor="blue"
                  size="default"
                  className="w-full flex-1 sm:w-auto"
                >
                  View Projects
                </GlowingButton>
                
                <GlowingButton 
                  onClick={handleScrollToContact}
                  variant="outline"
                  glowColor="purple"
                  size="default"
                  className="w-full flex-1 sm:w-auto"
                >
                  Contact Me
                </GlowingButton>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-2 md:gap-3"
            >
              {profile.socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-foreground hover:border-glow-blue/50 hover:shadow-sm hover:shadow-glow-blue/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {iconMap[social.icon] || social.name}
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 