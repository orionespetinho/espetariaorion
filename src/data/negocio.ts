// Dados do negócio — edite aqui.
export const negocio = {
  nome: "Espetaria Orion",
  slogan: "O sabor da brasa",
  whatsapp: "5534991489663",
  telefoneExibicao: "(34) 99148-9663",
  tel: "tel:+5534991489663",
  // CONFIRMAR COM O DONO: número, bairro e nome da quadra
  endereco: "Av. Araguari, Uberlândia/MG",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=-18.9077595,-48.2776748",
  instagram: null as string | null, // CONFIRMAR COM O DONO
  // CONFIRMAR COM O DONO: refeição no local (Google mostra informações conflitantes)
  consumoNoLocal: false,
  // CONFIRMAR COM O DONO
  aceitaPix: false,
  taxaEntrega: null as number | null, // null = "a combinar"
  // CONFIRMAR COM O DONO: horários por dia. null = não informado
  horarios: {
    domingo: null, segunda: null, terca: null, quarta: null, quinta: null, sexta: null, sabado: null,
  } as Record<string, string | null>,
  // CONFIRMAR COM O DONO: horários de reserva (padrão 18:00–23:00)
  reservaInicio: "18:00",
  reservaFim: "23:00",
  pagamentos: ["Cartão de crédito", "Cartão de débito", "Pagamento por aproximação (NFC)"],
  avaliacao: { nota: 5.0, total: 7, conferidoEm: "16/10/2026" },
  googleUrl: "https://www.google.com/maps/search/?api=1&query=Espetaria+Orion+Uberl%C3%A2ndia",
  diferenciais: [
    "Música ao vivo", "Ambiente esportivo", "Mesas na cobertura e externas",
    "Espaço privativo para eventos", "Aceita reservas", "Família e crianças (fraldário)",
    "Wi-Fi gratuito", "Bar no local", "Estacionamento gratuito", "Acessibilidade completa",
    "Todos são bem-vindos",
  ],
};

export const waLink = (text: string) =>
  `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(text)}`;

export const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
