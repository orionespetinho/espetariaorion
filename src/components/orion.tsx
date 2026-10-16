import type { ReactNode } from "react";
import orion from "@/assets/constelacao-orion.jpg.asset.json";

export function Orion({ className = "", animate = true, id = "o" }: { className?: string; animate?: boolean; id?: string }) {
  return (
    <img src={orion.url} alt="" aria-hidden="true" data-orion={id} width={440} height={605}
      className={`orion-image ${animate ? "orion-star" : ""} ${className}`} />
  );
}

export function Divider() {
  return (
    <div className="my-10 flex items-center gap-3 px-6" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <Orion className="h-9 w-6" animate={false} id="d" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export function SectionTitle({ label, title, sub }: { label?: string; title: string; sub?: ReactNode }) {
  return (
    <div className="mb-6 px-5 text-center">
      {label && <p className="font-serif-it text-lg text-gold">{label}</p>}
      <h2 className="text-gold-grad font-display text-2xl font-bold [text-wrap:balance]">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground [text-wrap:pretty]">{sub}</p>}
    </div>
  );
}
