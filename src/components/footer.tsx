import { Link } from "@tanstack/react-router";
import { Orion } from "./orion";
import { negocio } from "@/data/negocio";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-gold/20 px-5 py-10 text-center text-sm text-muted-foreground">
      <Orion className="mx-auto h-24" animate={false} id="ft" />
      <p className="text-gold-grad mt-3 font-display text-lg font-bold tracking-[0.2em]">ESPETARIA ORION</p>
      <p className="font-serif-it text-gold-2">O sabor da brasa</p>
      <p className="mt-4"><a href={negocio.tel} className="underline-offset-4 hover:underline">{negocio.telefoneExibicao}</a></p>
      <p>{negocio.endereco}</p>
      {negocio.instagram && <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Espetaria Orion" title="Instagram" className="icon-btn mx-auto mt-3"><Instagram className="h-5 w-5" /></a>}
      <p className="mt-4"><Link to="/plaquinha" className="underline">Plaquinha com QR Code</Link></p>
      <p className="mt-6 text-xs">Site por NeuroDyne</p>
    </footer>
  );
}
