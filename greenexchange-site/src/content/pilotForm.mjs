import { btn } from "../layout.mjs";

/**
 * Pilot request form. Shared by /pilot/ and the foot of /for-retailers/.
 * The honeypot field and its label are kept from the previous build — it is
 * the only spam control that does not put a puzzle in front of a buyer.
 */
export const pilotForm = () => `
<form class="panel panel--ticked rise" data-reveal method="post" action="#" novalidate>
  <label class="hp" for="gx-hp">Leave this field empty</label>
  <input class="hp" id="gx-hp" name="company_website" type="text" tabindex="-1" autocomplete="off">

  <div class="form form--two">
    <div class="field">
      <label class="field__label" for="gx-company">Chain or company</label>
      <input id="gx-company" name="company" type="text" autocomplete="organization" required placeholder="Legal or trading name">
    </div>
    <div class="field">
      <label class="field__label" for="gx-email">Work email</label>
      <input id="gx-email" name="email" type="email" autocomplete="email" required placeholder="name@company.com">
    </div>
    <div class="field">
      <label class="field__label" for="gx-stores">Number of stores</label>
      <input id="gx-stores" name="stores" type="number" min="1" inputmode="numeric" required placeholder="12">
    </div>
    <div class="field">
      <label class="field__label" for="gx-country">Country</label>
      <select id="gx-country" name="country">
        <option value="">Select</option>
        <option>Egypt</option>
        <option>Romania</option>
        <option>Other — MENA</option>
        <option>Other — EU</option>
      </select>
    </div>

    <details class="moreinfo form__wide">
      <summary>Add role and city (optional)</summary>
      <div class="form form--two" style="margin-top:1rem">
        <div class="field">
          <label class="field__label" for="gx-role">Your role</label>
          <input id="gx-role" name="role" type="text" placeholder="Head of operations">
        </div>
        <div class="field">
          <label class="field__label" for="gx-city">City</label>
          <input id="gx-city" name="city" type="text" placeholder="Cairo">
        </div>
      </div>
    </details>

    <div class="form__wide stack stack--md">
      <p class="formnote">
        Green Exchange may use these details to reply to this pilot request and arrange a site
        assessment. <a class="tlink" href="/legal/privacy/">How we handle your details</a>.
      </p>
      <div class="btn-row">
        <button class="btn" type="submit" data-magnetic>
          <span class="btn__label">Request a pilot</span>
          <svg class="btn__arrow" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
      </div>
    </div>
  </div>
</form>`;

export const dataRoomForm = () => `
<form class="panel panel--ticked rise" data-reveal method="post" action="#" novalidate>
  <label class="hp" for="gx-hp2">Leave this field empty</label>
  <input class="hp" id="gx-hp2" name="company_website" type="text" tabindex="-1" autocomplete="off">

  <div class="form form--two">
    <div class="field">
      <label class="field__label" for="gx-name">Name</label>
      <input id="gx-name" name="name" type="text" autocomplete="name" required placeholder="Full name">
    </div>
    <div class="field">
      <label class="field__label" for="gx-iemail">Work email</label>
      <input id="gx-iemail" name="email" type="email" autocomplete="email" required placeholder="name@fund.com">
    </div>
    <div class="field">
      <label class="field__label" for="gx-firm">Firm</label>
      <input id="gx-firm" name="firm" type="text" autocomplete="organization" required placeholder="Fund or family office">
    </div>
    <div class="field">
      <label class="field__label" for="gx-type">Investor type</label>
      <select id="gx-type" name="investor_type">
        <option value="">Select</option>
        <option>Venture</option>
        <option>Growth</option>
        <option>Infrastructure</option>
        <option>Family office</option>
        <option>Strategic / corporate</option>
      </select>
    </div>
    <div class="form__wide stack stack--md">
      <p class="formnote">
        Access is reviewed and granted manually. Requests are not approved automatically, and
        submitting this form does not create any commitment on either side.
        <a class="tlink" href="/legal/investor-disclaimer/">Investor disclaimer</a>.
      </p>
      <div class="btn-row">
        <button class="btn" type="submit" data-magnetic>
          <span class="btn__label">Request data room access</span>
          <svg class="btn__arrow" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" stroke-width="1.4"/></svg>
        </button>
      </div>
    </div>
  </div>
</form>`;
