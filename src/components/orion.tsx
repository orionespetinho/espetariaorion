import type { ReactNode } from "react";
import { orionEdges, orionStars } from "@/lib/orion-geometry";

export function Orion({ className = "", animate = true, id = "o" }: { className?: string; animate?: boolean; id?: string }) {
  return (
    <svg viewBox="0 0 440 605" width={440} height={605} aria-hidden="true" data-orion={id}
      className={`orion-drawing ${animate ? "orion-animated" : ""} ${className}`}>
      <g className="orion-connections" fill="none" strokeWidth="1.2" strokeLinecap="round">
        {orionEdges.map(([a, b]) => {
          const start = orionStars[a]; const end = orionStars[b];
          return <line key={`${a}-${b}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} pathLength={1} />;
        })}
      </g>
      {orionStars.map((star, index) => (
        <g key={index} className="orion-point">
          <circle className="orion-halo" cx={star.x} cy={star.y} r={star.r * 3} />
          <circle cx={star.x} cy={star.y} r={star.r} />
          <path className="orion-rays" d={`M${star.x - star.r * 4},${star.y}h${star.r * 8} M${star.x},${star.y - star.r * 4}v${star.r * 8}`} fill="none" strokeWidth="0.7" />
        </g>
      ))}
    </svg>
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
