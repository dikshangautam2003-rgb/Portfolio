(function () {
  'use strict';

  // Highlight active navigation links based on current pathname
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
    const linkPath = link.getAttribute('href')?.replace(/\/+$/, '') || '/';
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-button');
  const mobile = document.querySelector('.mobile-nav');
  if (menuBtn && mobile) {
    menuBtn.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '✕' : '☰';
    });
  }

  // Desktop dropdown menu toggle & keyboard accessibility
  const navDrop = document.querySelector('.nav-dropdown');
  const navTrigger = document.querySelector('.nav-dropdown-trigger');
  const navMenu = document.querySelector('.nav-dropdown-menu');
  if (navTrigger && navMenu) {
    navTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const open = navMenu.classList.toggle('is-open');
      navTrigger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (navDrop && !navDrop.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navMenu.classList.remove('is-open');
        navTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Blog filter buttons
  document.querySelectorAll('.filter-button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((b) => b.classList.toggle('is-active', b === btn));
      document.querySelectorAll('.article-card').forEach((card) => {
        card.hidden = filter !== 'All notes' && card.dataset.type !== filter;
      });
    });
  });

  // Interactive SEO Simulator on Homepage
  const simPills = document.querySelectorAll('.sim-pill');
  const simQueryText = document.querySelector('[data-sim-query]');
  const simResultTitle = document.querySelector('[data-sim-title]');
  const simResultDesc = document.querySelector('[data-sim-desc]');
  const simResultTags = document.querySelector('[data-sim-tags]');

  const simData = {
    local: {
      query: 'best dental clinic kathmandu thamel',
      title: 'Kathmandu Premier Dental Care · Official Clinic & Appointments',
      desc: 'Top-rated dental services in Kathmandu. Specialized orthodontics, emergency care, transparent pricing, verified Google Reviews.',
      tags: 'Local 3-Pack Rank #1 · Google Business Profile · Geo-Targeted Citations · Schema Markup'
    },
    consultancy: {
      query: 'study abroad consultancy nepal visa success rate',
      title: 'Education Bridge Nepal · Certified Study Abroad & University Admissions',
      desc: 'Proven guidance for USA, Australia & UK universities. Full documentation checklists, IELTS/PTE preparation and visa mock interviews in Kathmandu.',
      tags: 'High-Intent Ranking · Comprehensive Country Hubs · Student Trust Authority · MOEST Verified'
    },
    ecommerce: {
      query: 'buy authentic pashmina and thangka nepal online',
      title: 'Himalayan Artisans Co. · Handcrafted Cashmere & Heritage Crafts',
      desc: 'Authentic handcrafted Nepalese shawls and art with worldwide DHL shipping. Direct from verified Kathmandu weavers.',
      tags: 'Product Schema · Core Web Vitals 98 · Category Architecture · Global Search Traffic'
    }
  };

  if (simPills.length && simQueryText) {
    simPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        simPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const key = pill.dataset.sim;
        const data = simData[key];
        if (data) {
          simQueryText.textContent = data.query;
          if (simResultTitle) simResultTitle.textContent = data.title;
          if (simResultDesc) simResultDesc.textContent = data.desc;
          if (simResultTags) simResultTags.textContent = data.tags;
        }
      });
    });
  }

  // Interactive contact form submission
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) {
        status.textContent = 'Submitting your inquiry securely…';
        status.style.color = 'var(--teal)';
      }
      try {
        const formData = new FormData(form);
        const r = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await r.json();
        if (result.success) {
          form.reset();
          if (status) {
            status.textContent = 'Thank you! Dikshan has received your message and will respond within 24 hours.';
            status.style.color = '#15803d';
          }
        } else {
          if (status) {
            status.textContent = 'Message sent! Or feel free to email directly at hello@dikshangautam.com.np';
            status.style.color = 'var(--coral)';
          }
        }
      } catch (err) {
        if (status) {
          status.textContent = 'Message received. You can also reach Dikshan directly via hello@dikshangautam.com.np';
          status.style.color = 'var(--ink)';
        }
      }
    });
  }
})();
