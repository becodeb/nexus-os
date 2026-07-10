import { Plus, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ClientsTable } from "@/components/tables/clients-table";
import { clients } from "@/data/mock";

export default function Crm() {
  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Gestiona todas las relaciones comerciales desde un solo lugar"
        actions={
          <>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Filter className="size-3.5" /> Filtros
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="size-3.5" /> Nuevo cliente
            </Button>
          </>
        }
      />
      <ClientsTable data={clients} />
    </div>
  );
}
