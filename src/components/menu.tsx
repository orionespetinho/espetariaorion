import { useState } from "react";
import { Minus, Plus, X, MessageCircle, Flame } from "lucide-react";
import type { Item } from "@/data/cardapio";
import { brl, waLink } from "@/data/negocio";
import { useCart } from "@/lib/cart";
import { Orion } from "./orion";

export function Img({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(!!src);
  const [loaded, setLoaded] = useState(false);
  if (!ok)
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-sky-2 to-sky-0 ${className}`}>
        <Orion className="h-1/2 opacity-70" animate={false} id="f" />
      </div>
    );
  return (
    <div className={`relative overflow-hidden ${loaded ? "" : "animate-pulse bg-sky-2"} ${className}`}>
      <img src={src} alt={alt} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setOk(false)}
        className="h-full w-full object-cover" />
    </div>
  );
}

export function PriceAction({ item, onAdd }: { item: Item; onAdd: () => void }) {
  if (item.preco == null)
    return (
      <a href={waLink(`Olá! Qual o preço de: ${item.nome}?`)} target="_blank" rel="noreferrer"
        onClick={(e) => e.stopPropagation()} className="btn-outline mt-2 w-full whitespace-nowrap text-sm">
        <MessageCircle className="h-4 w-4 shrink-0" /> Perguntar no WhatsApp
      </a>
    );
  return (
    <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className="btn-gold mt-2 w-full text-sm">
      <Plus className="h-4 w-4" /> Adicionar
    </button>
  );
}

export function ItemCard({ item, onOpen }: { item: Item; onOpen: (i: Item) => void }) {
  return (
    <article onClick={() => onOpen(item)} className="glass grid cursor-pointer grid-cols-[96px_minmax(0,1fr)] gap-x-3 p-3">
      <Img src={item.img} alt={item.nome} className="aspect-square w-24 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1">
          {item.destaque && <span className="badge-ember"><Flame className="h-3 w-3" />Destaque</span>}
        </div>
        <h3 className="font-display text-base font-semibold text-cream">{item.nome}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{item.descricao}</p>
        <p className="mt-1 text-sm font-semibold text-gold">{item.preco == null ? "Consulte" : brl(item.preco)}</p>
      </div>
      <div className="col-span-2"><PriceAction item={item} onAdd={() => onOpen(item)} /></div>
    </article>
  );
}

export function ItemModal({ item, onClose }: { item: Item | null; onClose: () => void }) {
  const { add, setOpen } = useCart();
  const [qtd, setQtd] = useState(1);
  const [obs, setObs] = useState("");
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-sky-0 no-scrollbar" role="dialog" aria-modal="true" aria-label={item.nome}>
      <div className="mx-auto max-w-[480px] pb-40">
        <div className="relative">
          <Img src={item.img} alt={item.nome} className="aspect-square w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-0 via-transparent to-transparent" />
          <button onClick={onClose} aria-label="Fechar" className="icon-btn absolute right-4 top-[max(1rem,env(safe-area-inset-top))]"><X /></button>
        </div>
        <div className="px-5 text-center">
          <h2 className="text-gold-grad font-display text-2xl font-bold [text-wrap:balance]">{item.nome}</h2>
          <p className="mt-2 text-muted-foreground [text-wrap:pretty]">{item.descricao}</p>
          <p className="mt-3 text-xl font-semibold text-gold">{item.preco == null ? "Consulte" : brl(item.preco)}</p>
          {item.preco != null && (
            <div className="mt-6 space-y-4 text-left">
              <div className="flex items-center justify-center gap-4">
                <button className="icon-btn" aria-label="Diminuir" onClick={() => setQtd(Math.max(1, qtd - 1))}><Minus /></button>
                <span className="w-8 text-center text-xl">{qtd}</span>
                <button className="icon-btn" aria-label="Aumentar" onClick={() => setQtd(qtd + 1)}><Plus /></button>
              </div>
              <label className="block text-sm">Observação
                <input className="field mt-1" placeholder="Ex.: ao ponto, sem pimenta" value={obs} onChange={(e) => setObs(e.target.value)} />
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t border-gold/30 bg-sky-1/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        <div className="mx-auto max-w-[480px]">
          {item.preco == null ? (
            <PriceAction item={item} onAdd={() => {}} />
          ) : (
            <button className="btn-gold w-full" onClick={() => {
              if (item.preco == null) return;
              add({ id: item.id, nome: item.nome, preco: item.preco, qtd, obs });
              setQtd(1); setObs(""); onClose(); setOpen(true);
            }}>Adicionar · {brl(item.preco * qtd)}</button>
          )}
        </div>
      </div>
    </div>
  );
}
