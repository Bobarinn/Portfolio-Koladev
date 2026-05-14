'use client';

import { motion } from 'framer-motion';
import { ProjectWorkTable } from '@/components/sections/ProjectWorkTable';

export const ProjectsSection = () => {
  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-24 px-4 border-t border-border/60">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <p className="section-eyebrow mb-3">Selected work</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Featured projects</h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Collapsible work log, same structure I use to document scope, stack, and ship status for stakeholders.
          </p>
        </motion.div>

        <ProjectWorkTable />
      </div>
    </section>
  );
};
