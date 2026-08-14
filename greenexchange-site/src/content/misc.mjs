import { lines, linesH2, btn, sechead, hollow, note } from "../layout.mjs";
import { pilotForm } from "./pilotForm.mjs";

export const company = {
  path: "/company/",
  title: "The company behind the machines — Green Exchange",
  description:
    "Who operates Green Exchange, where it is registered, and how the Romanian build and the Egyptian deployment fit together.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:50rem">
      <p class="eyebrow rise" data-reveal>Green Exchange</p>
      ${lines(["The company", "behind the machines."], "display d-1")}
      <p class="lede rise" data-reveal>
        Who operates Green Exchange, where it is registered, and how the Romanian build and the
        Egyptian deployment fit together.
      </p>
    </div>
  </div>
</section>

<section class="section section--ruled shell">
  ${hollow(
    "Not written yet",
    "This page is deliberately empty rather than filled with founding-story copy. It will describe the operating entity, the relationship between the Romanian build and the Egyptian deployment, and the people accountable for each — once those details are settled and the individuals have agreed to appear.",
    2
  )}
  ${note("Meanwhile", "The registered entity details in the footer are the authoritative record, and they are marked as placeholders until filed. Team and background are covered in the data room.")}
</section>

<section class="cta">
  <div class="shell cta__inner">
    <div class="stack stack--md">
      <p class="eyebrow rise" data-reveal>Next</p>
      ${linesH2(["Two ways in:", "a site, or the data room."], "display d-2")}
    </div>
    <div class="btn-row rise" data-reveal>
      ${btn("/pilot/", "Request a pilot")}
      ${btn("/investors/", "Investor access", "btn--ghost")}
    </div>
  </div>
</section>`,
};

export const pilot = {
  path: "/pilot/",
  title: "Request a pilot for one store — Green Exchange",
  description:
    "One site, a defined review period, and a written assessment at the end of it. No price and no commitment.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:50rem">
      <p class="eyebrow rise" data-reveal>For retailers</p>
      ${lines(["Request a pilot."], "display d-1")}
      <p class="lede rise" data-reveal>
        One site, a defined review period, and a written assessment at the end of it. No price, no
        commitment on this page — a pilot conversation.
      </p>
    </div>
  </div>
</section>

<section class="section shell" style="padding-top:0">
  <div class="cols cols--2" style="align-items:start">
    ${pilotForm()}
    <div class="stack stack--lg rise" data-reveal>
      <div>
        <p class="eyebrow" style="margin-bottom:1.25rem">What happens next</p>
        <ul class="deck">
          <li data-n="01">We reply to arrange a site assessment — footprint, power run, and collection access at the position you have in mind.</li>
          <li data-n="02">We install and commission the machine. Your staff are not trained to operate it, because they do not operate it.</li>
          <li data-n="03">The review period runs against measures agreed before it starts, not chosen afterwards.</li>
          <li data-n="04">You receive a written assessment: volumes by stream, machine availability, and what the figures do and do not support.</li>
        </ul>
      </div>
      ${note("No price here", "Commercial terms are a conversation held once a site assessment exists. Nothing on this page is a quotation.")}
    </div>
  </div>
</section>`,
};

const legalBody = (kicker, heading, lead, bodyCopy) => `
<section class="hero">
  <div class="shell">
    <div class="stack stack--lg" style="max-width:48rem">
      <p class="eyebrow rise" data-reveal>${kicker}</p>
      ${lines([heading], "display d-2")}
      <p class="lede rise" data-reveal>${lead}</p>
    </div>
  </div>
</section>

<section class="section shell" style="padding-top:0">
  ${hollow("Not drafted in-house", bodyCopy, 2)}
</section>`;

export const legal = [
  {
    path: "/legal/privacy/",
    title: "Privacy — Green Exchange",
    description: "How Green Exchange handles details submitted through this site.",
    body: legalBody(
      "Legal",
      "Privacy",
      "How details submitted through the pilot and data-room forms are handled, and for how long.",
      "This notice is to be drafted by a qualified lawyer against the jurisdictions the site actually operates in — Romania as the registered entity and Egypt as the deployment market. Until it is filed, the only details collected are those typed into the pilot and data-room forms on this site, and they are used to reply to that request and arrange a site assessment."
    ),
  },
  {
    path: "/legal/cookies/",
    title: "Cookies — Green Exchange",
    description: "What this site stores in the browser.",
    body: legalBody(
      "Legal",
      "Cookies",
      "What this site stores in your browser, and why.",
      "This site sets no advertising or analytics cookies. It stores two things locally in your own browser and sends neither anywhere: your colour-theme choice, and a flag recording that you have already seen the opening sequence this session. Clearing site data removes both."
    ),
  },
  {
    path: "/legal/terms/",
    title: "Terms — Green Exchange",
    description: "The terms on which this site is published.",
    body: legalBody(
      "Legal",
      "Terms",
      "The terms on which these pages are published.",
      "These terms are to be drafted by a qualified lawyer. Until they are filed, treat every page as descriptive: nothing on this site is an offer, a quotation, or a commitment, and any figure shown as a dash is a figure that has not been measured rather than one being withheld."
    ),
  },
  {
    path: "/legal/investor-disclaimer/",
    title: "Investor disclaimer — Green Exchange",
    description: "The basis on which investor materials are presented.",
    body: legalBody(
      "Legal",
      "Investor disclaimer",
      "The basis on which anything in the investor section is presented.",
      "This disclaimer is to be drafted by a qualified lawyer and must cover, at minimum: that nothing on these pages is an offer or solicitation to buy or sell securities, the jurisdictions in which the materials may be received, forward-looking-statement language, and the basis on which any figure is presented. It has deliberately not been drafted in-house."
    ),
  },
];

export const notFound = {
  path: "/404.html",
  canonical: "/404",
  title: "Page not found — Green Exchange",
  description: "That page does not exist.",
  body: `
<section class="hero">
  <div class="hero__light" data-hero-light aria-hidden="true"></div>
  <div class="shell">
    <div class="stack stack--lg" style="max-width:44rem">
      <p class="eyebrow rise" data-reveal>Error 404</p>
      ${lines(["Unrecognised —", "handed back."], "display d-1")}
      <p class="lede rise" data-reveal>
        The machine returns anything it cannot identify rather than swallowing it. So does this
        site. The page you asked for does not exist.
      </p>
      <div class="btn-row rise" data-reveal>
        ${btn("/", "Back to the start")}
        ${btn("/technology/", "How the machine works", "btn--ghost")}
      </div>
    </div>
  </div>
</section>`,
};
