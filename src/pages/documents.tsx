import { Folder, FileText, Sheet, Image, Presentation, File, Upload, MoreHorizontal, Lock, Users2, Building } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { documents } from "@/data/mock";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const typeIcon = {
  folder: { icon: Folder, color: "text-accent-blue" },
  pdf: { icon: FileText, color: "text-accent-red" },
  doc: { icon: File, color: "text-accent-blue" },
  sheet: { icon: Sheet, color: "text-accent-green" },
  image: { icon: Image, color: "text-accent-violet" },
  slide: { icon: Presentation, color: "text-accent-amber" },
};

const permissionIcon = { private: Lock, team: Users2, company: Building };

export default function Documents() {
  return (
    <div>
      <PageHeader
        title="Documentos"
        description="Gestor documental de la empresa"
        actions={
          <Button variant="primary" size="sm" className="gap-1.5">
            <Upload className="size-3.5" /> Subir archivo
          </Button>
        }
      />

      <TooltipProvider delayDuration={200}>
        <div className="overflow-hidden rounded-xl border border-base-border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-base-border bg-base-card text-xs text-ink-tertiary">
                <th className="px-4 py-2.5 font-medium">Nombre</th>
                <th className="px-4 py-2.5 font-medium">Tamaño</th>
                <th className="px-4 py-2.5 font-medium">Modificado</th>
                <th className="px-4 py-2.5 font-medium">Por</th>
                <th className="px-4 py-2.5 font-medium">Permisos</th>
                <th className="w-10 px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const cfg = typeIcon[doc.type];
                const PermIcon = permissionIcon[doc.permission];
                return (
                  <tr key={doc.id} className="group border-b border-base-border bg-base-bg transition-colors last:border-0 hover:bg-base-card">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <cfg.icon className={`size-4 ${cfg.color}`} />
                        <span className="text-sm text-ink-primary">{doc.name}</span>
                      </div>
                    </td>
                    <td className="numeric px-4 py-2.5 text-xs text-ink-tertiary">{doc.size}</td>
                    <td className="numeric px-4 py-2.5 text-xs text-ink-tertiary">{doc.modified}</td>
                    <td className="px-4 py-2.5 text-xs text-ink-secondary">{doc.modifiedBy}</td>
                    <td className="px-4 py-2.5">
                      <Tooltip>
                        <TooltipTrigger>
                          <PermIcon className="size-3.5 text-ink-tertiary" />
                        </TooltipTrigger>
                        <TooltipContent>{{ private: "Privado", team: "Equipo", company: "Toda la empresa" }[doc.permission]}</TooltipContent>
                      </Tooltip>
                    </td>
                    <td className="px-2 py-2.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-md p-1 text-ink-tertiary opacity-0 transition-opacity hover:bg-base-hover hover:text-ink-primary group-hover:opacity-100">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Abrir</DropdownMenuItem>
                          <DropdownMenuItem>Compartir</DropdownMenuItem>
                          <DropdownMenuItem>Renombrar</DropdownMenuItem>
                          <DropdownMenuItem className="text-accent-red">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TooltipProvider>
    </div>
  );
}
