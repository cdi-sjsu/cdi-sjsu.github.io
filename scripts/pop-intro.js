(() => {
  const intro = document.querySelector("[data-pop-intro]");
  const field = document.querySelector("[data-pop-intro-field]");

  if (!intro || !field) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    intro.remove();
    return;
  }

  try {
    const storageKey = "cdi:pop-intro-played";

    if (window.localStorage.getItem(storageKey) === "true") {
      intro.remove();
      return;
    }

    window.localStorage.setItem(storageKey, "true");
  } catch {
    intro.remove();
    return;
  }

  const assets = [
    {
      src: "public/images/cdi-logo-transparent.png",
      alt: "CDI logo",
    },
    {
      src: "public/images/cdi-logo-transparent.png",
      alt: "CDI logo",
    },
    {
      src: "public/images/cdi-logo-transparent.png",
      alt: "CDI logo",
    },
    {
      src: "public/images/cdi-logo-transparent.png",
      alt: "CDI logo",
    },
    {
      src: "public/images/chip-character-dizzy.png",
      alt: "Dizzy chip character",
    },
    {
      src: "public/images/chip-character-sad.png",
      alt: "Sad chip character",
    },
    {
      src: "public/images/chip-character-angry.png",
      alt: "Angry chip character",
    },
    {
      src: "public/images/chip-character-knockout.png",
      alt: "Knockout chip character",
    },
    {
      src: "public/images/chip-character-heart-eyes.png",
      alt: "Heart eyes chip character",
    },
    {
      src: "public/images/chip-character-shades.png",
      alt: "Shades chip character",
    },
    {
      src: "public/images/chip-character-surprised.png",
      alt: "Surprised chip character",
    },
    {
      src: "public/images/chip-character-smile.png",
      alt: "Smiling chip character",
    },
  ];

  function seededNoise(row, column, salt = 0) {
    const value = Math.sin(row * 127.1 + column * 311.7 + salt * 74.7) *
      43758.5453;

    return value - Math.floor(value);
  }

  const introDuration = 2500;
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const baseSize = (window.innerWidth < 40 * rootFontSize ? 4.75 : 6.5) *
    rootFontSize;
  const step = Math.round(baseSize * 0.72);
  const columnCount = Math.ceil(window.innerWidth / step) + 4;
  const rowCount = Math.ceil(window.innerHeight / step) + 4;
  const startX = -step;
  const startY = -step;

  const fragment = document.createDocumentFragment();

  for (let row = 0; row < rowCount; row += 1) {
    for (let column = 0; column < columnCount; column += 1) {
      const asset =
        assets[Math.floor(seededNoise(row, column, 4) * assets.length)];
      const image = document.createElement("img");
      const offsetX = row % 2 === 0 ? 0 : step / 2;
      const x = startX + column * step + offsetX;
      const y = startY + row * step;
      const delay = Math.round(seededNoise(row, column, 1) * 1700);
      const rotation = Math.round(seededNoise(row, column, 2) * 34) - 17;
      const size = Math.round(
        baseSize * (0.88 + seededNoise(row, column, 3) * 0.2),
      );

      image.className = "pop-intro__image";
      image.src = asset.src;
      image.alt = "";
      image.draggable = false;
      image.style.setProperty("--pop-x", `${x}px`);
      image.style.setProperty("--pop-y", `${y}px`);
      image.style.setProperty("--pop-size", `${size}px`);
      image.style.setProperty(
        "--pop-delay",
        `${delay}ms`,
      );
      image.style.setProperty("--pop-rotation", `${rotation}deg`);

      fragment.append(image);
    }
  }

  field.append(fragment);

  window.setTimeout(() => {
    intro.remove();
  }, introDuration);
})();
