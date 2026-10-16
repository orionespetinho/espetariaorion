import { brl } from "@/data/negocio";
import type { CartLine } from "./cart";

export type Reservation = { nome: string; tipo: string; pessoas: number; data: string; hora: string; ocasiao: string; obs: string };
export type OrderDetails = { nome: string; tipo: string; endereco: string; bairro: string; ref: string; pag: string; troco: string; obs: string };

export function reservationMessage(f: Reservation) {
  return ["*Pedido de reserva — Espetaria Orion*", "", `Nome: ${f.nome.trim()}`, `Tipo: ${f.tipo}`,
    `Pessoas: ${f.pessoas}`, `Data: ${f.data.split("-").reverse().join("/")}`, `Horário: ${f.hora}`,
    `Ocasião: ${f.ocasiao}`, ...(f.obs.trim() ? [`Observações: ${f.obs.trim()}`] : [])].join("\n");
}

export function orderMessage(lines: CartLine[], f: OrderDetails, deliveryFee: number | null) {
  const subtotal = lines.reduce((sum, l) => sum + l.qtd * l.preco, 0);
  const delivery = f.tipo === "Entrega";
  const total = subtotal + (delivery ? deliveryFee ?? 0 : 0);
  return ["*Novo pedido — Espetaria Orion*", "",
    ...lines.map((l) => `${l.qtd}x ${l.nome} — ${brl(l.qtd * l.preco)} (${brl(l.preco)} cada)${l.obs ? `\n  Observação: ${l.obs}` : ""}`), "",
    `Subtotal: ${brl(subtotal)}`, `Entrega: ${delivery ? deliveryFee == null ? "a combinar" : brl(deliveryFee) : "—"}`,
    `Total: ${brl(total)}${delivery && deliveryFee == null ? " + entrega a combinar" : ""}`, "",
    `Cliente: ${f.nome.trim()}`, `Tipo: ${f.tipo}`,
    ...(delivery ? [`Endereço: ${f.endereco.trim()}`, `Bairro: ${f.bairro.trim()}`, ...(f.ref.trim() ? [`Referência: ${f.ref.trim()}`] : [])] : []),
    `Pagamento: ${f.pag}`, ...(f.pag === "Dinheiro" && f.troco.trim() ? [`Troco para: ${f.troco.trim()}`] : []),
    ...(f.obs.trim() ? [`Observações: ${f.obs.trim()}`] : [])].join("\n");
}