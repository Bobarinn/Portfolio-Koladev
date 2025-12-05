'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/common/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedText } from '@/components/common/AnimatedText';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'no-code' | 'code' | 'ai';
  image: string;
  images?: string[];
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/data/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <AnimatedText text="My Projects" className="inline-flex justify-center" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work across No-Code, Traditional Code, and AI domains. Each project demonstrates
            different skills and approaches to solving problems.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card/30 backdrop-blur-sm">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="no-code"
                className="data-[state=active]:bg-glow-cyan/80 data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                No-Code
              </TabsTrigger>
              <TabsTrigger 
                value="code"
                className="data-[state=active]:bg-glow-blue/80 data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                Code
              </TabsTrigger>
              <TabsTrigger 
                value="ai"
                className="data-[state=active]:bg-glow-purple/80 data-[state=active]:text-black data-[state=active]:shadow-sm"
              >
                AI
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent 
            value={activeTab}
            className="mt-0"
          >
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No projects found.</div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}; 