export interface Project {
  id: string;
  title: string;
  /** Longer narrative shown in the expanded panel. */
  description: string;
  category: 'no-code' | 'code' | 'ai';
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  highlight?: boolean;
  display_order?: number;
  /** One-line summary in the table row (keep short). */
  summary?: string;
  year?: string;
  /** e.g. "Marketplace", "SaaS · AI" */
  kind?: string;
  /** Shown as `role:` in the expanded panel. */
  role?: string;
  /** Shown as `outcome:` (highlight line). */
  outcome?: string;
  /** Terminal status line, e.g. `shipped`. */
  status?: string;
}

/** Featured work shown on the homepage. Edit here to update projects. */
export const featuredProjects: Project[] = [
  {
    id: 'nuptai',
    title: 'NuptAI',
    description:
      'AI-powered wedding planning on Bubble.io and Google Gemini. Couples get personalized schedules and budgets from their preferences. I owned product logic, AI workflow consistency, QA coordination, and UX, supporting a raise of about $100K at the time.',
    category: 'no-code',
    image: '/projects/nuptai.png',
    tags: ['Bubble.io', 'Google Gemini API', 'AI workflows', 'Product logic', 'QA coordination'],
    demoUrl: 'https://nupt.ai/',
    highlight: true,
    display_order: 1,
    summary: 'Wedding planning SaaS with Gemini-generated plans, budgets, and vendor flows.',
    year: '2024',
    kind: 'SaaS · AI',
    role: 'Lead developer: product logic, AI workflow consistency, QA coordination, and UX across Bubble + Gemini.',
    outcome: 'Founder raised ~$100K in funding at the time; shipped production-ready AI outputs with high consistency.',
    status: 'shipped',
  },
  {
    id: 'blueshirt-work',
    title: 'Blueshirt Work',
    description:
      'Blue-collar job platform in the Philippines, first built on Bubble then scaled toward custom architecture. As lead front-end on Bubble, I kept the product stable with 98%+ uptime through a multi-month backend migration.',
    category: 'no-code',
    image: '/projects/blueshirt.png',
    tags: ['Bubble.io', 'Marketplace logic', 'API integration', 'Migration support'],
    demoUrl: 'https://blueshirt.work/',
    highlight: true,
    display_order: 2,
    summary: 'Job marketplace for blue-collar workers and employers; Bubble front-end through backend migration.',
    year: '2022–24',
    kind: 'Marketplace',
    role: 'Lead front-end on Bubble: managed legacy app during migration, integrations, and uptime.',
    outcome: '98%+ platform uptime through a multi-month migration; user base doubled during scale-out.',
    status: 'shipped',
  },
  {
    id: 'sendwork',
    title: 'Sendwork',
    description:
      'Home service management for contractors, built from a Zeroqode base and extended with stronger UI, CRM-style workflows, scheduling, pricing, and delegation so teams can run day-to-day operations in one place.',
    category: 'no-code',
    image: '/projects/sendwork.svg',
    tags: ['Bubble.io', 'Zeroqode templates', 'CRM workflows', 'Scheduling', 'Operations'],
    demoUrl: 'https://sendwork.com/',
    highlight: true,
    display_order: 3,
    summary: 'SMB operations app for contractors: CRM, scheduling, pricing, and delegation on Bubble.',
    year: '2023',
    kind: 'SaaS · SMB',
    role: 'Bubble build and customization: UI, workflows, customer and job data model, business rules.',
    outcome: 'Replaced template limits with production-grade flows for real crews and dispatch.',
    status: 'shipped',
  },
  {
    id: 'reppute',
    title: 'Reppute',
    description:
      'Review management with Bubble on the web, Firebase for auth and backend data, and FlutterFlow for mobile: an example of combining no-code surfaces with managed services and cross-platform delivery.',
    category: 'no-code',
    image: '/projects/reppute.png',
    tags: ['Bubble.io', 'Firebase', 'FlutterFlow', 'Authentication', 'Review workflows'],
    demoUrl: 'https://reppute.com/',
    highlight: true,
    display_order: 4,
    summary: 'Reviews on Bubble + Firebase auth/data with FlutterFlow mobile for cross-platform delivery.',
    year: '2023',
    kind: 'SaaS · Integrations',
    role: 'Architecture across Bubble, Firebase, and mobile: auth, review workflows, and data sync.',
    outcome: 'Demonstrated no-code + managed backend pattern for a serious multi-surface product.',
    status: 'shipped',
  },
  {
    id: 'xophie-ai',
    title: 'Xophie.ai',
    description:
      '0→1 AI voice product that automates healthcare front-desk scheduling. Modeled ~60% reduction in call handling; owned discovery with 10+ practice owners, metrics, and HIPAA-aligned rollout. Prioritized roadmap across latency, reliability, and vendor risk; shipped with ops playbooks, not a one-off demo. Positioned the agent for real scheduling workflows rather than generic chat.',
    category: 'ai',
    image: '/projects/xophie.png',
    tags: ['Voice AI', 'Healthcare', 'Product discovery', 'LLM agents'],
    demoUrl: 'https://xophie.ai',
    repoUrl: 'https://github.com/Bobarinn/xophieai',
    highlight: true,
    display_order: 5,
    summary: 'Voice AI receptionist for healthcare scheduling: discovery, metrics, HIPAA-aligned rollout.',
    year: '2025',
    kind: 'Voice AI · Healthcare',
    role: '0→1 product: discovery with 10+ practice owners, roadmap (latency, reliability, vendor risk), ops playbooks.',
    outcome: 'Modeled ~60% reduction in call handling; agent tuned for real scheduling, not generic chat.',
    status: 'shipped',
  },
  {
    id: 'notely',
    title: 'Notely',
    description:
      'Personal AI assistant for live meetings: capture, actions, and searchable history. Scoped the MVP around transcription quality vs. cost and iterated from weekly real use. Optimized for fast recall after client and academic sessions, not novelty features. Shipped end-to-end from capture to structured outputs.',
    category: 'ai',
    image: '/projects/notely.png',
    demoUrl: 'https://xophieai.vercel.app',
    tags: ['Speech AI', 'LLM summarization', 'Full-stack MVP'],
    highlight: true,
    display_order: 6,
    summary: 'Meeting copilot: live capture, actions, and searchable notes with cost-aware transcription.',
    year: '2025',
    kind: 'AI · Productivity',
    role: 'Full-stack MVP: transcription vs. cost tradeoffs, structured outputs, weekly dogfooding loops.',
    outcome: 'Shipped end-to-end capture → summaries/actions optimized for recall after real sessions.',
    status: 'shipped',
  },
];

/** For footer copy e.g. "6 of 30+". */
export const SHIPPED_PROJECTS_PLUS = 30;
