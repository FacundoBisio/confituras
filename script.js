const translations = {
    es: {
        home: "mermeladas palmelita",
        products: "productos",
        our_products: "Nuestros Productos",
        about: "nosotros",
        contact: "contacto",
        news: "noticias",
        hero_title: "Maestros Confiteros",
        hero_subtitle: "Islas Canarias - Desde 1968",
        splash_welcome: "Bienvenidos",
        enter_site: "Entrar",
        intro_title: "Tradición y Sabor",
        intro_text: "Elaboramos nuestras mermeladas seleccionando las mejores frutas frescas de Canarias. Sin conservantes ni colorantes, solo fruta y azúcar para conseguir un sabor auténtico.",
        prod_kiwi: "Kiwi",
        prod_papaya_orange: "Papaya y Naranja",
        prod_papaya_orange_diet: "Papaya y Naranja (Diet)",
        prod_mango: "Mango",
        prod_guayaba: "Guayaba",
        prod_pina: "Piña",
        prod_fresa: "Fresa",
        prod_naranja: "Naranja",
        prod_pimiento: "Pimiento",
        prod_limon: "Limón",
        // Footer
        footer_contact: "Contacto",
        footer_distributors: "Distribuidores - Profesionales",
        footer_legal: "Aviso Legal",
        footer_copyright: "© 2026 Palmelitas Jams / Sitios recomendados jam.palmelita.com",
        // Contact Page
        contact_title: "¡Ponte en contacto con nosotros rellenando el formulario!",
        contact_email: "E-MAIL DE CONTACTO",
        contact_name: "NOMBRE",
        contact_message: "COMENTARIO",
        contact_submit: "ENVIAR",
        // News Page Items
        news_1_title: "Palmelita seleccionada como producto local para Madrid Fusión 2023",
        news_1_meta: "Diario de Avisos",
        news_1_date: "Miércoles, 18 de enero de 2023",
        news_1_excerpt: "La gastronomía de Candelaria estará presente en Madrid Fusión...",
        news_2_title: "Palmelita seleccionada para Gran Feria de Alimentación de España El Corte Inglés",
        news_2_meta: "Diario Crítico, Salud y Consumo",
        news_2_date: "Miércoles, 04 de marzo de 2022",
        news_2_excerpt: "El Corte Inglés inaugura la Gran Feria de la Alimentación en el marco de su 75 Aniversario...",
        news_3_title: "«De Bajamar al corazón de Europa»",
        news_3_meta: "Diario de Avisos",
        news_3_date: "Domingo, 21 de junio de 2015",
        news_3_excerpt: "Confituras Palmelita da el salto a Alemania con unos productos de gran calidad...",
        news_4_title: "«Palmelita comienza a exportar sus confituras a Alemania»",
        news_4_meta: "La Opinión de Tenerife",
        news_4_date: "Viernes, 19 de junio de 2015",
        news_4_excerpt: "...Confituras Palmelita fue creada en 1968 por el maestro pastelero Werner Bittermann (1928-2014) en su pequeño obrador...",
        cofinance_text: "Proyecto cofinanciado por el Fondo Europeo de Desarrollo Regional (FEDER)"
    },
    en: {
        home: "palmelita jam",
        products: "products",
        our_products: "Our Products",
        about: "about us",
        contact: "contact",
        news: "news",
        hero_title: "Master Confectioners",
        hero_subtitle: "Canary Islands - Since 1968",
        splash_welcome: "Welcome",
        enter_site: "Enter",
        intro_title: "Tradition and Flavor",
        intro_text: "We make our jams selecting the best fresh fruits from the Canary Islands. No preservatives or colorings, just fruit and sugar to achieve an authentic taste.",
        prod_kiwi: "Kiwi",
        prod_papaya_orange: "Papaya & Orange",
        prod_papaya_orange_diet: "Papaya & Orange (Diet)",
        prod_mango: "Mango",
        prod_guayaba: "Guava",
        prod_pina: "Pineapple",
        prod_fresa: "Strawberry",
        prod_naranja: "Orange",
        prod_pimiento: "Pepper",
        prod_limon: "Lemon",
        // Footer
        footer_contact: "Contact",
        footer_distributors: "Distributors - Professionals",
        footer_legal: "Legal Conditions",
        footer_copyright: "© 2026 Palmelitas Jams / Recommended sites jam.palmelita.com",
        // Contact Page
        contact_title: "Get in touch with us by filling out the form!",
        contact_email: "CONTACT E-MAIL",
        contact_name: "NAME",
        contact_message: "COMMENT",
        contact_submit: "SEND",
        // News Page Items
        news_1_title: "Palmelita selected as local product for Madrid Fusión 2023",
        news_1_meta: "Diario de Avisos",
        news_1_date: "Wednesday, January 18, 2023",
        news_1_excerpt: "The gastronomy of Candelaria will be present at Madrid Fusión...",
        news_2_title: "Palmelita selected for Great Spanish Food Fair El Corte Inglés",
        news_2_meta: "Diario Crítico, Health and Consumption",
        news_2_date: "Wednesday, March 04, 2022",
        news_2_excerpt: "El Corte Inglés inaugurates the Great Food Fair within the framework of its 75th Anniversary...",
        news_3_title: "«From Bajamar to the heart of Europe»",
        news_3_meta: "Diario de Avisos",
        news_3_date: "Sunday, June 21, 2015",
        news_3_excerpt: "Confituras Palmelita takes the leap to Germany with high quality products...",
        news_4_title: "«Palmelita starts exporting its jams to Germany»",
        news_4_meta: "La Opinión de Tenerife",
        news_4_date: "Friday, June 19, 2015",
        news_4_excerpt: "...Confituras Palmelita was created in 1968 by master confectioner Werner Bittermann (1928-2014) in his small workshop...",
        cofinance_text: "Project co-financed by the European Regional Development Fund (ERDF)"
    }
    // Puedes agregar DE y FR siguiendo el mismo patrón si lo deseas
};

document.addEventListener("DOMContentLoaded", () => {
    const langBtns = document.querySelectorAll(".lang-btn");

    langBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.id.split("-")[1];
            setLanguage(lang);
            langBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Default a ES
    setLanguage("es");
    const esBtn = document.getElementById("lang-es");
    if(esBtn) esBtn.classList.add("active");

    // Lógica de Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const productImages = document.querySelectorAll(".product-image img");

    productImages.forEach((img) => {
        img.addEventListener("click", () => {
            if (lightbox && lightboxImg) {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }

    // Menú Hamburguesa
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    // Lógica para revelar productos y scroll suave
    const revealBtn = document.getElementById("reveal-products-btn");
    const revealSection = document.getElementById("products-reveal-section");

    const revealProducts = (e) => {
        if (revealSection) {
            if(e) e.preventDefault();
            revealSection.classList.add("visible");
            // Scroll suave a la sección de productos
            setTimeout(() => {
                revealSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    if (revealBtn) {
        revealBtn.addEventListener("click", revealProducts);
    }

    // Hacer que el link de "Products" en el nav también dispare el scroll en el landing
    const navProductLinks = document.querySelectorAll('a[href="productos.html"], a[data-i18n="products"]');
    
    if (revealSection) {
        navProductLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                revealProducts();
                // Cerrar menú móvil si está abierto
                if(navLinks && navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    if(hamburger) hamburger.classList.remove("active");
                }
            });
        });
    }
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