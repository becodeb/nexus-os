import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const toggles = [
  { label: "Notificaciones por correo", desc: "Recibe actualizaciones de clientes y proyectos", checked: true },
  { label: "Alertas de facturación", desc: "Avisos cuando una factura está por vencer", checked: true },
  { label: "Resumen semanal", desc: "Reporte automático cada lunes", checked: false },
  { label: "Modo multiempresa", desc: "Permite cambiar entre workspaces", checked: true },
];

export default function Settings() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Configuración" description="Preferencias de cuenta y workspace" />

      <Card className="mb-4">
        <CardHeader><CardTitle>Perfil</CardTitle></CardHeader>
        <CardContent className="space-y-4 pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Nombre</Label>
              <Input defaultValue="Gonzalo Bautista" />
            </div>
            <div className="space-y-1.5">
              <Label>Correo</Label>
              <Input defaultValue="gonibauti@gmail.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Empresa</Label>
            <Input defaultValue="Nexus Holdings" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Notificaciones</CardTitle></CardHeader>
        <CardContent className="pt-2">
          {toggles.map((t, i) => (
            <div key={t.label}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm text-ink-primary">{t.label}</p>
                  <p className="text-xs text-ink-tertiary">{t.desc}</p>
                </div>
                <Switch defaultChecked={t.checked} />
              </div>
              {i < toggles.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button variant="primary">Guardar cambios</Button>
      </div>
    </div>
  );
}
