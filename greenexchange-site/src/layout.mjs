/**
 * Page shell and shared components.
 *
 * Every page is assembled from these so the nav, the footer, the spec-row
 * vocabulary and the head are identical everywhere. Content strings are taken
 * verbatim from the previous build — the words were carefully written and this
 * is a redesign, not a rewrite.
 */
import { glyph, arrow } from "./graphics.mjs";

export const SITE = "Green Exchange";
export const ORIGIN = "https://greenexchange.example";

export const NAV = [
  { href: "/technology/", label: "Technology" },
  { href: "/for-retailers/", label: "For Retailers" },
  { href: "/impact/", label: "Impact" },
  { href: "/investors/", label: "Investors" },
  { href: "/company/", label: "Company" },
];

/** HTML-escape for any string that lands in markup. */
export const e = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ---------------------------------------------------------------- pieces -- */

/** Display heading split into masked lines that rise on reveal. */
export const lines = (arr, cls = "display d-1") =>
  `<h1 class="${cls}" data-reveal>${arr
    .map((l) => `<span class="reveal-line"><span>${l}</span></span>`)
    .join("")}</h1>`;

export const linesH2 = (arr, cls = "display d-2") =>
  `<h2 class="${cls}" data-reveal>${arr
    .map((l) => `<span class="reveal-line"><span>${l}</span></span>`)
    .join("")}</h2>`;

export const btn = (href, label, variant = "") =>
  `<a class="btn ${variant}" href="${href}" data-magnetic><span class="btn__label">${label}</span>${arrow}</a>`;

/**
 * A datasheet row: label, dotted leader, value, state chip.
 * `state` is one of measured | pending | placeholder | "no source".
 */
export const spec = ({ label, value = "—", unit = "", state = "pending", note = "" }) => {
  const pending = state !== "measured";
  return `<div class="spec" data-spec>
    <div class="spec__label"><span>${label}</span><span class="spec__leader" aria-hidden="true"></span></div>
    <div class="spec__value${pending ? " spec__value--pending" : ""}">${value}</div>
    <div class="spec__unit">${unit ? `${unit} · ` : ""}<span class="chip${state === "measured" ? " chip--live" : ""}">${state}</span>${note ? ` ${note}` : ""}</div>
  </div>`;
};

export const specs = (rows) => `<div class="specs">${rows.map(spec).join("")}</div>`;

export const stat = ({ value = "—", label, foot = "not yet measured", pending = true }) =>
  `<div class="stat rise" data-reveal>
    <div class="stat__value${pending ? " stat__value--pending" : ""}">${value}</div>
    <div class="stat__label">${label}</div>
    <div class="stat__foot">${foot}</div>
  </div>`;

export const sechead = ({ idx, kicker, title, lead = "", note = "" }) => `
<div class="sechead">
  <div class="sechead__meta rise" data-reveal>
    <span class="sechead__idx">${idx}</span>
    <span class="mono muted">${kicker}</span>
  </div>
  <div class="sechead__body">
    ${linesH2([title])}
    ${lead ? `<p class="lede rise" data-reveal>${lead}</p>` : ""}
    ${note ? `<p class="mono muted rise" data-reveal style="text-transform:none;letter-spacing:0.02em;font-size:0.75rem;max-width:60ch">${note}</p>` : ""}
  </div>
</div>`;

export const note = (mark, text) =>
  `<p class="note rise" data-reveal><span class="note__mark">${mark}</span><span>${text}</span></p>`;

/**
 * A stated absence — the page's way of saying "not published yet" without
 * looking unfinished. `level` follows the surrounding outline: 3 under a
 * section heading, 2 on a page that has none.
 */
export const hollow = (title, body, level = 3) => `
<div class="hollow rise" data-reveal>
  <h${level} class="hollow__title">${title}</h${level}>
  <p class="prose" style="margin:0">${body}</p>
</div>`;

export const drawing = (svg, left, right) => `
<figure class="drawing rise" data-reveal data-draw style="margin:0">
  ${svg}
  <figcaption class="drawing__caption"><span>${left}</span><span>${right}</span></figcaption>
</figure>`;

/* ------------------------------------------------------------- structure -- */

const navMarkup = (path) => `
<div class="wipe" data-wipe></div>
<header class="nav" data-nav>
  <div class="nav__inner">
    <a class="mark" href="/" aria-label="${SITE} — home">
      ${glyph("mark__glyph")}
      <span class="mark__word">Green Exchange</span>
    </a>
    <nav class="nav__links" aria-label="Primary">
      ${NAV.map(
        (n) =>
          `<a class="nav__link" href="${n.href}"${path.startsWith(n.href) ? ' aria-current="page"' : ""}>${n.label}</a>`
      ).join("")}
    </nav>
    <div class="nav__actions">
      ${btn("/investors/", "Investor access", "btn--ghost nav__cta")}
      ${btn("/pilot/", "Request a pilot", "nav__cta")}
      <button class="iconbtn" type="button" data-theme-toggle aria-label="Switch colour theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/><circle cx="12" cy="12" r="4"/></svg>
      </button>
      <button class="iconbtn menubtn" type="button" data-menu-open aria-label="Open menu" aria-expanded="false" aria-controls="gx-menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
      </button>
    </div>
  </div>
  <div class="nav__progress" data-progress aria-hidden="true"></div>
</header>

<div class="menu" id="gx-menu" data-menu hidden>
  <div class="menu__top">
    <a class="mark" href="/" aria-label="${SITE} — home">${glyph("mark__glyph")}<span class="mark__word">Green Exchange</span></a>
    <button class="iconbtn" type="button" data-menu-close aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>
  <ul class="menu__list">
    ${NAV.map(
      (n, i) =>
        `<li class="menu__item"><a class="menu__link" href="${n.href}" style="--i:${i}"><span class="menu__num">${String(i + 1).padStart(2, "0")}</span>${n.label}</a></li>`
    ).join("")}
  </ul>
  <div class="menu__foot">
    ${btn("/pilot/", "Request a pilot")}
    ${btn("/investors/", "Investor access", "btn--ghost")}
  </div>
</div>`;

const footerMarkup = () => `
<footer class="foot">
  <div class="shell">
    <div class="foot__grid">
      <div>
        <a class="mark" href="/" aria-label="${SITE} — home">${glyph("mark__glyph")}<span class="mark__word">Green Exchange</span></a>
        <p class="prose" style="margin-top:1rem;font-size:0.875rem;max-width:34ch">
          We build and operate reverse vending machines that take back PET and aluminium at the store entrance.
        </p>
      </div>
      <div>
        <h2 class="foot__title">Registered entity</h2>
        <div class="specs" style="border-top-color:transparent">
          ${spec({ label: "Registered entity name", state: "placeholder" })}
          ${spec({ label: "Company registration number", state: "placeholder" })}
          ${spec({ label: "VAT number", state: "placeholder" })}
          ${spec({ label: "Registered office address", state: "placeholder" })}
        </div>
      </div>
      <div>
        <h2 class="foot__title">Contact</h2>
        <div class="specs" style="border-top-color:transparent">
          ${spec({ label: "Contact email", state: "placeholder" })}
          ${spec({ label: "Contact phone", state: "placeholder" })}
        </div>
      </div>
      <div>
        <h2 class="foot__title">Legal</h2>
        <ul class="foot__list">
          <li><a href="/legal/privacy/">Privacy</a></li>
          <li><a href="/legal/cookies/">Cookies</a></li>
          <li><a href="/legal/terms/">Terms</a></li>
          <li><a href="/legal/investor-disclaimer/">Investor disclaimer</a></li>
        </ul>
        <h2 class="foot__title" style="margin-top:2rem">Language</h2>
        <div class="langs">
          <a class="lang" href="/" aria-current="true" lang="en">EN</a>
          <a class="lang" href="/ar/" lang="ar">ع</a>
          <a class="lang" href="/ro/" lang="ro">RO</a>
        </div>
      </div>
    </div>
    <div class="foot__bottom">
      <span>© <span data-year>2026</span> Green Exchange — Registered in Romania. All rights reserved.</span>
      <span>Drawings are schematic · not to scale</span>
    </div>
  </div>
</footer>`;

const jsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: SITE,
        url: ORIGIN,
        availableLanguage: ["en", "ar", "ro"],
      },
      {
        "@type": "Product",
        "@id": `${ORIGIN}/#rvm`,
        name: "Green Exchange reverse vending machine",
        description:
          "A reverse vending machine that accepts used PET bottles and aluminium cans, identifies and validates each container, compacts and sorts it by material stream, and returns value to the depositor.",
        category: "Reverse vending machine",
        brand: { "@type": "Brand", name: SITE },
        manufacturer: { "@id": `${ORIGIN}/#organization` },
        material: ["PET", "Aluminium"],
      },
    ],
  });

/** Assemble a complete document. */
export const page = ({ path, title, description, body, bodyClass = "" }) => `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(title)}</title>
<meta name="description" content="${e(description)}">
<meta name="theme-color" content="#080b0a" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#eae7dc" media="(prefers-color-scheme: light)">
<link rel="canonical" href="${ORIGIN}${path}">
<link rel="alternate" hreflang="en" href="${ORIGIN}${path}">
<link rel="alternate" hreflang="ar" href="${ORIGIN}/ar${path}">
<link rel="alternate" hreflang="ro" href="${ORIGIN}/ro${path}">
<link rel="alternate" hreflang="x-default" href="${ORIGIN}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${e(title)}">
<meta property="og:description" content="${e(description)}">
<meta property="og:url" content="${ORIGIN}${path}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${e(title)}">
<meta name="twitter:description" content="${e(description)}">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/array-bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<script>(function(){var r=document.documentElement;try{var t=localStorage.getItem("gx-theme");if(t)r.setAttribute("data-theme",t)}catch(e){}
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){r.setAttribute("data-anim","1");
/* Failsafe: if the motion script never boots, drop the hidden start states. */
setTimeout(function(){if(!r.hasAttribute("data-booted"))r.removeAttribute("data-anim")},3000)}})();</script>
<script type="application/ld+json">${jsonLd()}</script>
<noscript><style>
/* The narrow-viewport menu needs JS to open, so without it the links come
   out of the overlay and wrap under the bar instead. */
.nav__inner{flex-wrap:wrap;height:auto;padding-block:0.75rem;gap:0.5rem 1rem}
.nav__links{display:flex;flex-wrap:wrap;margin-inline-start:0;order:3;width:100%}
.menubtn,[data-theme-toggle]{display:none}
</style></noscript>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to main content</a>
<div class="loader" data-loader>
  <div class="loader__inner">
    ${glyph("loader__glyph")}
    <div class="loader__bar" data-loader-bar></div>
    <div class="loader__count" data-loader-count>000</div>
  </div>
</div>
<div class="cursor" data-cursor aria-hidden="true"></div>
${navMarkup(path)}
<main id="main">
${body}
</main>
${footerMarkup()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
