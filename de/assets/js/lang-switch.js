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
    const host = window.location.hostname.toLowerCase().replace(/^www\./, "");
    return HOST_TO_LANG[host] || "es";
  }

  function normalizedPath() {
    // si estás en local tipo /en/contacto.html -> lo normaliza a /contacto.html
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
      const base = DOMAIN_BY_LANG[lang];
      if (!base) return;

      // si el mismo archivo no existe en otro idioma, al menos cae a /index.html
      const finalPath = path === "/" ? "/index.html" : path;
      a.href = base + finalPath;

      // NO marcamos active (vos querés todas iguales)
      a.removeAttribute("aria-current");
    });
  });
})();
