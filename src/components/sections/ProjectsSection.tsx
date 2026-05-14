'use client';

import { motion } from 'framer-motion';
import { ProjectWorkTable } from '@/components/sections/ProjectWorkTable';
import { sections, designSystem } from '@/data/sections';
import { cn } from '@/lib/utils';

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

export const ProjectsSection = () => {
  const { projects } = sections;

  return (
    <section id="projects" className={cn('scroll-mt-24 border-t border-border/60', designSystem.sectionPadding.y, designSystem.sectionPadding.x)}>
      <div className={cn(designSystem.maxWidth.default, 'mx-auto')}>
        <SectionHeader number={projects.number} label={projects.label} />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-foreground mb-3">{projects.title}</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {projects.description}
          </p>
        </motion.div>

        <ProjectWorkTable />
      </div>
    </section>
  );
};
