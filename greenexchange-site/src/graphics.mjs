/**
 * Schematic drawings.
 *
 * Everything on this site is drawn, not photographed — there is no machine
 * photography to work with, and a technical elevation is truer to the voice of
 * the copy than a render would be. Each drawing is line-work only so it takes
 * its colour from the theme tokens and animates by stroke-dashoffset.
 */

/** Brand glyph: a container entering an aperture. Reads as a G on its side. */
export const glyph = (cls = "") => `
<svg class="${cls}" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <rect x="2.5" y="2.5" width="27" height="27" stroke="currentColor" stroke-width="1.4"/>
  <path d="M22 10.5H13a4.5 4.5 0 0 0 0 9h5.5V16H15" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/>
  <path d="M6.5 24.5h19" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
</svg>`;

const arrow = `<svg class="btn__arrow" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" stroke-width="1.4"/></svg>`;
export { arrow };

/* ---------------------------------------------------------------------------
   1. Front elevation — the hero drawing.
   Intake aperture with NIR window, readout panel, compaction chamber, two
   storage bins (PET / ALU), collection door. Matches the alt text verbatim.
   ------------------------------------------------------------------------ */
export const elevation = () => `
<svg viewBox="0 0 320 460" role="img" aria-labelledby="elev-t elev-d" style="--scan-travel:44px">
  <title id="elev-t">Reverse vending machine — technical elevation</title>
  <desc id="elev-d">Schematic front elevation of a Green Exchange reverse vending machine. From the top: a container intake aperture with a near-infrared identification window, an operator readout panel, a compaction chamber, two separate storage bins for PET and aluminium, and a collection door at the base. Not to scale.</desc>

  <!-- dimension rails -->
  <g class="dw-line dw-dash" opacity="0.55">
    <path d="M30 24v412"/><path d="M290 24v412"/>
    <path d="M24 30h272"/><path d="M24 430h272"/>
  </g>
  <g class="dw-line" opacity="0.7">
    <path d="M26 30h8M26 430h8M290 26v8M290 434v-8"/>
  </g>

  <!-- cabinet -->
  <g class="dw-body">
    <path d="M62 30h196a10 10 0 0 1 10 10v380a10 10 0 0 1-10 10H62a10 10 0 0 1-10-10V40a10 10 0 0 1 10-10Z"/>
    <path d="M52 96h216"/>
    <path d="M52 178h216"/>
    <path d="M52 258h216"/>
    <path d="M52 366h216"/>
    <path d="M160 258v108"/>
  </g>

  <!-- intake aperture -->
  <g class="dw-detail">
    <rect x="84" y="46" width="152" height="34" rx="3"/>
    <path d="M96 63h128" class="dw-dash"/>
    <path d="M92 46v34M228 46v34"/>
  </g>
  <!-- NIR window + scan sweep -->
  <g class="dw-accent">
    <rect x="100" y="106" width="120" height="52" rx="2"/>
    <path d="M110 106v52M210 106v52" class="dw-dash"/>
  </g>
  <g class="dw-live scan" opacity="0.9">
    <path d="M104 116h112"/>
  </g>
  <circle class="dw-live" cx="240" cy="132" r="4" fill="none"/>
  <circle cx="240" cy="132" r="1.6" fill="currentColor" style="color:var(--patina)"/>

  <!-- readout panel -->
  <g class="dw-detail">
    <rect x="84" y="192" width="152" height="52" rx="2"/>
    <path d="M96 208h58M96 220h84M96 232h40"/>
  </g>

  <!-- compaction chamber -->
  <g class="dw-detail">
    <path d="M76 274h68v78H76z"/>
    <path d="M76 292h68M76 310h68M76 328h68" class="dw-dash"/>
    <path d="M176 274h68v78h-68z"/>
    <path d="M176 292h68M176 310h68M176 328h68" class="dw-dash"/>
  </g>

  <!-- collection door -->
  <g class="dw-detail">
    <rect x="84" y="382" width="152" height="34" rx="2"/>
    <path d="M150 399h20"/>
  </g>

  <!-- plinth -->
  <g class="dw-body"><path d="M64 430v10M256 430v10"/></g>

  <!-- callouts -->
  <g class="dw-line" opacity="0.8">
    <path d="M236 63h48M220 132h56M236 218h48M144 313h22M244 313h32M236 399h48"/>
    <circle cx="284" cy="63" r="1.6" fill="currentColor"/>
    <circle cx="276" cy="132" r="1.6" fill="currentColor"/>
  </g>
  <g class="dw-label" text-anchor="start">
    <text x="66" y="24">01 · INTAKE</text>
    <text x="102" y="102" class="dw-label--nir">NIR IDENTIFICATION</text>
    <text x="86" y="188">02 · READOUT</text>
    <text x="78" y="270" class="dw-label--pet">PET · COMPACT</text>
    <text x="178" y="270" class="dw-label--alu">ALU · COMPACT</text>
    <text x="86" y="378">03 · COLLECTION DOOR</text>
  </g>
</svg>`;

/* ---------------------------------------------------------------------------
   2. Cutaway section — the technology page stage.
   Nine numbered zones the scroll-stepper highlights one at a time, plus a
   travelling container that follows the transport path.
   ------------------------------------------------------------------------ */
export const cutaway = () => `
<svg viewBox="0 0 360 520" role="img" aria-labelledby="cut-t cut-d" data-cutaway>
  <title id="cut-t">Container path through the machine — cutaway section</title>
  <desc id="cut-d">Schematic cutaway showing the route a container takes: intake at the top, then the identification sensors, the validation gate with its return path, the depositor credit panel, the diverter that splits PET from aluminium, a compactor and storage bin on each stream, the collection door at the base, and a finished bale leaving for a reprocessor.</desc>

  <!-- shell -->
  <g class="dw-body">
    <path d="M44 26h272a8 8 0 0 1 8 8v452a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8V34a8 8 0 0 1 8-8Z"/>
  </g>
  <g class="dw-line dw-dash" opacity="0.4">
    <path d="M36 96h288M36 158h288M36 216h288M36 268h288M36 322h288M36 398h288M36 452h288"/>
  </g>

  <!-- 01 intake -->
  <g class="dw-detail" data-zone="1">
    <rect x="112" y="44" width="136" height="34" rx="3"/>
    <path d="M126 61h108" class="dw-dash"/>
  </g>

  <!-- 02 identify: barcode + NIR + inductive -->
  <g class="dw-accent" data-zone="2">
    <rect x="96" y="108" width="72" height="40" rx="2"/>
    <rect x="192" y="108" width="72" height="40" rx="2"/>
    <path d="M106 118v20M112 118v20M118 118v20M126 118v20M132 118v20M140 118v20"/>
  </g>
  <g class="dw-live" data-zone="2"><path d="M200 128h56" class="dw-dash"/></g>

  <!-- 03 validate gate + reject return -->
  <g class="dw-detail" data-zone="3">
    <path d="M120 170h120v34H120z"/>
    <path d="M156 170l28 34"/>
  </g>
  <g class="dw-line" data-zone="3">
    <path d="M120 187H72v56h34" class="dw-dash"/>
    <path d="M100 237l6 6-6 6"/>
  </g>

  <!-- 04 credit panel -->
  <g class="dw-accent" data-zone="4">
    <rect x="120" y="228" width="120" height="30" rx="2"/>
    <path d="M132 243h34M204 243h24"/>
  </g>

  <!-- 05 diverter -->
  <g class="dw-detail" data-zone="5">
    <path d="M180 280v18"/>
    <path d="M180 298l-58 20M180 298l58 20"/>
    <path d="M164 288l16 10 16-10"/>
  </g>

  <!-- 06 compactors -->
  <g class="dw-detail" data-zone="6">
    <rect x="70" y="334" width="96" height="50" rx="2"/>
    <rect x="194" y="334" width="96" height="50" rx="2"/>
    <path d="M84 348h68M84 360h68M84 372h68" class="dw-dash"/>
    <path d="M208 348h68M208 360h68M208 372h68" class="dw-dash"/>
  </g>

  <!-- 07 bins -->
  <g class="dw-detail" data-zone="7">
    <path d="M70 410h96v66H70zM194 410h96v66h-96z"/>
    <path d="M70 448h96M194 434h96" class="dw-dash"/>
  </g>

  <!-- 08 collection door -->
  <g class="dw-body" data-zone="8"><path d="M132 476h96v18h-96z"/></g>

  <!-- 09 bale leaving -->
  <g class="dw-accent" data-zone="9" opacity="0.9">
    <path d="M324 462h24v32h-24z"/>
    <path d="M324 472h24M324 484h24M332 462v32M340 462v32"/>
    <path d="M300 486h20l-6-5m6 5-6 5"/>
  </g>

  <!-- transport path the travelling container follows -->
  <path id="gx-path" class="dw-line" d="M180 60 L180 128 L180 187 L180 243 L180 298 L118 358 L118 440 L180 486" fill="none" opacity="0.35" stroke-dasharray="2 5"/>
  <g data-traveller opacity="0">
    <circle r="5" class="dw-live" fill="none"/>
    <circle r="1.8" fill="currentColor" style="color:var(--patina)"/>
  </g>

  <g class="dw-label">
    <text x="46" y="20">SECTION A–A</text>
    <text x="118" y="40">01 DEPOSIT</text>
    <text x="98" y="104">02 IDENTIFY</text>
    <text x="196" y="104" class="dw-label--nir">NIR + INDUCTIVE</text>
    <text x="122" y="166">03 VALIDATE</text>
    <text x="46" y="182">RETURN</text>
    <text x="122" y="224">04 RETURN VALUE</text>
    <text x="122" y="276">05 SORT BY STREAM</text>
    <text x="72" y="330" class="dw-label--pet">06 COMPACT · PET</text>
    <text x="196" y="330" class="dw-label--alu">06 COMPACT · ALU</text>
    <text x="72" y="406" class="dw-label--pet">07 STORE</text>
    <text x="196" y="406" class="dw-label--alu">07 STORE</text>
    <text x="134" y="470">08 COLLECT</text>
    <text x="298" y="456">09 BALE</text>
  </g>
</svg>`;

/* ---------------------------------------------------------------------------
   3. Egypt PET material flow — structure only.
   The copy is explicit that magnitudes must not be drawn without a source for
   every band, so the bands are equal-width and labelled as undrawn. Drawing
   this to scale would be the exact failure the page warns about.
   ------------------------------------------------------------------------ */
export const flow = () => `
<svg viewBox="0 0 640 210" role="img" aria-labelledby="flow-t flow-d">
  <title id="flow-t">Egypt PET material flow: consumed against destination</title>
  <desc id="flow-d">Structure of the Egypt PET material flow: consumption divides into formally collected, informally collected and uncollected. Proportions are not shown because no public source has been supplied.</desc>

  <g class="dw-body"><path d="M20 76h150v58H20z"/></g>
  <text class="dw-label" x="26" y="68">ANNUAL PET CONSUMPTION</text>
  <text class="dw-label" x="26" y="110" font-size="14" style="letter-spacing:0">—</text>
  <text class="dw-label" x="26" y="126" font-size="6">NO SOURCE</text>

  <g class="dw-line">
    <path d="M170 105h44"/>
    <path d="M214 105V40h32M214 105h32M214 105v65h32"/>
    <path d="M240 36l6 4-6 4M240 101l6 4-6 4M240 166l6 4-6 4"/>
  </g>

  <g class="dw-detail">
    <path d="M250 20h140v40H250zM250 85h140v40H250zM250 150h140v40H250z"/>
  </g>
  <g class="dw-label">
    <text x="258" y="36" class="dw-label--pet">FORMALLY COLLECTED</text>
    <text x="258" y="52" font-size="6">NO SOURCE</text>
    <text x="258" y="101" class="dw-label--alu">INFORMALLY COLLECTED</text>
    <text x="258" y="117" font-size="6">NO SOURCE</text>
    <text x="258" y="166">UNCOLLECTED</text>
    <text x="258" y="182" font-size="6">NO SOURCE</text>
  </g>
  <g class="dw-label" font-size="14" style="letter-spacing:0">
    <text x="374" y="52" text-anchor="end">—</text>
    <text x="374" y="117" text-anchor="end">—</text>
    <text x="374" y="182" text-anchor="end">—</text>
  </g>

  <g class="dw-line dw-dash" opacity="0.6"><path d="M410 20v170"/></g>
  <g class="dw-label">
    <text x="424" y="90">PROPORTIONS NOT DRAWN</text>
    <text x="424" y="106">STRUCTURE ONLY</text>
  </g>
</svg>`;

/* ---------------------------------------------------------------------------
   4. Boundary diagram — for retailers. Who owns what, drawn as two custody
   zones meeting at the store floor.
   ------------------------------------------------------------------------ */
export const boundary = () => `
<svg viewBox="0 0 640 250" role="img" aria-labelledby="bnd-t bnd-d">
  <title id="bnd-t">Operating boundary between the site and Green Exchange</title>
  <desc id="bnd-d">The site provides floor space, power and vehicle access. Green Exchange owns and operates the machine, the collection route, the baling and the reporting. The boundary sits at the floor slab.</desc>

  <g class="dw-line dw-dash"><path d="M320 16v218"/></g>
  <g class="dw-label">
    <text x="24" y="30">SITE</text>
    <text x="616" y="30" text-anchor="end">GREEN EXCHANGE</text>
  </g>

  <!-- site side: floor slab, power, access -->
  <g class="dw-detail">
    <path d="M24 190h270"/>
    <path d="M24 190l-8 12M56 190l-8 12M88 190l-8 12M120 190l-8 12M152 190l-8 12M184 190l-8 12M216 190l-8 12M248 190l-8 12M280 190l-8 12"/>
    <path d="M40 118h34v34H40z"/>
    <path d="M52 118v-14h10v14"/>
    <path d="M120 118h56v34h-56z"/>
    <path d="M210 152v-34h56v34"/>
  </g>
  <g class="dw-label">
    <text x="40" y="112">POWER</text>
    <text x="120" y="112">FLOOR SPACE</text>
    <text x="210" y="112">VEHICLE ACCESS</text>
    <text x="24" y="216">SITE FLOOR SLAB</text>
  </g>

  <!-- gx side: machine, route, bale, report -->
  <g class="dw-accent">
    <path d="M352 60h64v130h-64z"/>
    <path d="M352 92h64M352 150h64"/>
    <path d="M366 70h36v14h-36z"/>
  </g>
  <g class="dw-detail">
    <path d="M452 96h48v32h-48z"/>
    <circle cx="464" cy="134" r="6"/><circle cx="490" cy="134" r="6"/>
    <path d="M540 96h56v56h-56z"/>
    <path d="M540 112h56M540 128h56M556 96v56M576 96v56"/>
  </g>
  <g class="dw-line">
    <path d="M420 126h26l-6-5m6 5-6 5"/>
    <path d="M508 122h26l-6-5m6 5-6 5"/>
  </g>
  <g class="dw-label">
    <text x="352" y="54">MACHINE · OWNED + SERVICED</text>
    <text x="452" y="90">COLLECTION ROUTE</text>
    <text x="540" y="90">BALE + OFFTAKE</text>
    <text x="352" y="216">REPORTING RETURNS TO THE SITE</text>
  </g>
  <g class="dw-live"><path d="M580 200H352l-8-6m8 6-8 6" class="dw-dash"/></g>
</svg>`;

/* Small thin-line icons for the deployment model columns. */
export const icon = (name) => {
  const paths = {
    install: `<path d="M4 20h16M7 20V9l5-4 5 4v11" /><path d="M10 20v-5h4v5"/>`,
    operate: `<circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>`,
    provide: `<path d="M3 20h18M6 20V8h12v12"/><path d="M10 20v-6h4v6M9 4h6"/>`,
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true" style="width:1.4rem;height:1.4rem;color:var(--brass)">${paths[name] || ""}</svg>`;
};
