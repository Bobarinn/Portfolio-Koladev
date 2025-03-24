'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GithubIcon, ExternalLinkIcon } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="h-full"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        className="h-full"
      >
        <Card 
          className={`
            group overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300
            h-full py-0 flex flex-col relative
            ${isHovered ? 
              'ice-card border-glow-cyan/60 shadow-lg shadow-glow-cyan/20 bg-gradient-to-b from-glow-cyan/5 to-glow-blue/10 backdrop-blur-md' : 
              'hover:border-glow-blue/50 hover:shadow-md hover:shadow-glow-blue/10'
            }
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="ice-shimmer"></div>
              <div className="frost-overlay"></div>
            </div>
          )}
          <div className="relative h-48 overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full relative"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-300"
                priority={index < 6}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="secondary"
                className={`
                  uppercase text-xs font-medium
                  ${project.category === 'no-code' ? 'bg-glow-cyan/20 text-glow-cyan' : ''}
                  ${project.category === 'code' ? 'bg-glow-blue/20 text-glow-blue' : ''}
                  ${project.category === 'ai' ? 'bg-glow-purple/20 text-glow-purple' : ''}
                `}
              >
                {project.category}
              </Badge>
            </div>
          </div>
          
          <CardContent className="flex-grow p-4 relative z-10">
            <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm">{project.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className={`text-xs ${isHovered ? 'bg-white/10 border-glow-cyan/40' : 'bg-muted/30'}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2 p-4 pt-0 relative z-10">
            {project.repoUrl && (
              <Button 
                variant="ghost" 
                size="sm" 
                className={isHovered ? 'hover:bg-white/10 text-glow-cyan' : ''}
                asChild
              >
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <GithubIcon className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            )}
            
            {project.demoUrl && (
              <Button 
                variant="outline" 
                size="sm"
                className={isHovered ? 'border-glow-cyan/50 text-glow-cyan bg-white/5 hover:bg-white/10' : ''}
                asChild
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <span>View</span>
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}; 