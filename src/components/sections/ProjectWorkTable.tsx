'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Plus, X, ExternalLinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { featuredProjects, SHIPPED_PROJECTS_PLUS, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';

function sortForDisplay(list: Project[]) {
  return [...list].sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));
}

function rowSummary(p: Project) {
  if (p.summary) return p.summary;
  const t = p.description;
  return t.length > 96 ? `${t.slice(0, 93)}…` : t;
}

function rowKind(p: Project) {
  if (p.kind) return p.kind;
  if (p.category === 'no-code') return 'Bubble';
  if (p.category === 'ai') return 'AI';
  return 'Code';
}

function rowYear(p: Project) {
  return p.year ?? '-';
}

export function ProjectWorkTable() {
  const projects = useMemo(() => {
    const highlighted = featuredProjects.filter((p) => p.highlight);
    return sortForDisplay(highlighted.length > 0 ? highlighted : featuredProjects);
  }, []);

  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  if (projects.length === 0) {
    return <p className="text-center font-mono text-sm text-muted-foreground py-12">No projects to show.</p>;
  }

  return (
    <div className="font-mono text-[11px] leading-relaxed md:text-xs">
      <div className="mb-6 flex flex-col gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-[11px]">
          <span className="text-primary">.</span>
          <span className="mx-2 text-border">/</span>
          <span>WORK</span>
          <span className="mx-2 text-border">/</span>
          <span>SELECTED PROJECTS</span>
        </p>
        <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground/80">
          <ChevronDown className="h-3 w-3 opacity-70" aria-hidden />
          scroll
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border border-border/80 bg-card/20">
        <div className="min-w-[640px]">
          <div
            className="grid grid-cols-[3.25rem_9.5rem_1fr_7.5rem_3.5rem_2.25rem] gap-x-3 border-b border-border bg-foreground px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-background md:px-4"
            role="row"
          >
            <div>ID</div>
            <div>Project</div>
            <div>Summary</div>
            <div>Kind</div>
            <div>Year</div>
            <div className="text-right" aria-hidden>
              {' '}
            </div>
          </div>

          {projects.map((project, index) => {
            const pid = `P-${String(index + 1).padStart(2, '0')}`;
            const open = openId === project.id;
            const endpoint = project.demoUrl || project.repoUrl;

            return (
              <div key={project.id} className="border-b border-border/60 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggle(project.id)}
                  className={cn(
                    'grid w-full grid-cols-[3.25rem_9.5rem_1fr_7.5rem_3.5rem_2.25rem] gap-x-3 px-3 py-3 text-left transition-colors md:px-4',
                    open ? 'bg-primary/8' : 'bg-transparent hover:bg-muted/25',
                  )}
                  aria-expanded={open}
                >
                  <span className="text-primary tabular-nums">{pid}</span>
                  <span className="font-semibold text-foreground">{project.title}</span>
                  <span className="text-muted-foreground line-clamp-2 md:line-clamp-1">{rowSummary(project)}</span>
                  <span className="text-muted-foreground/90">{rowKind(project)}</span>
                  <span className="text-muted-foreground/90 tabular-nums">{rowYear(project)}</span>
                  <span className="flex justify-end text-foreground" aria-hidden>
                    {open ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-border/50 bg-muted/10 px-3 py-6 md:px-4 md:py-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_220px]">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Image</p>
                        <div className="relative w-full overflow-hidden rounded-md border border-border/70 bg-muted/30 aspect-video">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 360px"
                            className="object-cover object-center"
                            priority={index === 0}
                          />
                        </div>
                      </div>

                      <div className="space-y-5 text-[11px] md:text-xs">
                        <div>
                          <p className="mb-1.5 text-muted-foreground">{'// Summary'}</p>
                          <p className="text-foreground/95 leading-relaxed">{project.description}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-primary">role:</p>
                          <p className="text-muted-foreground leading-relaxed">
                            {project.role ?? 'End-to-end delivery: scope, build, integrations, and launch support.'}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-primary">outcome:</p>
                          <p className="text-primary/95 leading-relaxed">
                            {project.outcome ?? 'Shipped production-quality software with measurable user impact.'}
                          </p>
                        </div>
                        <div>
                          <p className="mb-2 text-muted-foreground">stack:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-border/60 bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{'// Endpoint'}</p>
                        <div className="rounded-md border border-border bg-background/80 p-4 text-[11px] shadow-inner">
                          {endpoint ? (
                            <div className="space-y-2">
                              <p>
                                <span className="text-muted-foreground">$ </span>
                                <span className="text-muted-foreground">open </span>
                                <a
                                  href={endpoint}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="break-all text-primary underline-offset-2 hover:underline"
                                >
                                  {endpoint}
                                </a>
                              </p>
                              <p>
                                <span className="text-muted-foreground">$ </span>
                                status
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="text-emerald-500" aria-hidden>
                                  ●
                                </span>
                                <span className="text-foreground">{project.status ?? 'shipped'}</span>
                              </p>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              <span className="text-muted-foreground">$ </span>
                              status: private / invite-only
                            </p>
                          )}
                        </div>
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-primary/40 font-mono text-[10px] uppercase tracking-wider text-primary hover:bg-primary/10"
                            asChild
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              Open project
                              <ExternalLinkIcon className="ml-1.5 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        {project.repoUrl && !project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-primary/40 font-mono text-[10px] uppercase tracking-wider text-primary hover:bg-primary/10"
                            asChild
                          >
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                              View repo
                              <ExternalLinkIcon className="ml-1.5 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-[10px] text-muted-foreground/80 md:text-[11px]">
        # showing {projects.length} of {SHIPPED_PROJECTS_PLUS}+ shipped · click row to expand
      </p>
    </div>
  );
}
