// Mobile nav toggle
(function () {
  const btn = document.getElementById("mnav");
  const menu = document.getElementById("mmenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    btn.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => menu.classList.add("hidden"))
  );
})();

// Year + date stamps
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  const d = document.getElementById("topdate");
  if (d) {
    const n = new Date();
    const pad = (x) => String(x).padStart(2, "0");
    d.textContent = `${n.getFullYear()}.${pad(n.getMonth() + 1)}.${pad(n.getDate())}`;
  }
})();

// One-shot logo flicker on load (skips if reduced motion)
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  const mark = document.getElementById("brand-mark");
  if (!mark) return;
  // Trigger after first paint so users see the flicker, not a blank
  requestAnimationFrame(() => {
    mark.classList.add("logo-flicker");
    setTimeout(() => mark.classList.remove("logo-flicker"), 1200);
  });
})();

// Reveal-on-scroll for .reveal elements
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (reduce) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
})();

// Count-up animation on elements with data-counter
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll("[data-counter]");
  if (!els.length) return;

  const animate = (el, target) => {
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    const duration = 1400; // ms
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(target * ease(t)));
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => animate(el, parseInt(el.dataset.counter, 10)));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = parseInt(e.target.dataset.counter, 10);
          if (!isNaN(target)) animate(e.target, target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
})();
