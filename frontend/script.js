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

// ===============================
// Search Citizen from Backend API
// ===============================

async function searchCitizen() {
    const nid = document.getElementById("searchNid").value.trim();
    const resultBox = document.getElementById("searchResult");

    if (!nid) {
        resultBox.innerHTML = "<p style='color:red;'>Please enter an NID number.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`http://localhost:5000/api/citizens/${nid}`);
        const result = await response.json();

        if (!result.success) {
            resultBox.innerHTML = `<p style='color:red;'>${result.message}</p>`;
            return;
        }

        const c = result.data;

        resultBox.innerHTML = `
            <table style="width:100%; border-collapse:collapse; background:white; margin-top:10px;">
                <tr style="background:#006A4E; color:white;">
                    <th style="padding:12px;">Field</th>
                    <th>Value</th>
                </tr>
                <tr><td style="padding:10px;">NID</td><td>${c.nid_no}</td></tr>
                <tr><td style="padding:10px;">Full Name</td><td>${c.full_name}</td></tr>
                <tr><td style="padding:10px;">Date of Birth</td><td>${c.dob}</td></tr>
                <tr><td style="padding:10px;">Gender</td><td>${c.gender}</td></tr>
                <tr><td style="padding:10px;">Blood Group</td><td>${c.blood_group || 'N/A'}</td></tr>
                <tr><td style="padding:10px;">Marital Status</td><td>${c.marital_status}</td></tr>
                <tr><td style="padding:10px;">Present Address</td><td>${c.present_address || 'N/A'}</td></tr>
                <tr><td style="padding:10px;">Upazila</td><td>${c.upazila_name || 'N/A'}</td></tr>
                <tr><td style="padding:10px;">District</td><td>${c.district_name || 'N/A'}</td></tr>
                <tr><td style="padding:10px;">Division</td><td>${c.division_name || 'N/A'}</td></tr>
            </table>
        `;
    } catch (error) {
        resultBox.innerHTML = "<p style='color:red;'>Could not connect to server. Is the backend running?</p>";
    }
}