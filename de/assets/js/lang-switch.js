(() => {
  const DOMAIN_BY_LANG = {
    es: "https://confituras.palmelita.es",
    en: "https://jam.palmelita.com",
    de: "https://konfitueren.palmelita.com",
    fr: "https://confitures.palmelita.com",
  };

  const HOST_TO_LANG = {
    "confituras.palmelita.es": "es",
    "jam.palmelita.com": "en",
    "konfitueren.palmelita.com": "de",
    "confitures.palmelita.com": "fr",
  };

  const SUPPORTED = new Set(["es", "en", "de", "fr"]);

  function detectLang() {
    const host = window.location.hostname.toLowerCase();
    if (HOST_TO_LANG[host]) return HOST_TO_LANG[host];

    // fallback local (/es/index.html)
    const seg = window.location.pathname.split("/").filter(Boolean)[0];
    if (SUPPORTED.has(seg)) return seg;

    return "es";
  }

  function normalizedPath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length && SUPPORTED.has(parts[0])) parts.shift(); // remove /es /en /de /fr in local

    const path = "/" + (parts.join("/") || "index.html");
    return path + window.location.search + window.location.hash;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const current = detectLang();
    const path = normalizedPath();

    document.querySelectorAll(".lang-flag[data-lang]").forEach((a) => {
      const lang = a.dataset.lang;
      const target = DOMAIN_BY_LANG[lang];

      if (target) a.href = target + path;

      // visual state (si querés)
      a.classList.toggle("active", lang === current);
      a.setAttribute("aria-current", lang === current ? "true" : "false");

      // si ya estás en el idioma actual, no navegues
      a.addEventListener("click", (e) => {
        if (lang === current) {
          e.preventDefault();
        }
      });
    });
  });
})();
