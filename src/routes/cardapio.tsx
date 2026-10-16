import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, LayoutGrid, X } from "lucide-react";
import { categorias, type Item } from "@/data/cardapio";
import { ItemCard, ItemModal, Img } from "@/components/menu";
import { SectionTitle } from "@/components/orion";
import { Footer } from "@/components/footer";

const categoriasNavegacao = categorias.filter((c) => c.id !== "acompanhamentos");

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Espetaria Orion | Uberlândia/MG" },
      { name: "description", content: "Cardápio digital da Espetaria Orion: espetos na brasa, acompanhamentos, porções e bebidas. Peça pelo WhatsApp." },
      { property: "og:title", content: "Cardápio — Espetaria Orion" },
      { property: "og:description", content: "Espetos na brasa, porções e bebidas geladas. Peça pelo WhatsApp." },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Item | null>(null);
  const [atual, setAtual] = useState("");
  const [sheet, setSheet] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return categorias
      .map((c) => ({ ...c, itens: t ? c.itens.filter((i) => (i.nome + i.descricao + c.nome).toLowerCase().includes(t)) : c.itens }))
      .filter((c) => c.itens.length);
  }, [q]);

  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }), 100);
    const onScroll = () => {
      setShowBar(window.scrollY > 420);
      let cur = "";
      for (const c of categorias) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < 160) cur = c.nome;
      }
      setAtual(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => { setSheet(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="pt-6">
      <SectionTitle label="Céu de sabores" title="Cardápio" sub="Toque em um item para ver detalhes." />
      <div className="sticky top-[calc(56px+env(safe-area-inset-top))] z-30 bg-sky-0/90 px-4 py-2 backdrop-blur">
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar no cardápio" aria-label="Buscar no cardápio" className="field pl-9" />
        </label>
        {showBar && (
          <div className="mt-2 flex items-center justify-between gap-2 text-sm">
            <span className="min-w-0 truncate font-serif-it text-base text-gold-3">{atual || "Cardápio"}</span>
            <button onClick={() => setSheet(true)} className="btn-outline !min-h-11 shrink-0 !px-3 text-xs"><LayoutGrid className="h-4 w-4" />Categorias</button>
          </div>
        )}
      </div>

      {!q && (
        <div className="mt-4 grid grid-cols-2 gap-2 px-4">
          {categoriasNavegacao.map((c) => (
            <button key={c.id} onClick={() => go(c.id)} className="glass grid min-h-14 grid-cols-[32px_minmax(0,1fr)] items-center gap-2 p-2 text-left text-xs font-semibold min-[390px]:text-sm">
              <Img src={c.img} alt="" className="aspect-square w-8 shrink-0 rounded-lg" />
              <span className="min-w-0">{c.nome}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-8 px-4">
        {lista.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-[170px]">
            <h2 className="text-gold-grad mb-3 text-center font-display text-xl font-bold">{c.nome}</h2>
            <div className="space-y-3">{c.itens.map((i) => <ItemCard key={i.id} item={i} onOpen={setOpen} />)}</div>
          </section>
        ))}
        {!lista.length && <p className="text-center text-muted-foreground">Nada encontrado para “{q}”.</p>}
      </div>
      <Footer />

      {sheet && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Categorias">
          <button className="absolute inset-0 bg-sky-0/70" aria-label="Fechar" onClick={() => setSheet(false)} />
          <div className="sheet-in absolute inset-x-0 bottom-0 mx-auto max-w-[480px] rounded-t-3xl border border-gold/30 bg-sky-1 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-gold-grad font-display text-lg font-bold">Categorias</h2>
              <button className="icon-btn" aria-label="Fechar" onClick={() => setSheet(false)}><X /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoriasNavegacao.map((c) => <button key={c.id} onClick={() => go(c.id)} className="chip">{c.nome}</button>)}
            </div>
          </div>
        </div>
      )}
      <ItemModal item={open} onClose={() => setOpen(null)} />
    </div>
  );
}
