
(() => {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.nav-dropdown-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      if (!menu) return;
      const open = menu.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-dropdown-menu.is-open').forEach((menu) => {
      if (!menu.parentElement.contains(e.target)) {
        menu.classList.remove('is-open');
        const trigger = menu.previousElementSibling;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form)
        });
        const result = await response.json();
        if (result.success) {
          form.reset();
          if (status) status.textContent = 'Thanks — your message has been sent.';
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        if (status) status.textContent = 'Something went wrong. Please email hello@dikshangautam.com.np.';
      } finally {
        if (button) {
          button.disabled = false;
          button.innerHTML = 'Send Inquiry <span>→</span>';
        }
      }
    });
  }
})();
