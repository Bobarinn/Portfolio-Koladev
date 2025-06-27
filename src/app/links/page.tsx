'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon,
  ChevronLeftIcon,
  GithubIcon, 
  TwitterIcon, 
  CalendarIcon, 
  ExternalLinkIcon,
  LinkedinIcon,
  Code2Icon,
  BookOpenIcon
} from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

// TikTok Icon component
const TikTokIcon = ({ color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="100%"
      height="100%"
      className="h-5 w-5"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

export default function LinksPage() {
  const [mounted, setMounted] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isPending, setIsPending] = useState(false);
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
  }, [mounted, text]);
  
  // Get top 5 projects
  const topProjects = projects.slice(0, 5);

  const nextProject = () => {
    if (isPending) return;
    setIsPending(true);
    setCurrentProjectIndex((prev) => (prev + 1) % topProjects.length);
    setTimeout(() => setIsPending(false), 500);
  };

  const prevProject = () => {
    if (isPending) return;
    setIsPending(true);
    setCurrentProjectIndex((prev) => (prev - 1 + topProjects.length) % topProjects.length);
    setTimeout(() => setIsPending(false), 500);
  };
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 max-w-full overflow-hidden">
        {/* Static grid background */}
        <div className="grid-background max-w-full">
          <div className="grid opacity-70"></div>
        </div>

        {/* Reduced number of glowing orbs */}
        <div className="glowing-orbs max-w-full overflow-hidden">
          {[...Array(2)].map((_, i) => (
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
      </div>

      <div className="w-full max-w-3xl z-10 relative">
        {/* Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-border/50 bg-card/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-border/30 p-4 bg-card/50 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border border-glow-blue/30">
                <Image 
                  src="/profile.jpg" 
                  alt="Kolade Abobarin" 
                  fill 
                  className="object-cover"
                  priority 
                />
              </div>
              <h1 className="text-lg font-semibold">Links | Kolade</h1>
            </div>
            <Link href="/" className="text-muted-foreground hover:text-glow-blue">
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
          </div>
          
          {/* Main Content */}
          <div className="p-6 flex flex-col items-center space-y-8 max-h-[80vh] overflow-y-auto">
            {/* Profile Section */}
            <div className="text-center mb-6 space-y-4">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple opacity-30 animate-pulse"></div>
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple p-1 bg-gradient-to-r from-glow-cyan/20 via-glow-blue/20 to-glow-purple/20 relative">
                  <Image 
                    src="/profile.jpg" 
                    alt="Kolade Abobarin" 
                    fill 
                    className="object-cover rounded-full" 
                    priority
                  />
                </div>
              </div>
              
              <div>
                <p className="text-xl md:text-2xl font-bold">
                  {typedText}
                  <span className="inline-block h-4 w-2 bg-glow-blue ml-1 animate-blink"></span>
                </p>
                <p className="text-muted-foreground mt-1">{/* Building stuff with AI & coffee. */}</p>
              </div>
            </div>
            
            {/* Link Commands */}
            <div className="w-full space-y-4">
              {/* Projects Accordion */}
              <div>
                <button 
                  onClick={() => setShowProjects(!showProjects)} 
                  className="w-full text-left flex items-center p-3 rounded-md border border-border/50 bg-card/50 hover:bg-card/70 transition-colors"
                >
                  <ChevronRightIcon className={`h-5 w-5 mr-2 text-glow-blue transform transition-transform ${showProjects ? 'rotate-90' : ''}`} />
                  <span className="text-foreground">Projects</span>
                </button>
                
                <AnimatePresence>
                  {showProjects && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 border border-border/30 rounded-md bg-card/20 p-4">
                        {/* Project Carousel */}
                        <div className="relative">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="aspect-video relative rounded-md overflow-hidden"
                          >
                            <Link
                              href={topProjects[currentProjectIndex].demoUrl || topProjects[currentProjectIndex].repoUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full h-full group"
                            >
                              <Image
                                src={topProjects[currentProjectIndex].image}
                                alt={topProjects[currentProjectIndex].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-colors duration-300"></div>
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h3 className="text-white font-bold flex items-center">
                                  {topProjects[currentProjectIndex].title}
                                  <ExternalLinkIcon className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </h3>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {topProjects[currentProjectIndex].tags.slice(0, 3).map((tag) => (
                                    <span 
                                      key={tag} 
                                      className="text-xs bg-glow-blue/20 text-glow-blue px-2 py-0.5 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </Link>

                            {/* Side navigation buttons */}
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                prevProject();
                              }}
                              disabled={isPending}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 transition-colors z-10"
                              aria-label="Previous project"
                            >
                              <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                nextProject();
                              }}
                              disabled={isPending}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/20 transition-colors z-10"
                              aria-label="Next project"
                            >
                              <ChevronRightIcon className="h-5 w-5" />
                            </button>
                            
                            {/* Indicator dots */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1 z-10">
                              <div className="flex gap-1">
                                {topProjects.map((_, index) => (
                                  <span 
                                    key={index} 
                                    className={`w-1.5 h-1.5 rounded-full ${index === currentProjectIndex ? 'bg-white' : 'bg-white/40'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Other Links */}
              <Link 
                href="https://xophie.ai" 
                className="flex items-center p-3 rounded-md border border-border/50 bg-card/50 hover:bg-card/70 transition-colors"
              >
                <span className="text-glow-purple mr-2">
                  <BookOpenIcon className="h-5 w-5" />
                </span>
                <span>Use Xophie to take meeting notes</span>
                <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
              
              <Link 
                href={profile.socials.find(s => s.name === "GitHub")?.url || 'https://github.com/Bobarinn'} 
                className="flex items-center p-3 rounded-md border border-border/50 bg-card/50 hover:bg-card/70 transition-colors"
              >
                <span className="text-glow-blue mr-2">
                  <GithubIcon className="h-5 w-5" />
                </span>
                <span>GitHub</span>
                <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
              
              <Link 
                href={profile.calendlyUrl} 
                className="flex items-center p-3 rounded-md border border-border/50 bg-card/50 hover:bg-card/70 transition-colors"
              >
                <span className="text-glow-purple mr-2">
                  <CalendarIcon className="h-5 w-5" />
                </span>
                <span>Book a Call</span>
                <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
              
              <div className="border border-border/50 rounded-md bg-card/50 overflow-hidden">
                <Link 
                  href="https://github.com/Bobarinn/Portfolio-Koladev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 hover:bg-card/70 transition-colors"
                >
                  <span className="text-glow-cyan mr-2">
                    <Code2Icon className="h-5 w-5" />
                  </span>
                  <span>Contribute to this project</span>
                  <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
                
                <div className="p-3 pt-0">
                  <Link 
                    href="https://github.com/Bobarinn/Portfolio-Koladev/fork"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="w-full flex items-center justify-center gap-1 text-sm bg-card/70 hover:bg-card/90 px-3 py-2 mt-3 rounded border border-border/30 transition-colors"
                  >
                    <GithubIcon className="h-3 w-3 mr-1" />
                    Fork Project
                  </Link>
                </div>
              </div>
              
              <Link 
                href={profile.socials.find(s => s.name === "Twitter")?.url || 'https://x.com/Kolade_Abobarin'} 
                className="flex items-center p-3 rounded-md border border-border/50 bg-card/50 hover:bg-card/70 transition-colors"
              >
                <span className="text-glow-blue mr-2">
                  <TwitterIcon className="h-5 w-5" />
                </span>
                <span>Twitter/X</span>
                <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="w-full pt-8 border-t border-border/30">
              <div className="flex justify-center space-x-4 mb-2">
                <a 
                  href={profile.socials.find(s => s.name === "GitHub")?.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-glow-blue hover:border-glow-blue/50 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a 
                  href={profile.socials.find(s => s.name === "Twitter")?.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-glow-blue hover:border-glow-blue/50 transition-all"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a 
                  href={profile.socials.find(s => s.name === "LinkedIn")?.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-glow-blue hover:border-glow-blue/50 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@kolade.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-glow-blue hover:border-glow-blue/50 transition-all"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
                <a 
                  href={profile.calendlyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 bg-card/30 text-muted-foreground hover:text-glow-blue hover:border-glow-blue/50 transition-all"
                  aria-label="Calendly"
                >
                  <CalendarIcon className="h-5 w-5" />
                </a>
              </div>
              <div className="text-center text-xs text-muted-foreground mt-2">
                <p>@{new Date().getFullYear()} kolade.pro</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 