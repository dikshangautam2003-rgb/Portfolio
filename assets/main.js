document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      var status = form.querySelector('.form-status');
      if (status) status.textContent = 'Sending…';
      // Native form submission proceeds (Web3Forms endpoint); this just gives feedback.
    });
  }
});
