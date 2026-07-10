import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Building2, FileText, StickyNote } from "lucide-react";
import { clients, projects } from "@/data/mock";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClientStatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatCurrency, initials } from "@/lib/utils";

export default function ClientDetail() {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id) ?? clients[0];
  const relatedProjects = projects.filter((p) => p.client === client.company).slice(0, 4);

  return (
    <div>
      <Link to="/clients" className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-tertiary transition-colors hover:text-ink-primary">
        <ArrowLeft className="size-3.5" /> Volver a clientes
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-base-card text-lg font-semibold text-ink-primary border border-base-border">
            {client.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-ink-primary">{client.company}</h1>
              <ClientStatusBadge status={client.status} />
            </div>
            <p className="text-sm text-ink-secondary">{client.industry} · {formatCurrency(client.value)} valor total</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Editar</Button>
          <Button variant="primary" size="sm">Nueva propuesta</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader><CardTitle>Contactos</CardTitle></CardHeader>
                <CardContent className="space-y-3 pt-2">
                  {client.contacts.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg border border-base-border p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback>{initials(c.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-ink-primary">{c.name}</p>
                          <p className="text-xs text-ink-tertiary">{c.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Mail className="size-4" /></Button>
                        <Button variant="ghost" size="icon"><Phone className="size-4" /></Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <div className="space-y-2">
                {relatedProjects.length === 0 && <p className="text-sm text-ink-tertiary">Sin proyectos asociados.</p>}
                {relatedProjects.map((p) => (
                  <Card key={p.id} className="p-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-ink-primary">{p.name}</p>
                        <p className="text-xs text-ink-tertiary">Vence {p.dueDate}</p>
                      </div>
                      <Badge variant="blue">{p.status}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-2">
                {["Contrato Marco.pdf", "Propuesta 2026.doc", "SLA Vigente.pdf"].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 rounded-lg border border-base-border p-3">
                    <FileText className="size-4 text-ink-tertiary" />
                    <span className="text-sm text-ink-primary">{doc}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="space-y-3">
                {client.notes.map((n) => (
                  <Card key={n.id} className="p-3.5">
                    <div className="flex items-start gap-2.5">
                      <StickyNote className="mt-0.5 size-4 shrink-0 text-accent-amber" />
                      <div>
                        <p className="text-sm text-ink-secondary">{n.text}</p>
                        <p className="mt-1 text-xs text-ink-tertiary">{n.author} · {n.date}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Detalles</CardTitle></CardHeader>
            <CardContent className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-2 text-ink-secondary">
                <Building2 className="size-3.5 text-ink-tertiary" /> {client.industry}
              </div>
              <div className="flex items-center gap-2 text-ink-secondary">
                <Mail className="size-3.5 text-ink-tertiary" /> {client.contactEmail}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {client.tags.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Responsable</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-2.5 pt-2">
              <Avatar>
                <AvatarImage src={client.ownerAvatar} />
                <AvatarFallback>{initials(client.owner)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-ink-primary">{client.owner}</p>
                <p className="text-xs text-ink-tertiary">Account Manager</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
