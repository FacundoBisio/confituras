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
        setupHamburger();
        setupLightbox();
        setupHeroMask();
    });
} else {
    // DOM already loaded
    setupHamburger();
    setupLightbox();
    setupHeroMask();
}
