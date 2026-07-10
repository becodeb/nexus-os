import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutGrid, Users, FolderKanban, UserSquare2, Wallet, FileStack,
  Workflow, BarChart3, Settings, ChevronsLeft, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { NexusMark } from "./logo";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/clients", label: "Clientes", icon: Users },
  { to: "/projects", label: "Proyectos", icon: FolderKanban },
  { to: "/team", label: "Equipo", icon: UserSquare2 },
  { to: "/finance", label: "Finanzas", icon: Wallet },
  { to: "/documents", label: "Documentos", icon: FileStack },
  { to: "/automations", label: "Automatizaciones", icon: Workflow },
  { to: "/reports", label: "Reportes", icon: BarChart3 },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, toggleAiPanel } = useAppStore();

  return (
    <TooltipProvider delayDuration={200}>
      <motion.aside
        animate={{ width: sidebarCollapsed ? 68 : 236 }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        className="relative hidden shrink-0 flex-col border-r border-base-border bg-[#0c0c0e] md:flex"
      >
        <div className="flex h-14 items-center gap-2 px-4">
          <NexusMark className="size-6 shrink-0" />
          {!sidebarCollapsed && (
            <span className="truncate text-[15px] font-semibold tracking-tight text-ink-primary">Nexus OS</span>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-2">
          {nav.map((item) => (
            <SidebarLink key={item.to} {...item} collapsed={sidebarCollapsed} />
          ))}
        </nav>

        <div className="space-y-0.5 border-t border-base-border p-2.5">
          <button
            onClick={toggleAiPanel}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-secondary transition-colors hover:bg-base-hover hover:text-ink-primary"
          >
            <Sparkles className="size-[18px] shrink-0 text-accent-violet" />
            {!sidebarCollapsed && <span>Asistente IA</span>}
          </button>
          <SidebarLink to="/settings" label="Configuración" icon={Settings} collapsed={sidebarCollapsed} />
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-16 flex size-6 items-center justify-center rounded-full border border-base-border bg-base-card text-ink-tertiary shadow-card transition-colors hover:text-ink-primary"
        >
          <ChevronsLeft className={cn("size-3.5 transition-transform", sidebarCollapsed && "rotate-180")} />
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}

function SidebarLink({
  to, label, icon: Icon, end, collapsed,
}: { to: string; label: string; icon: React.ElementType; end?: boolean; collapsed: boolean }) {
  const link = (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent-blue/10 text-accent-blue"
            : "text-ink-secondary hover:bg-base-hover hover:text-ink-primary",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn("size-[18px] shrink-0", isActive ? "text-accent-blue" : "text-ink-tertiary group-hover:text-ink-secondary")} />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
