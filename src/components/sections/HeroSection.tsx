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
  const [isMobile, setIsMobile] = useState(false);

  // Mount state to prevent hydration mismatch and check for mobile
  useEffect(() => {
    setIsMounted(true);
    
    // Check if mobile device based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add listener for resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Set up the delay for showing profile image after determining if mobile
  useEffect(() => {
    if (!isMounted) return;
    
    // Show profile picture after a delay (shorter on mobile)
    const timer = setTimeout(() => {
      setShowProfile(true);
    }, isMobile ? 800 : 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [isMobile, isMounted]);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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
        staggerChildren: isMobile ? 0.1 : 0.2, // Faster stagger on mobile
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8, // Shorter animation on mobile
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Pre-calculate dot positions and sizes with reduced count for better performance
  // Use fewer dots on mobile
  const dotCount = isMobile ? 5 : 12;
  const dotProps = [...Array(dotCount)].map((_, i) => {
    // Use deterministic seeds for positioning to prevent hydration errors
    const idx = i + 1;
    return {
      key: `dot-${i}`,
      className: `dot dot-${i % 3}`,
      style: {
        // Use consistent syntax for style properties and constrain positioning to prevent overflow
        left: `${Math.min((idx * 7) % 100, 90)}%`,
        top: `${Math.min((idx * 9) % 100, 90)}%`,
        width: `${(idx % 5) + 2}px`,
        height: `${(idx % 4) + 2}px`,
        opacity: 0.4,
      },
      initial: { opacity: 0 },
      animate: { opacity: 0.4 },
      transition: {
        duration: 0.5,
      },
    };
  });

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 overflow-x-hidden pt-24 md:pt-32 lg:pt-12"
      ref={scrollRef}
    >
      {/* Enhanced Background Elements - Simplified with reduced animations */}
      <div className="absolute inset-0 z-0 max-w-full overflow-hidden">
        {/* Static grid background */}
        <div className="grid-background max-w-full">
          <div className="grid opacity-70"></div>
        </div>

        {/* Reduced number of glowing orbs with slower animations */}
        <div className="glowing-orbs max-w-full overflow-hidden">
          {/* Even fewer orbs on mobile */}
          {[...Array(isMobile ? 1 : 3)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className={`orb orb-${i} opacity-60`}
              style={{
                animationDuration: `${30 + i * 10}s`,
                filter: 'blur(30px)',
              }}
            />
          ))}
        </div>

        {/* Tech dots - Only render on client side to prevent hydration errors */}
        {isMounted && (
          <div className="tech-dots max-w-full overflow-hidden">
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
        <div className="circuit-lines opacity-60 max-w-full overflow-hidden">
          {/* Fewer lines on mobile */}
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <div
              key={`line-${i}`}
              className={`line line-${i}`}
              style={{
                animationDuration: '0s', // No animation
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto text-center z-10 relative w-full flex flex-col h-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col h-full"
        >
          <div className="space-y-3 md:space-y-5 lg:space-y-8">
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              {/* Profile Image - smaller on mobile */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={showProfile ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: isMobile ? 200 : 260,
                  damping: isMobile ? 15 : 20,
                  delay: 0.2,
                }}
                className="mb-6 md:mb-8 lg:mb-10 relative"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple p-1 bg-gradient-to-r from-glow-cyan/20 via-glow-blue/20 to-glow-purple/20 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple opacity-30 animate-pulse"></div>
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src="/profile.jpg" alt="Kolade Abobarin" fill className="object-cover" priority />
                  </div>
                </div>

                {/* Floating Elements Around Image - slowed down and conditionally rendered */}
                {!isMobile && (
                  <>
                    <motion.div
                      className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center text-glow-blue"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="text-xs">✨</span>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-1 -left-1 w-4 h-4 md:w-5 md:h-5 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center text-glow-purple"
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="text-xs">⚡</span>
                    </motion.div>
                  </>
                )}
              </motion.div>

              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                <AnimatedText
                  text={`Hi, I&apos;m ${profile.name}`}
                  className="inline-flex justify-center text-center"
                  speed={isMobile ? 0.07 : 0.05}
                  once={true}
                />
                <br />
                <span className="bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple bg-clip-text text-transparent animate-flow-right">
                  <AnimatedText
                    text={profile.title}
                    className="inline-flex justify-center text-center"
                    speed={isMobile ? 0.07 : 0.05}
                    once={true}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-base md:text-lg lg:text-2xl mb-6 md:mb-8 lg:mb-10 text-muted-foreground max-w-2xl mx-auto">
                <AnimatedText
                  text={profile.tagline}
                  className="inline-flex justify-center text-center"
                  speed={isMobile ? 0.05 : 0.03}
                  once={true}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-3 md:mb-6 lg:mb-8">
                {profile.description}
              </p>
            </motion.div>

            {/* Internship Availability Message */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-r from-glow-blue/10 via-glow-purple/10 to-glow-cyan/10 border border-glow-blue/20 rounded-lg p-4 md:p-6 mb-6 md:mb-8 max-w-2xl mx-auto">
                <p className="text-sm md:text-base font-medium text-glow-blue mb-2">
                  📣 Open to Summer 2026 MBA Internships
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Let&apos;s build something impactful together! Seeking roles in Product Management, AI Strategy, or Innovation.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 md:mt-12 lg:mt-16">
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-8">
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
              className="flex items-center justify-center gap-3 md:gap-4"
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
