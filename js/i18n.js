/* Suggest Page i18n — en / es / ro (embedded dictionaries, offline-safe) */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'sp-lang';
  var SUPPORTED = ['en', 'es', 'ro'];
  var DEFAULT = 'en';
  var listeners = [];
  var current = DEFAULT;

  var DICTS = {
    en: {
      "board.anonymous": "Anonymous",
      "board.aside": "Suggestion form + live Yes / Later / No board for your domain.",
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
      "home.faq.h2": "FAQ",
      "home.faq.q1": "When does setup start?",
      "home.faq.q2": "Do I keep the files?",
      "home.faq.q3": "How many status updates?",
      "home.faq.q4": "Is there a revision limit?",
      "home.faq.q5": "Checkout?",
      "home.faq.q6": "Where's the demo?",
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
      "nav.suggest": "Suggest",
      "nav.suggestions": "Suggestions",
      "status.approved": "Approved",
      "status.declined": "Declined",
      "status.done": "Done",
      "status.later": "Later",
      "status.pending": "Pending",
      "suggest.aside": "Suggestion form + live Yes / Later / No board for your domain.",
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
      "thanks.h1": "Thanks — you're in",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Payment received. We'll email <strong>steven@coloritcompany.com</strong> confirmation and start your suggestion page setup. Questions anytime at that same address.",
      "thanks.legal": "See <a href=\"/terms/\">Terms</a>, <a href=\"/privacy/\">Privacy</a>, and <a href=\"/refunds/\">Refunds</a>.",
      "theme.aria": "Color theme",
    },
    es: {
      "board.anonymous": "Anónimo",
      "board.aside": "Formulario de sugerencias + tablero en vivo Yes / Later / No para tu dominio.",
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
      "home.faq.h2": "Preguntas frecuentes",
      "home.faq.q1": "¿Cuándo empieza la configuración?",
      "home.faq.q2": "¿Me quedo con los archivos?",
      "home.faq.q3": "¿Cuántas actualizaciones de estado?",
      "home.faq.q4": "¿Hay límite de revisiones?",
      "home.faq.q5": "¿Checkout?",
      "home.faq.q6": "¿Dónde está la demo?",
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
      "nav.suggest": "Sugerir",
      "nav.suggestions": "Sugerencias",
      "status.approved": "Aprobado",
      "status.declined": "Rechazado",
      "status.done": "Hecho",
      "status.later": "Más tarde",
      "status.pending": "Pendiente",
      "suggest.aside": "Formulario de sugerencias + tablero en vivo Yes / Later / No para tu dominio.",
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
      "thanks.h1": "Gracias — ya estás dentro",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Pago recibido. Confirmaremos por correo a <strong>steven@coloritcompany.com</strong> y empezaremos a configurar tu página de sugerencias. Preguntas cuando quieras a esa misma dirección.",
      "thanks.legal": "Consulta <a href=\"/terms/\">Términos</a>, <a href=\"/privacy/\">Privacidad</a> y <a href=\"/refunds/\">Reembolsos</a>.",
      "theme.aria": "Tema de color",
    },
    ro: {
      "board.anonymous": "Anonim",
      "board.aside": "Formular de sugestii + board live Yes / Later / No pentru domeniul tău.",
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
      "home.faq.h2": "Întrebări frecvente",
      "home.faq.q1": "Când începe configurarea?",
      "home.faq.q2": "Păstrez fișierele?",
      "home.faq.q3": "Câte actualizări de status?",
      "home.faq.q4": "Există o limită de revizii?",
      "home.faq.q5": "Checkout?",
      "home.faq.q6": "Unde e demo-ul?",
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
      "nav.suggest": "Sugerează",
      "nav.suggestions": "Sugestii",
      "status.approved": "Aprobat",
      "status.declined": "Respins",
      "status.done": "Finalizat",
      "status.later": "Mai târziu",
      "status.pending": "În așteptare",
      "suggest.aside": "Formular de sugestii + board live Yes / Later / No pentru domeniul tău.",
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
      "thanks.h1": "Mulțumim — ești înăuntru",
      "thanks.kicker": "Color It Company · Checkout",
      "thanks.lede": "Plata a fost primită. Confirmăm pe e-mail la <strong>steven@coloritcompany.com</strong> și începem configurarea paginii tale de sugestii. Întrebări oricând la aceeași adresă.",
      "thanks.legal": "Vezi <a href=\"/terms/\">Termeni</a>, <a href=\"/privacy/\">Confidențialitate</a> și <a href=\"/refunds/\">Rambursări</a>.",
      "theme.aria": "Temă de culoare",
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
    paintLangButtons(scope);
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
