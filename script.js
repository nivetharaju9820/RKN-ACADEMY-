// RKN Academy — Homepage interactions
(function () {
  // Update footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var burger = document.querySelector('[data-rkn-burger]');
  var links = document.querySelector('[data-rkn-links]');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rkn-reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.rkn-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();

// RKN Academy — News section interactions
// Reuses the existing .rkn-reveal scroll-reveal pattern from script.js.
// If your main script.js is already loaded on the page, no extra JS is required —
// the .rkn-reveal observer will pick up the new section automatically.
// This file is a safe standalone fallback in case you want to load it alone.

(function () {
  var nodes = document.querySelectorAll('#news .rkn-reveal');
  if (!nodes.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach(function (el) { observer.observe(el); });
  } else {
    nodes.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
