import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SectionTitle } from "@/components/orion";
import { negocio, waLink } from "@/data/negocio";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/reservar")({
  head: () => ({
    meta: [
      { title: "Reservas e eventos — Espetaria Orion | Uberlândia/MG" },
      { name: "description", content: "Reserve sua mesa ou o espaço privativo da Espetaria Orion para aniversários, resenhas e confraternizações." },
      { property: "og:title", content: "Reservas e eventos — Espetaria Orion" },
      { property: "og:description", content: "Reserve sua mesa ou o espaço privativo pelo WhatsApp." },
    ],
  }),
  component: Reservar,
});

const iso = (d: Date) => d.toISOString().slice(0, 10);

function Reservar() {
  const [f, setF] = useState({ nome: "", tipo: "Mesa", pessoas: 2, data: "", hora: "", ocasiao: "Aniversário", obs: "" });
  const [err, setErr] = useState("");
  const { min, max } = useMemo(() => { const n = new Date(); const m = new Date(); m.setDate(n.getDate() + 60); return { min: iso(n), max: iso(m) }; }, []);
  // CONFIRMAR COM O DONO: horários disponíveis
  const horas = useMemo(() => {
    const out: string[] = [];
    const [h0 = 18, m0 = 0] = negocio.reservaInicio.split(":").map(Number);
    const [h1 = 23, m1 = 0] = negocio.reservaFim.split(":").map(Number);
    for (let t = h0 * 60 + m0; t <= h1 * 60 + m1; t += 30) out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
    return out;
  }, []);

  const enviar = () => {
    if (!f.nome.trim() || !f.data || !f.hora) return setErr("Preencha nome, data e horário.");
    setErr("");
    const data = f.data.split("-").reverse().join("/");
    const msg = [
      "*Pedido de reserva — Espetaria Orion*", "",
      `Nome: ${f.nome}`, `Tipo: ${f.tipo}`, `Pessoas: ${f.pessoas}`, `Data: ${data}`, `Horário: ${f.hora}`, `Ocasião: ${f.ocasiao}`,
      ...(f.obs ? [`Observações: ${f.obs}`] : []),
    ].join("\n");
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="pt-6">
      <SectionTitle label="Reservas e eventos" title="Reserve sua noite" sub={<span className="reservation-subtitle"><span className="block whitespace-nowrap">Aniversário, resenha ou evento?</span><span className="block whitespace-nowrap">Reserve sua mesa ou o espaço privativo.</span></span>} />
      <div className="glass mx-4 space-y-5 p-5">
        <label className="block text-sm">Nome *<input className="field mt-1" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} /></label>
        <div>
          <p className="mb-1 text-sm">Tipo</p>
          <div className="grid grid-cols-2 gap-2">
            {["Mesa", "Evento no espaço privativo"].map((t) => <button key={t} onClick={() => setF({ ...f, tipo: t })} className={`chip ${f.tipo === t ? "chip-on" : ""}`}>{t}</button>)}
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm">Pessoas</p>
          <div className="flex items-center justify-center gap-5">
            <button className="icon-btn" aria-label="Menos pessoas" onClick={() => setF({ ...f, pessoas: Math.max(1, f.pessoas - 1) })}><Minus /></button>
            <span className="w-10 text-center text-2xl font-semibold text-gold">{f.pessoas}</span>
            <button className="icon-btn" aria-label="Mais pessoas" onClick={() => setF({ ...f, pessoas: Math.min(60, f.pessoas + 1) })}><Plus /></button>
          </div>
        </div>
        <label className="block text-sm">Data *<input type="date" min={min} max={max} className="field mt-1 [color-scheme:dark]" value={f.data} onChange={(e) => setF({ ...f, data: e.target.value })} /></label>
        <div>
          <p className="mb-1 text-sm">Horário *</p>
          <div className="grid grid-cols-3 gap-2">
            {horas.map((h) => <button key={h} onClick={() => setF({ ...f, hora: h })} className={`chip ${f.hora === h ? "chip-on" : ""}`}>{h}</button>)}
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm">Ocasião</p>
          <div className="grid grid-cols-2 gap-2">
            {["Aniversário", "Confraternização", "Jogo/resenha", "Outro"].map((o) => <button key={o} onClick={() => setF({ ...f, ocasiao: o })} className={`chip ${f.ocasiao === o ? "chip-on" : ""}`}>{o}</button>)}
          </div>
        </div>
        <label className="block text-sm">Observações<textarea rows={2} className="field mt-1" value={f.obs} onChange={(e) => setF({ ...f, obs: e.target.value })} /></label>
        {err && <p role="alert" className="text-center text-sm text-ember">{err}</p>}
        <button className="btn-gold w-full" onClick={enviar}>Enviar pelo WhatsApp</button>
        <p className="text-center text-xs text-muted-foreground">Reserva sujeita à confirmação.</p>
      </div>
      <Footer />
    </div>
  );
}
