# Espetariaorion

OBJETIVO Crie do zero um SITE + CARDÁPIO DIGITAL premium para a "Espetaria Orion — O sabor da brasa" (Uberlândia/MG), em português do Brasil (pt-BR), 100% focado em smartphone (mobile-first). No desktop, centralize o app em uma coluna de até 480px ou expanda com elegância. Tema astrológico encantado: céu noturno azul-marinho profundo, dourado e a CONSTELAÇÃO DE ORION como marca visual, aliado ao calor da brasa. Visual cinematográfico de agência premium, animações leves e sutis, nada de template genérico. O dono deve olhar e dizer "é isso".

REGRAS DE EXECUÇÃO (importante: poucos créditos disponíveis)

Entregue TUDO em uma única execução. NÃO faça perguntas: assuma os padrões indicados e liste as pendências no final.
Itens [PREENCHER] ou [CONFIRMAR]: implemente funcionando com o comportamento indicado, comente no código "// CONFIRMAR COM O DONO" e liste no final. NUNCA invente preços, depoimentos, avaliações, promoções, horários ou prêmios.
Seções sem dados devem ficar ocultas automaticamente (sem blocos vazios).
Use no máximo 12 imagens geradas (lista na Parte 5). Reaproveite imagens de categoria nos itens. Use as imagens anexadas pelo usuário (logo, foto do carrinho, arte do cardápio) quando existirem.
Prioridades: P1 = home, cardápio, carrinho com pedido pelo WhatsApp, reservas e eventos, tema astral. P2 = botão de instalar app (PWA só com manifest, SEM service worker), página /plaquinha. Se o orçamento apertar, corte P2 e avise.
══════ PARTE 1 — IDENTIDADE VISUAL ASTRAL ══════

Paleta (tokens em CSS variables):

Céu: #050914 (base), #070D1F, #0B1533; azul-marinho de apoio #12204A e #1A2D63
Dourado: #D4AF37, #E5C158, #F2D98B (claro); gradiente de títulos: #F2D98B → #D4AF37 → #B8902B
Texto: creme #F5EFE0; secundário #A8B2D1
Brasa (SÓ em detalhes: ícone de chama, brilho de hover, selo "Destaque"): #E8743B
Borda de card: rgba(229,193,88,0.28); card em vidro translúcido rgba(18,32,74,0.55)
Contraste AA em todo texto; texto sobre foto sempre com overlay em degradê azul-noite.
Tipografia (Google Fonts): títulos em Cinzel (600/700) com degradê dourado; rótulos pequenos em Cormorant Garamond itálico dourado; corpo em Inter.

Céu estrelado (leve, sem canvas pesado): pseudo-elemento position:fixed no fundo do app (não use background-attachment:fixed, não funciona no iOS) com camadas de radial-gradient formando pontos de estrela de 2 a 3 tamanhos, mais névoa azul sutil (radial-gradient #1A2D63 a 25% de opacidade). Cintilação suave em 2 camadas (opacity 0.4↔1, 4 a 7s, atrasos diferentes). Respeitar prefers-reduced-motion (desligar animações).

CONSTELAÇÃO DE ORION (desenhar em SVG inline, viewBox 0 0 100 150, linhas douradas finas stroke 0.4, opacity 0.55, e estrelas como círculos com glow dourado): Estrelas (x,y,raio): Meissa/cabeça (50,14,1.1) | Betelgeuse (30,34,2.0, tom #FFB27A) | Bellatrix (70,36,1.5) | Alnitak (43,72,1.4) | Alnilam (50,69,1.5) | Mintaka (57,66,1.4) | Saiph (35,112,1.4) | Rigel (72,104,2.2, tom azul-branco #CFE3FF) | espada: (49,80,0.9), (49.5,87,0.9), (50,94,1.0) | arco à direita: (78,30,0.9), (84,42,0.9), (86,54,0.9), (83,66,0.9). Linhas: Meissa–Betelgeuse; Meissa–Bellatrix; Betelgeuse–Alnitak; Bellatrix–Mintaka; Alnitak–Alnilam–Mintaka (cinturão); Alnitak–Saiph; Mintaka–Rigel; Alnilam–espada (3 pontos); Bellatrix–(78,30)–(84,42)–(86,54)–(83,66) (arco). Animação: as linhas se desenham uma vez ao carregar (stroke-dasharray, 2 a 3s), as estrelas pulsam levemente com atrasos diferentes. Uso: (1) grande no hero atrás do título, com leve parallax no scroll; (2) versão miniatura como ícone do logo e como divisor ornamental entre seções (linha dourada com a miniatura no centro); (3) no rodapé.

Detalhes: cantos 16–20px, borda fina dourada, sombras com brilho dourado sutil, ícones lucide em linha dourados, selo "Destaque" em brasa, brilho dourado de passagem (shimmer) apenas no título do hero.

══════ PARTE 2 — REGRAS ABSOLUTAS DE UX (mobile) ══════

NUNCA rolagem horizontal (página, categorias, carrosséis, grades de horário). Nada cortado ou escondido. Nenhuma barra de rolagem visível. Use grid/flex-wrap/min-w-0. Verifique em 320px.
Títulos e subtítulos SEMPRE centralizados nas seções, com text-wrap: balance (títulos) e pretty (subtítulos). Nunca palavra órfã sozinha, nunca quebrar palavra. Títulos curtos (até 2 linhas), subtítulos até 2 linhas.
Alvos de toque de 44px ou mais. Respeitar safe-area do iPhone.
Categorias do cardápio em GRADE DE 2 COLUNAS (ícone + nome), levando à seção com scroll suave. Sem barra horizontal de categorias. Ao rolar, barra fina fixa abaixo do header mostra a categoria atual (scroll-spy), com botão "Categorias" (bottom sheet) e busca. Nunca sobrepõe conteúdo.
Carrinho em bottom sheet de tela cheia (90% da altura), nunca painel lateral estreito, com rodapé fixo (total + botão de envio).
Navegação inferior fixa: Início, Cardápio, Reservar, Pedido (contador). Padding-bottom nas páginas para não esconder conteúdo.
Cards: largura total do container, botões nunca cortados, preço sempre visível.
Animações discretas (300 a 500ms), skeleton nas imagens, respeito a prefers-reduced-motion.
Fotos em TODOS os itens (reaproveitando imagens de categoria). Fallback elegante só se o arquivo realmente não existir: degradê azul-noite + miniatura da constelação.
══════ PARTE 3 — DADOS ══════

Todos os dados em arquivos separados (negocio e cardapio), editáveis, com preço como número formatado em R$ (Intl.NumberFormat pt-BR).

NEGÓCIO

Nome: Espetaria Orion | Slogan: "O sabor da brasa" | Tipo: espetaria / churrascaria, dentro de uma quadra esportiva
Logo: arquivo anexado (ORION em dourado com estrelas e brasa). Se não existir, wordmark "ORION" em Cinzel dourado com a miniatura da constelação.
WhatsApp e telefone: (34) 99148-9663 → wa.me/5534991489663 e tel:+5534991489663
Endereço: Av. Araguari, nº [CONFIRMAR], [BAIRRO CONFIRMAR], Uberlândia/MG | nome da quadra [CONFIRMAR]. Botão "Como chegar" → https://www.google.com/maps/search/?api=1&query=-18.9077595,-48.2776748
Instagram: [CONFIRMAR]
Serviços: Jantar, Entrega, Para viagem, Refeição no local [CONFIRMAR: no Google aparece como indisponível na visão geral e disponível em "Sobre"]. Se não for confirmado, ocultar a opção "Consumo no local" do checkout.
Horário: [CONFIRMAR]. Sem horário informado, NÃO calcule "aberto/fechado": mostre "Jantar · consulte os horários" com botão WhatsApp. Estrutura de horário por dia da semana pronta para preencher.
Pagamento: cartão de crédito, cartão de débito, pagamento por aproximação (NFC). Pix [CONFIRMAR]. Entrega: taxa "a combinar" (configurável).
Avaliação Google: nota 5,0 com 7 avaliações (conferido em 16/10/2026), exibida com a contagem real, botão "Ver avaliações no Google". SEM depoimentos.
Diferenciais verificados: Música ao vivo; Ambiente esportivo; Mesas na cobertura e mesas externas; Espaço privativo para eventos; Aceita reservas; Ambiente familiar e bom para crianças (fraldário); Wi-Fi gratuito; Bar no local; Estacionamento gratuito (no local e na rua); Acessibilidade (assento, banheiro, entrada e estacionamento); Todos são bem-vindos.
CARDÁPIO (nomes confirmados pela arte oficial; preços e variações [PREENCHER])

Destaque: Frango com Bacon
Carne Bovina (cortes e preços [PREENCHER])
Medalhão de Frango [PREENCHER]
Almôndegas [PREENCHER]
Coração de Galinha [PREENCHER]
Linguiça (tipos [PREENCHER])
Acompanhamentos [PREENCHER] | Porções [PREENCHER] | Bebidas e cervejas [PREENCHER] Regras: preço null → "Consulte" + botão "Perguntar no WhatsApp" (largura total); com preço, vira "Adicionar" automaticamente. Se uma categoria estiver sem lista de itens, crie nela UM item com o nome da categoria (ex.: "Espeto de Medalhão de Frango") com preço null. Não crie sabores, cortes ou combos além dos listados. Descrições curtas de 1 linha, apetitosas e fiéis.
══════ PARTE 4 — ESTRUTURA E FUNCIONALIDADES ══════

HOME (ordem):

Header fixo translúcido: miniatura da constelação + ORION, ícone de instalar app (P2) e carrinho.
HERO em tela cheia: céu estrelado, Orion grande e animada ao fundo, foto de espetos na brasa com fagulhas. Rótulo "Jantar sob as estrelas". Título "ESPETARIA ORION" (Cinzel dourado, "ORION" maior). Linha "O sabor da brasa". Subtítulo: "Espetos na brasa, bebida gelada e música ao vivo, para jantar em família e com amigos." Botões: "Ver cardápio" (dourado preenchido) e "Reservar mesa" (contorno). Selos em grade 2x2: Música ao vivo, Mesas na cobertura, Espaço para eventos, Wi-Fi grátis.
"Nossos espetos": grade 2 colunas com as categorias (Carne bovina, Medalhão de frango, Almôndegas, Coração de galinha, Linguiça) + card largo "Destaque: Frango com Bacon" com selo em brasa.
"Os astros da brasa": 4 itens em destaque (grade 2x2).
Acompanhamentos e bebidas (cards).
Combos: ocultar se vazio.
"Reservas e eventos": cartão de destaque com constelação, texto "Aniversário, resenha ou evento? Reserve sua mesa ou o espaço privativo." e botão.
"Um lugar para todos": foto real do carrinho (anexada) + lista dos diferenciais verificados com ícones.
Avaliações: nota, contagem real e botão do Google.
"Onde estamos": endereço, horário/consulte, botões Como chegar e WhatsApp, pagamento.
Rodapé com constelação, contatos, e "Site por NeuroDyne".
/cardapio: busca fixa, grade de categorias, barra de categoria atual, cards de item (foto 1:1, nome, descrição, tags, preço, botão). Tocar abre modal em tela cheia com foto, descrição, quantidade e observação ("ao ponto", "sem pimenta").

CARRINHO (WhatsApp): persistente (localStorage em try/catch), bottom sheet em tela cheia. Checkout curto: nome; tipo (Entrega / Retirada / Consumo no local*); endereço, bairro e referência se Entrega; pagamento (cartão, dinheiro, Pix*; troco se dinheiro); observações. Subtotal, taxa de entrega "a combinar" e total. Botão "Enviar pedido pelo WhatsApp" abre wa.me/5534991489663?text=... (encodeURIComponent): Novo pedido — Espetaria Orion

2x Espeto de Frango com Bacon — R$ valor (obs: ...) Subtotal: | Entrega: | Total: Cliente: | Tipo: | Endereço: | Pagamento: | Observações: Valide campos obrigatórios. Nunca envie pedido vazio. (*somente se confirmados.)
RESERVAS E EVENTOS (/reservar): nome, tipo (Mesa ou Evento no espaço privativo), pessoas (stepper − / +, de 1 a 60), data (próximos 60 dias, seletor nativo), horário em grade de 3 colunas que quebra linha [horários CONFIRMAR; padrão 18:00 às 23:00, de 30 em 30 min], ocasião (aniversário, confraternização, jogo/resenha, outro), observações. Enviar abre o WhatsApp com a mensagem pronta. Aviso: "Reserva sujeita à confirmação." Sem status falsos de disponibilidade.

P2 — INSTALAR APP: botão "Instalar aplicativo (opcional)" no header e cartão dispensável (14 dias). Manifest em pt-BR (name "Espetaria Orion", short_name "Orion", display standalone, theme_color #070D1F, ícones do logo). Android/Chrome: beforeinstallprompt. iPhone/Safari: bottom sheet com "Compartilhar → Adicionar à Tela de Início". Dentro do Instagram/WhatsApp: "Abra no navegador" + "Copiar link". SEM service worker. P2 — /plaquinha (A5/A4): moldura estrelada, logo, QR Code do site, "Escaneie e veja o cardápio", botão Imprimir.

SEO: title e description em pt-BR com cidade, Open Graph, lang pt-BR, JSON-LD Restaurant SEM aggregateRating e SEM reviews.

══════ PARTE 5 — IMAGENS (máximo 12) ══════

Estilo mestre: "Fotografia gastronômica cinematográfica e realista, close-up com profundidade de campo rasa, brasa e fagulhas alaranjadas em contraste com fundo azul-noite profundo desfocado e pontos de luz dourados (bokeh), fumaça sutil, brilho natural dos alimentos, aparência de foto profissional. Sem texto, sem logos de marcas, sem pessoas, sem mãos, sem exageros irreais." Formatos: hero 4:5 (celular); itens 1:1; ambiente 16:9. WebP, alt em pt-BR, loading lazy. Lista: hero-brasa (espetos variados na churrasqueira com brasa viva e fagulhas) | espeto-bovina | medalhao-frango | almondegas | coracao-galinha | linguica | frango-bacon (destaque) | acompanhamentos (farofa amarela, arroz, vinagrete, mandioca) | bebidas (cerveja gelada suada e copos, sem rótulo legível) | ambiente-mesas (mesas sob cobertura à noite, luzes quentes, sem pessoas) | evento-mesa (mesa grande posta para confraternização). Para a seção "Sobre": use a foto real anexada do carrinho. Se não houver anexo, use a imagem ambiente-mesas.

══════ PARTE 6 — ENTREGA ══════

Sem erros no console. Acessibilidade: HTML semântico, foco visível, aria-label nos botões de ícone, alt nas imagens.
Confira em 320, 360, 390 e 430px: nada rola na horizontal, títulos centralizados sem palavra órfã, nenhum botão cortado.
Garanta que o site é escuro azul-noite com dourado (não branco).
Ao final, entregue em poucas linhas: o que foi feito, o que foi cortado (P2) e a lista de [CONFIRMAR]/[PREENCHER] (endereço, horários, Instagram, preços, Pix, refeição no local).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://espetariaorion.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4344d08f-1379-49e4-a3aa-ef78ba79afdb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
