'use client';

import React from 'react';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from 'lucide-react';
import { siteProfile } from '@/data/profile';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const iconMap: Record<string, React.ReactNode> = {
    github: <GitHubLogoIcon className="h-4 w-4" />,
    linkedin: <LinkedInLogoIcon className="h-4 w-4" />,
    twitter: <TwitterLogoIcon className="h-4 w-4" />,
    calendar: <CalendarIcon className="h-4 w-4" />,
  };

  return (
    <footer className="bg-background border-t border-border/40 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-semibold text-foreground">Kolade Abobarin</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Bubble.io development and AI automation for founders who need a product-minded builder, not a generic dev shop.
            </p>
          </div>

          <div className="flex gap-3">
            {siteProfile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                {iconMap[social.icon] || social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>
            &copy; {currentYear} Kolade Abobarin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
