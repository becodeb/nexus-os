import { useState } from "react";
import { Plus, Search, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { employees } from "@/data/mock";
import { cn, initials } from "@/lib/utils";

const statusDot: Record<string, string> = {
  active: "bg-accent-green",
  away: "bg-accent-amber",
  offline: "bg-ink-disabled",
};

export default function Team() {
  const [query, setQuery] = useState("");
  const filtered = employees.filter(
    (e) => e.name.toLowerCase().includes(query.toLowerCase()) || e.department.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Equipo"
        description="Directorio de empleados, roles y desempeño"
        actions={
          <Button variant="primary" size="sm" className="gap-1.5">
            <Plus className="size-3.5" /> Agregar miembro
          </Button>
        }
      />

      <div className="mb-4 relative w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-tertiary" />
        <Input placeholder="Buscar por nombre o departamento..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-8" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((e, i) => (
          <Card key={e.id} className="p-4 transition-colors hover:border-zinc-600" style={{ animationDelay: `${i * 30}ms` }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-11 border border-base-border">
                  <AvatarImage src={e.avatar} />
                  <AvatarFallback>{initials(e.name)}</AvatarFallback>
                </Avatar>
                <span className={cn("absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-base-card", statusDot[e.status])} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-primary">{e.name}</p>
                <p className="truncate text-xs text-ink-tertiary">{e.role}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-ink-tertiary">
              <Badge variant="outline">{e.department}</Badge>
              <span className="flex items-center gap-1"><MapPin className="size-3" /> {e.location}</span>
            </div>

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-ink-tertiary">Productividad</span>
                <span className="numeric font-medium text-ink-primary">{e.performance}%</span>
              </div>
              <Progress
                value={e.performance}
                indicatorClassName={e.performance >= 80 ? "bg-accent-green" : e.performance >= 65 ? "bg-accent-blue" : "bg-accent-amber"}
              />
            </div>

            <CardContent className="mt-1 flex items-center justify-between p-0 pt-3 text-xs text-ink-tertiary">
              <span>{e.projects} proyectos activos</span>
              <span>Desde {e.startDate.slice(0, 4)}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
