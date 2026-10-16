import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Orion } from "@/components/orion";

export const Route = createFileRoute("/plaquinha")({
  head: () => ({
    meta: [
      { title: "Plaquinha QR Code — Espetaria Orion" },
      { name: "description", content: "Plaquinha para imprimir com QR Code do cardápio da Espetaria Orion." },
      { property: "og:title", content: "Plaquinha — Espetaria Orion" },
      { property: "og:description", content: "Escaneie e veja o cardápio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Plaquinha,
});

function Plaquinha() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.origin + "/cardapio"), []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="glass flex aspect-[1/1.414] w-full max-w-sm flex-col items-center justify-center gap-4 p-8 text-center">
        <Orion className="h-24" animate={false} id="p" />
        <p className="text-gold-grad font-display text-3xl font-bold tracking-[0.2em]">ORION</p>
        <p className="font-serif-it text-gold-2">O sabor da brasa</p>
        {url && <img src={`https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=10&data=${encodeURIComponent(url)}`} alt="QR Code do cardápio" className="w-44 rounded-xl" />}
        <p className="font-display text-lg text-cream">Escaneie e veja o cardápio</p>
      </div>
      <button onClick={() => window.print()} className="btn-gold print:hidden">Imprimir</button>
    </div>
  );
}
