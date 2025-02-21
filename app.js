document.addEventListener("DOMContentLoaded", function () {
    // Skill bar animation
    const progressBars = document.querySelectorAll(".progress-done");
    progressBars.forEach(bar => {
        setTimeout(() => {
            bar.style.width = bar.getAttribute("data-done") + "%";
            bar.style.opacity = 1;
        }, 500);
    });

    // Typing animation effect
    const typingElement = document.querySelector(".typing");
    const words = ["Web Developer", "UI/UX Designer", "Frontend Developer"];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = "";
    let isDeleting = false;

    function typeEffect() {
        if (isDeleting) {
            currentWord = words[wordIndex].substring(0, letterIndex--);
        } else {
            currentWord = words[wordIndex].substring(0, letterIndex++);
        }

        typingElement.textContent = currentWord;

        let typingSpeed = isDeleting ? 100 : 150;
        if (!isDeleting && currentWord === words[wordIndex]) {
            typingSpeed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && currentWord === "") {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Navbar active state on scroll
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", function () {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.createElement("div");
    menuToggle.classList.add("menu-toggle");
    menuToggle.innerHTML = "☰";
    document.querySelector("header").appendChild(menuToggle);

    menuToggle.addEventListener("click", function () {
        document.querySelector("nav ul").classList.toggle("show-menu");
    });

    // Contact form validation
    const contactForm = document.querySelector("form");
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.querySelector('input[type="text"]').value.trim();
        const email = document.querySelector('input[type="email"]').value.trim();
        const message = document.querySelector("textarea").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }

        alert("Message sent successfully!");
        contactForm.reset();
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
