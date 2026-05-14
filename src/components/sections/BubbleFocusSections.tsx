'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
};

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-24 px-4 border-t border-border/60">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <p className="section-eyebrow mb-3">About</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-foreground">How I work</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a software developer and product builder with deep experience in Bubble.io, other no-code
              platforms, AI automation, and traditional development when a project needs it.
            </p>
            <p>
              I&apos;ve shipped products from AI-assisted wedding planning and job platforms to home-service CRMs,
              review systems, and voice agents. That mix gives me a practical bridge between no-code speed and
              custom integrations.
            </p>
            <p>
              I don&apos;t only assemble screens. I help define workflows, structure databases, wire APIs, tighten UX,
              and turn vague ideas into software people actually use.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    title: 'Bubble.io development',
    body: 'Responsive, production-ready Bubble apps with clear workflows, scalable data models, and polished UX.',
  },
  {
    title: 'AI and automation',
    body: 'Connect Bubble and custom pieces to LLMs, agents, and automation (Zapier, Make, APIs) so products feel intelligent, not bolted on.',
  },
  {
    title: 'MVP development',
    body: 'Help founders go from idea to launch: core journey first, fast build, and guardrails so you don&apos;t drown in unnecessary complexity.',
  },
  {
    title: 'API and backend integration',
    body: 'Stripe, PayPal, Firebase, Google APIs, AI providers, webhooks, and custom backends, integrated cleanly with Bubble where it makes sense.',
  },
] as const;

export function WhatIDoSection() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-24 px-4 border-t border-border/60 bg-card/20">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl">
          <p className="section-eyebrow mb-3">Capabilities</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-foreground">What I do</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Independent freelance work centered on Bubble.io, plus the integrations and AI layers that real products need.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((s) => (
            <motion.div key={s.title} {...fadeUp}>
              <Card className="h-full rounded-lg border border-border/60 bg-card/40 transition-colors hover:border-primary/35">
                <CardContent className="p-6">
                  <h3 className="text-base font-semibold mb-2 text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  'Production Bubble.io applications end to end',
  'AI APIs and automation wired into real user flows',
  'Leading developers and QA on complex builds',
  'Database design and non-trivial Bubble workflows',
  'Third-party APIs, payments, and webhooks',
  'Helping founders structure MVPs from fuzzy briefs',
  'Growing MVPs toward more scalable architectures',
] as const;

export function WhyWorkSection() {
  return (
    <section id="why" className="scroll-mt-24 py-20 md:py-24 px-4 border-t border-border/60">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <p className="section-eyebrow mb-3">Rationale</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-foreground">Why work with me</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I care about product strategy, workflows, business goals, and the tradeoff between shipping fast and
            building something you can live with for the next phase, not just tickets closed.
          </p>
          <ul className="space-y-3 text-muted-foreground">
            {reasons.map((r) => (
              <li key={r} className="flex gap-3">
                <span className="text-foreground mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

const stackColumns = [
  {
    label: 'No-code',
    items: [
      'Bubble.io',
      'FlutterFlow',
      'Make',
      'Zapier',
      'n8n',
      'Airtable',
      'Softr',
      'Glide',
      'Webflow',
      'Framer',
      'Retool',
      'WeWeb',
      'Notion',
      'Budibase',
    ],
  },
  {
    label: 'AI',
    items: [
      'OpenAI',
      'Gemini',
      'Anthropic',
      'Claude',
      'Claude Code',
      'Codex',
      'Cursor',
      'LangChain',
      'LangGraph',
      'Hugging Face',
      'AssemblyAI',
      'Cartesia',
      'Whisper',
      'Pinecone',
      'RAG / evals',
      'Ollama',
    ],
  },
  {
    label: 'Code',
    items: [
      'TypeScript',
      'JavaScript',
      'Python',
      'SQL',
      'Node.js',
      'Next.js',
      'React',
      'FastAPI',
      'Express',
      'Zod',
      'Prisma',
      'Tailwind CSS',
      'ESLint',
      'Vitest',
      'Playwright',
    ],
  },
  {
    label: 'Backend & data',
    items: [
      'Firebase',
      'PostgreSQL',
      'Neon',
      'PlanetScale',
      'Redis',
      'REST APIs',
      'GraphQL',
      'WebSockets',
      'Stripe',
      'OAuth 2',
      'JWT',
      'Drizzle ORM',
      'Cloudflare Workers',
      'S3 / R2',
    ],
  },
  {
    label: 'Product & ops',
    items: [
      'Figma',
      'FigJam',
      'Linear',
      'Jira',
      'GitHub',
      'GitLab',
      'Postman',
      'Insomnia',
      'Docker',
      'Compose',
      'GitHub Actions',
      'Vercel',
      'Sentry',
      'Datadog',
      'Slack webhooks',
    ],
  },
] as const;

export function ToolsSection() {
  return (
    <section id="tools" className="scroll-mt-24 py-20 md:py-24 px-4 bg-card/15 border-t border-border/60">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="mb-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-[11px]">
              <span className="text-primary">05</span>
              <span className="mx-2 text-border">/</span>
              <span>STACK</span>
              <span className="mx-2 text-border">/</span>
              <span>TOOLS & TECHNOLOGIES</span>
            </p>
            <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground/80">
              <ChevronDown className="h-3 w-3 opacity-70" aria-hidden />
              scroll
            </p>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Names only, biased toward what ships in client work: no-code surfaces, AI wiring, integrations, and delivery
            hygiene.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="-mx-1 overflow-x-auto md:mx-0">
          <div className="inline-block min-w-[880px] w-full max-w-none align-top font-mono text-[11px] leading-relaxed md:min-w-full md:text-xs">
            <div className="rounded-md border border-border/80 bg-card/25">
              <div className="grid grid-cols-5 divide-x divide-border/50">
                {stackColumns.map((col) => (
                  <div key={col.label} className="min-w-0">
                    <div className="border-b border-border/60 bg-foreground/5 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-primary md:px-3.5 md:text-[11px]">
                      {col.label}
                    </div>
                    <ul className="text-muted-foreground">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between gap-3 border-b border-dotted border-border/45 px-3 py-2.5 last:border-b-0 md:px-3.5 md:py-2.5"
                        >
                          <span className="min-w-0 break-words text-left text-foreground/85">{item}</span>
                          <span
                            className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/35"
                            aria-hidden
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-20 px-4 border-t border-border/60">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp}>
          <p className="section-eyebrow mb-4">Next step</p>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Have an idea you want to build, or an existing Bubble app that needs structure, integrations, or a quality pass?
          </p>
          <p className="text-lg font-medium text-foreground">Let&apos;s work together.</p>
        </motion.div>
      </div>
    </section>
  );
}
