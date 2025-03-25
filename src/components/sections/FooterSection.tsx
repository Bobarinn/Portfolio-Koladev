'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from 'lucide-react';
import { AnimatedLogo } from '@/components/common/AnimatedLogo';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  const iconMap: Record<string, React.ReactNode> = {
    github: <GitHubLogoIcon className="h-4 w-4" />,
    linkedin: <LinkedInLogoIcon className="h-4 w-4" />,
    twitter: <TwitterLogoIcon className="h-4 w-4" />,
    calendar: <CalendarIcon className="h-4 w-4" />,
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border/10 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedLogo 
                onClick={handleScrollToTop}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Building at the intersection of No-Code, Traditional Code, and AI
              </p>
            </motion.div>
          </div>
          
          <div className="flex gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                {iconMap[social.icon] || social.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/10 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Koladev.dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 