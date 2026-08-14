import { lines, linesH2, btn, spec, specs, stat, sechead, drawing, note } from "../layout.mjs";
import { elevation } from "../graphics.mjs";

export default {
  path: "/",
  title: "Green Exchange",
  description:
    "Reverse vending machines for PET bottles and aluminium cans, built and operated by Green Exchange.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="hero__grid">
      <div class="hero__copy">
        <p class="eyebrow rise" data-reveal>Deposit return infrastructure · Egypt &amp; Romania</p>
        ${lines(["Take back PET", "and aluminium at", "the store entrance."])}
        <p class="lede rise" data-reveal>
          Green Exchange builds and operates reverse vending machines that accept used PET
          bottles and aluminium cans and return value to the depositor. We install, service and
          report. Your staff do not touch the machine.
        </p>
        <div class="btn-row rise" data-reveal>
          ${btn("/pilot/", "Request a pilot")}
          ${btn("/investors/", "Investor access", "btn--ghost")}
        </div>
      </div>
      ${drawing(elevation(), "Front elevation", "Schematic · not to scale")}
    </div>
  </div>
</section>

<section class="ticker" aria-hidden="true">
  <div class="ticker__track" data-ticker>
    <div class="ticker__group">
      <span class="ticker__item"><b>PET</b> polymer identified by near-infrared</span>
      <span class="ticker__dot"></span>
      <span class="ticker__item"><b>ALU</b> metal detected inductively</span>
      <span class="ticker__dot"></span>
      <span class="ticker__item">Sorted <b>before</b> compaction, never after</span>
      <span class="ticker__dot"></span>
      <span class="ticker__item">Collection scheduled on <b>fill level</b>, not a calendar</span>
      <span class="ticker__dot"></span>
      <span class="ticker__item">Every accepted container <b>counted</b> at the machine</span>
      <span class="ticker__dot"></span>
      <span class="ticker__item">Value returned <b>in store</b></span>
      <span class="ticker__dot"></span>
    </div>
  </div>
</section>

<section class="section shell">
  <div class="cols cols--3" data-stagger>
    ${stat({ label: "Containers processed per machine per day", foot: "figure not yet published · pending" })}
    ${stat({ label: "Machine uptime", foot: "figure not yet published · pending" })}
    ${stat({ label: "Machines deployed", foot: "figure not yet published · pending" })}
  </div>
  ${note("Note", "A figure appears here only once it has been measured and carries a stated period. Until then it is a dash — not a rounded estimate borrowed from another market.")}
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "01",
    kicker: "The machine",
    title: "One cabinet, two material streams.",
    lead: "A container goes in at the top and leaves as a baled stream at the bottom. Between those two points the machine identifies it, validates it, credits the depositor, sorts it by material and compacts it — in that order, because a compacted mixed mass cannot be separated afterwards.",
  })}
  <div class="cols cols--2" data-stagger>
    <div class="panel panel--ticked rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1rem">Intake and identification</p>
      <p class="prose" style="margin:0">
        A barcode read establishes which product it is. In parallel, near-infrared sensing reads
        the polymer and an inductive sensor detects metal, so the machine knows the material even
        if the label is damaged.
      </p>
      ${specs([
        { label: "Accepted container sizes", state: "pending", unit: "source pending" },
        { label: "First-pass recognition rate", state: "pending", unit: "source pending" },
      ])}
    </div>
    <div class="panel panel--ticked rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1rem">Sorting and storage</p>
      <p class="prose" style="margin:0">
        PET goes one way, aluminium the other, each compacted its own way and dropped into its own
        bin — never a single mixed hopper. Fill level is monitored continuously, so a collection is
        scheduled against real volume.
      </p>
      ${specs([
        { label: "Floor space required per machine", state: "pending", unit: "source pending" },
        { label: "Container capacity before collection", state: "pending", unit: "source pending" },
      ])}
    </div>
  </div>
  <p class="rise" data-reveal style="margin-top:1.5rem">
    <a class="tlink mono" href="/technology/" style="text-transform:none;letter-spacing:0.04em;font-size:0.75rem">Follow one container end to end →</a>
  </p>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "02",
    kicker: "Next — two ways in",
    title: "Choose the path that describes you.",
  })}
  <div class="gate rise" data-reveal>
    <div class="gate__card">
      <p class="eyebrow">I run retail stores</p>
      <h3 class="display d-4">Floor space, servicing, revenue share, and reporting you can file.</h3>
      <ul class="gate__list">
        <li>Footprint, power, and collection access per machine</li>
        <li>Who services the machine, and how often</li>
        <li>Revenue share and in-store redemption</li>
        <li>Volumes and availability, reported per site</li>
      </ul>
      ${btn("/for-retailers/", "For retailers", "btn--ghost")}
    </div>
    <div class="gate__card">
      <p class="eyebrow">I invest</p>
      <h3 class="display d-4">Unit economics, payback, material offtake, and the deployment plan.</h3>
      <ul class="gate__list">
        <li>Capital and operating cost per machine</li>
        <li>Payback period and the assumptions behind it</li>
        <li>Offtake pricing by material stream</li>
        <li>Egypt deployment plan and MENA expansion case</li>
      </ul>
      ${btn("/investors/", "Investor access", "btn--ghost")}
    </div>
  </div>
</section>

<section class="cta">
  <div class="shell cta__inner">
    <div class="stack stack--md">
      <p class="eyebrow rise" data-reveal>Start here</p>
      ${linesH2(["A pilot is one site,", "a defined review period,", "and a written assessment."], "display d-2")}
    </div>
    <div class="btn-row rise" data-reveal>
      ${btn("/pilot/", "Request a pilot")}
      ${btn("/investors/", "Investor access", "btn--ghost")}
    </div>
  </div>
</section>`,
};
