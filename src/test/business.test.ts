import { describe, expect, it } from "vitest";
import { negocio } from "@/data/negocio";

describe("Owner-confirmed business details", () => {
  it("uses Avenida Araguari 225 in Uberlândia/MG", () => {
    expect(negocio.endereco).toBe("Avenida Araguari 225, Uberlândia/MG");
  });
  it.each(["terca", "quarta", "quinta", "sexta"])("opens %s from 16:00 to 23:00", (dia) => {
    expect(negocio.horarios[dia]).toBe("16:00–23:00");
  });
  it("opens Saturday from 15:00 to 23:00", () => {
    expect(negocio.horarios.sabado).toBe("15:00–23:00");
  });
  it.each(["domingo", "segunda"])("is closed on %s", (dia) => {
    expect(negocio.horarios[dia]).toBe("Fechado");
  });
  it("accepts Pix", () => {
    expect(negocio.aceitaPix).toBe(true);
    expect(negocio.pagamentos).toContain("Pix");
  });
  it("allows consumption on site", () => {
    expect(negocio.consumoNoLocal).toBe(true);
  });
  it("uses the confirmed Instagram account", () => {
    expect(negocio.instagram).toBe("https://www.instagram.com/orion_espetaria/");
  });
});