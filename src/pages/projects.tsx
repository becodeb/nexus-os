import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/dashboard/project-card";
import { projects as initialProjects } from "@/data/mock";
import { projectStatusMap } from "@/components/shared/status-badge";
import type { Project, ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

const columns: ProjectStatus[] = ["pending", "in-progress", "review", "done"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [query, setQuery] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<ProjectStatus | null>(null);

  const filtered = useMemo(
    () => projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.client.toLowerCase().includes(query.toLowerCase())),
    [projects, query],
  );

  function moveTo(status: ProjectStatus) {
    if (!dragId) return;
    setProjects((prev) => prev.map((p) => (p.id === dragId ? { ...p, status } : p)));
    setDragId(null);
    setOverCol(null);
  }

  return (
    <div>
      <PageHeader
        title="Proyectos"
        description="Vista Kanban del pipeline de trabajo activo"
        actions={
          <Button variant="primary" size="sm" className="gap-1.5">
            <Plus className="size-3.5" /> Nuevo proyecto
          </Button>
        }
      />

      <div className="mb-4 relative w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-tertiary" />
        <Input placeholder="Buscar proyectos..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-8" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {columns.map((status) => {
          const items = filtered.filter((p) => p.status === status);
          const cfg = projectStatusMap[status];
          return (
            <div
              key={status}
              onDragOver={(e) => { e.preventDefault(); setOverCol(status); }}
              onDragLeave={() => setOverCol((c) => (c === status ? null : c))}
              onDrop={(e) => { e.preventDefault(); moveTo(status); }}
              className={cn(
                "flex flex-col rounded-xl border border-base-border bg-[#0e0e10] p-2.5 transition-colors",
                overCol === status && "border-accent-blue/50 bg-accent-blue/[0.03]",
              )}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
                  <span className="size-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                  {cfg.label}
                </span>
                <span className="rounded-full bg-base-hover px-1.5 py-0.5 text-[11px] text-ink-tertiary">{items.length}</span>
              </div>
              <div className="flex min-h-[120px] flex-col gap-2.5">
                {items.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    dragging={dragId === p.id}
                    onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; setDragId(p.id); }}
                  />
                ))}
                {items.length === 0 && (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-base-border py-8 text-xs text-ink-tertiary">
                    Sin proyectos
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
