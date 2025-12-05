'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkillBar } from '@/components/common/SkillBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedText } from '@/components/common/AnimatedText';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  name: string;
  icon?: string;
  proficiency: number;
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/data/skills');
        if (response.ok) {
          const data = await response.json();
          // Transform the grouped data into categories
          const categories: SkillCategory[] = [
            {
              id: 'no-code',
              name: 'No-Code',
              description: 'Building fully functional applications without traditional coding using visual development platforms.',
              skills: data.grouped?.['no-code'] || [],
            },
            {
              id: 'code',
              name: 'Code',
              description: 'Developing custom applications and services using modern programming languages and frameworks.',
              skills: data.grouped?.['code'] || [],
            },
            {
              id: 'ai',
              name: 'AI/ML',
              description: 'Leveraging artificial intelligence and machine learning technologies to build intelligent applications.',
              skills: data.grouped?.['ai'] || [],
            },
          ];
          setSkillCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const colorMap: Record<string, string> = {
    'no-code': 'bg-glow-cyan',
    'code': 'bg-glow-blue',
    'ai': 'bg-glow-purple',
  };

  return (
    <section id="skills" className="py-20 px-4 bg-card/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <AnimatedText text="My Skills" className="inline-flex justify-center" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expertise across various technologies and platforms, from traditional coding to no-code solutions and AI implementation.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading skills...</div>
        ) : skillCategories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No skills found.</div>
        ) : (
          <Tabs defaultValue={skillCategories[0]?.id || 'no-code'} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card/30 backdrop-blur-sm">
                {skillCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className={`
                      data-[state=active]:shadow-sm
                      ${category.id === 'no-code' ? 'data-[state=active]:bg-glow-cyan/80 data-[state=active]:text-black' : ''}
                      ${category.id === 'code' ? 'data-[state=active]:bg-glow-blue/80 data-[state=active]:text-black' : ''}
                      ${category.id === 'ai' ? 'data-[state=active]:bg-glow-purple/80 data-[state=active]:text-black' : ''}
                    `}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
                    >
                      {category.skills.map((skill, index) => (
                        <SkillBar 
                          key={skill.name} 
                          skill={skill} 
                          index={index} 
                          colorClass={colorMap[category.id]}
                        />
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </section>
  );
}; 