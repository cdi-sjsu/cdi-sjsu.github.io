const header = document.querySelector("[data-site-navigation]");

if (header) {
  const toggle = header.querySelector("[data-nav-toggle]");
  const links = header.querySelector("[data-nav-links]");
  const originalParent = header.parentElement;
  const originalSibling = header.nextElementSibling;
  let compact;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close menu" : "Menu";
    links.hidden = compact && !open;
  }

  function updateLayout() {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const layoutWidth = document.documentElement.getBoundingClientRect().width;
    const nextCompact = layoutWidth <= 67.25 * rootFontSize;

    if (compact === nextCompact) return;

    compact = nextCompact;
    document.body.dataset.navLayout = compact ? "compact" : "expanded";

    if (compact) {
      document.body.prepend(header);
    } else {
      originalParent.insertBefore(header, originalSibling);
    }
    setOpen(false);
  }

  header.dataset.navReady = "";
  updateLayout();

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false);
      toggle.focus();
    }
  });

  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(updateLayout);
  });
  resizeObserver.observe(document.documentElement);
}
