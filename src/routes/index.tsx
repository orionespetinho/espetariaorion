import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { Music, Umbrella, PartyPopper, Wifi, Flame, Star, MapPin, MessageCircle, Clock, CreditCard, Sparkles } from "lucide-react";
import hero from "@/assets/hero-brasa.jpg";
import ambiente from "@/assets/ambiente-mesas.jpg";
import { Orion, Divider, SectionTitle } from "@/components/orion";
import { Img } from "@/components/menu";
import { categorias, combos } from "@/data/cardapio";
import { negocio, waLink } from "@/data/negocio";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Espetaria Orion — Espetos na brasa em Uberlândia/MG" },
      { name: "description", content: "Espetos na brasa, bebida gelada e música ao vivo. Cardápio digital, pedidos e reservas pelo WhatsApp em Uberlândia." },
      { property: "og:title", content: "Espetaria Orion — O sabor da brasa" },
      { property: "og:description", content: "Jantar sob as estrelas em Uberlândia/MG: espetos, música ao vivo e espaço para eventos." },
    ],
  }),
  component: Home,
});

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const C = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Flame;
  return <C className={className} />;
};

function Home() {
  const orionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => { if (orionRef.current) orionRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const espetos = categorias.filter((c) => ["bovina", "medalhao", "almondegas", "coracao", "linguica"].includes(c.id));
  const destaque = categorias[0]!.itens[0]!;
  const astros = [destaque, ...categorias.slice(1, 4).map((c) => c.itens[0])].filter((x): x is NonNullable<typeof x> => !!x);
  const extras = categorias.filter((c) => ["acompanhamentos", "porcoes", "bebidas"].includes(c.id));
  const selos = [[Music, "Música ao vivo"], [Umbrella, "Mesas na cobertura"], [PartyPopper, "Espaço para eventos"], [Wifi, "Wi-Fi grátis"]] as const;
  const temHorario = Object.values(negocio.horarios).some(Boolean);

  return (
    <>
      <section className="relative -mt-[calc(56px+env(safe-area-inset-top))] flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-24 text-center">
        <img src={hero} alt="Espetos variados na churrasqueira com brasa viva e fagulhas" width={864} height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-0/80 via-sky-0/50 to-sky-0" />
        <div ref={orionRef} className="pointer-events-none absolute inset-x-0 top-10 flex justify-center">
          <Orion className="h-[58vh] max-h-[460px] opacity-90" id="hero" />
        </div>
        <div className="relative fade-up">
          <p className="font-serif-it text-xl text-gold-3">Jantar sob as estrelas</p>
          <h1 className="mt-2 font-display font-bold leading-none">
            <span className="text-gold-grad block text-xl tracking-[0.3em]">ESPETARIA</span>
            <span className="shimmer block text-6xl tracking-[0.12em]">ORION</span>
          </h1>
          <p className="mt-3 flex items-center justify-center gap-2 font-serif-it text-lg text-gold-2"><Flame className="h-4 w-4 text-ember" />O sabor da brasa</p>
          <p className="mx-auto mt-4 max-w-xs text-cream/90">Espetos na brasa, bebida gelada e música ao vivo, para jantar em família e com amigos.</p>
          <div className="mt-6 grid gap-3">
            <Link to="/cardapio" className="btn-gold">Ver cardápio</Link>
            <Link to="/reservar" className="btn-outline">Reservar mesa</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {selos.map(([I, t]) => (
              <div key={t} className="glass flex items-center gap-2 px-3 py-2 text-left text-xs"><I className="h-4 w-4 shrink-0 text-gold" />{t}</div>
            ))}
          </div>
        </div>
      </section>

      <Divider />
      <section>
        <SectionTitle label="Direto da brasa" title="Nossos espetos" />
        <div className="grid grid-cols-2 gap-3 px-4">
          {espetos.map((c) => (
            <Link key={c.id} to="/cardapio" hash={c.id} className="glass overflow-hidden">
              <Img src={c.img} alt={c.nome} className="aspect-square w-full" />
              <p className="flex min-h-11 items-center justify-center gap-1 px-2 py-2 text-center text-sm font-semibold"><Icon name={c.icone} className="h-4 w-4 shrink-0 text-gold" />{c.nome}</p>
            </Link>
          ))}
          <Link to="/cardapio" hash="destaque" className="glass relative col-span-2 overflow-hidden">
            <Img src={destaque.img} alt={destaque.nome} className="aspect-[16/9] w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-0 via-sky-0/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center">
              <span className="badge-ember"><Flame className="h-3 w-3" />Destaque</span>
              <p className="text-gold-grad mt-1 font-display text-xl font-bold">Frango com Bacon</p>
            </div>
          </Link>
        </div>
      </section>

      <Divider />
      <section>
        <SectionTitle label="Constelação de sabores" title="Os astros da brasa" />
        <div className="grid grid-cols-2 gap-3 px-4">
          {astros.map((i) => (
            <Link key={i.id} to="/cardapio" className="glass overflow-hidden">
              <Img src={i.img} alt={i.nome} className="aspect-square w-full" />
              <div className="p-2 text-center">
                <p className="text-sm font-semibold">{i.nome.replace("Espeto de ", "")}</p>
                <p className="text-xs text-gold">Consulte</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />
      <section>
        <SectionTitle title="Acompanhamentos e bebidas" sub="Para completar a mesa." />
        <div className="grid gap-3 px-4">
          {extras.map((c) => (
            <Link key={c.id} to="/cardapio" hash={c.id} className="glass flex items-center gap-3 p-3">
              <Img src={c.img} alt={c.nome} className="aspect-square w-16 shrink-0 rounded-xl" />
              <span className="font-display font-semibold">{c.nome}</span>
            </Link>
          ))}
        </div>
      </section>

      {combos.length > 0 && <section><SectionTitle title="Combos" /></section>}

      <Divider />
      <section className="px-4">
        <div className="glass relative overflow-hidden p-6 text-center">
          <Orion className="pointer-events-none absolute -right-6 -top-4 h-48 opacity-40" animate={false} id="r" />
          <p className="font-serif-it text-lg text-gold">Reservas e eventos</p>
          <h2 className="text-gold-grad font-display text-2xl font-bold">Sua noite sob as estrelas</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">Aniversário, resenha ou evento? Reserve sua mesa ou o espaço privativo.</p>
          <Link to="/reservar" className="btn-gold mt-5 w-full">Reservar agora</Link>
        </div>
      </section>

      <Divider />
      <section>
        <SectionTitle label="Nosso espaço" title="Um lugar para todos" />
        <div className="px-4">
          <Img src={ambiente} alt="Mesas sob cobertura à noite com luzes quentes ao lado da quadra" className="aspect-video w-full rounded-2xl border border-gold/30" />
          <ul className="mt-4 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
            {negocio.diferenciais.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <Divider />
      <section className="px-4 text-center">
        <SectionTitle title="Avaliações" />
        <div className="glass p-6">
          <p className="text-gold-grad font-display text-5xl font-bold">5,0</p>
          <div className="mt-1 flex justify-center gap-1 text-gold" aria-label="5 de 5 estrelas">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
          <p className="mt-2 text-sm text-muted-foreground">{negocio.avaliacao.total} avaliações no Google</p>
          <a href={negocio.googleUrl} target="_blank" rel="noreferrer" className="btn-outline mt-4 w-full">Ver avaliações no Google</a>
        </div>
      </section>

      <Divider />
      <section className="px-4">
        <SectionTitle title="Onde estamos" />
        <div className="glass space-y-4 p-5 text-sm">
          <p className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-gold" />{negocio.endereco}</p>
          <p className="flex gap-2"><Clock className="h-5 w-5 shrink-0 text-gold" />{temHorario ? "Veja os horários abaixo" : "Jantar · consulte os horários"}</p>
          <p className="flex gap-2"><CreditCard className="h-5 w-5 shrink-0 text-gold" />{negocio.pagamentos.join(" · ")}</p>
          <div className="grid gap-2">
            <a href={negocio.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold">Como chegar</a>
            <a href={waLink("Olá! Gostaria de saber os horários da Espetaria Orion.")} target="_blank" rel="noreferrer" className="btn-outline"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
