'use client';

import React from 'react';
import Image from 'next/image';
import { Lora } from 'next/font/google';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from 'lucide-react';
import { siteProfile } from '@/data/profile';
import { sections, designSystem } from '@/data/sections';
import { cn } from '@/lib/utils';

const polaroidCaptionFont = Lora({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
});

export const HeroSection = () => {
  const { hero } = sections;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const iconMap: Record<string, React.ReactNode> = {
    github: <GitHubLogoIcon className="h-5 w-5" />,
    linkedin: <LinkedInLogoIcon className="h-5 w-5" />,
    twitter: <TwitterLogoIcon className="h-5 w-5" />,
    calendar: <CalendarIcon className="h-5 w-5" />,
  };

  // Function to highlight specific word in headline
  const renderHeadline = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className={designSystem.highlightColor}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <section className="relative border-b border-border/60">
      <div className={cn(designSystem.maxWidth.narrow, 'mx-auto', designSystem.sectionPadding.x, 'pt-28 pb-16 md:pt-32 md:pb-20')}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 items-start"
        >
          <div>
            <p className={designSystem.sectionEyebrow + ' mb-4'}>{hero.eyebrow}</p>
            <p className="font-mono text-sm text-muted-foreground mb-3">{siteProfile.name}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15] mb-6">
              {renderHeadline(hero.headline, hero.highlightWord)}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-10">
              {hero.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                size="lg"
                className="sm:min-w-[168px] font-mono text-xs uppercase tracking-wider"
                onClick={() => scrollTo(hero.buttons.primary.scrollTo)}
              >
                {hero.buttons.primary.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="sm:min-w-[168px] font-mono text-xs uppercase tracking-wider border-border/60 hover:border-primary/60 hover:bg-primary/5"
                onClick={() => scrollTo(hero.buttons.secondary.scrollTo)}
              >
                {hero.buttons.secondary.text}
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {siteProfile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-sm border border-border/70 bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  {iconMap[social.icon] || social.name}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <aside className="flex flex-col items-center lg:items-stretch gap-4">
            <div className="flex w-full justify-center lg:justify-end pt-2 pb-1">
              <div
                className={cn(
                  'w-full max-w-[min(100%,280px)] origin-center',
                  '-rotate-[3.5deg] transition-transform duration-300 hover:-rotate-[2deg]',
                )}
                style={{
                  filter: 'drop-shadow(10px 14px 22px rgba(0, 0, 0, 0.38)) drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.2))',
                }}
              >
                <div className="bg-white pt-[0.7rem] px-[0.7rem] pb-5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
                  <div className="relative aspect-square w-full overflow-hidden bg-[#c8d4e8]">
                    <Image
                      src={siteProfile.image}
                      alt={siteProfile.name}
                      fill
                      sizes="(max-width: 1024px) 280px, 280px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <p
                    className={cn(
                      polaroidCaptionFont.className,
                      'pt-4 pb-0.5 text-center text-[13px] leading-snug tracking-[0.02em] text-neutral-600',
                    )}
                  >
                    {siteProfile.photoCaption}
                  </p>
                </div>
              </div>
            </div>
            <dl className="w-full max-w-[280px] font-mono text-[11px] text-muted-foreground space-y-2 border border-border/60 rounded-sm p-4 bg-card/30">
              <div className="flex justify-between gap-4">
                <dt className="text-primary/90">Role</dt>
                <dd className="text-right text-foreground/90">Freelance builder</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-primary/90">Focus</dt>
                <dd className="text-right text-foreground/90">Bubble · APIs · AI</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-primary/90">Location</dt>
                <dd className="text-right text-foreground/90">{siteProfile.location.split(',')[0]}</dd>
              </div>
            </dl>
          </aside>
        </motion.div>
      </div>
    </section>
  );
};
