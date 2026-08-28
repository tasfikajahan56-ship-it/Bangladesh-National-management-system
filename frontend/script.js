// ===============================
// BNIMS - script.js
// ===============================

const API_BASE_URL = 'http://localhost:5000/api';

// Smooth Scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

// Active Navigation
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
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

// Sticky Header Shadow
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 6px 20px rgba(0,0,0,.25)";
    } else {
        header.style.boxShadow = "none";
    }
});

// Counter Animation
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

// Fade Animation on Scroll
const cards = document.querySelectorAll(".card,.module,.feature,.week,.stat-card,.contact-item");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: .2 });

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = ".8s";
    observer.observe(card);
});

// Back To Top Button
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
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Welcome Message & Page Load Listeners
window.addEventListener("load", () => {
    console.log("BNIMS Loaded Successfully");
    
    // Auto load dashboard stats if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        loadDashboardStats();
    }
});

// Dashboard Button Hover Effect
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });
});

// Login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password!");
    }
}

// Search Citizen from Backend API
async function searchCitizen() {
    const nid = document.getElementById("searchNid").value.trim();
    const resultBox = document.getElementById("searchResult");

    if (!nid) {
        resultBox.innerHTML = "<p style='color:red;'>Please enter an NID number.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`${API_BASE_URL}/citizens/${nid}`);
        const result = await response.json();

        if (!result.success) {
            resultBox.innerHTML = `<p style='color:red;'>${result.message}</p>`;
            return;
        }

        const c = result.data;

        // Fetch family info in parallel
        const [fatherRes, motherRes, spouseRes] = await Promise.all([
            fetch(`${API_BASE_URL}/fathers/${nid}`).then(r => r.json()).catch(() => ({ success: false })),
            fetch(`${API_BASE_URL}/mothers/${nid}`).then(r => r.json()).catch(() => ({ success: false })),
            fetch(`${API_BASE_URL}/spouses/${nid}`).then(r => r.json()).catch(() => ({ success: false }))
        ]);

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

            <h3 style="margin-top:25px; color:#006A4E;">Family Information</h3>
            <table style="width:100%; border-collapse:collapse; background:white; margin-top:10px;">
                <tr style="background:#006A4E; color:white;">
                    <th style="padding:12px;">Relation</th>
                    <th>Name</th>
                </tr>
                <tr><td style="padding:10px;">Father</td><td>${fatherRes.success ? fatherRes.data.name : 'Not on record'}</td></tr>
                <tr><td style="padding:10px;">Mother</td><td>${motherRes.success ? motherRes.data.name : 'Not on record'}</td></tr>
                <tr><td style="padding:10px;">Spouse</td><td>${spouseRes.success ? spouseRes.data.name : 'Not on record'}</td></tr>
            </table>

            <div style="margin-top:15px; display:flex; gap:10px;">
                <button onclick="updateCitizen('${c.nid_no}')" class="btn" style="background:#e0a800;">Update Blood Group</button>
                <button onclick="deleteCitizen('${c.nid_no}')" class="btn" style="background:#c0392b;">Delete Citizen</button>
            </div>
        `;
    } catch (error) {
        resultBox.innerHTML = "<p style='color:red;'>Could not connect to server. Is the backend running?</p>";
    }
}

// Update & Delete Citizen
async function updateCitizen(nid) {
    const newBloodGroup = prompt("Enter new Blood Group (e.g. A+, B+, O-):");

    if (!newBloodGroup) return;

    try {
        const getResponse = await fetch(`${API_BASE_URL}/citizens/${nid}`);
        const getResult = await getResponse.json();

        if (!getResult.success) {
            alert("Could not fetch current citizen data.");
            return;
        }

        const c = getResult.data;

        const response = await fetch(`${API_BASE_URL}/citizens/${nid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: c.full_name,
                dob: c.dob.split("T")[0],
                gender: c.gender,
                blood_group: newBloodGroup,
                marital_status: c.marital_status
            })
        });

        const result = await response.json();
        alert(result.message);

        if (result.success) {
            searchCitizen();
        }
    } catch (error) {
        alert("Update failed. Is the backend running?");
    }
}

async function deleteCitizen(nid) {
    const confirmDelete = confirm(`Are you sure you want to delete citizen ${nid}? This cannot be undone.`);

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_BASE_URL}/citizens/${nid}`, {
            method: "DELETE"
        });

        const result = await response.json();
        alert(result.message);

        if (result.success) {
            document.getElementById("searchResult").innerHTML = "";
            document.getElementById("searchNid").value = "";
        }
    } catch (error) {
        alert("Delete failed. Is the backend running?");
    }
}

// ===============================
// New Features & Analytics Integration
// ===============================

// Dashboard Analytics Data Fetching
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/request/dashboard-stats`);
        const data = await response.json();

        if (document.getElementById('total-citizens')) {
            document.getElementById('total-citizens').innerText = data.total_citizens || 0;
        }
        if (document.getElementById('pending-requests')) {
            document.getElementById('pending-requests').innerText = data.pending_requests || 0;
        }
        if (document.getElementById('total-verifications')) {
            document.getElementById('total-verifications').innerText = data.total_verifications || 0;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Digital NID Card Data Fetching
async function loadNidCardData(nidNo) {
    try {
        const response = await fetch(`${API_BASE_URL}/citizens/${nidNo}`);
        const result = await response.json();

        if (result.success) {
            const citizen = result.data;
            if (document.getElementById('card-name')) document.getElementById('card-name').innerText = citizen.full_name;
            if (document.getElementById('card-nid')) document.getElementById('card-nid').innerText = citizen.nid_no;
            if (document.getElementById('card-dob')) document.getElementById('card-dob').innerText = citizen.dob;
            if (document.getElementById('card-blood')) document.getElementById('card-blood').innerText = citizen.blood_group || 'N/A';
        }
    } catch (error) {
        console.error('Error fetching NID card:', error);
    }
}