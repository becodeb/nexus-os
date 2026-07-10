import { motion } from "framer-motion";
import { UserPlus, FolderKanban, Receipt, CheckCircle2, UserSquare2 } from "lucide-react";
import { activity } from "@/data/mock";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { relativeTime, initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const iconMap = {
  client: { icon: UserPlus, color: "text-accent-blue bg-accent-blue/10" },
  project: { icon: FolderKanban, color: "text-accent-violet bg-accent-violet/10" },
  invoice: { icon: Receipt, color: "text-accent-green bg-accent-green/10" },
  task: { icon: CheckCircle2, color: "text-accent-amber bg-accent-amber/10" },
  team: { icon: UserSquare2, color: "text-accent-blue bg-accent-blue/10" },
};

export function ActivityTimeline() {
  return (
    <div className="space-y-1">
      {activity.map((event, i) => {
        const cfg = iconMap[event.type];
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-base-hover"
          >
            <div className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", cfg.color)}>
              <cfg.icon className="size-3.5" />
            </div>
            <Avatar className="size-6 shrink-0 -ml-1">
              <AvatarImage src={event.actorAvatar} />
              <AvatarFallback className="text-[9px]">{initials(event.actor)}</AvatarFallback>
            </Avatar>
            <p className="flex-1 text-[13px] leading-snug text-ink-secondary">
              <span className="font-medium text-ink-primary">{event.actor}</span> {event.action}{" "}
              <span className="font-medium text-ink-primary">{event.target}</span>
            </p>
            <span className="shrink-0 text-[11px] text-ink-tertiary">{relativeTime(event.timestamp)}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
