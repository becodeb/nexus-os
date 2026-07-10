import { DollarSign, TrendingDown, Wallet, FileWarning, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CashFlowChart } from "@/components/charts/cash-flow-chart";
import { BudgetChart } from "@/components/charts/budget-chart";
import { invoices } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusVariant = { paid: "green", pending: "blue", overdue: "red" } as const;
const statusLabel = { paid: "Pagada", pending: "Pendiente", overdue: "Vencida" } as const;

export default function Finance() {
  return (
    <div>
      <PageHeader
        title="Finanzas"
        description="Panorama financiero, cash flow y facturación"
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Download className="size-3.5" /> Exportar reporte
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Ingresos" value="$1.68M" delta={14} icon={DollarSign} accent="green" index={0} />
        <KpiCard label="Gastos" value="$1.11M" delta={7} icon={TrendingDown} accent="amber" index={1} />
        <KpiCard label="Cash flow neto" value="$570K" delta={22} icon={Wallet} accent="blue" index={2} />
        <KpiCard label="Facturas vencidas" value="$18.4K" delta={-9} icon={FileWarning} accent="violet" index={3} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Cash flow mensual</CardTitle></CardHeader>
          <CardContent className="pt-2"><CashFlowChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Presupuesto por área</CardTitle></CardHeader>
          <CardContent className="pt-3"><BudgetChart /></CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Facturas recientes</CardTitle></CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-hidden rounded-lg border border-base-border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-base-border bg-base-hover/40 text-xs text-ink-tertiary">
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Cliente</th>
                  <th className="px-4 py-2 font-medium">Monto</th>
                  <th className="px-4 py-2 font-medium">Emisión</th>
                  <th className="px-4 py-2 font-medium">Vencimiento</th>
                  <th className="px-4 py-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 8).map((inv) => (
                  <tr key={inv.id} className="border-b border-base-border last:border-0 hover:bg-base-hover/40">
                    <td className="numeric px-4 py-2.5 text-sm text-ink-secondary">{inv.id}</td>
                    <td className="px-4 py-2.5 text-sm text-ink-primary">{inv.client}</td>
                    <td className="numeric px-4 py-2.5 text-sm font-medium text-ink-primary">{formatCurrency(inv.amount)}</td>
                    <td className="numeric px-4 py-2.5 text-xs text-ink-tertiary">{inv.issueDate}</td>
                    <td className="numeric px-4 py-2.5 text-xs text-ink-tertiary">{inv.dueDate}</td>
                    <td className="px-4 py-2.5"><Badge variant={statusVariant[inv.status]}>{statusLabel[inv.status]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
