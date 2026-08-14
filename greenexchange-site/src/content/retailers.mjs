import { lines, linesH2, btn, spec, specs, sechead, note, hollow, drawing } from "../layout.mjs";
import { boundary, icon } from "../graphics.mjs";
import { pilotForm } from "./pilotForm.mjs";

const PLACEMENTS = [
  {
    place: "Inside the entrance",
    space: "Sales floor",
    weather: "None — fully sheltered",
    footfall: "Highest: every visitor passes it",
    service: "During trading hours, through the entrance",
    power: "Shortest, from the store board",
  },
  {
    place: "Under an external canopy",
    space: "External area, not sales floor",
    weather: "Sheltered from rain, exposed to heat",
    footfall: "High: visible on the approach",
    service: "Outside trading hours, no entry to the store",
    power: "External run required",
  },
  {
    place: "Car park island",
    space: "Parking bay, no sales floor at all",
    weather: "Full exposure — needs the outdoor specification",
    footfall: "Lower: a deliberate stop, not a passing one",
    service: "Easiest — vehicle pulls alongside",
    power: "Longest run, and a civils job",
  },
];

const SERVICING = [
  {
    q: "Who empties it?",
    a: "We do. A Green Exchange crew collects on a route driven by fill-level telemetry, not by a calendar and not by a phone call from your duty manager.",
  },
  {
    q: "What happens when it jams?",
    a: "The machine reports the fault itself and takes itself out of service so it cannot swallow another container. Your site contact does not diagnose anything; they do not need a key. We attend.",
  },
  {
    q: "What is the uptime commitment?",
    a: "Availability is measured per machine over a stated window and reported to you with the volumes. A machine that is down is our problem and it appears in your report, not just ours.",
  },
];

const ASSUMPTIONS = [
  "Every visitor is counted once per day, and a fixed share of visitors deposits containers.",
  "Deposits cannot exceed what the machines on site can physically accept, so throughput caps the result.",
  "The split between PET and aluminium is treated as constant across all sites.",
  "Container mass is an average over the size mix actually returned, not a single container size.",
  "Material value is a spot price per tonne and is volatile; the benefit range does not model that volatility.",
  "Your benefit is a share of recovered material value only. Redemption in store, footfall effects and compliance value are excluded — they are real, and none of them is measured yet.",
  "No capital cost, operating cost or price appears here. Commercial terms are a conversation, not a calculator.",
];

const COEFFICIENTS = [
  ["Containers returned per visitor", "containers per visitor per day", "pending"],
  ["Containers processed per machine per day", "containers per machine per day", "pending"],
  ["PET share of accepted containers", "share of containers, 0–1", "pending"],
  ["Average PET container mass", "grams", "pending"],
  ["Average aluminium container mass", "grams", "pending"],
  ["Value per tonne of baled PET", "currency per tonne", "pending"],
  ["Value per tonne of baled aluminium", "currency per tonne", "pending"],
  ["Retailer revenue share", "share of material value, 0–1", "pending"],
  ["Benefit estimate range band", "fraction, 0–1", "pending"],
];

export default {
  path: "/for-retailers/",
  title: "Reverse vending for supermarkets: space, servicing and revenue — Green Exchange",
  description:
    "What a reverse vending machine needs from a retail site, who services it, and what comes back to the operator.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:56rem">
      <p class="eyebrow rise" data-reveal>For retail operators</p>
      ${lines(["Take-back arrives", "as three costs:", "space, staff time,", "and attention."], "display d-1")}
      <p class="lede rise" data-reveal>
        Green Exchange installs and operates the machine, so the only one you carry is the floor
        space. This page states how much of it, what the machine needs from the site, who does the
        work when something jams, and what comes back to you.
      </p>
      <div class="btn-row rise" data-reveal>${btn("#pilot", "Request a pilot")}</div>
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "01",
    kicker: "Deployment model",
    title: "Where the boundary sits.",
    lead: "One line each, so there is no question about it. The machine stays on our balance sheet and our rota.",
  })}
  ${drawing(boundary(), "Operating boundary", "Site slab · custody split")}
  <div class="cols cols--3" data-stagger style="margin-top:2rem">
    <div class="panel rise" data-reveal>
      ${icon("install")}
      <p class="eyebrow" style="margin:0.9rem 0 1rem">What we install</p>
      <ul class="gate__list">
        <li>The machine, commissioned and tested on site</li>
        <li>Signage at the deposit point</li>
        <li>Connectivity and remote monitoring</li>
        <li>Fill-level telemetry that schedules its own collection</li>
      </ul>
    </div>
    <div class="panel rise" data-reveal>
      ${icon("operate")}
      <p class="eyebrow" style="margin:0.9rem 0 1rem">What we own and operate</p>
      <ul class="gate__list">
        <li>The hardware, for its whole life</li>
        <li>Collection, transport and baling</li>
        <li>Maintenance, spares and fault response</li>
        <li>Material offtake and the reporting you receive</li>
      </ul>
    </div>
    <div class="panel rise" data-reveal>
      ${icon("provide")}
      <p class="eyebrow" style="margin:0.9rem 0 1rem">What you provide</p>
      <ul class="gate__list">
        <li>Floor space at an agreed position</li>
        <li>A power supply within reach of it</li>
        <li>Access for a collection vehicle</li>
        <li>A named site contact — not a trained operator</li>
      </ul>
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "02",
    kicker: "Placement options",
    title: "Three positions, and they trade off.",
    lead: "The right one is a site-by-site decision made at the assessment, not a policy.",
  })}
  <div class="tablewrap rise" data-reveal>
    <table class="matrix">
      <caption>Placement options compared</caption>
      <thead>
        <tr>
          <th scope="col">Placement</th>
          <th scope="col">Space comes from</th>
          <th scope="col">Weather exposure</th>
          <th scope="col">Footfall exposure</th>
          <th scope="col">Servicing access</th>
          <th scope="col">Power run</th>
        </tr>
      </thead>
      <tbody>
        ${PLACEMENTS.map(
          (p) => `<tr>
          <th scope="row">${p.place}</th>
          <td>${p.space}</td>
          <td>${p.weather}</td>
          <td>${p.footfall}</td>
          <td>${p.service}</td>
          <td>${p.power}</td>
        </tr>`
        ).join("")}
      </tbody>
    </table>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "03",
    kicker: "Footprint and site requirements",
    title: "What a site engineer needs before they can say yes.",
    lead: "Every figure here is measured or marked as unmeasured — none of it is indicative.",
  })}
  ${specs([
    { label: "Floor space required per machine", state: "pending" },
    { label: "Machine dimensions", state: "pending" },
    { label: "Service clearance required", state: "pending" },
    { label: "Floor loading, machine full", state: "pending" },
    { label: "Power requirement per machine", state: "pending" },
    { label: "Connectivity requirement", state: "pending" },
  ])}
  ${note("Clearance", "Service clearance is additional to the machine footprint. A site that fits the machine but not the clearance is not a site.")}
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "04",
    kicker: "Servicing",
    title: "The part that decides whether this is an asset or a chore.",
    lead: "None of it lands on your staff.",
  })}
  <div class="cols cols--3" data-stagger>
    ${SERVICING.map(
      (s) => `
    <div class="panel panel--ticked rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1rem">Servicing</p>
      <h3 class="display d-4" style="margin-bottom:0.9rem">${s.q}</h3>
      <p class="prose" style="margin:0;font-size:0.9375rem">${s.a}</p>
    </div>`
    ).join("")}
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "05",
    kicker: "What comes back to you",
    title: "Four things, in the order a board asks about them.",
    lead: "Two of them are unmeasured, and this page says so rather than borrowing a number from another market.",
  })}
  <div class="cols cols--2" data-stagger>
    <div class="panel rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1rem">Footfall and dwell</p>
      <p class="prose" style="margin:0 0 0.5rem;font-size:0.9375rem">
        A deposit point gives a reason to come, and the value returned is redeemable in store. We
        will not put a figure on this before a pilot measures it at your site — anyone who does is
        guessing on your behalf.
      </p>
      ${specs([
        { label: "Effect on store footfall", state: "pending" },
        { label: "Effect on dwell time", state: "pending" },
      ])}
    </div>
    <div class="panel rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1rem">Material value and reporting</p>
      <p class="prose" style="margin:0 0 0.5rem;font-size:0.9375rem">
        Recovered material is sold by stream, and a share of that value can come back to the site
        depending on the deal. Volumes and machine availability are reported per site, in a form
        you can file.
      </p>
      ${specs([
        { label: "Value per tonne of baled PET", state: "pending" },
        { label: "Value per tonne of baled aluminium", state: "pending" },
        { label: "Retailer revenue share", state: "pending" },
      ])}
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "06",
    kicker: "Benefit model",
    title: "The inputs, and why there is no number yet.",
    lead: "These outputs are estimates produced by a model, not a quotation and not a forecast. They are only as good as the assumptions listed below, and they carry no commercial commitment.",
  })}

  <div class="calc rise" data-reveal data-calc>
    <div class="calc__panel">
      <p class="eyebrow">Site inputs</p>
      <div class="slider">
        <div class="slider__head">
          <label class="field__label" for="visitors">Daily visitors per store</label>
          <span class="slider__val" id="visitors-out">4,000</span>
        </div>
        <input type="range" id="visitors" min="500" max="20000" step="500" value="4000">
      </div>
      <div class="slider">
        <div class="slider__head">
          <label class="field__label" for="stores">Stores in scope</label>
          <span class="slider__val" id="stores-out">12</span>
        </div>
        <input type="range" id="stores" min="1" max="200" step="1" value="12">
      </div>
      <div class="slider">
        <div class="slider__head">
          <label class="field__label" for="machines">Machines per store</label>
          <span class="slider__val" id="machines-out">1</span>
        </div>
        <input type="range" id="machines" min="1" max="6" step="1" value="1">
      </div>
    </div>
    <div class="calc__readout">
      <p class="eyebrow">Estimated monthly benefit</p>
      <div class="calc__out calc__out--pending">—</div>
      <p class="prose" style="margin:0;font-size:0.8125rem">
        The model runs on nine coefficients. None of them has been measured yet, so it returns a
        dash rather than a number. Your inputs are recorded above; the output arrives when the
        coefficients do.
      </p>
      <span class="chip">output withheld</span>
    </div>
  </div>

  <div class="cols cols--2" style="margin-top:2.5rem" data-stagger>
    <div class="rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1.25rem">Assumptions in this model</p>
      <ul class="deck">
        ${ASSUMPTIONS.map((a, i) => `<li data-n="${String(i + 1).padStart(2, "0")}">${a}</li>`).join("")}
      </ul>
    </div>
    <div class="rise" data-reveal>
      <p class="eyebrow" style="margin-bottom:1.25rem">Coefficients and their sources</p>
      ${specs(COEFFICIENTS.map(([label, unit, state]) => ({ label, unit, state })))}
      ${spec({ label: "Days per month", value: "30.44", unit: "days", state: "measured" })}
    </div>
  </div>
</section>

<section class="section section--ruled shell" id="pilot">
  ${sechead({
    idx: "07",
    kicker: "For retailers",
    title: "Request a pilot.",
    lead: "One site, a defined review period, and a written assessment at the end of it. No price, no commitment on this page — a pilot conversation.",
  })}
  ${pilotForm()}
</section>`,
};
