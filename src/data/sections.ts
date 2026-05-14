/**
 * Central data source for all homepage sections
 * Edit this file to update content across the portfolio
 */

export const sections = {
  hero: {
    number: '01',
    label: './INTRO',
    eyebrow: 'Bubble.io · AI · Product',
    headline: 'Building products that solve real problems',
    highlightWord: 'solve', // Word to highlight in blue
    tagline: 'Freelance developer specializing in Bubble.io, AI automation, and full-stack development.',
    buttons: {
      primary: { text: 'View projects', scrollTo: 'projects' },
      secondary: { text: 'Work with me', scrollTo: 'contact' },
    },
  },

  about: {
    number: '02',
    label: './ABOUT',
    eyebrow: 'About',
    title: 'How I work',
    content: [
      "I'm a software developer and product builder with deep experience in Bubble.io, other no-code platforms, AI automation, and traditional development when a project needs it.",
      "I've shipped products from AI-assisted wedding planning and job platforms to home-service CRMs, review systems, and voice agents. That mix gives me a practical bridge between no-code speed and custom integrations.",
      "I don't only assemble screens. I help define workflows, structure databases, wire APIs, tighten UX, and turn vague ideas into software people actually use.",
    ],
  },

  services: {
    number: '03',
    label: './SERVICES',
    eyebrow: 'Capabilities',
    title: 'What I do',
    description: 'Independent freelance work centered on Bubble.io, plus the integrations and AI layers that real products need.',
    items: [
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
        body: 'Help founders go from idea to launch: core journey first, fast build, and guardrails so you don\'t drown in unnecessary complexity.',
      },
      {
        title: 'API and backend integration',
        body: 'Stripe, PayPal, Firebase, Google APIs, AI providers, webhooks, and custom backends, integrated cleanly with Bubble where it makes sense.',
      },
    ],
  },

  projects: {
    number: '04',
    label: './WORK',
    eyebrow: 'Selected work',
    title: 'Featured projects',
    description: 'Collapsible work log, same structure I use to document scope, stack, and ship status for stakeholders.',
  },

  why: {
    number: '05',
    label: './WHY',
    eyebrow: 'Rationale',
    title: 'Why work with me',
    description: 'I care about product strategy, workflows, business goals, and the tradeoff between shipping fast and building something you can live with for the next phase, not just tickets closed.',
    reasons: [
      'Production Bubble.io applications end to end',
      'AI APIs and automation wired into real user flows',
      'Leading developers and QA on complex builds',
      'Database design and non-trivial Bubble workflows',
      'Third-party APIs, payments, and webhooks',
      'Helping founders structure MVPs from fuzzy briefs',
      'Growing MVPs toward more scalable architectures',
    ],
  },

  tools: {
    number: '06',
    label: './STACK',
    eyebrow: 'Tools & Technologies',
    description: 'Top five per lane: what I reach for most often on real builds.',
  },

  contact: {
    number: '07',
    label: './CONTACT',
    headline: 'Let\'s ship it.',
    highlightWord: 'ship', // Word to highlight in blue
    description: 'Have an idea, or an existing Bubble app that needs an architect? I can help design, build, integrate, automate, and scale it.',
    form: {
      header: 'POST /inquiry',
      contentType: 'application/json',
      fields: {
        from_name: { label: 'Your name', placeholder: 'your name' },
        reply_to: { label: 'Your email', placeholder: 'you@company.com' },
        message: { label: '"Message":', placeholder: '// what are you building?' },
      },
      submitButton: 'submit --inquiry',
      submittingText: 'sending...',
    },
    info: [
      { label: 'linkedin', value: 'linkedin.com/in/koladeabobarin', url: 'https://linkedin.com/in/koladeabobarin' },
      { label: 'x', value: 'x.com/Kolade_Abobarin', url: 'https://x.com/Kolade_Abobarin' },
      { label: 'based', value: 'remote · austin, texas', url: null },
      { label: 'resp time', value: '< 24h', url: null },
    ],
  },
};

/**
 * Design system constants
 * Modify these to change the overall look and feel
 */
export const designSystem = {
  // Container widths
  maxWidth: {
    default: 'max-w-7xl', // Most sections
    narrow: 'max-w-6xl',  // Hero section
    text: 'max-w-3xl',     // Text-only sections
  },

  // Spacing
  sectionPadding: {
    y: 'py-20 md:py-24',
    x: 'px-4',
  },

  // Typography
  sectionNumber: 'font-mono text-[10px] uppercase tracking-[0.2em] text-primary',
  sectionLabel: 'font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground',
  sectionEyebrow: 'font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary',

  // Colors for highlighted text
  highlightColor: 'text-primary', // Blue highlight color
};
