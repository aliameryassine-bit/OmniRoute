#!/usr/bin/env node
/**
 * Static site generator for the Green Exchange site.
 *
 *   node build.mjs        → writes dist/
 *
 * No dependencies and no framework: the output is plain HTML, one stylesheet
 * and one script, which is what a deploy bundle for this site should be.
 */
import { mkdir, writeFile, readdir, copyFile, rm, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { page, ORIGIN } from "./src/layout.mjs";
import home from "./src/content/home.mjs";
import technology from "./src/content/technology.mjs";
import retailers from "./src/content/retailers.mjs";
import impact from "./src/content/impact.mjs";
import investors from "./src/content/investors.mjs";
import { company, pilot, legal, notFound } from "./src/content/misc.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, "dist");
const STATIC = join(ROOT, "static");

const PAGES = [home, technology, retailers, impact, investors, company, pilot, ...legal, notFound];

/** Path → the file it is written to. "/" becomes index.html, "/x/" becomes x/index.html. */
const outFile = (p) => (p.endsWith(".html") ? p.slice(1) : join(p.slice(1), "index.html"));

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    const dst = join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await copyFile(src, dst);
  }
}

function sitemap(pages) {
  const urls = pages
    .filter((p) => !p.path.endsWith(".html"))
    .map((p) => {
      const loc = `${ORIGIN}${p.path}`;
      const alts = ["en", "ar", "ro"]
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${l === "en" ? "" : "/" + l}${p.path}"/>`
        )
        .join("\n");
      return `  <url>\n    <loc>${loc}</loc>\n${alts}\n    <changefreq>monthly</changefreq>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await copyDir(STATIC, DIST);

  let bytes = 0;
  for (const p of PAGES) {
    const html = page(p);
    const target = join(DIST, outFile(p.path));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, "utf8");
    bytes += Buffer.byteLength(html);
    process.stdout.write(`  ${relative(DIST, target).padEnd(38)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB\n`);
  }

  await writeFile(join(DIST, "sitemap.xml"), sitemap(PAGES), "utf8");
  await writeFile(
    join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
    "utf8"
  );

  const css = await stat(join(DIST, "assets/css/site.css"));
  const js = await stat(join(DIST, "assets/js/site.js"));
  process.stdout.write(
    `\n  ${PAGES.length} pages · ${(bytes / 1024).toFixed(0)} kB html · ` +
      `${(css.size / 1024).toFixed(1)} kB css · ${(js.size / 1024).toFixed(1)} kB js\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
