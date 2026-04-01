document.addEventListener('DOMContentLoaded', function() {

    // ----------------------
    //  Toggle Menu 
    // ----------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active'); 

          
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ----------------------
    // Close Menu 
    // ----------------------
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = document.querySelector('.menu-toggle i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ----------------------
    // Smooth Scroll 
    // ----------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

}); 

// ======================
// Dark Mode Toggle 
// ======================
const themeToggle = document.querySelector('.theme-toggle');


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
}
if (themeToggle) {
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
}

// ======================
// Typing Effect 
// ======================
const roles = ["Frontend Developer", "Angular Developer", "UI/UX Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex++);
        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        }
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ======================
// Scroll Animation 
// ======================
const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.2 });
animateElements.forEach(el => observer.observe(el));

// ======================
// Project Overlay 
// ======================
const overlay = document.getElementById("projectOverlay");
const overlayImg = document.getElementById("overlayImg");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDesc = document.getElementById("overlayDesc");
const overlayLink = document.getElementById("overlayLink");
const overlayTech = document.getElementById("overlayTech");
const closeOverlay = document.getElementById("closeOverlay");
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        overlayImg.src = card.querySelector("img").src;
        overlayTitle.innerText = card.querySelector("h3").innerText;
        overlayDesc.innerText = card.querySelector("p").innerText;
        overlayLink.href = card.querySelector(".project-link").href;

        overlayTech.innerHTML = "";
        card.querySelectorAll(".project-tech span").forEach(span => {
            const newSpan = document.createElement("span");
            newSpan.innerText = span.innerText;
            overlayTech.appendChild(newSpan);
        });

        overlay.classList.add("active");
    });


    let animationFrame;
    card.addEventListener("mousemove", e => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;
            card.style.transform = `rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) scale(1.03)`;
        });
    });
    card.addEventListener("mouseleave", () => {
        cancelAnimationFrame(animationFrame);
        card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    });
});


overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.classList.remove("active");
});
closeOverlay.addEventListener("click", () => overlay.classList.remove("active"));

// ======================
//  Navbar scroll effect
// ======================
window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ======================
// Testimonials Slider
// ======================
var testimonials = document.querySelectorAll(".testimonial");
var index = 0;
function showTestimonial() {
    testimonials.forEach(item => item.classList.remove("active"));
    index = (index + 1) % testimonials.length;
}
setInterval(showTestimonial, 3000);

// ======================
// Timeline Animation
// ======================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
timelineItems.forEach(item => timelineObserver.observe(item));

// ======================
// Skills Animation
// ======================
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            skillsSection.classList.add('active');
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillsObserver.observe(skillsSection);

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// ======================
// Experience Cards Animation
// ======================
const expCards = document.querySelectorAll('.experience-card');
const expObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            expCards.forEach((card, index) => {
                setTimeout(() => card.classList.add('active'), index * 250);
            });
            expObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

expObserver.observe(document.querySelector('.experience'));

// ======================
// Service Cards Animation
// ======================
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            serviceCards.forEach((card, index) => {
                setTimeout(() => card.classList.add('active'), index * 150);
            });
            serviceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

serviceObserver.observe(document.querySelector('.services'));

// ======================
// Active Navbar Link on Scroll
// ======================

const sections = document.querySelectorAll("section");
const navLinksScroll = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinksScroll.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});
var stars = document.querySelectorAll(".stars");

stars.forEach(function(starContainer) {
    var rating = parseFloat(starContainer.getAttribute("data-rating"));
    var fullStars = Math.floor(rating);
    var hasHalf = rating % 1 !== 0;

    var starsHTML = "";

    for (var i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalf) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    for (var i = starsHTML.split("fa-star").length - 1; i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    starContainer.innerHTML = starsHTML;
});

