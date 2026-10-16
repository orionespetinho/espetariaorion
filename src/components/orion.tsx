const S: [number, number, number, string?][] = [
  [50, 14, 1.1], [30, 34, 2.0, "#FFB27A"], [70, 36, 1.5], [43, 72, 1.4], [50, 69, 1.5], [57, 66, 1.4],
  [35, 112, 1.4], [72, 104, 2.2, "#CFE3FF"], [49, 80, 0.9], [49.5, 87, 0.9], [50, 94, 1.0],
  [78, 30, 0.9], [84, 42, 0.9], [86, 54, 0.9], [83, 66, 0.9],
];
const L: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 5], [3, 4], [4, 5], [3, 6], [5, 7], [4, 8], [8, 9], [9, 10],
  [2, 11], [11, 12], [12, 13], [13, 14],
];

export function Orion({ className = "", animate = true, id = "o" }: { className?: string; animate?: boolean; id?: string }) {
  return (
    <svg viewBox="0 0 100 150" className={className} aria-hidden="true">
      <defs>
        <filter id={`g-${id}`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g stroke="#E5C158" strokeWidth="0.4" opacity="0.55" fill="none">
        {L.map(([a, b], i) => (
          <line key={i} x1={S[a][0]} y1={S[a][1]} x2={S[b][0]} y2={S[b][1]} pathLength={1}
            className={animate ? "orion-line" : ""} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
      <g filter={`url(#g-${id})`}>
        {S.map(([x, y, r, c], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={c ?? "#F2D98B"}
            className={animate ? "orion-star" : ""} style={{ animationDelay: `${(i % 5) * 0.7}s` }} />
        ))}
      </g>
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

export function SectionTitle({ label, title, sub }: { label?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6 px-5 text-center">
      {label && <p className="font-serif-it text-lg text-gold">{label}</p>}
      <h2 className="text-gold-grad font-display text-2xl font-bold [text-wrap:balance]">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground [text-wrap:pretty]">{sub}</p>}
    </div>
  );
}
