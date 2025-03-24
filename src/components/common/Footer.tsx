'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import Link from 'next/link';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export const Footer = () => {
  // Find social media links from the socials array
  const githubProfile = profile.socials.find(social => social.name === "GitHub")?.url || "#";
  const linkedinProfile = profile.socials.find(social => social.name === "LinkedIn")?.url || "#";
  const twitterProfile = profile.socials.find(social => social.name === "Twitter")?.url || "#";

  return (
    <footer className="mt-20 border-t border-border/20 py-8 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">koladev.dev</h3>
            <p className="text-muted-foreground text-sm">
              No-Code Developer & AI Specialist 
              helping businesses leverage technology for growth.
            </p>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-glow-blue transition-colors">
                Projects
              </Link>
              <Link href="#side-quests" className="text-sm text-muted-foreground hover:text-glow-blue transition-colors">
                Side Quests
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-glow-blue transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a 
                href={githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="text-muted-foreground hover:text-glow-blue transition-colors"
              >
                <GithubIcon size={20} />
              </motion.a>
              <motion.a 
                href={linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="text-muted-foreground hover:text-glow-blue transition-colors"
              >
                <LinkedinIcon size={20} />
              </motion.a>
              <motion.a 
                href={twitterProfile}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="text-muted-foreground hover:text-glow-blue transition-colors"
              >
                <TwitterIcon size={20} />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/10 flex justify-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} koladev.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 