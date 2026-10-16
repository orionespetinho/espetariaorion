import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, useRouterState, HeadContent, Scripts, type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Header, BottomNav, CartSheet } from "@/components/shell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-gold-grad font-display text-6xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Esta estrela não está no nosso céu.</p>
        <Link to="/" className="btn-gold mt-6">Voltar ao início</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-xl text-gold">Esta página não carregou</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold mt-6">Tentar novamente</button>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Espetaria Orion",
  slogan: "O sabor da brasa",
  servesCuisine: ["Espetos", "Churrasco"],
  telephone: "+55 34 99148-9663",
  address: { "@type": "PostalAddress", streetAddress: "Av. Araguari", addressLocality: "Uberlândia", addressRegion: "MG", addressCountry: "BR" },
  geo: { "@type": "GeoCoordinates", latitude: -18.9077595, longitude: -48.2776748 },
  acceptsReservations: true,
  paymentAccepted: "Cartão de crédito, Cartão de débito, NFC",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#070D1F" },
      { title: "Espetaria Orion — O sabor da brasa | Uberlândia/MG" },
      { name: "description", content: "Espetos na brasa, bebida gelada e música ao vivo em Uberlândia/MG." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/icon.svg" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const bare = path.startsWith("/plaquinha");
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {bare ? <Outlet /> : (<>
          <Header />
          <main className="mx-auto min-h-screen max-w-[480px] pb-[calc(80px+env(safe-area-inset-bottom))] pt-[calc(56px+env(safe-area-inset-top))]">
            <Outlet />
          </main>
          <BottomNav />
          <CartSheet />
        </>)}
      </CartProvider>
    </QueryClientProvider>
  );
}
