/* Suggest Page i18n — en / es / ro / he / tr (embedded dictionaries, offline-safe) */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'sp-lang';
  var SUPPORTED = ['en', 'es', 'ro', 'he', 'tr'];
  var DEFAULT = 'en';
  var listeners = [];
  var current = DEFAULT;

  var DICTS = {
    en: {
      "board.anonymous": "Anonymous",
      "board.aside": "Suggestion form + live Yes / Later / No board for your domain.",
      "board.aside_buy": " Buy on <a href=\"/sell/\">/sell/</a>.",
      "board.band_motion": "In motion / shipped",
      "board.band_open": "Later + Pending",
      "board.cta_add": "Add a suggestion",
      "board.cta_home": "Home",
      "board.declined": "Declined",
      "board.empty": "No suggestions on the board yet. <a href=\"/suggest/\">Send one</a> — Later and Pending show up here.",
      "board.empty_motion": "No approved or done items yet.",
      "board.empty_open": "Nothing parked or waiting. <a href=\"/suggest/\">Add an idea</a>.",
      "board.error": "Couldn't load the board right now. Try again in a moment, or <a href=\"/suggest/\">send a suggestion</a> anyway.",
      "board.h1": "Suggestions",
      "board.kicker": "Site — Public board",
      "board.lede": "Public ideas board. Yes builds them; Later parks them here; No declines. Add yours on <a href=\"/suggest/\">/suggest/</a>.",
      "board.loading": "Loading suggestions…",
      "board.no_text": "(no text)",
      "board.status.approved": "Approved",
      "board.status.declined": "Declined",
      "board.status.done": "Done",
      "board.status.later": "Later",
      "board.status.pending": "Pending",
      "board.submitted": "Submitted ",
      "board.title": "Suggestions — Suggest Page",
      "board.updated": "Updated ",
      "home.board_build": "<strong>Board Build — $299 one-time (optional).</strong> Branded first page + form + board. Attach to either SKU.",
      "home.care.buy": "Buy Site Care — $39/mo",
      "home.care.h3": "Site Care",
      "home.care.li1": "Everything in Page Pack",
      "home.care.li2": "Monthly triage + status passes as needed (not hard-capped at 12/yr)",
      "home.care.li3": "Small page edits from Approved / Yes ideas (FAQ, roadmap, features-style)",
      "home.care.li4": "Cancel anytime via Stripe portal (once checkout is live)",
      "home.care.price": "$39 / month · one URL",
      "home.checkout_legal": "By buying you agree to the <a href=\"/terms/\">Terms</a>, <a href=\"/privacy/\">Privacy Policy</a>, and <a href=\"/refunds/\">Refunds</a>.",
      "home.demo": "Live demos: <a href=\"/suggest/\">suggestpage.com</a> · <a href=\"https://stevenphilley.com/suggest/\">stevenphilley.com</a> · <a href=\"https://panatau.com/suggest.html\">panatau.com</a>",
      "home.desc": "Buy a static suggestion page for your URL. Visitors send ideas; you mark Yes, Later, or No; the public board updates when the site republishes. Page Pack $39/yr or Site Care $39/mo.",
      "home.ex.board": "Board",
      "home.ex.demo.p": "Product demo on this domain.",
      "home.ex.form": "Suggest form",
      "home.ex.pan.p": "Client site using Suggest + Suggestions pages.",
      "home.ex.sp.p": "Personal site demo with public board.",
      "home.examples.h2": "Live examples",
      "home.examples.lede": "Same Suggest Page pattern on real sites — form in, Yes / Later / No board out.",
      "home.faq.a1": "Setup starts within 24h of payment. We'll email from steven@coloritcompany.com to ask for your URL/domain, brand name, and a one-line purpose, then provision.",
      "home.faq.a2": "Yes. Static files you can host on GitHub Pages (or similar). The public board is driven by <code>data.json</code>.",
      "home.faq.a3": "Page Pack includes up to 12 Yes / Later / No updates per year. Site Care is monthly triage plus small Approved edits — status passes as needed.",
      "home.faq.a4": "No formal revision rounds. Page Pack's 12/yr budget is for status updates; Site Care covers monthly triage and small edits from Yes ideas.",
      "home.faq.a5": "Use the Buy buttons above for Stripe Checkout. After payment you land on <code>/sell/thanks/</code>.",
      "home.faq.a6": "On this site: <a href=\"/suggest/\" style=\"color:var(--accent,#c8b48a)\">/suggest/</a> + <a href=\"/suggestions/\" style=\"color:var(--accent,#c8b48a)\">/suggestions/</a>. Also <a href=\"https://stevenphilley.com/suggest/\" style=\"color:var(--accent,#c8b48a)\">stevenphilley.com</a> and <a href=\"https://panatau.com/suggest.html\" style=\"color:var(--accent,#c8b48a)\">panatau.com</a>.",
      "home.faq.a7": "No. Domain registration and renewal are separate (~$10–20/yr typical). Suggest Page / Color It Company fees do not include buying a domain name. Details are on <a href=\"/sell/#domain\">/sell/#domain</a>.",
      "home.faq.a8": "Yes. We provide the records and help you point the domain or subdomain at the GitHub Pages site during setup. Connecting DNS is part of Page Pack / Site Care; registering and renewing the domain is your responsibility unless you already have one.",
      "home.faq.h2": "FAQ",
      "home.faq.q1": "When does setup start?",
      "home.faq.q2": "Do I keep the files?",
      "home.faq.q3": "How many status updates?",
      "home.faq.q4": "Is there a revision limit?",
      "home.faq.q5": "Checkout?",
      "home.faq.q6": "Where's the demo?",
      "home.faq.q7": "Does Page Pack include a domain?",
      "home.faq.q8": "Do you set up DNS?",
      "home.foot.questions": "Questions: <a href=\"mailto:steven@coloritcompany.com\">steven@coloritcompany.com</a> · Color It Company",
      "home.h1": "A static page with a live suggestion board",
      "home.how.1": "Someone submits an idea on your suggestion page.",
      "home.how.2": "You get the idea by email and decide Yes / Later / No in chat.",
      "home.how.3": "The public board updates from <code>data.json</code> when the site republishes. You keep the files (GitHub Pages–friendly).",
      "home.how.h2": "How it works",
      "home.kicker": "Color It Company · Offer",
      "home.lede": "Visitors send ideas for your site. You (or we) mark Yes, Later, or No. Approved ideas land on a public board when the site republishes — same pattern as the live demo on suggestpage.com.",
      "home.not.h2": "Site Care — not included",
      "home.not.li1": "Full redesigns, multi-page builds, or custom apps",
      "home.not.li2": "Continuous chat with visitors (v1 is board-on-republish only)",
      "home.not.li3": "Unlimited big content rewrites",
      "home.pack.buy": "Buy Page Pack — $39/yr",
      "home.pack.h3": "Page Pack",
      "home.pack.li1": "Static page + suggestion form (light branding)",
      "home.pack.li2": "Web3Forms → ops inbox",
      "home.pack.li3": "Public board driven by <code>suggestions/data.json</code>",
      "home.pack.li4": "Up to 12 Yes / Later / No status updates / year → board republish",
      "home.pack.li5": "You keep the files (GitHub Pages–friendly)",
      "home.pack.price": "$39 / year · one URL",
      "home.pricing.h2": "Pricing",
      "home.status.board": "Board",
      "home.status.h2": "Yes / Later / No",
      "home.status.later": "Later",
      "home.status.later.board": "Under consideration",
      "home.status.later.page": "No rewrite",
      "home.status.mark": "Mark",
      "home.status.no": "No",
      "home.status.no.board": "Declined / archived (optional note)",
      "home.status.no.page": "No rewrite",
      "home.status.page": "Live page",
      "home.status.yes": "Yes",
      "home.status.yes.board": "Approved / shipping",
      "home.status.yes.page": "May get a small edit on republish",
      "home.title": "Suggestion pages with a live Yes / Later / No board — Color It Company",
      "home.video.h2": "See it in action",
      "home.video.lede": "Landscape walkthroughs — homepage, board, and shipping Yes ideas.",
      "home.who.h2": "Who it's for",
      "home.who.p": "Indie sites, studios, and one-person projects that want a public idea inbox without a CMS. One URL, static files, no login wall for visitors.",
      "lang.aria": "Language",
      "legal.aup": "Acceptable Use",
      "legal.contact": "Contact",
      "legal.cookies": "Cookies",
      "legal.copyright": "Copyright",
      "legal.legal": "Legal",
      "legal.privacy": "Privacy",
      "legal.refunds": "Refunds",
      "legal.terms": "Terms",
      "nav.brand": "Suggest Page",
      "nav.home": "Home",
      "nav.offer": "Offer",
      "nav.sell": "Sell",
      "nav.suggest": "Suggest",
      "nav.suggestions": "Suggestions",
      "sell.domain.h2": "Domain setup",
      "sell.domain.p1": "<strong>You own the domain.</strong> Suggest Page / Color It Company fees do not include buying a domain name.",
      "sell.domain.p2": "<strong>Typical cost.</strong> Domains usually run about $10–20 per year at a normal registrar (GoDaddy, Namecheap, Google Domains successors, Cloudflare Registrar, and similar). Exact price depends on the TLD and the registrar.",
      "sell.domain.p3": "<strong>Hosting.</strong> The static suggestion page + board is meant for GitHub Pages (free) or similar static hosting. Hosting cost is separate from the domain and is typically $0 on GitHub Pages.",
      "sell.domain.p4": "<strong>What we do in setup.</strong> After payment we ask for your domain (or subdomain), brand name, and a one-line purpose. We provision the page files and give you DNS instructions (usually a CNAME or A records for GitHub Pages). Connecting DNS is part of setup for Page Pack / Site Care; registering and renewing the domain is your responsibility unless you already have one.",
      "sell.domain.p5": "<strong>Already have a domain?</strong> Prefer that — lower friction. Subdomains (for example <code>ideas.yoursite.com</code>) work fine.",
      "sell.domain.p6": "<strong>Not included.</strong> Paying registrar invoices, transferring domains between registrars, complex multi-domain setups, or custom non-static hosting.",
      "status.approved": "Approved",
      "status.declined": "Declined",
      "status.done": "Done",
      "status.later": "Later",
      "status.pending": "Pending",
      "suggest.aside": "Suggestion form + live Yes / Later / No board for your domain.",
      "suggest.aside_buy": " Buy on <a href=\"/sell/\">/sell/</a>.",
      "suggest.h1": "Suggest",
      "suggest.hint.optional": "(optional)",
      "suggest.hint.page": "(optional — which URL this is about)",
      "suggest.kicker": "Site — Suggestion box",
      "suggest.label.email": "Email",
      "suggest.label.name": "Name",
      "suggest.label.page": "Page",
      "suggest.label.suggestion": "Suggestion",
      "suggest.lede": "Send an idea. It emails Steven; each suggestion gets a Yes / Later / No on the public board. Name and email are optional. <a href=\"/suggestions/\" style=\"color:var(--ink,#e8e6e1);text-underline-offset:3px\">See the list</a> of Later / Pending ideas on the public board.",
      "suggest.note": "Goes to Steven via Web3Forms. No account required.",
      "suggest.ph.email": "you@example.com",
      "suggest.ph.name": "Your name",
      "suggest.ph.page": "/tools/temperature.html",
      "suggest.ph.suggestion": "What should the site have, change, or fix?",
      "suggest.submit": "Send suggestion",
      "suggest.thanks_body": "Suggestion sent. You can send another below anytime.",
      "suggest.thanks_label": "Thanks",
      "suggest.title": "Suggest — Suggest Page",
      "thanks.back": "Back to the offer",
      "thanks.demo": "See the demo form",
      "thanks.desc": "Thanks for buying Suggest Page. Setup starts within 24h of payment.",
      "thanks.h1": "Thanks — you're in",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Payment received. We'll email <strong>steven@coloritcompany.com</strong> confirmation and start your suggestion page setup. Questions anytime at that same address.",
      "thanks.legal": "See <a href=\"/terms/\">Terms</a>, <a href=\"/privacy/\">Privacy</a>, and <a href=\"/refunds/\">Refunds</a>.",
      "theme.aria": "Color theme",
    },
    es: {
      "board.anonymous": "Anónimo",
      "board.aside": "Formulario de sugerencias + tablero en vivo Yes / Later / No para tu dominio.",
      "board.aside_buy": " Cómpralo en <a href=\"/sell/\">/sell/</a>.",
      "board.band_motion": "En marcha / publicado",
      "board.band_open": "Later + Pending",
      "board.cta_add": "Añadir una sugerencia",
      "board.cta_home": "Inicio",
      "board.declined": "Rechazadas",
      "board.empty": "Aún no hay sugerencias en el tablero. <a href=\"/suggest/\">Envía una</a> — Later y Pending aparecen aquí.",
      "board.empty_motion": "Aún no hay elementos aprobados o terminados.",
      "board.empty_open": "Nada aparcado ni en espera. <a href=\"/suggest/\">Añade una idea</a>.",
      "board.error": "No se pudo cargar el tablero ahora. Prueba en un momento, o <a href=\"/suggest/\">envía una sugerencia</a> de todos modos.",
      "board.h1": "Sugerencias",
      "board.kicker": "Sitio — Tablero público",
      "board.lede": "Tablero público de ideas. Yes las construye; Later las aparca aquí; No las rechaza. Añade la tuya en <a href=\"/suggest/\">/suggest/</a>.",
      "board.loading": "Cargando sugerencias…",
      "board.no_text": "(sin texto)",
      "board.status.approved": "Aprobado",
      "board.status.declined": "Rechazado",
      "board.status.done": "Hecho",
      "board.status.later": "Más tarde",
      "board.status.pending": "Pendiente",
      "board.submitted": "Enviado ",
      "board.title": "Sugerencias — Suggest Page",
      "board.updated": "Actualizado ",
      "home.board_build": "<strong>Board Build — 299 USD una sola vez (opcional).</strong> Primera página con marca + formulario + tablero. Se añade a cualquiera de los SKU.",
      "home.care.buy": "Comprar Site Care — 39 USD/mes",
      "home.care.h3": "Site Care",
      "home.care.li1": "Todo lo de Page Pack",
      "home.care.li2": "Triaje mensual + pases de estado según se necesite (sin tope rígido de 12/año)",
      "home.care.li3": "Pequeñas ediciones de página a partir de ideas Approved / Yes (FAQ, roadmap, estilo features)",
      "home.care.li4": "Cancela cuando quieras vía el portal de Stripe (cuando el checkout esté activo)",
      "home.care.price": "39 USD / mes · una URL",
      "home.checkout_legal": "Al comprar aceptas los <a href=\"/terms/\">Términos</a>, la <a href=\"/privacy/\">Política de privacidad</a> y los <a href=\"/refunds/\">Reembolsos</a>.",
      "home.demo": "Demos en vivo: <a href=\"/suggest/\">suggestpage.com</a> · <a href=\"https://stevenphilley.com/suggest/\">stevenphilley.com</a> · <a href=\"https://panatau.com/suggest.html\">panatau.com</a>",
      "home.desc": "Compra una página de sugerencias estática para tu URL. Los visitantes envían ideas; tú marcas Yes, Later o No; el tablero público se actualiza al republicar el sitio. Page Pack 39 USD/año o Site Care 39 USD/mes.",
      "home.ex.board": "Tablero",
      "home.ex.demo.p": "Demo del producto en este dominio.",
      "home.ex.form": "Formulario",
      "home.ex.pan.p": "Sitio de cliente con páginas Suggest + Suggestions.",
      "home.ex.sp.p": "Demo de sitio personal con tablero público.",
      "home.examples.h2": "Ejemplos en vivo",
      "home.examples.lede": "El mismo patrón Suggest Page en sitios reales — formulario de entrada, tablero Yes / Later / No de salida.",
      "home.faq.a1": "La configuración empieza en las 24 h posteriores al pago. Escribiremos desde steven@coloritcompany.com para pedir tu URL/dominio, nombre de marca y un propósito en una línea, y luego aprovisionamos.",
      "home.faq.a2": "Sí. Archivos estáticos que puedes alojar en GitHub Pages (o similar). El tablero público se basa en <code>data.json</code>.",
      "home.faq.a3": "Page Pack incluye hasta 12 actualizaciones Yes / Later / No al año. Site Care es triaje mensual más pequeñas ediciones Approved — pases de estado según se necesite.",
      "home.faq.a4": "No hay rondas formales de revisión. El presupuesto de 12/año de Page Pack es para estados; Site Care cubre triaje mensual y pequeñas ediciones a partir de ideas Yes.",
      "home.faq.a5": "Usa los botones Comprar de arriba para Stripe Checkout. Tras el pago llegas a <code>/sell/thanks/</code>.",
      "home.faq.a6": "En este sitio: <a href=\"/suggest/\" style=\"color:var(--accent,#c8b48a)\">/suggest/</a> + <a href=\"/suggestions/\" style=\"color:var(--accent,#c8b48a)\">/suggestions/</a>. También <a href=\"https://stevenphilley.com/suggest/\" style=\"color:var(--accent,#c8b48a)\">stevenphilley.com</a> y <a href=\"https://panatau.com/suggest.html\" style=\"color:var(--accent,#c8b48a)\">panatau.com</a>.",
      "home.faq.a7": "No. El registro y la renovación del dominio son aparte (~10–20 USD/año típico). Las tarifas de Suggest Page / Color It Company no incluyen comprar un nombre de dominio. Detalles en <a href=\"/sell/#domain\">/sell/#domain</a>.",
      "home.faq.a8": "Sí. Damos los registros y te ayudamos a apuntar el dominio o subdominio al sitio de GitHub Pages durante la configuración. Conectar el DNS forma parte de Page Pack / Site Care; registrar y renovar el dominio es tu responsabilidad salvo que ya tengas uno.",
      "home.faq.h2": "Preguntas frecuentes",
      "home.faq.q1": "¿Cuándo empieza la configuración?",
      "home.faq.q2": "¿Me quedo con los archivos?",
      "home.faq.q3": "¿Cuántas actualizaciones de estado?",
      "home.faq.q4": "¿Hay límite de revisiones?",
      "home.faq.q5": "¿Checkout?",
      "home.faq.q6": "¿Dónde está la demo?",
      "home.faq.q7": "¿Page Pack incluye un dominio?",
      "home.faq.q8": "¿Configuráis el DNS?",
      "home.foot.questions": "Preguntas: <a href=\"mailto:steven@coloritcompany.com\">steven@coloritcompany.com</a> · Color It Company",
      "home.h1": "Una página estática con un tablero de sugerencias en vivo",
      "home.how.1": "Alguien envía una idea en tu página de sugerencias.",
      "home.how.2": "Recibes la idea por correo y decides Yes / Later / No en el chat.",
      "home.how.3": "El tablero público se actualiza desde <code>data.json</code> cuando el sitio se republica. Conservas los archivos (compatible con GitHub Pages).",
      "home.how.h2": "Cómo funciona",
      "home.kicker": "Color It Company · Oferta",
      "home.lede": "Los visitantes envían ideas para tu sitio. Tú (o nosotros) marcas Yes, Later o No. Las ideas aprobadas aparecen en un tablero público cuando el sitio se republica — el mismo patrón que la demo en vivo en suggestpage.com.",
      "home.not.h2": "Site Care — no incluido",
      "home.not.li1": "Rediseños completos, builds multipágina o apps a medida",
      "home.not.li2": "Chat continuo con visitantes (v1 solo actualiza el tablero al republicar)",
      "home.not.li3": "Reescrituras grandes de contenido ilimitadas",
      "home.pack.buy": "Comprar Page Pack — 39 USD/año",
      "home.pack.h3": "Page Pack",
      "home.pack.li1": "Página estática + formulario de sugerencias (marca ligera)",
      "home.pack.li2": "Web3Forms → bandeja de operaciones",
      "home.pack.li3": "Tablero público impulsado por <code>suggestions/data.json</code>",
      "home.pack.li4": "Hasta 12 actualizaciones de estado Yes / Later / No al año → republicación del tablero",
      "home.pack.li5": "Conservas los archivos (compatible con GitHub Pages)",
      "home.pack.price": "39 USD / año · una URL",
      "home.pricing.h2": "Precios",
      "home.status.board": "Tablero",
      "home.status.h2": "Yes / Later / No",
      "home.status.later": "Later",
      "home.status.later.board": "En consideración",
      "home.status.later.page": "Sin reescritura",
      "home.status.mark": "Marca",
      "home.status.no": "No",
      "home.status.no.board": "Rechazado / archivado (nota opcional)",
      "home.status.no.page": "Sin reescritura",
      "home.status.page": "Página en vivo",
      "home.status.yes": "Yes",
      "home.status.yes.board": "Aprobado / en camino",
      "home.status.yes.page": "Puede recibir una pequeña edición al republicar",
      "home.title": "Páginas de sugerencias con un tablero público Yes / Later / No — Color It Company",
      "home.video.h2": "Míralo en acción",
      "home.video.lede": "Un recorrido corto: del tablero de sugerencias a la página publicada.",
      "home.who.h2": "Para quién es",
      "home.who.p": "Sitios independientes, estudios y proyectos de una sola persona que quieren un buzón público de ideas sin CMS. Una URL, archivos estáticos, sin muro de login para visitantes.",
      "lang.aria": "Idioma",
      "legal.aup": "Uso aceptable",
      "legal.contact": "Contacto",
      "legal.cookies": "Cookies",
      "legal.copyright": "Copyright",
      "legal.legal": "Legal",
      "legal.privacy": "Privacidad",
      "legal.refunds": "Reembolsos",
      "legal.terms": "Términos",
      "nav.brand": "Suggest Page",
      "nav.home": "Inicio",
      "nav.offer": "Oferta",
      "nav.sell": "Vender",
      "nav.suggest": "Sugerir",
      "nav.suggestions": "Sugerencias",
      "sell.domain.h2": "Configuración del dominio",
      "sell.domain.p1": "<strong>El dominio es tuyo.</strong> Las tarifas de Suggest Page / Color It Company no incluyen comprar un nombre de dominio.",
      "sell.domain.p2": "<strong>Coste típico.</strong> Los dominios suelen costar unos 10–20 USD al año en un registrador normal (GoDaddy, Namecheap, sucesores de Google Domains, Cloudflare Registrar y similares). El precio exacto depende del TLD y del registrador.",
      "sell.domain.p3": "<strong>Alojamiento.</strong> La página de sugerencias + tablero está pensada para GitHub Pages (gratis) o un hosting estático similar. El alojamiento es aparte del dominio y suele ser 0 USD en GitHub Pages.",
      "sell.domain.p4": "<strong>Qué hacemos en la configuración.</strong> Tras el pago pedimos tu dominio (o subdominio), nombre de marca y un propósito en una línea. Provisionamos los archivos y te damos instrucciones DNS (normalmente un CNAME o registros A para GitHub Pages). Conectar el DNS forma parte de la configuración de Page Pack / Site Care; registrar y renovar el dominio es tu responsabilidad salvo que ya tengas uno.",
      "sell.domain.p5": "<strong>¿Ya tienes un dominio?</strong> Mejor — menos fricción. Los subdominios (por ejemplo <code>ideas.yoursite.com</code>) funcionan bien.",
      "sell.domain.p6": "<strong>No incluido.</strong> Pagar facturas del registrador, transferir dominios entre registradores, montajes complejos de varios dominios o hosting no estático a medida.",
      "status.approved": "Aprobado",
      "status.declined": "Rechazado",
      "status.done": "Hecho",
      "status.later": "Más tarde",
      "status.pending": "Pendiente",
      "suggest.aside": "Formulario de sugerencias + tablero en vivo Yes / Later / No para tu dominio.",
      "suggest.aside_buy": " Cómpralo en <a href=\"/sell/\">/sell/</a>.",
      "suggest.h1": "Sugerir",
      "suggest.hint.optional": "(opcional)",
      "suggest.hint.page": "(opcional — a qué URL se refiere)",
      "suggest.kicker": "Sitio — Buzón de sugerencias",
      "suggest.label.email": "Correo",
      "suggest.label.name": "Nombre",
      "suggest.label.page": "Página",
      "suggest.label.suggestion": "Sugerencia",
      "suggest.lede": "Envía una idea. Llega por correo a Steven; cada sugerencia recibe Yes / Later / No en el tablero público. Nombre y correo son opcionales. <a href=\"/suggestions/\" style=\"color:var(--ink,#e8e6e1);text-underline-offset:3px\">Ver la lista</a> de ideas Later / Pending en el tablero público.",
      "suggest.note": "Va a Steven vía Web3Forms. No hace falta cuenta.",
      "suggest.ph.email": "tu@ejemplo.com",
      "suggest.ph.name": "Tu nombre",
      "suggest.ph.page": "/tools/temperature.html",
      "suggest.ph.suggestion": "¿Qué debería tener, cambiar o corregir el sitio?",
      "suggest.submit": "Enviar sugerencia",
      "suggest.thanks_body": "Sugerencia enviada. Puedes enviar otra abajo cuando quieras.",
      "suggest.thanks_label": "Gracias",
      "suggest.title": "Sugerir — Suggest Page",
      "thanks.back": "Volver a la oferta",
      "thanks.demo": "Ver el formulario demo",
      "thanks.desc": "Gracias por comprar Suggest Page. La configuración empieza en las 24 h posteriores al pago.",
      "thanks.h1": "Gracias — ya estás dentro",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Pago recibido. Confirmaremos por correo a <strong>steven@coloritcompany.com</strong> y empezaremos a configurar tu página de sugerencias. Preguntas cuando quieras a esa misma dirección.",
      "thanks.legal": "Consulta <a href=\"/terms/\">Términos</a>, <a href=\"/privacy/\">Privacidad</a> y <a href=\"/refunds/\">Reembolsos</a>.",
      "theme.aria": "Tema de color",
    },
    ro: {
      "board.anonymous": "Anonim",
      "board.aside": "Formular de sugestii + board live Yes / Later / No pentru domeniul tău.",
      "board.aside_buy": " Cumpără pe <a href=\"/sell/\">/sell/</a>.",
      "board.band_motion": "În lucru / livrat",
      "board.band_open": "Later + Pending",
      "board.cta_add": "Adaugă o sugestie",
      "board.cta_home": "Acasă",
      "board.declined": "Respinse",
      "board.empty": "Încă nu sunt sugestii pe board. <a href=\"/suggest/\">Trimite una</a> — Later și Pending apar aici.",
      "board.empty_motion": "Încă nu există elemente aprobate sau finalizate.",
      "board.empty_open": "Nimic parcat sau în așteptare. <a href=\"/suggest/\">Adaugă o idee</a>.",
      "board.error": "Nu am putut încărca board-ul acum. Încearcă din nou în curând sau <a href=\"/suggest/\">trimite o sugestie</a> oricum.",
      "board.h1": "Sugestii",
      "board.kicker": "Site — Board public",
      "board.lede": "Board public de idei. Yes le construiește; Later le parchează aici; No le respinge. Adaugă a ta pe <a href=\"/suggest/\">/suggest/</a>.",
      "board.loading": "Se încarcă sugestiile…",
      "board.no_text": "(fără text)",
      "board.status.approved": "Aprobat",
      "board.status.declined": "Respins",
      "board.status.done": "Finalizat",
      "board.status.later": "Mai târziu",
      "board.status.pending": "În așteptare",
      "board.submitted": "Trimis ",
      "board.title": "Sugestii — Suggest Page",
      "board.updated": "Actualizat ",
      "home.board_build": "<strong>Board Build — 299 USD o singură dată (opțional).</strong> Prima pagină cu brand + formular + board. Se atașează oricărui SKU.",
      "home.care.buy": "Cumpără Site Care — 39 USD/lună",
      "home.care.h3": "Site Care",
      "home.care.li1": "Tot ce e în Page Pack",
      "home.care.li2": "Triage lunar + treceri de status după nevoie (fără plafon rigid de 12/an)",
      "home.care.li3": "Editări mici de pagină din idei Approved / Yes (FAQ, roadmap, stil features)",
      "home.care.li4": "Anulezi oricând prin portalul Stripe (odată ce checkout-ul e live)",
      "home.care.price": "39 USD / lună · un URL",
      "home.checkout_legal": "Prin cumpărare accepți <a href=\"/terms/\">Termenii</a>, <a href=\"/privacy/\">Politica de confidențialitate</a> și <a href=\"/refunds/\">Rambursările</a>.",
      "home.demo": "Demo-uri live: <a href=\"/suggest/\">suggestpage.com</a> · <a href=\"https://stevenphilley.com/suggest/\">stevenphilley.com</a> · <a href=\"https://panatau.com/suggest.html\">panatau.com</a>",
      "home.desc": "Cumpără o pagină statică de sugestii pentru URL-ul tău. Vizitatorii trimit idei; tu marchezi Yes, Later sau No; board-ul public se actualizează când site-ul se republică. Page Pack 39 USD/an sau Site Care 39 USD/lună.",
      "home.ex.board": "Board",
      "home.ex.demo.p": "Demo de produs pe acest domeniu.",
      "home.ex.form": "Formular",
      "home.ex.pan.p": "Site client cu pagini Suggest + Suggestions.",
      "home.ex.sp.p": "Demo de site personal cu board public.",
      "home.examples.h2": "Exemple live",
      "home.examples.lede": "Același tipar Suggest Page pe site-uri reale — formular la intrare, board Yes / Later / No la ieșire.",
      "home.faq.a1": "Configurarea începe în 24h de la plată. Scriem de la steven@coloritcompany.com pentru URL/domeniu, numele brandului și un scop pe o linie, apoi provisionăm.",
      "home.faq.a2": "Da. Fișiere statice pe care le poți găzdui pe GitHub Pages (sau similar). Board-ul public e alimentat de <code>data.json</code>.",
      "home.faq.a3": "Page Pack include până la 12 actualizări Yes / Later / No pe an. Site Care e triage lunar plus editări mici Approved — treceri de status după nevoie.",
      "home.faq.a4": "Nu există runde formale de revizie. Bugetul de 12/an al Page Pack e pentru status; Site Care acoperă triage lunar și editări mici din idei Yes.",
      "home.faq.a5": "Folosește butoanele Cumpără de mai sus pentru Stripe Checkout. După plată ajungi pe <code>/sell/thanks/</code>.",
      "home.faq.a6": "Pe acest site: <a href=\"/suggest/\" style=\"color:var(--accent,#c8b48a)\">/suggest/</a> + <a href=\"/suggestions/\" style=\"color:var(--accent,#c8b48a)\">/suggestions/</a>. De asemenea <a href=\"https://stevenphilley.com/suggest/\" style=\"color:var(--accent,#c8b48a)\">stevenphilley.com</a> și <a href=\"https://panatau.com/suggest.html\" style=\"color:var(--accent,#c8b48a)\">panatau.com</a>.",
      "home.faq.a7": "Nu. Înregistrarea și reînnoirea domeniului sunt separate (~10–20 USD/an tipic). Taxele Suggest Page / Color It Company nu includ cumpărarea unui nume de domeniu. Detalii pe <a href=\"/sell/#domain\">/sell/#domain</a>.",
      "home.faq.a8": "Da. Furnizăm înregistrările și te ajutăm să indici domeniul sau subdomeniul către site-ul GitHub Pages în timpul configurării. Conectarea DNS face parte din Page Pack / Site Care; înregistrarea și reînnoirea domeniului sunt responsabilitatea ta, dacă nu ai deja unul.",
      "home.faq.h2": "Întrebări frecvente",
      "home.faq.q1": "Când începe configurarea?",
      "home.faq.q2": "Păstrez fișierele?",
      "home.faq.q3": "Câte actualizări de status?",
      "home.faq.q4": "Există o limită de revizii?",
      "home.faq.q5": "Checkout?",
      "home.faq.q6": "Unde e demo-ul?",
      "home.faq.q7": "Page Pack include un domeniu?",
      "home.faq.q8": "Configurați DNS-ul?",
      "home.foot.questions": "Întrebări: <a href=\"mailto:steven@coloritcompany.com\">steven@coloritcompany.com</a> · Color It Company",
      "home.h1": "O pagină statică cu un board de sugestii live",
      "home.how.1": "Cineva trimite o idee pe pagina ta de sugestii.",
      "home.how.2": "Primești ideea pe e-mail și decizi Yes / Later / No în chat.",
      "home.how.3": "Board-ul public se actualizează din <code>data.json</code> când site-ul se republică. Păstrezi fișierele (compatibil GitHub Pages).",
      "home.how.h2": "Cum funcționează",
      "home.kicker": "Color It Company · Ofertă",
      "home.lede": "Vizitatorii trimit idei pentru site-ul tău. Tu (sau noi) marchezi Yes, Later sau No. Ideile aprobate apar pe un board public când site-ul se republică — același tipar ca demo-ul live de pe suggestpage.com.",
      "home.not.h2": "Site Care — nu este inclus",
      "home.not.li1": "Redesign-uri complete, build-uri multi-pagină sau aplicații custom",
      "home.not.li2": "Chat continuu cu vizitatorii (v1 actualizează board-ul doar la republicare)",
      "home.not.li3": "Rescrieri mari de conținut nelimitate",
      "home.pack.buy": "Cumpără Page Pack — 39 USD/an",
      "home.pack.h3": "Page Pack",
      "home.pack.li1": "Pagină statică + formular de sugestii (branding ușor)",
      "home.pack.li2": "Web3Forms → inbox operațiuni",
      "home.pack.li3": "Board public alimentat de <code>suggestions/data.json</code>",
      "home.pack.li4": "Până la 12 actualizări de status Yes / Later / No / an → republicare board",
      "home.pack.li5": "Păstrezi fișierele (compatibil GitHub Pages)",
      "home.pack.price": "39 USD / an · un URL",
      "home.pricing.h2": "Prețuri",
      "home.status.board": "Board",
      "home.status.h2": "Yes / Later / No",
      "home.status.later": "Later",
      "home.status.later.board": "În considerare",
      "home.status.later.page": "Fără rescriere",
      "home.status.mark": "Marcaj",
      "home.status.no": "No",
      "home.status.no.board": "Respins / arhivat (notă opțională)",
      "home.status.no.page": "Fără rescriere",
      "home.status.page": "Pagină live",
      "home.status.yes": "Yes",
      "home.status.yes.board": "Aprobat / în livrare",
      "home.status.yes.page": "Poate primi o editare mică la republicare",
      "home.title": "Pagini de sugestii cu un board public Yes / Later / No — Color It Company",
      "home.video.h2": "Vezi cum funcționează",
      "home.video.lede": "Un tur scurt: de la board-ul de sugestii la pagina publicată.",
      "home.who.h2": "Pentru cine este",
      "home.who.p": "Site-uri indie, studio-uri și proiecte de o singură persoană care vor un inbox public de idei fără CMS. Un URL, fișiere statice, fără login pentru vizitatori.",
      "lang.aria": "Limbă",
      "legal.aup": "Utilizare acceptabilă",
      "legal.contact": "Contact",
      "legal.cookies": "Cookie-uri",
      "legal.copyright": "Copyright",
      "legal.legal": "Legal",
      "legal.privacy": "Confidențialitate",
      "legal.refunds": "Rambursări",
      "legal.terms": "Termeni",
      "nav.brand": "Suggest Page",
      "nav.home": "Acasă",
      "nav.offer": "Ofertă",
      "nav.sell": "Vinde",
      "nav.suggest": "Sugerează",
      "nav.suggestions": "Sugestii",
      "sell.domain.h2": "Configurare domeniu",
      "sell.domain.p1": "<strong>Domeniul este al tău.</strong> Taxele Suggest Page / Color It Company nu includ cumpărarea unui nume de domeniu.",
      "sell.domain.p2": "<strong>Cost tipic.</strong> Domeniile costă de obicei circa 10–20 USD pe an la un registrar obișnuit (GoDaddy, Namecheap, succesorii Google Domains, Cloudflare Registrar și similare). Prețul exact depinde de TLD și de registrar.",
      "sell.domain.p3": "<strong>Găzduire.</strong> Pagina de sugestii + board e gândită pentru GitHub Pages (gratuit) sau hosting static similar. Costul de găzduire e separat de domeniu și e de obicei 0 USD pe GitHub Pages.",
      "sell.domain.p4": "<strong>Ce facem la configurare.</strong> După plată cerem domeniul (sau subdomeniul), numele brandului și un scop pe o linie. Provisionăm fișierele și îți dăm instrucțiuni DNS (de obicei un CNAME sau înregistrări A pentru GitHub Pages). Conectarea DNS face parte din configurarea Page Pack / Site Care; înregistrarea și reînnoirea domeniului sunt responsabilitatea ta, dacă nu ai deja unul.",
      "sell.domain.p5": "<strong>Ai deja un domeniu?</strong> Preferabil — mai puțină fricțiune. Subdomeniile (de exemplu <code>ideas.yoursite.com</code>) funcționează bine.",
      "sell.domain.p6": "<strong>Nu este inclus.</strong> Plata facturilor de registrar, transferul de domenii între registrari, setup-uri complexe multi-domeniu sau hosting personalizat non-static.",
      "status.approved": "Aprobat",
      "status.declined": "Respins",
      "status.done": "Finalizat",
      "status.later": "Mai târziu",
      "status.pending": "În așteptare",
      "suggest.aside": "Formular de sugestii + board live Yes / Later / No pentru domeniul tău.",
      "suggest.aside_buy": " Cumpără pe <a href=\"/sell/\">/sell/</a>.",
      "suggest.h1": "Sugerează",
      "suggest.hint.optional": "(opțional)",
      "suggest.hint.page": "(opțional — despre ce URL e vorba)",
      "suggest.kicker": "Site — Cutie de sugestii",
      "suggest.label.email": "E-mail",
      "suggest.label.name": "Nume",
      "suggest.label.page": "Pagină",
      "suggest.label.suggestion": "Sugestie",
      "suggest.lede": "Trimite o idee. Ajunge pe e-mail la Steven; fiecare sugestie primește Yes / Later / No pe board-ul public. Numele și e-mailul sunt opționale. <a href=\"/suggestions/\" style=\"color:var(--ink,#e8e6e1);text-underline-offset:3px\">Vezi lista</a> de idei Later / Pending pe board-ul public.",
      "suggest.note": "Ajunge la Steven prin Web3Forms. Nu e nevoie de cont.",
      "suggest.ph.email": "tu@exemplu.com",
      "suggest.ph.name": "Numele tău",
      "suggest.ph.page": "/tools/temperature.html",
      "suggest.ph.suggestion": "Ce ar trebui să aibă, schimbe sau repare site-ul?",
      "suggest.submit": "Trimite sugestia",
      "suggest.thanks_body": "Sugestia a fost trimisă. Poți trimite alta mai jos oricând.",
      "suggest.thanks_label": "Mulțumim",
      "suggest.title": "Sugerează — Suggest Page",
      "thanks.back": "Înapoi la ofertă",
      "thanks.demo": "Vezi formularul demo",
      "thanks.desc": "Mulțumim că ai cumpărat Suggest Page. Configurarea începe în 24h de la plată.",
      "thanks.h1": "Mulțumim — ești înăuntru",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Plata a fost primită. Confirmăm pe e-mail la <strong>steven@coloritcompany.com</strong> și începem configurarea paginii tale de sugestii. Întrebări oricând la aceeași adresă.",
      "thanks.legal": "Vezi <a href=\"/terms/\">Termeni</a>, <a href=\"/privacy/\">Confidențialitate</a> și <a href=\"/refunds/\">Rambursări</a>.",
      "theme.aria": "Temă de culoare",
    },
    he: {
      "board.anonymous": "אנונימי",
      "board.aside": "טופס הצעות + לוח Yes / Later / No חי לדומיין שלך.",
      "board.aside_buy": " קנו ב־<a href=\"/sell/\">/sell/</a>.",
      "board.band_motion": "בתנועה / פורסם",
      "board.band_open": "Later + Pending",
      "board.cta_add": "הוסף הצעה",
      "board.cta_home": "דף הבית",
      "board.declined": "נדחו",
      "board.empty": "עדיין אין הצעות בלוח. <a href=\"/suggest/\">שלח אחת</a> — Later ו־Pending מופיעים כאן.",
      "board.empty_motion": "עדיין אין פריטים שאושרו או הושלמו.",
      "board.empty_open": "אין דבר בממתין או בהמתנה. <a href=\"/suggest/\">הוסף רעיון</a>.",
      "board.error": "לא ניתן לטעון את הלוח כרגע. נסה שוב בעוד רגע, או <a href=\"/suggest/\">שלח הצעה</a> בכל מקרה.",
      "board.h1": "הצעות",
      "board.kicker": "אתר — לוח ציבורי",
      "board.lede": "לוח רעיונות ציבורי. Yes בונה אותם; Later ממתין כאן; No דוחה. הוסף את שלך ב־<a href=\"/suggest/\">/suggest/</a>.",
      "board.loading": "טוען הצעות…",
      "board.no_text": "(ללא טקסט)",
      "board.status.approved": "אושר",
      "board.status.declined": "נדחה",
      "board.status.done": "הושלם",
      "board.status.later": "מאוחר יותר",
      "board.status.pending": "ממתין",
      "board.submitted": "נשלח ",
      "board.title": "הצעות — Suggest Page",
      "board.updated": "עודכן ",
      "home.board_build": "<strong>Board Build — $299 חד־פעמי (אופציונלי).</strong> דף ראשון עם מיתוג + טופס + לוח. ניתן לצרף לכל אחד מה־SKU.",
      "home.care.buy": "קנה Site Care — $39/חודש",
      "home.care.h3": "Site Care",
      "home.care.li1": "הכול שב־Page Pack",
      "home.care.li2": "טריאז' חודשי + מעברי סטטוס לפי הצורך (ללא תקרה קשיחה של 12/שנה)",
      "home.care.li3": "עריכות קטנות בדף מרעיונות Approved / Yes (FAQ, מפת דרכים, סגנון features)",
      "home.care.li4": "ביטול בכל עת דרך פורטל Stripe (ברגע שה־checkout פעיל)",
      "home.care.price": "$39 / חודש · כתובת URL אחת",
      "home.checkout_legal": "ברכישה אתה מסכים ל־<a href=\"/terms/\">תנאים</a>, ל־<a href=\"/privacy/\">מדיניות הפרטיות</a> ול־<a href=\"/refunds/\">החזרים</a>.",
      "home.demo": "הדגמות חיות: <a href=\"/suggest/\">suggestpage.com</a> · <a href=\"https://stevenphilley.com/suggest/\">stevenphilley.com</a> · <a href=\"https://panatau.com/suggest.html\">panatau.com</a>",
      "home.desc": "קנה דף הצעות סטטי לכתובת ה־URL שלך. מבקרים שולחים רעיונות; אתה מסמן Yes, Later או No; הלוח הציבורי מתעדכן כשהאתר מתפרסם מחדש. Page Pack $39/שנה או Site Care $39/חודש.",
      "home.ex.board": "לוח",
      "home.ex.demo.p": "הדגמת מוצר בדומיין הזה.",
      "home.ex.form": "טופס הצעה",
      "home.ex.pan.p": "אתר לקוח עם דפי Suggest + Suggestions.",
      "home.ex.sp.p": "הדגמת אתר אישי עם לוח ציבורי.",
      "home.examples.h2": "דוגמאות חיות",
      "home.examples.lede": "אותו דפוס Suggest Page באתרים אמיתיים — טופס בכניסה, לוח Yes / Later / No ביציאה.",
      "home.faq.a1": "ההגדרה מתחילה תוך 24 שעות מהתשלום. נשלח מייל מ־steven@coloritcompany.com לבקש את ה־URL/דומיין, שם המותג ומטרה בשורה אחת, ואז נקים.",
      "home.faq.a2": "כן. קבצים סטטיים שניתן לארח ב־GitHub Pages (או דומה). הלוח הציבורי מונע על ידי <code>data.json</code>.",
      "home.faq.a3": "Page Pack כולל עד 12 עדכוני Yes / Later / No בשנה. Site Care הוא טריאז' חודשי ועריכות Approved קטנות — מעברי סטטוס לפי הצורך.",
      "home.faq.a4": "אין סבבי תיקונים רשמיים. תקציב ה־12/שנה של Page Pack מיועד לעדכוני סטטוס; Site Care מכסה טריאז' חודשי ועריכות קטנות מרעיונות Yes.",
      "home.faq.a5": "השתמש בכפתורי הקנייה למעלה ל־Stripe Checkout. לאחר התשלום תגיע ל־<code>/sell/thanks/</code>.",
      "home.faq.a6": "באתר הזה: <a href=\"/suggest/\" style=\"color:var(--accent,#c8b48a)\">/suggest/</a> + <a href=\"/suggestions/\" style=\"color:var(--accent,#c8b48a)\">/suggestions/</a>. גם <a href=\"https://stevenphilley.com/suggest/\" style=\"color:var(--accent,#c8b48a)\">stevenphilley.com</a> ו־<a href=\"https://panatau.com/suggest.html\" style=\"color:var(--accent,#c8b48a)\">panatau.com</a>.",
      "home.faq.a7": "לא. רישום וחידוש דומיין נפרדים (בדרך כלל כ־10–20 דולר לשנה). דמי Suggest Page / Color It Company אינם כוללים רכישת שם דומיין. פרטים ב־<a href=\"/sell/#domain\">/sell/#domain</a>.",
      "home.faq.a8": "כן. אנחנו מספקים את הרשומות ועוזרים לכוון את הדומיין או הסאב־דומיין לאתר GitHub Pages במהלך ההגדרה. חיבור DNS הוא חלק מ־Page Pack / Site Care; רישום וחידוש הדומיין הם באחריותך אלא אם כבר יש לך אחד.",
      "home.faq.h2": "שאלות נפוצות",
      "home.faq.q1": "מתי מתחילה ההגדרה?",
      "home.faq.q2": "האם הקבצים נשארים אצלי?",
      "home.faq.q3": "כמה עדכוני סטטוס?",
      "home.faq.q4": "יש מגבלת תיקונים?",
      "home.faq.q5": "Checkout?",
      "home.faq.q6": "איפה ההדגמה?",
      "home.faq.q7": "האם Page Pack כולל דומיין?",
      "home.faq.q8": "האם אתם מגדירים DNS?",
      "home.foot.questions": "שאלות: <a href=\"mailto:steven@coloritcompany.com\">steven@coloritcompany.com</a> · Color It Company",
      "home.h1": "דף סטטי עם לוח הצעות חי",
      "home.how.1": "מישהו שולח רעיון בדף ההצעות שלך.",
      "home.how.2": "אתה מקבל את הרעיון במייל ומחליט Yes / Later / No בצ'אט.",
      "home.how.3": "הלוח הציבורי מתעדכן מ־<code>data.json</code> כשהאתר מתפרסם מחדש. הקבצים נשארים אצלך (ידידותי ל־GitHub Pages).",
      "home.how.h2": "איך זה עובד",
      "home.kicker": "Color It Company · הצעה",
      "home.lede": "מבקרים שולחים רעיונות לאתר שלך. אתה (או אנחנו) מסמנים Yes, Later או No. רעיונות שאושרו מופיעים בלוח ציבורי כשהאתר מתפרסם מחדש — אותו דפוס כמו ההדגמה החיה ב־suggestpage.com.",
      "home.not.h2": "Site Care — לא כלול",
      "home.not.li1": "עיצוב מחדש מלא, בניית ריבוי דפים או אפליקציות מותאמות",
      "home.not.li2": "צ'אט רציף עם מבקרים (ב־v1 רק עדכון לוח בפרסום מחדש)",
      "home.not.li3": "שכתובים גדולים בלתי מוגבלים של תוכן",
      "home.pack.buy": "קנה Page Pack — $39/שנה",
      "home.pack.h3": "Page Pack",
      "home.pack.li1": "דף סטטי + טופס הצעות (מיתוג קל)",
      "home.pack.li2": "Web3Forms → תיבת ops",
      "home.pack.li3": "לוח ציבורי מונע על ידי <code>suggestions/data.json</code>",
      "home.pack.li4": "עד 12 עדכוני סטטוס Yes / Later / No / שנה → פרסום מחדש של הלוח",
      "home.pack.li5": "הקבצים נשארים אצלך (ידידותי ל־GitHub Pages)",
      "home.pack.price": "$39 / שנה · כתובת URL אחת",
      "home.pricing.h2": "תמחור",
      "home.status.board": "לוח",
      "home.status.h2": "Yes / Later / No",
      "home.status.later": "Later",
      "home.status.later.board": "בבחינה",
      "home.status.later.page": "ללא שכתוב",
      "home.status.mark": "סימון",
      "home.status.no": "No",
      "home.status.no.board": "נדחה / בארכיון (הערה אופציונלית)",
      "home.status.no.page": "ללא שכתוב",
      "home.status.page": "דף חי",
      "home.status.yes": "Yes",
      "home.status.yes.board": "אושר / בדרך",
      "home.status.yes.page": "עשוי לקבל עריכה קטנה בפרסום מחדש",
      "home.title": "דפי הצעות עם לוח Yes / Later / No חי — Color It Company",
      "home.video.h2": "תראו את זה בפעולה",
      "home.video.lede": "סיור קצר: מלוח ההצעות לדף המפורסם.",
      "home.who.h2": "למי זה מיועד",
      "home.who.p": "אתרים עצמאיים, סטודיואים ופרויקטים של אדם אחד שרוצים תיבת רעיונות ציבורית בלי CMS. כתובת URL אחת, קבצים סטטיים, בלי חומת התחברות למבקרים.",
      "lang.aria": "שפה",
      "legal.aup": "שימוש מקובל",
      "legal.contact": "יצירת קשר",
      "legal.cookies": "עוגיות",
      "legal.copyright": "זכויות יוצרים",
      "legal.legal": "משפטי",
      "legal.privacy": "פרטיות",
      "legal.refunds": "החזרים",
      "legal.terms": "תנאים",
      "nav.brand": "Suggest Page",
      "nav.home": "דף הבית",
      "nav.offer": "הצעה",
      "nav.sell": "מכירה",
      "nav.suggest": "הצע",
      "nav.suggestions": "הצעות",
      "sell.domain.h2": "הגדרת דומיין",
      "sell.domain.p1": "<strong>הדומיין שייך לך.</strong> דמי Suggest Page / Color It Company אינם כוללים רכישת שם דומיין.",
      "sell.domain.p2": "<strong>עלות טיפוסית.</strong> דומיינים עולים בדרך כלל כ־10–20 דולר לשנה אצל רשם רגיל (GoDaddy, Namecheap, ממשיכי Google Domains, Cloudflare Registrar וכדומה). המחיר המדויק תלוי ב־TLD וברשם.",
      "sell.domain.p3": "<strong>אירוח.</strong> דף ההצעות + הלוח מיועדים ל־GitHub Pages (חינם) או אירוח סטטי דומה. עלות האירוח נפרדת מהדומיין ובדרך כלל 0 דולר ב־GitHub Pages.",
      "sell.domain.p4": "<strong>מה אנחנו עושים בהגדרה.</strong> אחרי התשלום נבקש את הדומיין (או סאב־דומיין), שם המותג ומטרה בשורה אחת. נקים את קבצי הדף וניתן הוראות DNS (בדרך כלל CNAME או רשומות A ל־GitHub Pages). חיבור DNS הוא חלק מההגדרה של Page Pack / Site Care; רישום וחידוש הדומיין הם באחריותך אלא אם כבר יש לך אחד.",
      "sell.domain.p5": "<strong>כבר יש לך דומיין?</strong> עדיף — פחות חיכוך. סאב־דומיינים (למשל <code>ideas.yoursite.com</code>) עובדים מצוין.",
      "sell.domain.p6": "<strong>לא כלול.</strong> תשלום חשבוניות לרשם, העברת דומיינים בין רשמים, הגדרות מורכבות של כמה דומיינים, או אירוח מותאם שאינו סטטי.",
      "status.approved": "אושר",
      "status.declined": "נדחה",
      "status.done": "הושלם",
      "status.later": "מאוחר יותר",
      "status.pending": "ממתין",
      "suggest.aside": "טופס הצעות + לוח Yes / Later / No חי לדומיין שלך.",
      "suggest.aside_buy": " קנו ב־<a href=\"/sell/\">/sell/</a>.",
      "suggest.h1": "הצע",
      "suggest.hint.optional": "(אופציונלי)",
      "suggest.hint.page": "(אופציונלי — על איזו כתובת URL מדובר)",
      "suggest.kicker": "אתר — תיבת הצעות",
      "suggest.label.email": "אימייל",
      "suggest.label.name": "שם",
      "suggest.label.page": "דף",
      "suggest.label.suggestion": "הצעה",
      "suggest.lede": "שלח רעיון. זה נשלח במייל ל־Steven; כל הצעה מקבלת Yes / Later / No בלוח הציבורי. שם ואימייל אופציונליים. <a href=\"/suggestions/\" style=\"color:var(--ink,#e8e6e1);text-underline-offset:3px\">ראה את הרשימה</a> של רעיונות Later / Pending בלוח הציבורי.",
      "suggest.note": "מגיע ל־Steven דרך Web3Forms. אין צורך בחשבון.",
      "suggest.ph.email": "you@example.com",
      "suggest.ph.name": "השם שלך",
      "suggest.ph.page": "/tools/temperature.html",
      "suggest.ph.suggestion": "מה האתר צריך לכלול, לשנות או לתקן?",
      "suggest.submit": "שלח הצעה",
      "suggest.thanks_body": "ההצעה נשלחה. אפשר לשלוח עוד אחת למטה בכל עת.",
      "suggest.thanks_label": "תודה",
      "suggest.title": "הצע — Suggest Page",
      "thanks.back": "חזרה להצעה",
      "thanks.demo": "ראה את טופס ההדגמה",
      "thanks.desc": "תודה שקנית Suggest Page. ההגדרה מתחילה תוך 24 שעות מהתשלום.",
      "thanks.h1": "תודה — אתה בפנים",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "התשלום התקבל. נשלח אישור ל־<strong>steven@coloritcompany.com</strong> ונתחיל בהגדרת דף ההצעות שלך. שאלות בכל עת לאותה כתובת.",
      "thanks.legal": "ראה <a href=\"/terms/\">תנאים</a>, <a href=\"/privacy/\">פרטיות</a> ו־<a href=\"/refunds/\">החזרים</a>.",
      "theme.aria": "ערכת צבעים",
    },
    tr: {
      "board.anonymous": "Anonim",
      "board.aside": "Öneri formu + alan adınız için canlı Yes / Later / No panosu.",
      "board.aside_buy": " <a href=\"/sell/\">/sell/</a> üzerinden satın al.",
      "board.band_motion": "İlerliyor / yayında",
      "board.band_open": "Later + Pending",
      "board.cta_add": "Öneri ekle",
      "board.cta_home": "Ana sayfa",
      "board.declined": "Reddedilenler",
      "board.empty": "Panoda henüz öneri yok. <a href=\"/suggest/\">Bir tane gönder</a> — Later ve Pending burada görünür.",
      "board.empty_motion": "Henüz onaylanmış veya tamamlanmış öğe yok.",
      "board.empty_open": "Beklemede veya park edilmiş bir şey yok. <a href=\"/suggest/\">Bir fikir ekle</a>.",
      "board.error": "Pano şu an yüklenemedi. Biraz sonra tekrar dene veya yine de <a href=\"/suggest/\">bir öneri gönder</a>.",
      "board.h1": "Öneriler",
      "board.kicker": "Site — Genel pano",
      "board.lede": "Genel fikir panosu. Yes onları üretir; Later burada bekletir; No reddeder. Kendininkini <a href=\"/suggest/\">/suggest/</a> üzerinden ekle.",
      "board.loading": "Öneriler yükleniyor…",
      "board.no_text": "(metin yok)",
      "board.status.approved": "Onaylandı",
      "board.status.declined": "Reddedildi",
      "board.status.done": "Tamamlandı",
      "board.status.later": "Daha sonra",
      "board.status.pending": "Beklemede",
      "board.submitted": "Gönderildi ",
      "board.title": "Öneriler — Suggest Page",
      "board.updated": "Güncellendi ",
      "home.board_build": "<strong>Board Build — tek seferlik $299 (isteğe bağlı).</strong> Markalı ilk sayfa + form + pano. Herhangi bir SKU’ya eklenebilir.",
      "home.care.buy": "Site Care satın al — $39/ay",
      "home.care.h3": "Site Care",
      "home.care.li1": "Page Pack’teki her şey",
      "home.care.li2": "Aylık triyaj + gerektiğinde durum geçişleri (yılda 12 ile sabit üst sınır yok)",
      "home.care.li3": "Approved / Yes fikirlerinden küçük sayfa düzenlemeleri (SSS, yol haritası, features tarzı)",
      "home.care.li4": "Stripe portalından istediğin zaman iptal (checkout canlı olduğunda)",
      "home.care.price": "$39 / ay · bir URL",
      "home.checkout_legal": "Satın alarak <a href=\"/terms/\">Şartlar</a>, <a href=\"/privacy/\">Gizlilik Politikası</a> ve <a href=\"/refunds/\">İadeler</a>’i kabul etmiş olursun.",
      "home.demo": "Canlı demolar: <a href=\"/suggest/\">suggestpage.com</a> · <a href=\"https://stevenphilley.com/suggest/\">stevenphilley.com</a> · <a href=\"https://panatau.com/suggest.html\">panatau.com</a>",
      "home.desc": "URL’n için statik bir öneri sayfası satın al. Ziyaretçiler fikir gönderir; sen Yes, Later veya No işaretlersin; site yeniden yayımlandığında genel pano güncellenir. Page Pack $39/yıl veya Site Care $39/ay.",
      "home.ex.board": "Pano",
      "home.ex.demo.p": "Bu alanda ürün demosu.",
      "home.ex.form": "Öneri formu",
      "home.ex.pan.p": "Suggest + Suggestions sayfaları kullanan müşteri sitesi.",
      "home.ex.sp.p": "Genel panolu kişisel site demosu.",
      "home.examples.h2": "Canlı örnekler",
      "home.examples.lede": "Gerçek sitelerde aynı Suggest Page kalıbı — form girer, Yes / Later / No panosu çıkar.",
      "home.faq.a1": "Kurulum ödemeden sonraki 24 saat içinde başlar. steven@coloritcompany.com adresinden URL/alan adın, marka adın ve tek satırlık amacın için yazarız, sonra kurarız.",
      "home.faq.a2": "Evet. GitHub Pages (veya benzeri) üzerinde barındırabileceğin statik dosyalar. Genel pano <code>data.json</code> ile çalışır.",
      "home.faq.a3": "Page Pack yılda 12’ye kadar Yes / Later / No güncellemesi içerir. Site Care aylık triyaj artı küçük Approved düzenlemeleridir — durum geçişleri gerektiğinde.",
      "home.faq.a4": "Resmi revizyon turu yok. Page Pack’in yıllık 12’lik bütçesi durum güncellemeleri içindir; Site Care aylık triyajı ve Yes fikirlerinden küçük düzenlemeleri kapsar.",
      "home.faq.a5": "Stripe Checkout için yukarıdaki Satın Al düğmelerini kullan. Ödemeden sonra <code>/sell/thanks/</code> sayfasına gelirsin.",
      "home.faq.a6": "Bu sitede: <a href=\"/suggest/\" style=\"color:var(--accent,#c8b48a)\">/suggest/</a> + <a href=\"/suggestions/\" style=\"color:var(--accent,#c8b48a)\">/suggestions/</a>. Ayrıca <a href=\"https://stevenphilley.com/suggest/\" style=\"color:var(--accent,#c8b48a)\">stevenphilley.com</a> ve <a href=\"https://panatau.com/suggest.html\" style=\"color:var(--accent,#c8b48a)\">panatau.com</a>.",
      "home.faq.a7": "Hayır. Alan adı kaydı ve yenilemesi ayrıdır (tipik olarak yılda ~10–20 USD). Suggest Page / Color It Company ücretleri alan adı satın almayı içermez. Ayrıntılar <a href=\"/sell/#domain\">/sell/#domain</a> sayfasında.",
      "home.faq.a8": "Evet. Kayıtları sağlarız ve kurulum sırasında alan adını veya alt alan adını GitHub Pages sitesine yönlendirmenize yardımcı oluruz. DNS bağlantısı Page Pack / Site Care’in parçasıdır; alan adını kaydetmek ve yenilemek, zaten birine sahip değilseniz sizin sorumluluğunuzdadır.",
      "home.faq.h2": "SSS",
      "home.faq.q1": "Kurulum ne zaman başlar?",
      "home.faq.q2": "Dosyalar bende kalır mı?",
      "home.faq.q3": "Kaç durum güncellemesi?",
      "home.faq.q4": "Revizyon sınırı var mı?",
      "home.faq.q5": "Checkout?",
      "home.faq.q6": "Demo nerede?",
      "home.faq.q7": "Page Pack alan adı içerir mi?",
      "home.faq.q8": "DNS’i siz kuruyor musunuz?",
      "home.foot.questions": "Sorular: <a href=\"mailto:steven@coloritcompany.com\">steven@coloritcompany.com</a> · Color It Company",
      "home.h1": "Canlı öneri panosu olan statik bir sayfa",
      "home.how.1": "Birisi öneri sayfanda bir fikir gönderir.",
      "home.how.2": "Fikri e-posta ile alırsın ve sohbette Yes / Later / No kararını verirsin.",
      "home.how.3": "Genel pano, site yeniden yayımlandığında <code>data.json</code> üzerinden güncellenir. Dosyalar sende kalır (GitHub Pages uyumlu).",
      "home.how.h2": "Nasıl çalışır",
      "home.kicker": "Color It Company · Teklif",
      "home.lede": "Ziyaretçiler siten için fikir gönderir. Sen (veya biz) Yes, Later veya No işaretleriz. Onaylanan fikirler site yeniden yayımlandığında genel panoda görünür — suggestpage.com’daki canlı demoyla aynı kalıp.",
      "home.not.h2": "Site Care — dahil değil",
      "home.not.li1": "Tam yeniden tasarım, çok sayfalı yapılar veya özel uygulamalar",
      "home.not.li2": "Ziyaretçilerle sürekli sohbet (v1 yalnızca yeniden yayında pano günceller)",
      "home.not.li3": "Sınırsız büyük içerik yeniden yazımları",
      "home.pack.buy": "Page Pack satın al — $39/yıl",
      "home.pack.h3": "Page Pack",
      "home.pack.li1": "Statik sayfa + öneri formu (hafif markalama)",
      "home.pack.li2": "Web3Forms → operasyon gelen kutusu",
      "home.pack.li3": "<code>suggestions/data.json</code> ile çalışan genel pano",
      "home.pack.li4": "Yılda 12’ye kadar Yes / Later / No durum güncellemesi → pano yeniden yayını",
      "home.pack.li5": "Dosyalar sende kalır (GitHub Pages uyumlu)",
      "home.pack.price": "$39 / yıl · bir URL",
      "home.pricing.h2": "Fiyatlandırma",
      "home.status.board": "Pano",
      "home.status.h2": "Yes / Later / No",
      "home.status.later": "Later",
      "home.status.later.board": "Değerlendirmede",
      "home.status.later.page": "Yeniden yazım yok",
      "home.status.mark": "İşaret",
      "home.status.no": "No",
      "home.status.no.board": "Reddedildi / arşivlendi (isteğe bağlı not)",
      "home.status.no.page": "Yeniden yazım yok",
      "home.status.page": "Canlı sayfa",
      "home.status.yes": "Yes",
      "home.status.yes.board": "Onaylandı / yolda",
      "home.status.yes.page": "Yeniden yayında küçük bir düzenleme alabilir",
      "home.title": "Canlı Yes / Later / No panolu öneri sayfaları — Color It Company",
      "home.video.h2": "İşleyişi izle",
      "home.video.lede": "Kısa bir tur: öneri panosundan yayımlanan sayfaya.",
      "home.who.h2": "Kimler için",
      "home.who.p": "CMS olmadan genel bir fikir gelen kutusu isteyen indie siteler, stüdyolar ve tek kişilik projeler. Bir URL, statik dosyalar, ziyaretçiler için giriş duvarı yok.",
      "lang.aria": "Dil",
      "legal.aup": "Kabul edilebilir kullanım",
      "legal.contact": "İletişim",
      "legal.cookies": "Çerezler",
      "legal.copyright": "Telif hakkı",
      "legal.legal": "Yasal",
      "legal.privacy": "Gizlilik",
      "legal.refunds": "İadeler",
      "legal.terms": "Şartlar",
      "nav.brand": "Suggest Page",
      "nav.home": "Ana sayfa",
      "nav.offer": "Teklif",
      "nav.sell": "Satış",
      "nav.suggest": "Öner",
      "nav.suggestions": "Öneriler",
      "sell.domain.h2": "Alan adı kurulumu",
      "sell.domain.p1": "<strong>Alan adı senindir.</strong> Suggest Page / Color It Company ücretleri alan adı satın almayı içermez.",
      "sell.domain.p2": "<strong>Tipik maliyet.</strong> Alan adları normal bir kayıt şirketinde (GoDaddy, Namecheap, Google Domains halefleri, Cloudflare Registrar ve benzerleri) genellikle yılda yaklaşık 10–20 USD tutar. Tam fiyat TLD’ye ve kayıt şirketine bağlıdır.",
      "sell.domain.p3": "<strong>Barındırma.</strong> Statik öneri sayfası + pano GitHub Pages (ücretsiz) veya benzer statik barındırma içindir. Barındırma maliyeti alan adından ayrıdır ve GitHub Pages’te genellikle 0 USD’dir.",
      "sell.domain.p4": "<strong>Kurulumda ne yaparız.</strong> Ödemeden sonra alan adını (veya alt alan adını), marka adını ve tek satırlık amacı isteriz. Sayfa dosyalarını hazırlar ve DNS talimatları veririz (genellikle GitHub Pages için CNAME veya A kayıtları). DNS bağlantısı Page Pack / Site Care kurulumunun parçasıdır; alan adını kaydetmek ve yenilemek, zaten birine sahip değilseniz sizin sorumluluğunuzdadır.",
      "sell.domain.p5": "<strong>Zaten bir alan adın var mı?</strong> Tercih edilir — daha az sürtünme. Alt alan adları (örneğin <code>ideas.yoursite.com</code>) sorunsuz çalışır.",
      "sell.domain.p6": "<strong>Dahil değil.</strong> Kayıt şirketi faturalarını ödemek, alan adlarını kayıt şirketleri arasında aktarmak, karmaşık çoklu alan adı kurulumları veya özel statik olmayan barındırma.",
      "status.approved": "Onaylandı",
      "status.declined": "Reddedildi",
      "status.done": "Tamamlandı",
      "status.later": "Daha sonra",
      "status.pending": "Beklemede",
      "suggest.aside": "Öneri formu + alan adınız için canlı Yes / Later / No panosu.",
      "suggest.aside_buy": " <a href=\"/sell/\">/sell/</a> üzerinden satın al.",
      "suggest.h1": "Öner",
      "suggest.hint.optional": "(isteğe bağlı)",
      "suggest.hint.page": "(isteğe bağlı — hangi URL hakkında)",
      "suggest.kicker": "Site — Öneri kutusu",
      "suggest.label.email": "E-posta",
      "suggest.label.name": "Ad",
      "suggest.label.page": "Sayfa",
      "suggest.label.suggestion": "Öneri",
      "suggest.lede": "Bir fikir gönder. Steven’a e-posta gider; her öneri genel panoda Yes / Later / No alır. Ad ve e-posta isteğe bağlıdır. Genel panodaki Later / Pending fikirlerin <a href=\"/suggestions/\" style=\"color:var(--ink,#e8e6e1);text-underline-offset:3px\">listesine bak</a>.",
      "suggest.note": "Web3Forms ile Steven’a gider. Hesap gerekmez.",
      "suggest.ph.email": "sen@ornek.com",
      "suggest.ph.name": "Adın",
      "suggest.ph.page": "/tools/temperature.html",
      "suggest.ph.suggestion": "Sitenin neye sahip olması, değişmesi veya düzeltilmesi gerekir?",
      "suggest.submit": "Öneri gönder",
      "suggest.thanks_body": "Öneri gönderildi. İstediğin zaman aşağıdan bir tane daha gönderebilirsin.",
      "suggest.thanks_label": "Teşekkürler",
      "suggest.title": "Öner — Suggest Page",
      "thanks.back": "Teklife geri dön",
      "thanks.demo": "Demo formuna bak",
      "thanks.desc": "Suggest Page satın aldığın için teşekkürler. Kurulum ödemeden sonraki 24 saat içinde başlar.",
      "thanks.h1": "Teşekkürler — içindesin",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Ödeme alındı. <strong>steven@coloritcompany.com</strong> adresine onay e-postası göndereceğiz ve öneri sayfanın kurulumuna başlayacağız. Sorularını her zaman aynı adrese yazabilirsin.",
      "thanks.legal": "<a href=\"/terms/\">Şartlar</a>, <a href=\"/privacy/\">Gizlilik</a> ve <a href=\"/refunds/\">İadeler</a>’e bak.",
      "theme.aria": "Renk teması",
    },
  };


  function normalize(code) {
    if (!code) return null;
    code = String(code).toLowerCase().replace(/_/g, '-');
    var base = code.split('-')[0];
    if (SUPPORTED.indexOf(code) !== -1) return code;
    if (SUPPORTED.indexOf(base) !== -1) return base;
    return null;
  }

  function detect() {
    try {
      var params = new URLSearchParams(location.search);
      var q = normalize(params.get('lang'));
      if (q) return q;
    } catch (e) {}
    try {
      var stored = normalize(localStorage.getItem(STORAGE_KEY));
      if (stored) return stored;
    } catch (e) {}
    try {
      var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
      var fromNav = normalize(nav);
      if (fromNav) return fromNav;
    } catch (e) {}
    return DEFAULT;
  }

  function t(key) {
    var dict = DICTS[current] || DICTS[DEFAULT];
    if (dict && dict[key] != null) return dict[key];
    if (DICTS[DEFAULT] && DICTS[DEFAULT][key] != null) return DICTS[DEFAULT][key];
    return key;
  }

  function paintLangButtons(root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === current));
    }
  }

  var LEGAL_SLUGS = ['terms', 'privacy', 'aup', 'refunds', 'cookies', 'copyright', 'legal'];
  var LEGAL_HREF_RE = /^\/(?:(es|ro|he|tr)\/)?(terms|privacy|aup|refunds|cookies|copyright|legal)\/?$/i;

  function rewriteLegalHrefs(root) {
    var scope = root || document;
    var list = scope.querySelectorAll('a[href]');
    var i, a, href, path, m, slug, prefix;
    for (i = 0; i < list.length; i++) {
      a = list[i];
      href = a.getAttribute('href');
      if (!href) continue;
      if (/^(mailto:|tel:|https?:|\/\/)/i.test(href)) continue;
      if (/stripe\.com/i.test(href)) continue;
      path = href.split('#')[0].split('?')[0];
      m = path.match(LEGAL_HREF_RE);
      if (!m) continue;
      slug = m[2].toLowerCase();
      prefix = (current === 'en' ? '' : '/' + current);
      a.setAttribute('href', prefix + '/' + slug + '/');
    }
  }

  function apply(root) {
    var scope = root || document;
    var el, key, i, list;

    list = scope.querySelectorAll('[data-i18n]');
    for (i = 0; i < list.length; i++) {
      el = list[i];
      key = el.getAttribute('data-i18n');
      if (!key) continue;
      if (el.tagName === 'TITLE') {
        document.title = t(key);
        el.textContent = t(key);
      } else if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
        el.setAttribute('content', t(key));
      } else {
        el.textContent = t(key);
      }
    }

    list = scope.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < list.length; i++) {
      el = list[i];
      key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    }

    list = scope.querySelectorAll('[data-i18n-placeholder]');
    for (i = 0; i < list.length; i++) {
      el = list[i];
      key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    }

    list = scope.querySelectorAll('[data-i18n-aria]');
    for (i = 0; i < list.length; i++) {
      el = list[i];
      key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key));
    }

    list = scope.querySelectorAll('[data-i18n-title]');
    for (i = 0; i < list.length; i++) {
      el = list[i];
      key = el.getAttribute('data-i18n-title');
      if (!key) continue;
      if (el.tagName === 'TITLE') {
        document.title = t(key);
        el.textContent = t(key);
      } else {
        el.setAttribute('title', t(key));
      }
    }

    document.documentElement.lang = current;
    if (current === 'he') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
    paintLangButtons(scope);
    rewriteLegalHrefs(scope);
  }

  function setLang(code) {
    var next = normalize(code) || DEFAULT;
    if (next === current) {
      apply();
      return;
    }
    current = next;
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    apply();
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](current); } catch (e) {}
    }
  }

  function getLang() { return current; }

  function onChange(fn) {
    if (typeof fn === 'function') listeners.push(fn);
  }

  function bindClicks() {
    document.addEventListener('click', function (ev) {
      var btn = ev.target && ev.target.closest ? ev.target.closest('[data-set-lang]') : null;
      if (!btn) return;
      var code = btn.getAttribute('data-set-lang');
      if (code) {
        ev.preventDefault();
        setLang(code);
      }
    });
  }

  function boot() {
    current = detect();
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    apply();
    bindClicks();
  }

  global.SP_I18N = {
    t: t,
    setLang: setLang,
    getLang: getLang,
    apply: apply,
    rewriteLegalHrefs: rewriteLegalHrefs,
    onChange: onChange,
    DICTS: DICTS,
    SUPPORTED: SUPPORTED
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(typeof window !== 'undefined' ? window : this);
