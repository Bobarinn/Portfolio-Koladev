'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, MenuIcon, XIcon } from 'lucide-react';
import { GlowingButton } from './GlowingButton';
import { AnimatedLogo } from './AnimatedLogo';
import { profile } from '@/data/profile';

export const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Immediately check the scroll position on mount
  useEffect(() => {
    const checkInitialPosition = () => {
      const currentScrollY = window.scrollY;
      // Show header if we're already scrolled past the threshold
      if (currentScrollY > 100) {
        setShowHeader(true);
      }
    };
    
    checkInitialPosition();
  }, []);
  
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determine whether to show/hide header based on scroll position
    if (currentScrollY > 100) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
    
    setLastScrollY(currentScrollY);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, handleScroll]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };
  
  const scrollToProjects = () => {
    const section = document.getElementById('projects');
    if (section) {
      const sectionTop = section.offsetTop;
      window.scrollTo({
        top: sectionTop - 100, // Adjust for header height
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  
  const scrollToSideQuests = () => {
    const section = document.getElementById('side-quests');
    if (section) {
      const sectionTop = section.offsetTop;
      window.scrollTo({
        top: sectionTop - 100, // Adjust for header height
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  
  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) {
      const sectionTop = section.offsetTop;
      window.scrollTo({
        top: sectionTop - 100, // Adjust for header height
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 ${showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
    >
      <div className="relative">
        {/* Glow effect behind the header */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm z-0" />
        
        {/* Header content */}
        <div className="relative z-10 container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo & Brand */}
          <div onClick={scrollToTop}>
            <AnimatedLogo hideDomainName={true} className="md:hidden" />
            <AnimatedLogo className="hidden md:flex" />
          </div>
          
          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={scrollToProjects}
              className="text-light-text hover:text-glow-blue transition-colors font-medium"
            >
              Projects
            </button>
            <button 
              onClick={scrollToSideQuests}
              className="text-light-text hover:text-glow-blue transition-colors font-medium"
            >
              Side Quests
            </button>
            <button 
              onClick={scrollToContact}
              className="text-light-text hover:text-glow-blue transition-colors font-medium"
            >
              Contact
            </button>
            <GlowingButton href={profile.calendlyUrl}>
              <span className="flex items-center">
                <BookOpenIcon className="w-4 h-4 mr-2" />
                Book a Call
              </span>
            </GlowingButton>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-1 text-white hover:text-glow-blue focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 md:hidden bg-background/90 backdrop-blur-lg overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={scrollToProjects}
                className="py-3 px-4 text-light-text hover:text-glow-blue transition-colors font-medium border-b border-muted-foreground/10"
              >
                Projects
              </button>
              <button 
                onClick={scrollToSideQuests}
                className="py-3 px-4 text-light-text hover:text-glow-blue transition-colors font-medium border-b border-muted-foreground/10"
              >
                Side Quests
              </button>
              <button 
                onClick={scrollToContact}
                className="py-3 px-4 text-light-text hover:text-glow-blue transition-colors font-medium border-b border-muted-foreground/10"
              >
                Contact
              </button>
              <div className="py-2 px-4">
                <GlowingButton href={profile.calendlyUrl} className="w-full justify-center">
                  <span className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    Book a Call
                  </span>
                </GlowingButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}; 