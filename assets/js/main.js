(() => {
  const body = document.body;
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".header__menu");
  const nav = document.querySelector("#global-nav");
  const faqItems = document.querySelectorAll(".faqItem");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setMenuState = (isOpen) => {
    body.classList.toggle("is-nav-open", isOpen);
    menuButton?.setAttribute("aria-expanded", String(isOpen));
  };

  const closeMenu = () => setMenuState(false);

  menuButton?.addEventListener("click", () => {
    const isOpen = body.classList.contains("is-nav-open");
    setMenuState(!isOpen);
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("is-nav-open")) return;
    if (!(event.target instanceof Element)) return;

    const isInsideHeader = event.target.closest(".header");
    if (!isInsideHeader) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  nav?.addEventListener("click", (event) => {
    const link = event.target instanceof Element
      ? event.target.closest("a")
      : null;

    if (link) closeMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      closeMenu();

      const headerHeight = header?.offsetHeight ?? 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      });

      history.pushState(null, "", hash);
    });
  });

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
})();