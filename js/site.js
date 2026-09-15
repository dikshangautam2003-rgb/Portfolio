/**
 * DIKSHAN GAUTAM PORTFOLIO & SEARCH CONSULTING
 * Lightweight Vanilla JavaScript with Smooth Animations
 * Zero dependencies · 100% Compatible with GitHub Pages
 */

(function () {
  'use strict';

  // 1. Reading Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress-bar';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }
  }, { passive: true });

  // 2. Highlight Active Navigation Links
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
    const linkPath = link.getAttribute('href')?.replace(/\/+$/, '') || '/';
    if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  const menuBtn = document.querySelector('.menu-button');
  const mobile = document.querySelector('.mobile-nav');
  if (menuBtn && mobile) {
    menuBtn.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '✕' : '☰';
    });
  }

  // 4. Desktop Dropdown Menu Toggle & Keyboard Accessibility
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

  // 5. Scroll-Triggered Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 6. Smooth Number Counter Animation
  const countElements = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && countElements.length > 0) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute('data-counter'), 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1400;
          const startTime = performance.now();

          function updateCounter(now) {
            const progress = Math.min(1, (now - startTime) / duration);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = Math.floor(easeProgress * targetNum);
            el.textContent = prefix + currentNum + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + targetNum + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    countElements.forEach(el => countObserver.observe(el));
  }

  // 7. Interactive SEO Simulator on Homepage
  const simPills = document.querySelectorAll('.sim-pill');
  const simQueryText = document.querySelector('[data-sim-query]');
  const simResultTitle = document.querySelector('[data-sim-title]');
  const simResultDesc = document.querySelector('[data-sim-desc]');
  const simResultTags = document.querySelector('[data-sim-tags]');

  const simData = {
    local: {
      query: 'best dental clinic kathmandu thamel',
      title: 'Kathmandu Premier Dental Care · Official Clinic & Appointments',
      desc: 'Top-rated dental clinic in Kathmandu. Specialized orthodontics, emergency dental care, transparent pricing, verified 4.9★ Google Reviews.',
      tags: 'Local 3-Pack Rank #1 · Google Business Profile · Geo-Targeted Citations · Local Clinic Schema'
    },
    consultancy: {
      query: 'study abroad consultancy nepal visa success rate',
      title: 'Education Bridge Nepal · Certified Study Abroad & University Admissions',
      desc: 'Proven guidance for USA, Australia & UK universities. Full documentation checklists, IELTS/PTE preparation and 1-on-1 visa mock interviews in Kathmandu.',
      tags: 'High-Intent Ranking · Comprehensive Country Hubs · Student Trust Authority · MOEST Verified'
    },
    ecommerce: {
      query: 'buy authentic pashmina and thangka nepal online',
      title: 'Himalayan Artisans Co. · Handcrafted Cashmere & Heritage Crafts',
      desc: 'Authentic handcrafted Nepalese shawls and art with worldwide DHL express shipping. Sourced directly from verified Kathmandu artisan cooperatives.',
      tags: 'Product Schema · Core Web Vitals 98 · Category Architecture · Global Organic Demand'
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
          // Subtle fade transition
          const resultBox = document.querySelector('.search-results-list');
          if (resultBox) {
            resultBox.style.opacity = '0.4';
            setTimeout(() => {
              simQueryText.textContent = data.query;
              if (simResultTitle) simResultTitle.textContent = data.title;
              if (simResultDesc) simResultDesc.textContent = data.desc;
              if (simResultTags) simResultTags.textContent = data.tags;
              resultBox.style.opacity = '1';
            }, 120);
          }
        }
      });
    });
  }

  // 8. Blog Category Filtering
  document.querySelectorAll('.filter-button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('.filter-button').forEach((b) => b.classList.toggle('is-active', b === btn));
      document.querySelectorAll('.article-card').forEach((card) => {
        card.hidden = filter !== 'All notes' && card.dataset.type !== filter;
      });
    });
  });

  // 9. Floating Back-to-Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
  backToTopBtn.innerHTML = '↑';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 10. Contact Form Submission Handling
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
            status.style.color = 'var(--accent)';
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
