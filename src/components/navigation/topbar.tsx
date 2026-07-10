import { Search, Plus, Bell, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/app-store";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  const { setCommandOpen, activeCompany } = useAppStore();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-base-border bg-[#09090b]/90 px-4 backdrop-blur">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-base-border bg-base-card px-2.5 py-1.5 text-sm font-medium text-ink-primary transition-colors hover:bg-base-hover">
          <Building2 className="size-4 text-ink-tertiary" />
          <span className="max-w-[140px] truncate">{activeCompany}</span>
          <ChevronDown className="size-3.5 text-ink-tertiary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Empresas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Nexus Holdings</DropdownMenuItem>
          <DropdownMenuItem>Nexus Labs (Beta)</DropdownMenuItem>
          <DropdownMenuItem>Portfolio — Vantage</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-accent-blue">+ Agregar empresa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        onClick={() => setCommandOpen(true)}
        className="flex flex-1 max-w-md items-center gap-2 rounded-lg border border-base-border bg-base-card px-3 py-1.5 text-sm text-ink-tertiary transition-colors hover:border-zinc-600"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Buscar en Nexus OS...</span>
        <kbd className="rounded border border-base-border bg-base-hover px-1.5 py-0.5 text-[10px] font-medium text-ink-tertiary">⌘K</kbd>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="primary" size="sm" className="gap-1.5">
          <Plus className="size-3.5" /> Crear
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-[18px]" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent-red ring-2 ring-base-bg" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none ring-offset-2 ring-offset-base-bg focus-visible:ring-2 focus-visible:ring-accent-blue">
            <Avatar className="size-8 border border-base-border">
              <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Gonzalo&backgroundColor=18181b" />
              <AvatarFallback>GB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-ink-primary">Gonzalo Bautista</p>
              <p className="text-xs text-ink-tertiary">gonibauti@gmail.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mi perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferencias</DropdownMenuItem>
            <DropdownMenuItem>
              Plan actual <Badge variant="blue" className="ml-auto">Enterprise</Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-accent-red">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
