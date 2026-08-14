import { lines, linesH2, btn, stat, specs, sechead, note, hollow, drawing } from "../layout.mjs";
import { flow } from "../graphics.mjs";

const METHOD = [
  {
    n: "01",
    t: "Count at the point of acceptance",
    d: "Every accepted container is counted by the machine at the moment it is validated, by material stream. Rejected containers are not counted. This is a count of objects, not an estimate from volume.",
  },
  {
    n: "02",
    t: "Weigh at collection",
    d: "Each collection is weighed by stream when it leaves the site. That gives an actual mass, independent of the container count.",
  },
  {
    n: "03",
    t: "Reconcile the two",
    d: "Counted containers multiplied by the average container mass for that stream should agree with the weighed mass. Where they diverge, the weighed mass is authoritative and the average mass is corrected — not the other way round.",
  },
  {
    n: "04",
    t: "Report the weighed figure",
    d: "Published tonnage is weighed mass, not modelled mass. Contamination and moisture are part of the weighed figure until material is sorted at the processing centre, so the reported figure is conservative rather than flattering.",
  },
];

const EXCLUDED = [
  "No avoided-emissions figure is published without a stated methodology and a source. A CO₂e number is a calculation, not a measurement, and it inherits every assumption behind it.",
  "No claim is made about material that leaves our custody. We report what we recovered and sold, not what a reprocessor ultimately did with it.",
  "Containers rejected by the machine are excluded entirely, even though a depositor carried them in.",
];

export default {
  path: "/impact/",
  title: "Material recovery: what we measure and how — Green Exchange",
  description:
    "Tonnes of PET and aluminium recovered, counted per container at the machine, with the method and the exclusions stated.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:52rem">
      <p class="eyebrow rise" data-reveal>Impact</p>
      ${lines(["Material recovered,", "and how we know."], "display d-1")}
      <p class="lede rise" data-reveal>
        Impact here means tonnes of PET and aluminium that went back into material rather than to
        landfill, counted per container at the machine. Every figure below states its unit and the
        period it covers. Anything not yet measured shows as a dash rather than as a number.
      </p>
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "01",
    kicker: "Recovery to date",
    title: "Cumulative totals from machine telemetry.",
    lead: "A figure animates only once it has been measured and has a stated period — until then it is a dash.",
  })}
  <div class="cols cols--4" data-stagger>
    ${stat({ label: "Containers collected" })}
    ${stat({ label: "Material recovered" })}
    ${stat({ label: "Machines deployed" })}
    ${stat({ label: "Value returned to depositors" })}
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "02",
    kicker: "Market structure",
    title: "Where Egypt’s PET actually goes.",
    lead: "The gap this business addresses is not between consumption and recycling — it is between consumption and formal recovery. Informal collectors already recover a large share, and leaving them out of the picture would overstate the problem and misrepresent the market.",
  })}
  ${drawing(flow(), "Egypt PET material flow", "Structure only · magnitudes withheld")}
  <div class="streams rise" data-reveal style="margin-top:1.5rem">
    <div class="stream stream--pet">
      <div class="stream__bar"></div>
      <span class="mono">PET formally collected</span>
      <span class="display d-4">—</span>
      <span class="chip">no source</span>
    </div>
    <div class="stream stream--alu">
      <div class="stream__bar"></div>
      <span class="mono">PET informally collected</span>
      <span class="display d-4">—</span>
      <span class="chip">no source</span>
    </div>
    <div class="stream stream--unc">
      <div class="stream__bar"></div>
      <span class="mono">PET uncollected</span>
      <span class="display d-4">—</span>
      <span class="chip">no source</span>
    </div>
  </div>
  ${hollow(
    "Chart not drawn — no public source",
    "The structure of the flow is shown, but not the proportions. Drawing magnitudes without a public source for every band would produce a chart that reads as authoritative and is not. Each band needs a figure from the same study and the same year — mixing sources is how a flow chart ends up looking right and being wrong."
  )}
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "03",
    kicker: "Method",
    title: "How we calculate recovered tonnage.",
    lead: "Short version: we count containers, not bags. Tonnage is derived from counted containers and weighed collections, and the two are reconciled.",
  })}
  <div class="cols cols--2" data-stagger>
    ${METHOD.map(
      (m) => `
    <div class="panel rise" data-reveal>
      <span class="sechead__idx">${m.n}</span>
      <h3 class="display d-4" style="margin:0.75rem 0 0.9rem">${m.t}</h3>
      <p class="prose" style="margin:0;font-size:0.9375rem">${m.d}</p>
    </div>`
    ).join("")}
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "04",
    kicker: "Exclusions",
    title: "What is deliberately excluded.",
  })}
  <div class="stack stack--md" data-stagger>
    ${EXCLUDED.map((x) => note("Excluded", x)).join("")}
  </div>
</section>

<section class="cta">
  <div class="shell cta__inner">
    <div class="stack stack--md">
      <p class="eyebrow rise" data-reveal>Next</p>
      ${linesH2(["Measured at one site", "before it is claimed", "for any of them."], "display d-2")}
    </div>
    <div class="btn-row rise" data-reveal>
      ${btn("/pilot/", "Request a pilot")}
      ${btn("/investors/", "Investor access", "btn--ghost")}
    </div>
  </div>
</section>`,
};
