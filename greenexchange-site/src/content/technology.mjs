import { lines, linesH2, btn, spec, specs, sechead, note } from "../layout.mjs";
import { cutaway } from "../graphics.mjs";

const STEPS = [
  {
    n: "01",
    title: "Deposit",
    text: "The depositor feeds a single container into the intake. One at a time, upright or on its side — the machine indexes it onto the transport before anything else happens.",
    spec: "Accepted container sizes",
  },
  {
    n: "02",
    title: "Identify",
    text: "A barcode read establishes which product it is. In parallel, near-infrared sensing reads the polymer and an inductive sensor detects metal, so the machine knows the material even if the label is damaged.",
    spec: "First-pass recognition rate",
  },
  {
    n: "03",
    title: "Validate",
    text: "The read is checked against the register of deposit-bearing containers, and the container is checked for shape and emptiness. Anything unrecognised is handed straight back rather than swallowed.",
    spec: "Average deposit cycle per container",
  },
  {
    n: "04",
    title: "Return value",
    text: "Accepted containers are credited to the depositor at the machine — the reason they came. Value is redeemable in the store, which is what turns a return trip into a shopping trip.",
    spec: "Value returned per container",
  },
  {
    n: "05",
    title: "Sort by stream",
    text: "The container is diverted to its own path on the strength of the material read: PET one way, aluminium the other. Sorting happens here, before anything is crushed, because a compacted mixed mass cannot be separated.",
    spec: "Stream separation purity",
  },
  {
    n: "06",
    title: "Compact",
    text: "Each stream is compacted its own way. PET is perforated and flattened so it cannot be re-inflated and claimed twice; cans are pressed flat. This is what makes a collection worth sending a vehicle for.",
    spec: "Compaction ratio",
  },
  {
    n: "07",
    title: "Store",
    text: "Compacted material drops into a separate bin per stream, never a single mixed hopper. Fill level is monitored continuously, so a collection is scheduled against real volume rather than a calendar.",
    spec: "Container capacity before collection",
  },
  {
    n: "08",
    title: "Collect and report",
    text: "Green Exchange collects on a route driven by fill level. Every accepted container is already counted, so the site receives volumes by stream and machine availability without anyone tallying anything.",
    spec: "Servicing frequency",
  },
  {
    n: "09",
    title: "Bale and offtake",
    text: "Material is baled by stream at a processing centre, not in the store, then sold to a reprocessor. Separation quality upstream is what the bale is priced on.",
    spec: "Value per tonne of baled PET",
  },
];

export default {
  path: "/technology/",
  title: "How a reverse vending machine works, step by step — Green Exchange",
  description:
    "What happens between a depositor putting a bottle in and a reprocessor buying the material back — each step with the specification that governs it.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:52rem">
      <p class="eyebrow rise" data-reveal>Technology</p>
      ${lines(["One container,", "end to end."], "display d-1")}
      <p class="lede rise" data-reveal>
        What happens between a depositor putting a bottle in and a reprocessor buying the material
        back. Each step carries the specification that governs it.
      </p>
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  <div class="stepper" data-stepper>
    <div class="stepper__stage">
      <figure class="drawing rise" data-reveal data-draw style="margin:0">
        ${cutaway()}
        <figcaption class="drawing__caption">
          <span>Container path — cutaway section</span>
          <span>Schematic · section</span>
        </figcaption>
      </figure>
    </div>
    <div>
      ${STEPS.map(
        (s, i) => `
      <article class="step" data-step="${i + 1}"${i === 0 ? ' data-active="true"' : ""}>
        <div class="step__num">${s.n}</div>
        <div class="step__body">
          <h2 class="step__title">${s.title}</h2>
          <p class="step__text">${s.text}</p>
          <div class="specs" style="border-top-color:transparent">
            ${spec({ label: s.spec, state: "pending", unit: "source pending" })}
          </div>
        </div>
      </article>`
      ).join("")}
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "10",
    kicker: "Order of operations",
    title: "Why sorting comes before compaction.",
    lead: "The sequence is not a preference. Once two materials are pressed into one mass they cannot be separated again at any price a reprocessor will pay, so every decision the machine makes about material happens while the container is still a container.",
  })}
  <div class="cols cols--3" data-stagger>
    <div class="panel rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:0.9rem">Identify first</p>
      <p class="prose" style="margin:0;font-size:0.9375rem">Two independent reads — polymer by near-infrared, metal by induction — so a damaged label does not decide the outcome.</p>
    </div>
    <div class="panel rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:0.9rem">Divert second</p>
      <p class="prose" style="margin:0;font-size:0.9375rem">PET and aluminium take separate paths from the diverter onward, with a compactor and a bin on each.</p>
    </div>
    <div class="panel rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:0.9rem">Compact last</p>
      <p class="prose" style="margin:0;font-size:0.9375rem">PET is perforated so it cannot be re-inflated and claimed twice. Cans are pressed flat. Volume drops; stream purity does not.</p>
    </div>
  </div>
  ${note("Note", "Rejected containers are handed back rather than swallowed, and are never counted. A count that included them would overstate recovery on the first day of operation.")}
</section>

<section class="cta">
  <div class="shell cta__inner">
    <div class="stack stack--md">
      <p class="eyebrow rise" data-reveal>Next</p>
      ${linesH2(["A pilot is a single site,", "a defined review period,", "and a written assessment", "at the end of it."], "display d-2")}
    </div>
    <div class="btn-row rise" data-reveal>
      ${btn("/pilot/", "Request a pilot")}
      ${btn("/investors/", "Investor access", "btn--ghost")}
    </div>
  </div>
</section>`,
};
