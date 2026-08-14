/* ============================================================================
   Green Exchange — motion and interaction.
   No dependencies. Every effect is additive: with JS off or motion reduced the
   page is still complete and readable (the .no-js and reduced-motion rules in
   site.css put every animated element in its final state).
   ========================================================================= */
(function () {
  "use strict";

  // Tell the head-script failsafe that the motion system is present.
  document.documentElement.setAttribute("data-booted", "1");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  /* ------------------------------------------------------------ loader --
     A calibration sequence, shown once per session. It buys the time the
     display font needs to load, so the hero never swaps typeface mid-reveal. */
  function loader(done) {
    var el = $("[data-loader]");
    if (!el) return done();
    var seen = false;
    try {
      seen = sessionStorage.getItem("gx-seen") === "1";
    } catch (err) {
      /* private mode — just show it */
    }
    if (reduced || seen) {
      el.parentNode.removeChild(el);
      return done();
    }
    var bar = $("[data-loader-bar]", el);
    var count = $("[data-loader-count]", el);
    var p = 0;
    var fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    var fontsDone = false;
    fonts.then(function () {
      fontsDone = true;
    });

    var tick = setInterval(function () {
      // Ease toward 100, but hold at 92 until the fonts have actually landed.
      var ceiling = fontsDone ? 100 : 92;
      p += Math.max(0.6, (ceiling - p) * 0.13);
      if (p >= ceiling) p = ceiling;
      bar.style.setProperty("--p", (p / 100).toFixed(3));
      count.textContent = String(Math.round(p)).padStart(3, "0");
      if (p >= 100) {
        clearInterval(tick);
        setTimeout(function () {
          el.setAttribute("data-done", "true");
          try {
            sessionStorage.setItem("gx-seen", "1");
          } catch (err) {
            /* ignore */
          }
          done();
          setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
          }, 1000);
        }, 220);
      }
    }, 34);

    // Never let a stalled font block the page.
    setTimeout(function () {
      fontsDone = true;
    }, 2600);
  }

  /* ----------------------------------------------------------- reveals --
     One observer for every reveal on the page. Elements carry their own
     stagger index so groups read as a sequence rather than a pop. */
  function reveals() {
    var items = $$("[data-reveal]");
    items.forEach(function (el) {
      var group = el.closest("[data-stagger]");
      if (group) {
        var sibs = $$("[data-reveal]", group);
        el.style.setProperty("--d", String(sibs.indexOf(el)));
      }
    });

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.setAttribute("data-in", "true");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in", "true");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------ drawing --
     Measure each schematic stroke so the draw-on runs at a length that
     matches the path instead of a guessed constant. */
  function drawings() {
    if (reduced) return;
    $$("[data-draw] svg").forEach(function (svg) {
      $$(".dw-body, .dw-detail, .dw-accent", svg).forEach(function (g) {
        var kids = g.tagName.toLowerCase() === "g" ? $$("path, rect, circle, line", g) : [g];
        kids.forEach(function (node) {
          var len = 0;
          try {
            len = node.getTotalLength ? node.getTotalLength() : 0;
          } catch (err) {
            len = 0;
          }
          if (!len) len = 1400;
          node.style.setProperty("--len", Math.ceil(len + 4));
        });
      });
    });
  }

  /* ---------------------------------------------------- spec leader draw --
     The dotted leader between a label and its value draws left to right when
     the row arrives. It is the page's smallest piece of motion and the one
     that makes a datasheet feel like it is being filled in. */
  function leaders() {
    var rows = $$("[data-spec]");
    if (!rows.length) return;
    rows.forEach(function (row) {
      var leader = $(".spec__leader", row);
      if (!leader) return;
      if (reduced) {
        leader.style.setProperty("--leader", "1");
        return;
      }
      leader.style.setProperty("--leader", "0");
      leader.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    });
    if (reduced || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var siblings = $$("[data-spec]", entry.target.parentNode);
          var i = Math.max(0, siblings.indexOf(entry.target));
          var leader = $(".spec__leader", entry.target);
          setTimeout(
            function () {
              if (leader) leader.style.setProperty("--leader", "1");
            },
            Math.min(i, 8) * 55
          );
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    rows.forEach(function (r) {
      io.observe(r);
    });
  }

  /* ---------------------------------------------------------------- nav --
     Sticks and blurs past the fold, hides on downward scroll once well past
     it, and carries a hairline read-progress bar. */
  function nav() {
    var el = $("[data-nav]");
    var bar = $("[data-progress]");
    if (!el) return;
    var last = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      el.setAttribute("data-stuck", y > 24 ? "true" : "false");
      el.setAttribute("data-hidden", y > 480 && y > last + 4 ? "true" : "false");
      if (bar) bar.style.setProperty("--progress", docH > 0 ? (y / docH).toFixed(4) : "0");
      last = y;
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  /* --------------------------------------------------------------- menu -- */
  function menu() {
    var panel = $("[data-menu]");
    var openBtn = $("[data-menu-open]");
    var closeBtn = $("[data-menu-close]");
    if (!panel || !openBtn) return;
    panel.removeAttribute("hidden");

    function set(open) {
      panel.setAttribute("data-open", open ? "true" : "false");
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        var first = $(".menu__link", panel);
        if (first) first.focus({ preventScroll: true });
      } else {
        openBtn.focus({ preventScroll: true });
      }
    }
    openBtn.addEventListener("click", function () {
      set(true);
    });
    if (closeBtn)
      closeBtn.addEventListener("click", function () {
        set(false);
      });
    panel.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) set(false);
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && panel.getAttribute("data-open") === "true") set(false);
    });
  }

  /* -------------------------------------------------------------- theme -- */
  function theme() {
    var btn = $("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme");
      if (!current) {
        var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        current = systemDark ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("gx-theme", next);
      } catch (err) {
        /* ignore */
      }
    });
  }

  /* ------------------------------------------------------------- cursor --
     A brass ring that swells over anything interactive. Pointer devices only;
     it never replaces the native cursor for keyboard or touch users. */
  function cursor() {
    var ring = $("[data-cursor]");
    if (!ring || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      running = false;

    function loop() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      ring.style.transform = "translate3d(" + cx.toFixed(2) + "px," + cy.toFixed(2) + "px,0)";
      if (running) requestAnimationFrame(loop);
    }
    window.addEventListener("pointermove", function (ev) {
      x = ev.clientX;
      y = ev.clientY;
      if (!running) {
        running = true;
        cx = x;
        cy = y;
        ring.setAttribute("data-on", "true");
        requestAnimationFrame(loop);
      }
    });
    document.addEventListener("pointerover", function (ev) {
      var hot = ev.target.closest("a, button, input, select, summary, [data-magnetic]");
      ring.setAttribute("data-hot", hot ? "true" : "false");
    });
    document.addEventListener("mouseleave", function () {
      ring.setAttribute("data-on", "false");
    });
  }

  /* ----------------------------------------------------------- magnetic --
     Primary calls to action lean a few pixels toward the pointer. Small
     enough to feel like weight rather than a trick. */
  function magnetic() {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$("[data-magnetic]").forEach(function (el) {
      var raf = null;
      el.addEventListener("pointermove", function (ev) {
        var r = el.getBoundingClientRect();
        var dx = (ev.clientX - (r.left + r.width / 2)) * 0.18;
        var dy = (ev.clientY - (r.top + r.height / 2)) * 0.3;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
        });
      });
      el.addEventListener("pointerleave", function () {
        if (raf) cancelAnimationFrame(raf);
        el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
        el.style.transform = "";
        setTimeout(function () {
          el.style.transition = "";
        }, 520);
      });
    });
  }

  /* --------------------------------------------------------- hero light --
     The ambient lamp over the hero follows the pointer, which is what makes
     the brushed-metal panels read as metal rather than as flat fills. */
  function heroLight() {
    var light = $("[data-hero-light]");
    if (!light || reduced) return;
    var hero = light.closest(".hero") || light.parentNode;
    hero.addEventListener(
      "pointermove",
      function (ev) {
        var r = hero.getBoundingClientRect();
        light.style.setProperty("--mx", (((ev.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
        light.style.setProperty("--my", (((ev.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------ stepper --
     Technology page: the cutaway is sticky while the nine steps scroll past.
     The active step lights its zone in the drawing and moves the travelling
     container along the transport path — the drawing explains the step. */
  function stepper() {
    var root = $("[data-stepper]");
    if (!root) return;
    var steps = $$("[data-step]", root);
    var svg = $("[data-cutaway]");
    if (!steps.length) return;

    var zones = svg ? $$("[data-zone]", svg) : [];
    var path = svg ? svg.querySelector("#gx-path") : null;
    var traveller = svg ? svg.querySelector("[data-traveller]") : null;
    var pathLen = path && path.getTotalLength ? path.getTotalLength() : 0;

    function activate(n) {
      steps.forEach(function (s) {
        s.setAttribute("data-active", s.getAttribute("data-step") === String(n) ? "true" : "false");
      });
      zones.forEach(function (z) {
        var on = z.getAttribute("data-zone") === String(n);
        z.style.opacity = on ? "1" : "0.32";
        z.style.transition = "opacity 0.5s cubic-bezier(0.16,1,0.3,1)";
      });
      if (traveller && path && pathLen) {
        var t = (n - 1) / Math.max(1, steps.length - 1);
        var pt = path.getPointAtLength(pathLen * t);
        traveller.setAttribute("transform", "translate(" + pt.x + "," + pt.y + ")");
        traveller.style.transition = reduced
          ? "none"
          : "transform 0.75s cubic-bezier(0.65,0,0.35,1), opacity 0.4s linear";
        traveller.style.opacity = "1";
      }
    }

    activate(1);
    if (reduced || !("IntersectionObserver" in window)) {
      steps.forEach(function (s) {
        s.setAttribute("data-active", "true");
      });
      zones.forEach(function (z) {
        z.style.opacity = "1";
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        // Pick the entry closest to the middle of the viewport.
        var best = null;
        entries.forEach(function (en) {
          if (en.isIntersecting) best = en;
        });
        if (best) activate(Number(best.target.getAttribute("data-step")));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    steps.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ------------------------------------------------------------- ticker --
     Duplicate the group so the marquee loops seamlessly at -50%. */
  function ticker() {
    $$("[data-ticker]").forEach(function (track) {
      var group = $(".ticker__group", track);
      if (!group) return;
      var clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* --------------------------------------------------------- calculator --
     Retailer benefit model. Every coefficient is unpublished, so the readout
     stays a dash and states why — the controls exist to show which inputs the
     model takes, not to invent an answer. */
  function calculator() {
    var root = $("[data-calc]");
    if (!root) return;
    $$("input[type=range]", root).forEach(function (input) {
      var out = $("#" + input.id + "-out");
      function sync() {
        if (out) out.textContent = Number(input.value).toLocaleString("en-GB");
      }
      input.addEventListener("input", sync);
      sync();
    });
  }

  /* ------------------------------------------------- page transition out --
     Same-origin navigations drop a curtain so pages hand over rather than
     flash. Modifier-clicks, new tabs and hash links are left alone. */
  function transitions() {
    var wipe = $("[data-wipe]");
    if (!wipe || reduced) return;
    document.addEventListener("click", function (ev) {
      var a = ev.target.closest("a");
      if (!a || ev.defaultPrevented) return;
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var url;
      try {
        url = new URL(a.href, location.href);
      } catch (err) {
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      ev.preventDefault();
      wipe.setAttribute("data-out", "true");
      setTimeout(function () {
        location.href = url.href;
      }, 420);
    });
    // Restore on back/forward out of the bfcache.
    window.addEventListener("pageshow", function (ev) {
      if (ev.persisted) wipe.setAttribute("data-out", "false");
    });
  }

  /* ---------------------------------------------------------------- misc -- */
  function year() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------------------------------------------------------------- boot -- */
  function start() {
    reveals();
    leaders();
    drawings();
    nav();
    menu();
    theme();
    cursor();
    magnetic();
    heroLight();
    stepper();
    ticker();
    calculator();
    transitions();
    year();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loader(start);
    });
  } else {
    loader(start);
  }
})();
