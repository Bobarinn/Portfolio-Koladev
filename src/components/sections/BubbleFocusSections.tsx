'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { sections, designSystem } from '@/data/sections';
import { cn } from '@/lib/utils';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
};

// Section Header Component for consistency
const SectionHeader = ({ number, label }: { number: string; label: string }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 border-b border-border/60 pb-4">
      <span className={designSystem.sectionNumber}>S {number}</span>
      <span className={designSystem.sectionLabel}>{label}</span>
      <div className="flex-1 h-px bg-border/40"></div>
    </div>
  </div>
);

export function AboutSection() {
  const { about } = sections;

  return (
    <section id="about" className={cn('scroll-mt-24 border-t border-border/60', designSystem.sectionPadding.y, designSystem.sectionPadding.x)}>
      <div className={cn(designSystem.maxWidth.default, 'mx-auto')}>
        <SectionHeader number={about.number} label={about.label} />
        <div className={cn(designSystem.maxWidth.text, 'mx-auto')}>
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-6 text-foreground">{about.title}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {about.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhatIDoSection() {
  const { services } = sections;

  return (
    <section id="services" className={cn('scroll-mt-24 border-t border-border/60 bg-card/20', designSystem.sectionPadding.y, designSystem.sectionPadding.x)}>
      <div className={cn(designSystem.maxWidth.default, 'mx-auto')}>
        <SectionHeader number={services.number} label={services.label} />
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-3 text-foreground">{services.title}</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {services.description}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {services.items.map((item) => (
            <motion.div key={item.title} {...fadeUp}>
              <Card className="h-full rounded-sm border border-border/60 bg-card/40 transition-colors hover:border-primary/35">
                <CardContent className="p-6">
                  <h3 className="text-base font-medium mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyWorkSection() {
  const { why } = sections;

  return (
    <section id="why" className={cn('scroll-mt-24 border-t border-border/60', designSystem.sectionPadding.y, designSystem.sectionPadding.x)}>
      <div className={cn(designSystem.maxWidth.default, 'mx-auto')}>
        <SectionHeader number={why.number} label={why.label} />
        <div className={cn(designSystem.maxWidth.text, 'mx-auto')}>
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-4 text-foreground">{why.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {why.description}
            </p>
            <ul className="space-y-3 text-muted-foreground">
              {why.reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <span className="text-foreground mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const stackColumns = [
  {
    label: 'No-code',
    items: ['Bubble.io', 'Make', 'Zapier', 'FlutterFlow', 'n8n'],
  },
  {
    label: 'AI',
    items: ['Claude Code', 'Langchain', 'Codex', 'MCP'],
  },
  {
    label: 'Code',
    items: ['JavaScript', 'Python', 'SQL'],
  },
  {
    label: 'Backend & data',
    items: ['Firebase', 'Supabase', 'Xano', 'Oracle SQL'],
  },
  {
    label: 'Product & ops',
    items: ['Figma', 'GitHub', 'Linear', 'Postman', 'Vercel'],
  },
] as const;

export function ToolsSection() {
  const { tools } = sections;

  return (
    <section id="tools" className={cn('scroll-mt-24 bg-card/15 border-t border-border/60', designSystem.sectionPadding.y, designSystem.sectionPadding.x)}>
      <div className={cn(designSystem.maxWidth.default, 'mx-auto')}>
        <SectionHeader number={tools.number} label={tools.label} />
        <motion.div {...fadeUp} className="mb-8">
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed mb-8">
            {tools.description}
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="-mx-1 overflow-x-auto md:mx-0">
          <div className="inline-block min-w-[880px] w-full max-w-none align-top font-mono text-[11px] leading-relaxed md:min-w-full md:text-xs">
            <div className="rounded-sm border border-border/80 bg-card/25">
              <div className="grid grid-cols-5 divide-x divide-border/50">
                {stackColumns.map((col) => (
                  <div key={col.label} className="min-w-0">
                    <div className="border-b border-border/60 bg-foreground/5 px-3 py-2.5 text-[10px] font-medium uppercase tracking-wider text-primary md:px-3.5 md:text-[11px]">
                      {col.label}
                    </div>
                    <ul className="text-muted-foreground">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between gap-3 border-b border-dotted border-border/45 px-3 py-2.5 last:border-b-0 md:px-3.5 md:py-2.5"
                        >
                          <span className="min-w-0 break-words text-left text-foreground/85">{item}</span>
                          <span
                            className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/35"
                            aria-hidden
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className={cn('border-t border-border/60', designSystem.sectionPadding.y, designSystem.sectionPadding.x)}>
      <div className={cn(designSystem.maxWidth.text, 'mx-auto text-center')}>
        <motion.div {...fadeUp}>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Have an idea you want to build, or an existing Bubble app that needs structure, integrations, or a quality pass?
          </p>
          <p className="text-lg font-normal text-foreground">Let&apos;s work together.</p>
        </motion.div>
      </div>
    </section>
  );
}
