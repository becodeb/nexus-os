import { motion } from "framer-motion";
import {
  Plus, Zap, ArrowDown, UserPlus, FolderPlus, Users, Mail, AlertTriangle,
  Bell, TrendingDown, Flag, Play,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { automations } from "@/data/mock";

const iconMap: Record<string, React.ElementType> = {
  UserPlus, FolderPlus, Users, Mail, AlertTriangle, Bell, TrendingDown, Flag,
};

export default function Automations() {
  return (
    <div>
      <PageHeader
        title="Automatizaciones"
        description="Construye flujos de trabajo sin código"
        actions={
          <Button variant="primary" size="sm" className="gap-1.5">
            <Plus className="size-3.5" /> Nueva automatización
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {automations.map((auto, i) => (
          <motion.div
            key={auto.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="p-4">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                    <Zap className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-primary">{auto.name}</p>
                    <p className="text-xs text-ink-tertiary">{auto.runs} ejecuciones · última: {auto.lastRun}</p>
                  </div>
                </div>
                <Switch defaultChecked={auto.active} />
              </div>

              <div className="space-y-2 rounded-lg border border-base-border bg-base-bg p-3">
                <FlowNode
                  kind="trigger"
                  icon={iconMap[auto.trigger.icon]}
                  label={auto.trigger.label}
                  description={auto.trigger.description}
                />
                {auto.actions.map((action) => (
                  <div key={action.id}>
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="size-3.5 text-ink-tertiary" />
                    </div>
                    <FlowNode kind="action" icon={iconMap[action.icon]} label={action.label} description={action.description} />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <Badge variant={auto.active ? "green" : "default"}>{auto.active ? "Activa" : "Pausada"}</Badge>
                <Button variant="ghost" size="sm" className="gap-1.5 text-ink-secondary">
                  <Play className="size-3.5" /> Probar flujo
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FlowNode({
  kind, icon: Icon, label, description,
}: { kind: "trigger" | "action"; icon: React.ElementType; label: string; description: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-2.5 ${
        kind === "trigger" ? "border-accent-violet/25 bg-accent-violet/5" : "border-base-border bg-base-card"
      }`}
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
          kind === "trigger" ? "bg-accent-violet/15 text-accent-violet" : "bg-accent-blue/10 text-accent-blue"
        }`}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-ink-primary">{label}</p>
        <p className="truncate text-[11px] text-ink-tertiary">{description}</p>
      </div>
      <span className="ml-auto shrink-0 text-[10px] font-medium uppercase tracking-wide text-ink-tertiary">
        {kind === "trigger" ? "Cuando" : "Entonces"}
      </span>
    </div>
  );
}
