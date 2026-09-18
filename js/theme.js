// js/theme.js
// Simple dark‑mode toggle that stores preference in localStorage

(function() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const setTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    toggle.textContent = dark ? '☀️' : '🌙';
  };

  // Initialize from saved preference or system default
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved ? saved === 'dark' : prefersDark);

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(!isDark);
  });
})();
