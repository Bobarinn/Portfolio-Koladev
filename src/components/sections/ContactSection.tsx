'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { sections, designSystem } from '@/data/sections';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  from_name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  reply_to: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const SectionHeader = ({ number, label }: { number: string; label: string }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 border-b border-border/60 pb-4">
      <span className={designSystem.sectionNumber}>S {number}</span>
      <span className={designSystem.sectionLabel}>{label}</span>
      <div className="flex-1 h-px bg-border/40"></div>
    </div>
  </div>
);

export const ContactSection = () => {
  const { contact } = sections;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        autoReplyFailed?: boolean;
      };

      if (!res.ok) {
        toast.error(payload.error ?? 'Something went wrong. Please try again.');
        return;
      }

      if (payload.autoReplyFailed) {
        toast.success('Message sent! The confirmation email could not be delivered, but I received your note and will reply soon.');
      } else {
        toast.success('Message sent! Check your inbox for a quick confirmation.');
      }
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const renderHeadline = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className={designSystem.highlightColor}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <section
      id="contact"
      className={cn(
        'scroll-mt-24 bg-background border-t border-border/60',
        designSystem.sectionPadding.y,
        designSystem.sectionPadding.x
      )}
    >
      <div className={cn(designSystem.maxWidth.default, 'mx-auto')}>
        <SectionHeader number={contact.number} label={contact.label} />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 leading-tight">
                {renderHeadline(contact.headline, contact.highlightWord)}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                {contact.description}
              </p>
            </div>

            <div className="space-y-4 font-mono text-sm">
              {contact.info.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-muted-foreground min-w-[100px]">{item.label}</span>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-foreground">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-[oklch(0.98_0.002_264)] dark:bg-[oklch(0.175_0.038_264)] border border-border/60 rounded-sm p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-border/40">
                <span className="font-mono text-xs text-foreground">{contact.form.header}</span>
                <span className="font-mono text-xs text-muted-foreground">{contact.form.contentType}</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">
                    {contact.form.fields.from_name.label}
                  </label>
                  <Input
                    {...register('from_name')}
                    autoComplete="name"
                    placeholder={contact.form.fields.from_name.placeholder}
                    className="bg-background/80 border-border/40 font-mono text-sm placeholder:text-muted-foreground/50 h-10"
                  />
                  {errors.from_name && (
                    <p className="text-xs text-destructive mt-1 font-mono">{errors.from_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">
                    {contact.form.fields.reply_to.label}
                  </label>
                  <Input
                    {...register('reply_to')}
                    type="email"
                    autoComplete="email"
                    placeholder={contact.form.fields.reply_to.placeholder}
                    className="bg-background/80 border-border/40 font-mono text-sm placeholder:text-muted-foreground/50 h-10"
                  />
                  {errors.reply_to && (
                    <p className="text-xs text-destructive mt-1 font-mono">{errors.reply_to.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-2 block">
                    {contact.form.fields.message.label}
                  </label>
                  <Textarea
                    {...register('message')}
                    autoComplete="off"
                    placeholder={contact.form.fields.message.placeholder}
                    rows={4}
                    className="bg-background/80 border-border/40 font-mono text-sm placeholder:text-muted-foreground/50 resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1 font-mono">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 font-mono text-sm h-11 rounded-sm"
                >
                  {isSubmitting ? contact.form.submittingText : contact.form.submitButton}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
