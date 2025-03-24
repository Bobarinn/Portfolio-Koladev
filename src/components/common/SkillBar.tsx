'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Skill } from '@/data/skills';

interface SkillBarProps {
  skill: Skill;
  index: number;
  colorClass?: string;
}

export const SkillBar = ({ skill, index, colorClass = 'bg-glow-blue' }: SkillBarProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const width = `${skill.proficiency * 10}%`;
  
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-foreground">
          {skill.name}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {skill.proficiency}/10
        </span>
      </div>
      
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass} skill-bar-animation`}
          initial={{ width: "0%" }}
          animate={inView ? { width } : { width: "0%" }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            boxShadow: colorClass === 'bg-glow-cyan' ? '0 0 8px rgba(34, 211, 238, 0.6)' : 
                      colorClass === 'bg-glow-purple' ? '0 0 8px rgba(149, 76, 233, 0.6)' : 
                      '0 0 8px rgba(65, 184, 255, 0.6)'
          }}
        />
      </div>
    </div>
  );
}; 