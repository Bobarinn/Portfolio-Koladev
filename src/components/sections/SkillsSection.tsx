'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { SkillBar } from '@/components/common/SkillBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedText } from '@/components/common/AnimatedText';
import { Card, CardContent } from '@/components/ui/card';

export const SkillsSection = () => {
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

        <Tabs defaultValue={skillCategories[0].id} className="w-full">
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
      </div>
    </section>
  );
}; 