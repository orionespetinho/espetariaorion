import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, UtensilsCrossed, CalendarDays, ShoppingBag, X, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { negocio, brl, waLink } from "@/data/negocio";
import { Orion } from "./orion";
import { orderMessage } from "@/lib/whatsapp";

export function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/20 bg-sky-0/75 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[480px] items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Espetaria Orion — início">
          <Orion className="h-8 w-5" animate={false} id="h" />
          <span className="text-gold-grad font-display text-xl font-bold tracking-[0.2em]">ORION</span>
        </Link>
        <button onClick={() => setOpen(true)} className="icon-btn relative" aria-label={`Abrir pedido (${count} itens)`}>
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[10px] font-bold text-sky-0">{count}</span>}
        </button>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { count, setOpen } = useCart();
  const cls = "flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] text-muted-foreground";
  const active = { className: `${cls} !text-gold` };
  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-sky-0/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[480px]">
        <Link to="/" className={cls} activeProps={active} activeOptions={{ exact: true }}><Home className="h-5 w-5" />Início</Link>
        <Link to="/cardapio" className={cls} activeProps={active}><UtensilsCrossed className="h-5 w-5" />Cardápio</Link>
        <Link to="/reservar" className={cls} activeProps={active}><CalendarDays className="h-5 w-5" />Reservar</Link>
        <button onClick={() => setOpen(true)} className={`${cls} relative`}>
          <ShoppingBag className="h-5 w-5" />Pedido{count > 0 && ` (${count})`}
        </button>
      </div>
    </nav>
  );
}

export function CartSheet() {
  const { lines, setQtd, open, setOpen, subtotal, clear } = useCart();
  const [f, setF] = useState({ nome: "", tipo: "Entrega", endereco: "", bairro: "", ref: "", pag: "Cartão", troco: "", obs: "" });
  const [err, setErr] = useState("");
  if (!open) return null;
  const tipos = ["Entrega", "Retirada", ...(negocio.consumoNoLocal ? ["Consumo no local"] : [])];
  const pags = ["Cartão", "Dinheiro", ...(negocio.aceitaPix ? ["Pix"] : [])];
  const taxa = f.tipo === "Entrega" ? negocio.taxaEntrega : 0;
  const total = subtotal + (taxa ?? 0);
  const up = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const enviar = () => {
    if (!lines.length) return setErr("Seu pedido está vazio.");
    if (!f.nome.trim()) return setErr("Informe seu nome.");
    if (f.tipo === "Entrega" && (!f.endereco.trim() || !f.bairro.trim())) return setErr("Informe endereço e bairro.");
    setErr("");
    window.open(waLink(orderMessage(lines, f, negocio.taxaEntrega)), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Seu pedido">
      <button className="absolute inset-0 bg-sky-0/70" aria-label="Fechar pedido" onClick={() => setOpen(false)} />
      <div className="sheet-in absolute inset-x-0 bottom-0 mx-auto flex h-[90dvh] max-w-[480px] flex-col rounded-t-3xl border border-gold/30 bg-sky-1">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-gold-grad font-display text-xl font-bold">Seu pedido</h2>
          <button className="icon-btn" aria-label="Fechar" onClick={() => setOpen(false)}><X /></button>
        </div>
        <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 pb-4">
          {!lines.length && <p className="empty-order-subtitle py-10 text-center text-muted-foreground"><span className="block whitespace-nowrap">Seu pedido está vazio.</span><span className="block whitespace-nowrap">Escolha seus espetos no cardápio.</span></p>}
          {lines.map((l) => (
            <div key={l.key} className="glass flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{l.nome}</p>
                {l.obs && <p className="text-xs text-muted-foreground">obs: {l.obs}</p>}
                <p className="text-sm text-gold">{brl(l.qtd * l.preco)}</p>
              </div>
              <button className="icon-btn" aria-label="Diminuir" onClick={() => setQtd(l.key, l.qtd - 1)}><Minus className="h-4 w-4" /></button>
              <span className="w-5 text-center">{l.qtd}</span>
              <button className="icon-btn" aria-label="Aumentar" onClick={() => setQtd(l.key, l.qtd + 1)}><Plus className="h-4 w-4" /></button>
            </div>
          ))}
          {lines.length > 0 && (
            <div className="space-y-3">
              <input className="field" placeholder="Seu nome *" value={f.nome} onChange={up("nome")} aria-label="Nome" />
              <div className="grid grid-cols-2 gap-2">
                {tipos.map((t) => <button key={t} onClick={() => setF({ ...f, tipo: t })} className={`chip ${f.tipo === t ? "chip-on" : ""}`}>{t}</button>)}
              </div>
              {f.tipo === "Entrega" && (<>
                <input className="field" placeholder="Endereço *" value={f.endereco} onChange={up("endereco")} aria-label="Endereço" />
                <input className="field" placeholder="Bairro *" value={f.bairro} onChange={up("bairro")} aria-label="Bairro" />
                <input className="field" placeholder="Referência" value={f.ref} onChange={up("ref")} aria-label="Referência" />
              </>)}
              <div className="grid grid-cols-2 gap-2">
                {pags.map((p) => <button key={p} onClick={() => setF({ ...f, pag: p })} className={`chip ${f.pag === p ? "chip-on" : ""}`}>{p}</button>)}
              </div>
              {f.pag === "Dinheiro" && <input className="field" placeholder="Troco para quanto?" value={f.troco} onChange={up("troco")} aria-label="Troco" />}
              <textarea className="field" rows={2} placeholder="Observações" value={f.obs} onChange={up("obs")} aria-label="Observações" />
              <button onClick={clear} className="w-full py-2 text-sm text-muted-foreground underline">Limpar pedido</button>
            </div>
          )}
        </div>
        <div className="border-t border-gold/25 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="mb-1 flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{brl(subtotal)}</span></div>
          {f.tipo === "Entrega" && <div className="mb-1 flex justify-between text-sm text-muted-foreground"><span>Entrega</span><span>{taxa == null ? "a combinar" : brl(taxa)}</span></div>}
          <div className="mb-3 flex justify-between font-semibold text-gold"><span>Total</span><span>{brl(total)}</span></div>
          {err && <p role="alert" className="mb-2 text-center text-sm text-ember">{err}</p>}
          <button className="btn-gold w-full" onClick={enviar} disabled={!lines.length}>Enviar pedido pelo WhatsApp</button>
        </div>
      </div>
    </div>
  );
}
