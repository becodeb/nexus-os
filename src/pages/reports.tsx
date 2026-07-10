import { Download, FileBarChart2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ClientGrowthChart } from "@/components/charts/client-growth-chart";
import { BudgetChart } from "@/components/charts/budget-chart";
import { ProjectStatusChart } from "@/components/charts/project-status-chart";

const reports = [
  { name: "Reporte financiero Q2 2026", date: "1 jul 2026", size: "2.1 MB" },
  { name: "Análisis de retención de clientes", date: "28 jun 2026", size: "1.4 MB" },
  { name: "Rendimiento del equipo — junio", date: "25 jun 2026", size: "890 KB" },
  { name: "Pipeline de ventas — resumen", date: "20 jun 2026", size: "1.1 MB" },
];

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="Reportes"
        description="Business Intelligence y métricas consolidadas"
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Download className="size-3.5" /> Exportar todo
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Ingresos vs. meta</CardTitle></CardHeader>
          <CardContent className="pt-2"><RevenueChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Crecimiento de clientes</CardTitle></CardHeader>
          <CardContent className="pt-2"><ClientGrowthChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Presupuesto por área</CardTitle></CardHeader>
          <CardContent className="pt-3"><BudgetChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Estado de proyectos</CardTitle></CardHeader>
          <CardContent className="pt-3"><ProjectStatusChart /></CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Informes generados</CardTitle></CardHeader>
        <CardContent className="space-y-1 pt-2">
          {reports.map((r) => (
            <div key={r.name} className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-base-hover">
              <div className="flex items-center gap-2.5">
                <FileBarChart2 className="size-4 text-accent-blue" />
                <div>
                  <p className="text-sm text-ink-primary">{r.name}</p>
                  <p className="text-xs text-ink-tertiary">{r.date} · {r.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><Download className="size-4" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
