(function () {
  const toggle = document.getElementById("menuToggle");
  const mobile = document.getElementById("mobileNav");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }
  document.querySelectorAll("[data-mobile-parent]").forEach(function (button) {
    button.addEventListener("click", function () {
      const target = document.getElementById(button.getAttribute("aria-controls"));
      const open = target.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      const mark = button.querySelector(".chevron");
      if (mark) mark.textContent = open ? "−" : "+";
    });
  });
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();