import { describe, expect, it } from "vitest";
import { orderMessage, reservationMessage } from "@/lib/whatsapp";
import { waLink } from "@/data/negocio";

describe("WhatsApp submission details", () => {
  it("includes every filled reservation detail", () => {
    const message = reservationMessage({ nome: "Cliente Teste", tipo: "Evento no espaço privativo", pessoas: 3, data: "2026-10-20", hora: "19:00", ocasiao: "Confraternização", obs: "Mesa próxima à quadra" });
    expect(message.split("\n")).toEqual(["*Pedido de reserva — Espetaria Orion*", "", "Nome: Cliente Teste", "Tipo: Evento no espaço privativo", "Pessoas: 3", "Data: 20/10/2026", "Horário: 19:00", "Ocasião: Confraternização", "Observações: Mesa próxima à quadra"]);
    expect(new URL(waLink(message)).searchParams.get("text")).toBe(message);
  });
  it("includes product quantities, observations and all delivery and payment details", () => {
    const message = orderMessage([{ key: "bovina", id: "bovina", nome: "Espeto de Carne Bovina", preco: 12, qtd: 2, obs: "Ao ponto" }], { nome: "Cliente Teste", tipo: "Entrega", endereco: "Rua Teste, 10", bairro: "Centro", ref: "Portão verde", pag: "Dinheiro", troco: "50", obs: "Sem pimenta" }, null);
    for (const detail of ["2x Espeto de Carne Bovina", "Observação: Ao ponto", "Subtotal: R$", "24,00 + entrega a combinar", "Cliente: Cliente Teste", "Tipo: Entrega", "Endereço: Rua Teste, 10", "Bairro: Centro", "Referência: Portão verde", "Pagamento: Dinheiro", "Troco para: 50", "Observações: Sem pimenta"]) expect(message).toContain(detail);
    expect(new URL(waLink(message)).searchParams.get("text")).toBe(message);
  });
});