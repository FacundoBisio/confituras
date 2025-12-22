const translations = {
    es: {
        home: "mermeladas palmelita",
        products: "productos",
        about: "nosotros", // nav link if used
        contact: "contacto",
        hero_title: "Maestros Confiteros",
        hero_subtitle: "Islas Canarias - Desde 1968",
        intro_title: "Tradición y Sabor",
        intro_text: "Elaboramos nuestras mermeladas seleccionando las mejores frutas frescas de Canarias. Sin conservantes ni colorantes, solo fruta y azúcar para conseguir un sabor auténtico.",
        prod_kiwi: "Kiwi",
        prod_papaya_orange: "Papaya y Naranja",
        prod_papaya_orange_diet: "Papaya y Naranja (Diet)",
        prod_mango: "Mango"
    },
    en: {
        home: "palmelita jam",
        products: "products",
        about: "about us",
        contact: "contact",
        hero_title: "Master Confectioners",
        hero_subtitle: "Canary Islands - Since 1968",
        intro_title: "Tradition and Flavor",
        intro_text: "We make our jams selecting the best fresh fruits from the Canary Islands. No preservatives or colorings, just fruit and sugar to achieve an authentic taste.",
        prod_kiwi: "Kiwi",
        prod_papaya_orange: "Papaya & Orange",
        prod_papaya_orange_diet: "Papaya & Orange (Diet)",
        prod_mango: "Mango"
    },
    de: {
        home: "palmelita konfitüre",
        products: "produkte",
        about: "über uns",
        contact: "kontakt",
        hero_title: "Konditormeister",
        hero_subtitle: "Kanarische Inseln - Seit 1968",
        intro_title: "Tradition und Geschmack",
        intro_text: "Wir stellen unsere Konfitüren aus den besten frischen Früchten der Kanarischen Inseln her.",
        prod_kiwi: "Kiwi",
        prod_papaya_orange: "Papaya & Orange",
        prod_papaya_orange_diet: "Papaya & Orange (Diät)",
        prod_mango: "Mango"
    },
    fr: {
        home: "confiture palmelita",
        products: "produits",
        about: "à propos",
        contact: "contact",
        hero_title: "Maîtres Confiseurs",
        hero_subtitle: "Îles Canaries - Depuis 1968",
        intro_title: "Tradition et Saveur",
        intro_text: "Nous fabriquons nos confitures en sélectionnant les meilleurs fruits frais des îles Canaries.",
        prod_kiwi: "Kiwi",
        prod_papaya_orange: "Papaye et Orange",
        prod_papaya_orange_diet: "Papaye et Orange (Régime)",
        prod_mango: "Mangue"
    }
};

document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll(".lang-btn");

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.id.split("-")[1];
      setLanguage(lang);

      // Update active state
      langBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Default to ES
  setLanguage("es");
  document.getElementById("lang-es").classList.add("active");
});

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
