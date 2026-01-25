// Domain mapping for language navigation
const domainMap = {
    es: "confituras.palmelita.es",
    en: "jam.palmelita.com",
    de: "konfitueren.palmelita.com",
    fr: "confitures.palmelita.com"
};

// Language flag navigation - immediate execution
function setupLanguageFlags() {
    const langBtns = document.querySelectorAll(".lang-btn");
    
    langBtns.forEach((btn) => {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = this.id.replace("lang-", ""); // Extract language code
            const targetDomain = domainMap[lang];
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            
            console.log(`Redirecting to: https://${targetDomain}/${currentPage}`);
            
            // Immediate redirect
            if (targetDomain) {
                window.location.href = `https://${targetDomain}/${currentPage}`;
            }
        };
    });
}

// Hamburger menu
function setupHamburger() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.onclick = function() {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        };
    }
}

// Lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const productImages = document.querySelectorAll(".product-image img");

    if (productImages.length > 0 && lightbox && lightboxImg) {
        productImages.forEach((img) => {
            img.onclick = function() {
                lightbox.style.display = "flex";
                lightboxImg.src = this.src;
            };
        });
    }

    if (closeBtn && lightbox) {
        closeBtn.onclick = function() {
            lightbox.style.display = "none";
        };
    }

    if (lightbox && lightboxImg) {
        lightbox.onclick = function(e) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        };
    }
}

// Hero mask scroll effect
function setupHeroMask() {
    const heroMask = document.querySelector(".hero-mask-background");
    if (heroMask) {
        window.onscroll = function() {
            const scrollY = window.scrollY;
            let opacity = 1 - (scrollY / 400);
            
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;
            
            heroMask.style.opacity = opacity;
            heroMask.style.pointerEvents = opacity < 0.1 ? "none" : "auto";
        };
    }
}

// Initialize everything when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
        setupLanguageFlags();
        setupHamburger();
        setupLightbox();
        setupHeroMask();
    });
} else {
    // DOM already loaded
    setupLanguageFlags();
    setupHamburger();
    setupLightbox();
    setupHeroMask();
}
