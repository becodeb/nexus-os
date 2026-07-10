import { DollarSign, Users, FolderKanban, Gauge, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ProductivityChart } from "@/components/charts/productivity-chart";
import { ClientGrowthChart } from "@/components/charts/client-growth-chart";
import { ProjectStatusChart } from "@/components/charts/project-status-chart";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard ejecutivo"
        description="Vista general de la operación — 9 de julio, 2026"
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Download className="size-3.5" /> Exportar
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Ingresos mensuales" value="$248,500" delta={18} icon={DollarSign} accent="green" index={0} />
        <KpiCard label="Clientes activos" value="1,248" delta={12} icon={Users} accent="blue" index={1} />
        <KpiCard label="Proyectos activos" value="34" delta={6} icon={FolderKanban} accent="violet" index={2} />
        <KpiCard label="Productividad" value="86%" delta={4} icon={Gauge} accent="amber" index={3} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Ingresos</CardTitle>
              <p className="mt-0.5 text-lg font-semibold text-ink-primary">Últimos 7 meses</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-tertiary">
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-accent-blue" /> Real</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-zinc-600" /> Meta</span>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de proyectos</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <ProjectStatusChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Productividad semanal</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ProductivityChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de clientes</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ClientGrowthChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[280px] overflow-y-auto pt-2">
            <ActivityTimeline />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
