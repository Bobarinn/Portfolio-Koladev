'use client';

import React from 'react';

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const versionString = `v${currentYear}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  return (
    <footer className="bg-background border-t border-border/40 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
          <p className="text-center sm:text-left">
            © {currentYear} kolade.abobarin · built and maintained by hand
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              {versionString} <span className="text-primary">●</span> live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
