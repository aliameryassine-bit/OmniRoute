#!/usr/bin/env node
/**
 * Bundle dist/ into a single self-contained HTML file.
 *
 *   node bundle-artifact.mjs <out.html>
 *
 * Fonts become data URIs, CSS and JS are inlined, and the twelve pages are
 * stacked in one document behind a hash router so the whole site stays
 * explorable from one file — the form a hosted preview needs.
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "dist");
const OUT = process.argv[2] || join(ROOT, "preview.html");

const ROUTES = [
  ["/", "index.html"],
  ["/technology/", "technology/index.html"],
  ["/for-retailers/", "for-retailers/index.html"],
  ["/impact/", "impact/index.html"],
  ["/investors/", "investors/index.html"],
  ["/company/", "company/index.html"],
  ["/pilot/", "pilot/index.html"],
  ["/legal/privacy/", "legal/privacy/index.html"],
  ["/legal/cookies/", "legal/cookies/index.html"],
  ["/legal/terms/", "legal/terms/index.html"],
  ["/legal/investor-disclaimer/", "legal/investor-disclaimer/index.html"],
  ["/404.html", "404.html"],
];

const between = (html, open, close) => {
  const a = html.indexOf(open);
  const b = html.lastIndexOf(close);
  return a < 0 || b < 0 ? "" : html.slice(a + open.length, b);
};

/** Same-origin hrefs become hash routes; everything else is left alone. */
const rewriteLinks = (html) =>
  html
    .replace(/href="\/(?!\/)([^"#]*)"/g, (m, p) => `href="#/${p}"`)
    .replace(/href="#\/"/g, 'href="#/"')
    .replace(/href="#(pilot|dataroom)"/g, 'href="#$1"');

async function main() {
  // CSS with fonts embedded.
  let css = await readFile(join(DIST, "assets/css/site.css"), "utf8");
  for (const file of await readdir(join(DIST, "assets/fonts"))) {
    const b64 = (await readFile(join(DIST, "assets/fonts", file))).toString("base64");
    css = css.replaceAll(`../fonts/${file}`, `data:font/woff2;base64,${b64}`);
  }
  const js = await readFile(join(DIST, "assets/js/site.js"), "utf8");

  const home = await readFile(join(DIST, "index.html"), "utf8");
  const nav = between(home, "<body", "<main").replace(/^[^>]*>/, "");
  const footer = between(home, "</main>", "<script");

  const pages = [];
  for (const [route, file] of ROUTES) {
    const html = await readFile(join(DIST, file), "utf8");
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "Green Exchange";
    pages.push(
      `<div class="route" data-route="${route}" data-title="${title}" hidden>${between(html, '<main id="main">', "</main>")}</div>`
    );
  }

  const doc = `<title>Green Exchange</title>
<style>${css}</style>
<script>
/* Same contract as the real site's head script: the hidden start states only
   exist while data-anim is set, and a failsafe clears it if the motion script
   never boots. The host owns data-theme here, so this does not touch it. */
(function () {
  var r = document.documentElement;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  r.setAttribute("data-anim", "1");
  setTimeout(function () { if (!r.hasAttribute("data-booted")) r.removeAttribute("data-anim"); }, 3000);
})();
</script>
${rewriteLinks(nav)}
<main id="main">
${rewriteLinks(pages.join("\n"))}
</main>
${rewriteLinks(footer)}
<script>${js}</script>
<script>
/* Hash router. The published preview is one file, so the twelve pages live in
   one document and the nav swaps which one is shown. */
(function () {
  var routes = [].slice.call(document.querySelectorAll("[data-route]"));
  var links = [].slice.call(document.querySelectorAll(".nav__link, .menu__link"));

  function show(path) {
    var match = routes.filter(function (r) { return r.dataset.route === path; })[0]
      || routes.filter(function (r) { return r.dataset.route === "/404.html"; })[0]
      || routes[0];
    routes.forEach(function (r) { r.hidden = r !== match; });
    document.title = match.dataset.title;
    links.forEach(function (a) {
      var href = (a.getAttribute("href") || "").replace(/^#/, "");
      if (href === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (window.GX) window.GX.refresh(match);
    window.scrollTo(0, 0);
  }

  function fromHash() {
    var h = location.hash.slice(1);
    return h && h.charAt(0) === "/" ? h : "/";
  }
  window.addEventListener("hashchange", function () { show(fromHash()); });
  show(fromHash());

  /* The bundled site.js intercepts clicks to run its page-transition curtain;
     inside one document that would navigate away, so hash links opt out here in
     the capture phase. That also bypasses the menu's own close-on-click, so
     close it directly. */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#/"]');
    if (!a) return;
    ev.stopPropagation();
    ev.preventDefault();
    var menu = document.querySelector("[data-menu]");
    if (menu && menu.dataset.open === "true") {
      menu.dataset.open = "false";
      document.body.style.overflow = "";
      var opener = document.querySelector("[data-menu-open]");
      if (opener) opener.setAttribute("aria-expanded", "false");
    }
    location.hash = a.getAttribute("href").slice(1);
  }, true);
})();
</script>`;

  await writeFile(OUT, doc, "utf8");
  process.stdout.write(`  ${OUT}  ${(Buffer.byteLength(doc) / 1024).toFixed(0)} kB\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
