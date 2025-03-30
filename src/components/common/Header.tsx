'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, MenuIcon, XIcon, LinkIcon } from 'lucide-react';
import { GlowingButton } from './GlowingButton';
import { AnimatedLogo } from './AnimatedLogo';
import { profile } from '@/data/profile';
import Link from 'next/link';

export const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Set up scroll listener after component is mounted
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      // Show header when scrolled down by any amount
      if (window.scrollY > 50) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };
    
    // Check initial position
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);
  
  const scrollToTop = () => {
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    // Small delay to ensure menu is closed before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 50);
  };
  
  const scrollToProjects = () => {
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    // Small delay to ensure menu is closed before scrolling
    setTimeout(() => {
      const section = document.getElementById('projects');
      if (section) {
        // Use scrollIntoView for more reliable scrolling on mobile
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 50);
  };
  
  const scrollToSideQuests = () => {
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    // Small delay to ensure menu is closed before scrolling
    setTimeout(() => {
      const section = document.getElementById('side-quests');
      if (section) {
        // Use scrollIntoView for more reliable scrolling on mobile
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 50);
  };
  
  const scrollToContact = () => {
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    // Small delay to ensure menu is closed before scrolling
    setTimeout(() => {
      const section = document.getElementById('contact');
      if (section) {
        // Use scrollIntoView for more reliable scrolling on mobile
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 50);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Don't render anything on server or during hydration to prevent mismatch
  if (!mounted) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 ${
        showHeader ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
      } transition-all duration-300`}
    >
      <div className="relative">
        {/* Glow effect behind the header */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm z-0" />
        
        {/* Header content */}
        <div className="relative z-10 container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo & Brand */}
          <div onClick={scrollToTop} className="cursor-pointer">
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
            <Link 
              href="/links" 
              className="text-light-text hover:text-glow-blue transition-colors font-medium flex items-center"
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              Links
            </Link>
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
              <Link 
                href="/links"
                className="py-3 px-4 text-light-text hover:text-glow-blue transition-colors font-medium border-b border-muted-foreground/10 flex items-center"
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Links
              </Link>
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