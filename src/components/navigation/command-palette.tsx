import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import {
  LayoutGrid, Users, FolderKanban, UserSquare2, Wallet, FileStack, Workflow, BarChart3,
  Settings, Plus, Search, ArrowRight,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { clients, projects } from "@/data/mock";

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (e.key === "Escape") setCommandOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, setCommandOpen]);

  function go(path: string) {
    navigate(path);
    setCommandOpen(false);
  }

  if (!commandOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 pt-[14vh] backdrop-blur-[2px] animate-fade-in"
      onClick={() => setCommandOpen(false)}
    >
      <Command
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-base-border bg-[#0e0e10] shadow-popover animate-slide-up"
        loop
      >
        <div className="flex items-center gap-2.5 border-b border-base-border px-4">
          <Search className="size-4 text-ink-tertiary" />
          <Command.Input
            autoFocus
            placeholder="Buscar clientes, proyectos, o escribe un comando..."
            className="h-12 w-full bg-transparent text-sm text-ink-primary placeholder:text-ink-tertiary outline-none"
          />
          <kbd className="rounded border border-base-border px-1.5 py-0.5 text-[10px] text-ink-tertiary">ESC</kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-ink-tertiary">Sin resultados.</Command.Empty>

          <Command.Group heading="Navegación" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-tertiary">
            {[
              { label: "Dashboard", icon: LayoutGrid, path: "/" },
              { label: "Clientes", icon: Users, path: "/clients" },
              { label: "Proyectos", icon: FolderKanban, path: "/projects" },
              { label: "Equipo", icon: UserSquare2, path: "/team" },
              { label: "Finanzas", icon: Wallet, path: "/finance" },
              { label: "Documentos", icon: FileStack, path: "/documents" },
              { label: "Automatizaciones", icon: Workflow, path: "/automations" },
              { label: "Reportes", icon: BarChart3, path: "/reports" },
              { label: "Configuración", icon: Settings, path: "/settings" },
            ].map((item) => (
              <Command.Item
                key={item.path}
                onSelect={() => go(item.path)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-primary data-[selected=true]:bg-base-hover"
              >
                <item.icon className="size-4 text-ink-tertiary" />
                {item.label}
                <ArrowRight className="ml-auto size-3.5 text-ink-tertiary opacity-0 [[data-selected=true]_&]:opacity-100" />
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Acciones rápidas" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-tertiary">
            <Command.Item
              onSelect={() => go("/clients")}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-primary data-[selected=true]:bg-base-hover"
            >
              <Plus className="size-4 text-accent-blue" />
              Crear nuevo cliente
            </Command.Item>
            <Command.Item
              onSelect={() => go("/projects")}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-primary data-[selected=true]:bg-base-hover"
            >
              <Plus className="size-4 text-accent-blue" />
              Crear nuevo proyecto
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Clientes" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-tertiary">
            {clients.slice(0, 5).map((c) => (
              <Command.Item
                key={c.id}
                onSelect={() => go(`/clients/${c.id}`)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-primary data-[selected=true]:bg-base-hover"
              >
                <Users className="size-4 text-ink-tertiary" />
                {c.company}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Proyectos" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-tertiary">
            {projects.slice(0, 5).map((p) => (
              <Command.Item
                key={p.id}
                onSelect={() => go("/projects")}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-ink-primary data-[selected=true]:bg-base-hover"
              >
                <FolderKanban className="size-4 text-ink-tertiary" />
                {p.name}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
