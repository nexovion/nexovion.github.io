// =========================================
// NEXOVION - RISE OF AI
// Version 2.0 Main JavaScript
// =========================================


// Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navbar.classList.toggle("active");
    });
}


// Close mobile menu after clicking a link
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (menuToggle && navbar) {
            menuToggle.classList.remove("active");
            navbar.classList.remove("active");
        }
    });
});


// =========================================
// Header Scroll Effect
// =========================================

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// =========================================
// Reveal Animation
// =========================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// =========================================
// Active Navigation Link
// =========================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


// =========================================
// Smooth Scroll
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            targetId === "#" ||
            targetId === ""
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =========================================
// Contact Form
// =========================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !message.value.trim()
        ) {

            alert("Please fill in all fields.");

            return;

        }

        alert(
            "Thank you, " +
            name.value +
            "! Your message has been received."
        );

        contactForm.reset();

    });

}


// =========================================
// Mouse Parallax Effect
// =========================================

const hero = document.querySelector(".hero");

if (hero) {

    hero.addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 20;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 20;

        document.querySelectorAll(".hero-orb").forEach(
            (orb, index) => {

                const speed = index === 0 ? 1 : -1;

                orb.style.transform =
                    `translate(${x * speed}px, ${y * speed}px)`;

            }
        );

    });

}


// =========================================
// Hero Intro
// =========================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// =========================================
// Console Branding
// =========================================

console.log(
    "%c NEXOVION | RISE OF AI ",
    "background:#050816;color:#00eaff;font-size:18px;padding:8px;"
);
