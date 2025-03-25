# kolade.dev - Personal Portfolio

A modern, responsive portfolio website showcasing professional projects, skills, and side quests. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Image Requirements

To properly display your projects, you'll need to add the following images to your project:

### Project Images
Place these in `/public/projects/` directory:
- `sendwork.webp` - Sendwork.com project image
- `blueshirt.webp` - Blueshirt Work project image
- `invisible-strengths.webp` - Invisible Strengths project image
- `myprofitstash.webp` - Captain Stash project image
- `nuptai.webp` - NuptAI project image
- `xophie.webp` - Xophie.ai project image
- `traleado.webp` - Traleado.com project image
- `learning-chatbot.webp` - Learning Chatbot Agent image
- `reppute.webp` - Reppute project image
- `ai-rag.webp` - RAG Pipeline project image

### Side Quest Images
Place these in `/public/sidequests/` directory:
- `reppute-mobile.webp` - Reppute Mobile App image
- `agentic-chatbot.webp` - Agentic Chatbot image
- `crm-automation.webp` - CRM Automation image

All images should be in webp format with a recommended aspect ratio of 16:9 and a minimum width of 800px for best display.

## Features

- **Modern Design**: Dark-themed, minimalistic design with a tech/AI aesthetic
- **Responsive Layout**: Fully responsive across all device sizes
- **Interactive Elements**: Includes animations, transitions, and mouse tracking effects
- **Project Showcase**: Categorized display of projects with filtering by type
- **Skills Section**: Visual representation of technical skills and proficiencies
- **Contact Form**: Integrated contact form with validation
- **Chat Assistant**: AI-powered chat assistant to answer questions about your work and process
- **Performance Optimized**: Fast loading and rendering

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui component library
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **3D Effects**: Three.js with React Three Fiber (optional)
- **AI Integration**: OpenAI API with streaming responses

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- OpenAI API key (for the chat assistant feature)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kolade-dev.git
   cd kolade-dev
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your OpenAI API key to `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

- `/src/app`: Next.js app router pages
  - `/api`: API routes including chat endpoint
- `/src/components`: Reusable UI components
  - `/chat`: Chat assistant components
  - `/common`: Shared components used across the site
  - `/sections`: Major page sections
  - `/ui`: shadcn/ui components
- `/src/data`: Data files for projects, skills, and personal info
- `/src/lib`: Utility functions and helpers
- `/public`: Static assets and images

## Customization

1. Update personal information in `/src/data/profile.ts`
2. Modify projects in `/src/data/projects.ts`
3. Edit skills in `/src/data/skills.ts`
4. Customize side quests in `/src/data/sidequests.ts`
5. Replace images in `/public/projects/` and `/public/sidequests/`

## Chat Assistant Setup

The chat assistant uses OpenAI's API to provide contextual responses about your work, projects, and process. To customize it:

1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add your API key to the `.env.local` file
3. Customize the system prompt in `/src/app/api/chat/route.ts` to better reflect your work and process
4. The assistant will automatically appear as a chat bubble in the bottom right corner of your site

## Deployment

This project is configured for easy deployment on Vercel:

```bash
npm run build
# or
vercel deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- shadcn/ui for providing high-quality UI components
- Framer Motion for animation capabilities
- Next.js team for an excellent framework
