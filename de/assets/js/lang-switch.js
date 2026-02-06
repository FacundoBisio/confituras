(() => {
  const DOMAIN_BY_LANG = {
    es: "https://confituras.palmelita.es",
    en: "https://jam.palmelita.com",
    de: "https://konfitueren.palmelita.com",
    fr: "https://confitures.palmelita.com",
  };

  const HOST_TO_LANG = {
    "confituras.palmelita.es": "es",
    "www.confituras.palmelita.es": "es",

    "jam.palmelita.com": "en",
    "www.jam.palmelita.com": "en",

    "konfitueren.palmelita.com": "de",
    "www.konfitueren.palmelita.com": "de",

    "confitures.palmelita.com": "fr",
    "www.confitures.palmelita.com": "fr",
  };

  const SUPPORTED = new Set(["es", "en", "de", "fr"]);

  function detectLang() {
    const host = window.location.hostname.toLowerCase();
    if (HOST_TO_LANG[host]) return HOST_TO_LANG[host];

    // Local fallback: /en/index.html, /de/...
    const seg = window.location.pathname.split("/").filter(Boolean)[0];
    if (SUPPORTED.has(seg)) return seg;

    return "es";
  }

  function normalizedPath() {
    // Si estás local en /en/xxx.html -> lo normaliza a /xxx.html
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length && SUPPORTED.has(parts[0])) parts.shift();
    return "/" + (parts.join("/") || "index.html");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const current = detectLang();
    const path = normalizedPath();
    const suffix = window.location.search + window.location.hash;

    document.querySelectorAll(".lang-flag[data-lang]").forEach((a) => {
      const lang = a.dataset.lang;
      const base = DOMAIN_BY_LANG[lang];
      if (!base) return;

      a.href = base + path + suffix;

      a.classList.toggle("active", lang === current);
      a.setAttribute("aria-current", lang === current ? "true" : "false");

      a.addEventListener("click", (e) => {
        if (lang === current) e.preventDefault();
      });
    });
  });
})();
