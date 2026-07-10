import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, TrendingUp, AlertTriangle, ArrowUpRight } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message { id: string; role: "user" | "assistant"; text: string }

const suggestions = [
  "¿Qué proyectos están retrasados?",
  "Resume el estado financiero de este mes",
  "¿Qué clientes necesitan seguimiento?",
];

const insights = [
  { icon: AlertTriangle, color: "text-accent-amber", text: "3 proyectos necesitan atención esta semana." },
  { icon: TrendingUp, color: "text-accent-green", text: "Los ingresos crecieron 18% vs. el mes anterior." },
  { icon: ArrowUpRight, color: "text-accent-blue", text: "2 clientes en negociación listos para cerrar." },
];

function respond(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("retras")) return "3 proyectos necesitan atención esta semana: API Revamp (68%, vence en 4 días), Checkout Optimization (41%, vence en 2 días) y Security Audit (22%, vence en 6 días).";
  if (q.includes("financ") || q.includes("ingres")) return "Ingresos de julio: $248,500 (+18% vs. junio). Cash flow positivo con $111,000 de margen. 3 facturas vencidas por un total de $18,400.";
  if (q.includes("cliente")) return "2 clientes en negociación activa: Prism Studio y Halcyon Energy. Ambos sin contacto hace más de 8 días — recomiendo agendar seguimiento.";
  return "Analizando los datos de tu operación... Basado en la actividad reciente, todo está dentro de los parámetros esperados. ¿Quieres que profundice en algún área específica?";
}

export function AiPanel() {
  const { aiPanelOpen, toggleAiPanel } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", text: respond(text) }]);
      setThinking(false);
    }, 900);
  }

  return (
    <AnimatePresence>
      {aiPanelOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 360, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="flex shrink-0 flex-col overflow-hidden border-l border-base-border bg-[#0c0c0e]"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-base-border px-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent-violet" />
              <span className="text-sm font-semibold text-ink-primary">Asistente Nexus</span>
            </div>
            <button onClick={toggleAiPanel} className="rounded-md p-1 text-ink-tertiary hover:bg-base-hover hover:text-ink-primary">
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-ink-tertiary">Insights automáticos</p>
                  {insights.map((ins, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-base-border bg-base-card p-3">
                      <ins.icon className={cn("mt-0.5 size-4 shrink-0", ins.color)} />
                      <p className="text-[13px] leading-snug text-ink-secondary">{ins.text}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-ink-tertiary">Prueba preguntando</p>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-base-border bg-base-card px-3 py-2 text-left text-[13px] text-ink-secondary transition-colors hover:border-accent-blue/40 hover:text-ink-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                    m.role === "user"
                      ? "bg-accent-blue text-white"
                      : "border border-base-border bg-base-card text-ink-secondary",
                  )}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}

            {thinking && (
              <div className="flex items-center gap-1.5 rounded-xl border border-base-border bg-base-card px-3 py-2.5 w-fit">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-ink-tertiary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-base-border p-3">
            <div className="flex items-center gap-2 rounded-lg border border-base-border bg-base-bg px-2.5 py-1.5 focus-within:border-accent-blue/50">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Pregúntale algo a Nexus..."
                className="flex-1 bg-transparent text-[13px] text-ink-primary placeholder:text-ink-tertiary outline-none"
              />
              <Button size="icon" variant="ghost" className="size-6" onClick={() => send(input)}>
                <Send className="size-3.5" />
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
