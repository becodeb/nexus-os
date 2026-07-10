import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { PriorityBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { initials } from "@/lib/utils";

export function ProjectCard({
  project, onDragStart, dragging,
}: { project: Project; onDragStart: (e: React.DragEvent) => void; dragging?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: dragging ? 0.4 : 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div draggable onDragStart={onDragStart}>
      <Card className="p-3.5 transition-colors hover:border-zinc-600">
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug text-ink-primary">{project.name}</p>
          <PriorityBadge priority={project.priority} />
        </div>
        <p className="mb-3 truncate text-xs text-ink-tertiary">{project.client}</p>
        <Progress value={project.progress} className="mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-ink-tertiary">
            <Calendar className="size-3" /> {project.dueDate}
          </div>
          <Avatar className="size-6">
            <AvatarImage src={project.ownerAvatar} />
            <AvatarFallback className="text-[9px]">{initials(project.owner)}</AvatarFallback>
          </Avatar>
        </div>
      </Card>
      </div>
    </motion.div>
  );
}
