import { lines, btn, specs, sechead, note, hollow } from "../layout.mjs";
import { dataRoomForm } from "./pilotForm.mjs";

const THESIS = [
  {
    n: "01",
    t: "Volume enters, recovery does not follow",
    d: "PET and aluminium enter Egypt in volume and are recovered at a fraction of the rate, because collection depends on informal channels rather than infrastructure.",
  },
  {
    n: "02",
    t: "Retail is the cheapest interception point",
    d: "Retail is where those containers are already carried in and out every day, which makes a store entrance the cheapest place to intercept them.",
  },
  {
    n: "03",
    t: "The siting agreements are the moat",
    d: "Regulation is moving toward producer responsibility across the region, and the operators holding retail siting agreements and collection routes when it lands are the ones who can serve it.",
  },
];

const LINES = [
  {
    t: "Retailer contract",
    d: "The site pays for placement and service, or takes a share of recovered material value, depending on the deal. Either way the machine is contracted per site rather than sold as hardware.",
  },
  {
    t: "Material sale",
    d: "Baled PET and aluminium are sold to reprocessors. Separation quality upstream sets the price, which is why sorting happens before compaction rather than after.",
  },
  {
    t: "Brand sponsorship",
    d: "A machine at a store entrance is a branded surface with a measurable interaction count, and beverage producers facing producer-responsibility obligations have a reason to fund collection directly.",
  },
  {
    t: "Data",
    d: "Every accepted container is a counted, located, time-stamped return by material and by product. That record is what a producer needs to evidence recovery, and it is the line with the lowest marginal cost.",
  },
];

export default {
  path: "/investors/",
  title: "Deposit return infrastructure in Egypt — Green Exchange",
  description:
    "The market context, the revenue mechanisms, and the current stage of deployment. Figures and unit economics are in the data room.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:56rem">
      <p class="eyebrow rise" data-reveal>For investors</p>
      ${lines(["Deposit infrastructure,", "built before the", "mandate arrives."], "display d-1")}
      <div class="btn-row rise" data-reveal>${btn("#dataroom", "Request data room access")}</div>
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({ idx: "01", kicker: "Thesis", title: "Three facts, in order." })}
  <div class="cols cols--3" data-stagger>
    ${THESIS.map(
      (x) => `
    <div class="panel panel--ticked rise" data-reveal>
      <span class="sechead__idx">${x.n}</span>
      <h3 class="display d-4" style="margin:0.75rem 0 0.9rem">${x.t}</h3>
      <p class="prose" style="margin:0;font-size:0.9375rem">${x.d}</p>
    </div>`
    ).join("")}
  </div>
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "02",
    kicker: "Market context",
    title: "Four figures matter, and each needs a named source.",
    lead: "Anything unsourced is absent from this page rather than shown with a caveat.",
  })}
  ${hollow(
    "No sourced market figures are published yet",
    "The figures for this section have not been tied to a named public source. Rather than publish them with a hedge, they are withheld until each one cites the instrument or dataset it comes from. The full market analysis, with its sources, is in the data room."
  )}
  ${note("Direction of travel, not a prediction", "Egypt legislated a framework for waste management in 2020, and producer-responsibility instruments across MENA have followed the same pattern. We do not model a mandate date, and nothing on this page depends on one arriving.")}
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "03",
    kicker: "How a machine makes money",
    title: "Four revenue lines, described as mechanisms.",
    lead: "No figures appear on this page, and the unit economics are in the data room.",
  })}
  <div class="cols cols--2" data-stagger>
    ${LINES.map(
      (l, i) => `
    <div class="panel rise" data-reveal>
      <span class="sechead__idx">${String(i + 1).padStart(2, "0")}</span>
      <h3 class="display d-4" style="margin:0.75rem 0 0.9rem">${l.t}</h3>
      <p class="prose" style="margin:0;font-size:0.9375rem">${l.d}</p>
    </div>`
    ).join("")}
  </div>
  ${note("Withheld", "Which lines carry the model, in what proportion, and at what cost is exactly the question the data room answers. It is not answered here.")}
</section>

<section class="section section--ruled shell">
  ${sechead({
    idx: "04",
    kicker: "Where we actually are",
    title: "Stated conservatively and stage-appropriately.",
    lead: "Built, signed and deployed are separate counts and are kept separate; an unmeasured figure is shown as unmeasured rather than rounded up.",
  })}
  ${specs([
    { label: "Current stage", state: "pending" },
    { label: "Machines built", state: "pending" },
    { label: "Machines deployed", state: "pending" },
    { label: "Pilots signed", state: "pending" },
    { label: "Letters of intent signed", state: "pending" },
  ])}
  ${note("Definition", "A letter of intent is not a pilot and a pilot is not a rollout. Conflating them is the most common way an early company overstates itself, so these are counted separately here.")}
</section>

<section class="section section--ruled shell">
  ${sechead({ idx: "05", kicker: "Team", title: "Real names and real current roles only." })}
  ${hollow(
    "Team details are not published yet",
    "No names or roles have been supplied for publication. An investor will verify every person listed on a page like this, so nothing is listed until it is accurate and the individuals have agreed to appear. Team and background are covered in the data room."
  )}
</section>

<section class="section section--ruled shell" id="dataroom">
  ${sechead({
    idx: "06",
    kicker: "Data room",
    title: "Request data room access.",
    lead: "Access is reviewed and granted manually. Requests are not approved automatically, and submitting this form does not create any commitment on either side.",
  })}
  ${dataRoomForm()}
  <div class="hollow rise" data-reveal style="margin-top:2rem;border-color:var(--brass-dim)">
    <span class="chip">legal-placeholder-do-not-ship</span>
    <h3 class="hollow__title">Placeholder disclaimer — not legal text</h3>
    <p class="prose" style="margin:0">
      This block is a placeholder for a disclaimer to be drafted by a qualified lawyer covering, at
      minimum: that nothing on these pages is an offer or solicitation to buy or sell securities,
      the jurisdictions in which the materials may be received, forward-looking-statement language,
      and the basis on which any figure is presented. It has deliberately not been drafted in-house.
      The production build fails while this placeholder is in place.
    </p>
  </div>
</section>`,
};
