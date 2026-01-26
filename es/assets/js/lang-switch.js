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

    // fallback local (si abrís /en/index.html)
    const seg = window.location.pathname.split("/").filter(Boolean)[0];
    if (SUPPORTED.has(seg)) return seg;

    return "es";
  }

  function normalizedPath() {
    // Mantener path /contacto.html y eliminar prefijo /en /es /de /fr si estás en local
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length && SUPPORTED.has(parts[0])) parts.shift();

    const path = "/" + parts.join("/");
    return path + window.location.search + window.location.hash;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const current = detectLang();
    const path = normalizedPath();

    document.querySelectorAll(".lang-flag[data-lang]").forEach((a) => {
      const lang = a.dataset.lang;
      if (DOMAIN_BY_LANG[lang]) a.href = DOMAIN_BY_LANG[lang] + path;

      a.classList.toggle("active", lang === current);
      a.setAttribute("aria-current", lang === current ? "true" : "false");
    });
  });
})();
