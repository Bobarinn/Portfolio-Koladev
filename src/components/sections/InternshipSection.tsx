'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { GlowingButton } from '@/components/common/GlowingButton';
import { DownloadIcon, LinkedinIcon, CalendarIcon } from 'lucide-react';
import Image from 'next/image';

export const InternshipSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load LinkedIn badge script only on client side
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.defer = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
      
      return () => {
        // Cleanup script on unmount
        const existingScript = document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, []);

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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="internship-opportunity">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-glow-blue/5 via-transparent to-glow-purple/5"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-glow-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-glow-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-purple bg-clip-text text-transparent"
          >
            Currently Seeking MBA Internship Opportunities
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            I&apos;m a dual MBA/MSIS candidate at Baylor University with a strong background in software and no-code development. 
            I specialize in building scalable, AI-powered tools and have led multiple product launches from idea to execution.
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Seeking <span className="text-glow-blue font-medium">Summer 2026 MBA internship roles</span> in 
            <span className="text-glow-purple font-medium"> Product Management</span>,
            <span className="text-glow-purple font-medium"> Program Management</span>,  
            <span className="text-glow-cyan font-medium"> AI Strategy</span>, or 
            <span className="text-glow-blue font-medium"> Innovation</span>.
          </motion.p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {/* Resume Card */}
          <motion.div
            variants={itemVariants}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-glow-blue/30 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-glow-blue/10 rounded-lg flex items-center justify-center mr-4">
                <DownloadIcon className="h-6 w-6 text-glow-blue" />
              </div>
              <h3 className="text-xl font-semibold">View Résumé</h3>
            </div>
            
            {/* Resume Preview Image */}
            <div className="mb-6 relative">
              <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-border/30">
                <Image 
                  src="/resume-preview.jpg" 
                  alt="Resume Preview" 
                  fill 
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Download my comprehensive résumé to see my full background, skills, and experience in product development and AI integration.
            </p>
            <GlowingButton
              onClick={() => window.open(profile.resumeUrl, '_blank')}
              glowColor="blue"
              size="default"
              className="w-full"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download Résumé
            </GlowingButton>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            variants={itemVariants}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-glow-purple/30 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-glow-purple/10 rounded-lg flex items-center justify-center mr-4">
                <LinkedinIcon className="h-6 w-6 text-glow-purple" />
              </div>
              <h3 className="text-xl font-semibold">Connect on LinkedIn</h3>
            </div>
            
            {/* LinkedIn Badge */}
            <div className="mb-6 flex justify-center">
              <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-border/30 flex items-center justify-center">
                {mounted && (
                  <div 
                    className="badge-base LI-profile-badge"
                    data-locale="en_US"
                    data-size="large"
                    data-theme="dark"
                    data-type="VERTICAL"
                    data-vanity="koladeabobarin"
                    data-version="v1"
                  >
                    <a 
                      className="badge-base__link LI-simple-link"
                      href="https://www.linkedin.com/in/koladeabobarin?trk=profile-badge"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              See more about my background, experiences, certifications, and professional network on LinkedIn.
            </p>
            <GlowingButton
              onClick={() => window.open(profile.linkedinUrl, '_blank')}
              glowColor="purple"
              size="default"
              className="w-full"
            >
              <LinkedinIcon className="h-4 w-4 mr-2" />
              View Full Profile
            </GlowingButton>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-glow-blue/10 via-glow-purple/10 to-glow-cyan/10 border border-glow-blue/20 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-muted-foreground mb-6">
            {profile.aim}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowingButton
                onClick={() => window.open(profile.calendlyUrl, '_blank')}
                glowColor="blue"
                size="default"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule a Call
              </GlowingButton>
              <GlowingButton
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                variant="outline"
                glowColor="purple"
                size="default"
              >
                Let&apos;s Build Something
              </GlowingButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 