'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/common/AnimatedText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GithubIcon, ExternalLinkIcon } from 'lucide-react';
import Image from 'next/image';

interface SideQuest {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const SideQuestsSection = () => {
  const [sideQuests, setSideQuests] = useState<SideQuest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSideQuests = async () => {
      try {
        const response = await fetch('/api/data/sidequests');
        if (response.ok) {
          const data = await response.json();
          setSideQuests(data);
        }
      } catch (error) {
        console.error('Error fetching sidequests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSideQuests();
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

  return (
    <section className="py-20 px-4" id="side-quests">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <AnimatedText text="Side Quests" className="inline-flex justify-center" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorations and experiments that showcase my curiosity and continuous learning, from autonomous agents to custom AI integrations.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading sidequests...</div>
        ) : sideQuests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No sidequests found.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {sideQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10`}
            >
              <div className="relative w-full md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-glow-blue/20 to-glow-purple/20 mix-blend-overlay z-10" />
                <div className="w-full h-full relative">
                  <Image
                    src={quest.image}
                    alt={quest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-3">{quest.title}</h3>
                <p className="text-muted-foreground mb-4">{quest.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {quest.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {quest.repoUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={quest.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <GithubIcon className="h-4 w-4" />
                        <span>Repository</span>
                      </a>
                    </Button>
                  )}
                  
                  {quest.demoUrl && (
                    <Button variant="default" size="sm" asChild>
                      <a href={quest.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <span>View Demo</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}; 