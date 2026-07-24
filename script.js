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

// RKN Academy — Contact page interactions.
// Reuses the .rkn-reveal scroll observer and mobile nav from script.js.
// This file only adds contact-specific behaviour (form handling).

(function () {
  // Footer year (in case script.js hasn't set it yet on this page)
  var yearEl = document.getElementById('year');
  if (yearEl && !yearEl.textContent) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Ensure reveal animation runs for elements on this page
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
    document.querySelectorAll('.rkn-reveal:not(.is-visible)').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.rkn-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Enquiry form — front-end validation + friendly status message.
  // Replace the submit block with your backend / email service integration.
  var form = document.querySelector('[data-rkn-form]');
  var status = document.querySelector('[data-rkn-form-status]');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#rkn-name');
      var phone = form.querySelector('#rkn-phone');

      if (!name.value.trim() || !phone.value.trim()) {
        if (status) {
          status.style.color = '#c62828';
          status.textContent = 'Please enter your name and phone number.';
        }
        return;
      }

      // Basic phone check (10+ digits after stripping)
      var digits = phone.value.replace(/\D/g, '');
      if (digits.length < 10) {
        if (status) {
          status.style.color = '#c62828';
          status.textContent = 'Please enter a valid phone number.';
        }
        return;
      }

      if (status) {
        status.style.color = '';
        status.textContent = 'Thank you! Your enquiry has been received. Our team will contact you shortly.';
      }
      form.reset();
    });
  }
})();
