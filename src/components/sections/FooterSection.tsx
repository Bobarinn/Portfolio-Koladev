'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from 'lucide-react';
import { AnimatedLogo } from '@/components/common/AnimatedLogo';

interface ProfileData {
  aim: string;
  socials: Array<{ name: string; url: string; icon: string }>;
}

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/data/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile({
            aim: data.aim || '',
            socials: [
              { name: 'GitHub', url: data.github || 'https://github.com/Bobarinn', icon: 'github' },
              { name: 'LinkedIn', url: data.linkedin || 'https://www.linkedin.com/in/koladeabobarin/', icon: 'linkedin' },
              { name: 'Twitter', url: 'https://x.com/Kolade_Abobarin', icon: 'twitter' },
              { name: 'Calendly', url: data.calendly_url || 'https://calendly.com/koladeabobarin/30min', icon: 'calendar' },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback data
        setProfile({
          aim: 'Actively seeking Summer 2026 MBA internship opportunities.',
          socials: [
            { name: 'GitHub', url: 'https://github.com/Bobarinn', icon: 'github' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/koladeabobarin/', icon: 'linkedin' },
            { name: 'Twitter', url: 'https://x.com/Kolade_Abobarin', icon: 'twitter' },
            { name: 'Calendly', url: 'https://calendly.com/koladeabobarin/30min', icon: 'calendar' },
          ],
        });
      }
    };

    fetchProfile();
  }, []);
  
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
              <p className="text-xs text-glow-blue mt-1">
                {profile?.aim}
              </p>
            </motion.div>
          </div>
          
          <div className="flex gap-4">
            {profile?.socials.map((social) => (
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
          <p>&copy; {currentYear} kolade.pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 