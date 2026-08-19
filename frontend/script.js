// ===============================
// BNIMS - script.js
// ===============================

// Smooth Scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (targetId.startsWith("#")) {

            e.preventDefault();

            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }

    });
});

// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===============================
// Sticky Header Shadow
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 6px 20px rgba(0,0,0,.25)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".stat-card h3");

let started = false;

window.addEventListener("scroll", () => {

    const stats = document.querySelector(".statistics");

    if (!stats) return;

    const trigger = stats.offsetTop - 400;

    if (window.scrollY > trigger && !started) {

        counters.forEach(counter => {

            const targetText = counter.innerText;

            let target = parseInt(targetText.replace(/\D/g, ""));

            if (isNaN(target)) return;

            let count = 0;

            const speed = target / 100;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = targetText;

                }

            };

            update();

        });

        started = true;

    }

});

// ===============================
// Fade Animation on Scroll
// ===============================

const cards = document.querySelectorAll(
".card,.module,.feature,.week,.stat-card,.contact-item"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: .2
});

cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    card.style.transition = ".8s";

    observer.observe(card);

});

// ===============================
// Back To Top Button
// ===============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.right = "25px";
topBtn.style.bottom = "25px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#006A4E";
topBtn.style.color = "white";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";
topBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ===============================
// Welcome Message
// ===============================

window.addEventListener("load", () => {

    console.log("BNIMS Loaded Successfully");

});

// ===============================
// Dashboard Button Hover Effect
// ===============================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "scale(1.05)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "scale(1)";

    });



});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password!");
    }
}