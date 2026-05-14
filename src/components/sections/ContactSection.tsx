'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MailIcon, MapPinIcon, CalendarIcon } from 'lucide-react';
import { siteProfile } from '@/data/profile';

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
          from_name: siteProfile.name,
          message: data.message,
          calendly_link: siteProfile.calendlyUrl,
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
    <section id="contact" className="scroll-mt-24 py-20 md:py-24 px-4 border-t border-border/60 bg-card/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-eyebrow mb-3">Contact</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-foreground">Start a conversation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Tell me about your Bubble app, MVP, or integration. I&apos;ll reply with next steps and whether we&apos;re a fit.
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
            <Card className="border-border/60 bg-card/40 w-full flex flex-col rounded-lg">
              <CardContent className="p-6 flex flex-col flex-grow justify-between h-full">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Details</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MailIcon className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h4 className="text-sm font-semibold">Email</h4>
                        <a href={`mailto:${siteProfile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {siteProfile.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h4 className="text-sm font-semibold">Location</h4>
                        <p className="text-muted-foreground">{siteProfile.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarIcon className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h4 className="text-sm font-semibold">Schedule a Meeting</h4>
                        <a 
                          href={siteProfile.calendlyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          Book a 30-minute call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-border/50 bg-muted/20 p-6 mt-auto">
                  <h4 className="font-medium mb-2 text-foreground">Freelance Bubble.io work</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Scoped engagements for builds, fixes, performance, and integrations, with clear communication and predictable delivery.
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
            <Card className="border-border/60 bg-card/40 w-full flex flex-col rounded-lg">
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Message</h3>
                
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
                      placeholder="Describe your Bubble app, timeline, and what you need help with…"
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
                    value={siteProfile.calendlyUrl} 
                  />                  
                  <div className="pt-2 mt-auto">
                    <Button type="submit" className="w-full font-mono text-xs uppercase tracking-wider" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Send message'}
                    </Button>
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