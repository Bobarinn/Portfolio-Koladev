'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon,
  GithubIcon, 
  TwitterIcon, 
  CalendarIcon, 
  ExternalLinkIcon,
  LinkedinIcon,
  Code2Icon,
  CopyIcon,
  BookOpenIcon,
  TrendingUpIcon
} from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

export default function LinksPage() {
  const [mounted, setMounted] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [typedText, setTypedText] = useState('');
  const text = `Hi, I'm Kolade`;
  const typingSpeed = 100; // ms per character
  
  // Load after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Typing effect
  useEffect(() => {
    if (!mounted) return;
    
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(typing);
      }
    }, typingSpeed);
    
    return () => clearInterval(typing);
  }, [mounted]);
  
  // Get top 5 projects
  const topProjects = projects.slice(0, 5);
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen bg-black text-terminal-green font-mono flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Terminal Header */}
        <div className="flex items-center border border-terminal-green rounded-t-md p-2 bg-black">
          <div className="flex gap-2 mr-auto">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="mx-auto text-sm opacity-75">koladev@terminal:~/links</span>
        </div>
        
        {/* Terminal Content */}
        <div className="border-x border-b border-terminal-green p-4 rounded-b-md bg-black shadow-lg shadow-terminal-green/20 max-h-[85vh] overflow-y-auto">
          {/* Avatar and Intro */}
          <div className="flex flex-col items-center mb-6 mt-2">
            <div className="mb-4 relative w-24 h-24">
              <div className="pixelated-avatar">
                <Image 
                  src="/profile.jpg" 
                  alt="Kolade Abobarin" 
                  width={96} 
                  height={96} 
                  className="rounded-md image-pixelated"
                  priority
                />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg mb-1">
                <span className="text-terminal-prompt">&gt;_</span> {typedText}
                <span className="inline-block h-4 w-2 bg-terminal-green ml-1 animate-blink"></span>
              </p>
              <p className="text-sm text-terminal-comment mb-4">// Building stuff with AI & coffee.</p>
            </div>
          </div>
          
          {/* Command Links */}
          <div className="space-y-3">
            {/* Projects Accordion */}
            <motion.div className="command-link">
              <button 
                onClick={() => setShowProjects(!showProjects)} 
                className="w-full text-left flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
              >
                <ChevronRightIcon className={`mr-2 transform transition-transform ${showProjects ? 'rotate-90' : ''}`} />
                <span className="text-terminal-prompt">&gt;_</span>
                <span className="ml-2">Projects</span>
              </button>
              
              <AnimatePresence>
                {showProjects && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 pt-2 overflow-hidden"
                  >
                    <div className="border border-terminal-green/30 rounded-md p-2 bg-terminal-dark">
                      {topProjects.map((project, index) => (
                        <a 
                          key={project.id}
                          href={project.demoUrl || project.repoUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
                        >
                          <span className="text-terminal-prompt text-sm">[{index + 1}]</span>
                          <span className="ml-2 truncate flex-1">{project.title}</span>
                          <ExternalLinkIcon className="h-4 w-4 ml-2 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Xophie Link */}
            <a 
              href="https://xophie.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="command-link flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
            >
              <ChevronRightIcon className="mr-2" />
              <span className="text-terminal-prompt">&gt;_</span>
              <span className="ml-2">Use Xophie to take meeting notes</span>
              <ExternalLinkIcon className="h-4 w-4 ml-auto" />
            </a>
            
            {/* GitHub Link */}
            <a 
              href={profile.socials.find(s => s.name === "GitHub")?.url || 'https://github.com/Bobarinn'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="command-link flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
            >
              <ChevronRightIcon className="mr-2" />
              <span className="text-terminal-prompt">&gt;_</span>
              <span className="ml-2">GitHub</span>
              <GithubIcon className="h-4 w-4 ml-auto" />
            </a>
            
            {/* Live Demos Link */}
            <a 
              href="#projects" 
              className="command-link flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
            >
              <ChevronRightIcon className="mr-2" />
              <span className="text-terminal-prompt">&gt;_</span>
              <span className="ml-2">Live Demos</span>
              <TrendingUpIcon className="h-4 w-4 ml-auto" />
            </a>
            
            {/* Book a Call Link */}
            <a 
              href={profile.calendlyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="command-link flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
            >
              <ChevronRightIcon className="mr-2" />
              <span className="text-terminal-prompt">&gt;_</span>
              <span className="ml-2">Book a Call</span>
              <CalendarIcon className="h-4 w-4 ml-auto" />
            </a>
            
            {/* Clone Repo Link */}
            <div className="command-link flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors group relative">
              <ChevronRightIcon className="mr-2" />
              <span className="text-terminal-prompt">&gt;_</span>
              <span className="ml-2 flex-1">Clone this repo</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('git clone https://github.com/Bobarinn/Portfolio-Koladev.git');
                }}
                className="text-xs bg-terminal-green/20 px-2 py-0.5 rounded hover:bg-terminal-green/40 transition-colors flex items-center"
              >
                <CopyIcon className="h-3 w-3 mr-1" />
                Copy
              </button>
            </div>
            
            {/* Twitter/X Link */}
            <a 
              href={profile.socials.find(s => s.name === "Twitter")?.url || 'https://x.com/Kolade_Abobarin'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="command-link flex items-center p-2 hover:bg-terminal-green/10 rounded transition-colors"
            >
              <ChevronRightIcon className="mr-2" />
              <span className="text-terminal-prompt">&gt;_</span>
              <span className="ml-2">Twitter/X</span>
              <TwitterIcon className="h-4 w-4 ml-auto" />
            </a>
          </div>
          
          {/* Social Icons */}
          <div className="mt-8 pt-6 border-t border-terminal-green/30">
            <div className="flex justify-center space-x-4 mb-2">
              <a 
                href={profile.socials.find(s => s.name === "GitHub")?.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-prompt transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a 
                href={profile.socials.find(s => s.name === "Twitter")?.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-prompt transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a 
                href={profile.socials.find(s => s.name === "LinkedIn")?.url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-prompt transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@kolade.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-prompt transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                  <path d="M15 8v8a4 4 0 0 1-4 4"/>
                  <line x1="15" y1="12" x2="20" y2="12"/>
                </svg>
              </a>
              <a 
                href={profile.calendlyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-prompt transition-colors"
                aria-label="Calendly"
              >
                <CalendarIcon className="h-5 w-5" />
              </a>
            </div>
            <div className="text-center text-xs text-terminal-comment mt-2">
              <p>@{new Date().getFullYear()} koladev.dev</p>
              <div className="flex items-center justify-center mt-1">
                <span className="inline-block h-2 w-2 bg-terminal-green rounded-full animate-pulse mr-1"></span>
                <span>terminal online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 