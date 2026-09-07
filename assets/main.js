
(() => {
  const toggle = document.querySelector('#menuToggle');
  const mobile = document.querySelector('#mobileNav');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const searchForm = document.querySelector('#siteSearchForm');
  const searchInput = document.querySelector('#siteSearchInput');
  const results = document.querySelector('#searchResults');
  if (searchForm && searchInput && results) {
    fetch('/search-index.json')
      .then(r => r.json())
      .then(index => {
        const render = q => {
          const query = q.trim().toLowerCase();
          if (!query) {
            results.innerHTML = '<p class="note">Search Education, Products, Travel or Research.</p>';
            return;
          }
          const words = query.split(/\s+/).filter(Boolean);
          const ranked = index.map(item => {
            const hay = (item.title + ' ' + item.description + ' ' + (item.keywords || []).join(' ')).toLowerCase();
            const score = words.reduce((s,w) => s + (hay.includes(w) ? 1 : 0), 0);
            return {...item, score};
          }).filter(x => x.score).sort((a,b) => b.score-a.score);
          results.innerHTML = ranked.length ? ranked.slice(0,20).map(x =>
            `<div class="result"><a href="${x.url}">${x.title}</a><p>${x.description}</p></div>`
          ).join('') : '<p class="note">No close matches yet. Try a broader phrase such as “college”, “earbuds”, “treks” or “study abroad”.</p>';
        };
        searchForm.addEventListener('submit', e => { e.preventDefault(); render(searchInput.value); });
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        if (q) { searchInput.value = q; render(q); }
      })
      .catch(() => { results.innerHTML = '<p class="note">Search is temporarily unavailable. Browse the categories above instead.</p>'; });
  }
})();
