import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartLine = { key: string; id: string; nome: string; preco: number; qtd: number; obs: string };
type Ctx = {
  lines: CartLine[];
  add: (l: Omit<CartLine, "key">) => void;
  setQtd: (key: string, qtd: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "orion-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { const r = localStorage.getItem(KEY); if (r) setLines(JSON.parse(r)); } catch {}
  }, []);
  const save = (l: CartLine[]) => {
    setLines(l);
    try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {}
  };
  const add: Ctx["add"] = (l) => {
    const key = `${l.id}|${l.obs.trim()}`;
    const ex = lines.find((x) => x.key === key);
    save(ex ? lines.map((x) => (x.key === key ? { ...x, qtd: x.qtd + l.qtd } : x)) : [...lines, { ...l, key }]);
  };
  const setQtd = (key: string, qtd: number) =>
    save(qtd <= 0 ? lines.filter((x) => x.key !== key) : lines.map((x) => (x.key === key ? { ...x, qtd } : x)));
  const count = lines.reduce((s, l) => s + l.qtd, 0);
  const subtotal = lines.reduce((s, l) => s + l.qtd * l.preco, 0);
  return (
    <CartCtx.Provider value={{ lines, add, setQtd, clear: () => save([]), open, setOpen, count, subtotal }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("CartProvider ausente");
  return c;
};
