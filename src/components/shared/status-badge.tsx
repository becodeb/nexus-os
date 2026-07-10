import { Badge } from "@/components/ui/badge";
import type { ClientStatus, Priority, ProjectStatus } from "@/types";

const clientStatusMap: Record<ClientStatus, { label: string; variant: "green" | "blue" | "amber" | "default" }> = {
  active: { label: "Activo", variant: "green" },
  lead: { label: "Prospecto", variant: "blue" },
  negotiation: { label: "Negociación", variant: "amber" },
  churned: { label: "Perdido", variant: "default" },
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const s = clientStatusMap[status];
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

const priorityMap: Record<Priority, { label: string; variant: "default" | "blue" | "amber" | "red" }> = {
  low: { label: "Baja", variant: "default" },
  medium: { label: "Media", variant: "blue" },
  high: { label: "Alta", variant: "amber" },
  urgent: { label: "Urgente", variant: "red" },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const p = priorityMap[priority];
  return <Badge variant={p.variant}>{p.label}</Badge>;
}

export const projectStatusMap: Record<ProjectStatus, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "#71717A" },
  "in-progress": { label: "En progreso", color: "#3B82F6" },
  review: { label: "Revisión", color: "#F59E0B" },
  done: { label: "Finalizado", color: "#22C55E" },
};
