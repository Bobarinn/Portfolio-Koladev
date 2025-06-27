'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { profile } from '@/data/profile';
import { AnimatedText } from '@/components/common/AnimatedText';
import { GlowingButton } from '@/components/common/GlowingButton';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MailIcon, MapPinIcon, CalendarIcon } from 'lucide-react';

// Validation schema for form
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

// Use environment variables instead of hardcoded values
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_AUTORESPONSE_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!formRef.current) return;
      
      // First send the notification to yourself
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      // Then send an auto-response to the sender with Calendly link
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTORESPONSE_TEMPLATE_ID,
        {
          to_email: data.email,
          to_name: data.name,
          from_name: profile.name,
          message: data.message,
          calendly_link: profile.calendlyUrl,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      toast.success('Message sent! Check your email for confirmation and scheduling options.');
      reset();
    } catch (error) {
      console.error('Email send error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-card/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <AnimatedText text="Get In Touch" className="inline-flex justify-center" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or interested in MBA internship opportunities? 
            Let&apos;s discuss how we can work together.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          <motion.div 
            className="w-full lg:w-1/2 flex"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm w-full flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MailIcon className="h-5 w-5 mt-1 text-glow-blue" />
                      <div>
                        <h4 className="text-sm font-semibold">Email</h4>
                        <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-glow-blue transition-colors">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-5 w-5 mt-1 text-glow-purple" />
                      <div>
                        <h4 className="text-sm font-semibold">Location</h4>
                        <p className="text-muted-foreground">{profile.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarIcon className="h-5 w-5 mt-1 text-glow-cyan" />
                      <div>
                        <h4 className="text-sm font-semibold">Schedule a Meeting</h4>
                        <a 
                          href={profile.calendlyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-glow-cyan transition-colors"
                        >
                          Book a 30-minute call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-glow-cyan/20 via-glow-blue/20 to-glow-purple/20 rounded-lg p-6 mt-auto">
                  <h4 className="font-semibold mb-2">Let&apos;s build something amazing together</h4>
                  <p className="text-sm text-muted-foreground">
                    Whether you need a custom web application, an AI integration, or a no-code solution, 
                    I&apos;m here to help bring your ideas to life.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 flex"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm w-full flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-6">Let&apos;s Build Something</h3>
                
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow flex flex-col">
                  <div>
                    <Input
                      {...register('name')}
                      name="name"
                      placeholder="Your Name"
                      className="bg-background/50 border-border/50"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <Input
                      {...register('email')}
                      name="email"
                      placeholder="Your Email"
                      type="email"
                      className="bg-background/50 border-border/50"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div className="flex-grow">
                    <Textarea
                      {...register('message')}
                      name="message"
                      placeholder="Tell me about your project or internship opportunity..."
                      className="bg-background/50 border-border/50 h-full min-h-[120px]"
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  
                  {/* Hidden fields for EmailJS template variables */}
                  <input 
                    type="hidden" 
                    name="current_date" 
                    value={new Date().toLocaleDateString()} 
                  />
                  
                  <input 
                    type="hidden" 
                    name="calendly_link" 
                    value={profile.calendlyUrl} 
                  />                  
                  <div className="pt-2 mt-auto">
                    <GlowingButton
                      type="submit"
                      glowColor="purple"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Let&apos;s Build Something'}
                    </GlowingButton>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      You&apos;ll receive a confirmation email with my Calendly link
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 