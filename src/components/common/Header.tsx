'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteProfile } from '@/data/profile';

const scrollToId = (id: string, onDone?: () => void) => {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onDone?.();
  }, 50);
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 border-b border-border/60 bg-background/92 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMobile();
          }}
          className="text-left font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors"
        >
          K.A.
        </button>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => scrollToId('about')}>
            About
          </button>
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => scrollToId('services')}>
            Services
          </button>
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => scrollToId('projects')}>
            Projects
          </button>
          <button type="button" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => scrollToId('contact')}>
            Contact
          </button>
          <Button size="sm" className="font-mono text-[10px] uppercase tracking-wider h-8" asChild>
            <a href={siteProfile.calendlyUrl} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </Button>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <Button size="sm" variant="outline" asChild className="shrink-0 font-mono text-[10px] uppercase tracking-wider h-8 border-primary/30">
            <a href={siteProfile.calendlyUrl} target="_blank" rel="noopener noreferrer">
              Book
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground hover:text-muted-foreground"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden border-t border-border/40 bg-background"
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {(
            [
              ['About', 'about'],
              ['Services', 'services'],
              ['Projects', 'projects'],
              ['Contact', 'contact'],
            ] as const
          ).map(([label, id]) => (
            <button
              key={id}
              type="button"
              className="py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/30 last:border-0"
              onClick={() => scrollToId(id, closeMobile)}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </header>
  );
};
