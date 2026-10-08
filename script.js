/* =====================================================
   E-WASTE MANAGEMENT WEBSITE
   EcoCycle
   ===================================================== */


/* ================= GLOBAL DATA ================= */

let users = JSON.parse(localStorage.getItem("ecoUsers")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("ecoCurrentUser")) || null;

let pickups =
    JSON.parse(localStorage.getItem("ecoPickups")) || [];


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    updateUserUI();

    updateApplicationCount();

    displayHistory();

    setMinimumDate();

    loadDarkMode();

});


/* ================= AUTH ================= */

function openAuth(type) {

    document.getElementById("authModal").classList.add("show");

    switchAuth(type);
}


function closeAuth() {

    document.getElementById("authModal").classList.remove("show");

}


function switchAuth(type) {

    const loginPanel =
        document.getElementById("loginPanel");

    const signupPanel =
        document.getElementById("signupPanel");


    if (type === "login") {

        loginPanel.classList.remove("hidden");

        signupPanel.classList.add("hidden");

    } else {

        loginPanel.classList.add("hidden");

        signupPanel.classList.remove("hidden");

    }

}


/* ================= SIGN UP ================= */

document
.getElementById("signupForm")
.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim().toLowerCase();

    const password =
        document.getElementById("signupPassword").value;


    if (password.length < 4) {

        showMessage(
            "signupMessage",
            "Password should contain at least 4 characters.",
            "error"
        );

        return;
    }


    const existingUser =
        users.find(user => user.email === email);


    if (existingUser) {

        showMessage(
            "signupMessage",
            "This email is already registered. Please login.",
            "error"
        );

        return;
    }


    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        password: password,

        createdAt: new Date().toLocaleString()

    };


    users.push(newUser);


    localStorage.setItem(
        "ecoUsers",
        JSON.stringify(users)
    );


    currentUser = {

        id: newUser.id,

        name: newUser.name,

        email: newUser.email

    };


    localStorage.setItem(
        "ecoCurrentUser",
        JSON.stringify(currentUser)
    );


    showMessage(
        "signupMessage",
        "Account created successfully! You are now logged in.",
        "success"
    );


    setTimeout(function () {

        closeAuth();

        updateUserUI();

        document.getElementById("signupForm").reset();

    }, 1000);

});


/* ================= LOGIN ================= */

document
.getElementById("loginForm")
.addEventListener("submit", function (event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim().toLowerCase();

    const password =
        document.getElementById("loginPassword").value;


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!user) {

        showMessage(
            "loginMessage",
            "Invalid email or password.",
            "error"
        );

        return;
    }


    currentUser = {

        id: user.id,

        name: user.name,

        email: user.email

    };


    localStorage.setItem(
        "ecoCurrentUser",
        JSON.stringify(currentUser)
    );


    showMessage(
        "loginMessage",
        "Login successful!",
        "success"
    );


    setTimeout(function () {

        closeAuth();

        updateUserUI();

        document.getElementById("loginForm").reset();

    }, 800);

});


/* ================= LOGOUT ================= */

function logout() {

    currentUser = null;

    localStorage.removeItem("ecoCurrentUser");

    updateUserUI();

    alert("You have been logged out.");

}


/* ================= USER UI ================= */

function updateUserUI() {

    const loginBtn =
        document.getElementById("loginBtn");

    const signupBtn =
        document.getElementById("signupBtn");

    const userBox =
        document.getElementById("userBox");

    const welcomeUser =
        document.getElementById("welcomeUser");


    if (currentUser) {

        loginBtn.classList.add("hidden");

        signupBtn.classList.add("hidden");

        userBox.classList.remove("hidden");

        welcomeUser.textContent =
            "Hi, " + currentUser.name;

        document.getElementById("pickupName").value =
            currentUser.name;

    } else {

        loginBtn.classList.remove("hidden");

        signupBtn.classList.remove("hidden");

        userBox.classList.add("hidden");

        welcomeUser.textContent = "";

    }

}


/* ================= MESSAGE ================= */

function showMessage(elementId, message, type) {

    const element =
        document.getElementById(elementId);


    element.textContent = message;

    element.style.marginTop = "12px";

    element.style.padding = "10px";

    element.style.borderRadius = "7px";


    if (type === "success") {

        element.style.background = "#e6f7eb";

        element.style.color = "#147332";

    } else {

        element.style.background = "#fdecec";

        element.style.color = "#a12626";

    }

}


/* ================= INFO MODAL ================= */

function showInfo(title, text) {

    document.getElementById("infoTitle").textContent =
        title;

    document.getElementById("infoText").textContent =
        text;

    document.getElementById("infoModal")
        .classList.add("show");

}


function closeInfo() {

    document.getElementById("infoModal")
        .classList.remove("show");

}


/* ================= CATEGORY SEARCH ================= */

function searchCategories() {

    const search =
        document.getElementById("categorySearch")
        .value
        .toLowerCase();


    const cards =
        document.querySelectorAll(".category-card");


    cards.forEach(function (card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= CALCULATOR ================= */

function calculateWaste() {

    const mobiles =
        Number(document.getElementById("mobiles").value) || 0;

    const laptops =
        Number(document.getElementById("laptops").value) || 0;

    const tvs =
        Number(document.getElementById("tvs").value) || 0;

    const others =
        Number(document.getElementById("others").value) || 0;


    const total =

        (mobiles * 0.2) +

        (laptops * 2) +

        (tvs * 8) +

        (others * 1);


    document.getElementById("calculatorResult").innerHTML =

        `Estimated e-waste:
        <strong>${total.toFixed(2)} kg</strong>`;

}


/* ================= DATE ================= */

function setMinimumDate() {

    const dateInput =
        document.getElementById("pickupDate");


    const today =
        new Date()
        .toISOString()
        .split("T")[0];


    dateInput.min = today;

}


/* ================= PICKUP FORM ================= */

document
.getElementById("pickupForm")
.addEventListener("submit", function (event) {

    event.preventDefault();


    if (!currentUser) {

        alert(
            "Please Sign Up or Login before scheduling a pickup."
        );

        openAuth("login");

        return;
    }


    const name =
        document.getElementById("pickupName").value.trim();

    const phone =
        document.getElementById("pickupPhone").value.trim();

    const wasteType =
        document.getElementById("wasteType").value;

    const address =
        document.getElementById("pickupAddress").value.trim();

    const date =
        document.getElementById("pickupDate").value;

    const time =
        document.getElementById("pickupTime").value;


    const pickupId =
        "EW" +
        Math.floor(
            1000 + Math.random() * 9000
        );


    const newPickup = {

        id: Date.now(),

        pickupId: pickupId,

        userId: currentUser.id,

        userName: name,

        userEmail: currentUser.email,

        phone: phone,

        wasteType: wasteType,

        address: address,

        date: date,

        time: time,

        status: "Pending",

        createdAt:
            new Date().toLocaleString()

    };


    pickups.push(newPickup);


    localStorage.setItem(
        "ecoPickups",
        JSON.stringify(pickups)
    );


    document.getElementById("pickupSuccess").innerHTML = `

        <strong>✅ Pickup Request Submitted!</strong>

        <br><br>

        Your Pickup ID is:

        <strong>${pickupId}</strong>

        <br><br>

        Please save this ID to track your request.

    `;


    document
        .getElementById("pickupSuccess")
        .classList.remove("hidden");


    document.getElementById("pickupForm").reset();


    document.getElementById("pickupName").value =
        currentUser.name;


    updateApplicationCount();

    displayHistory();

});


/* ================= APPLICATION COUNT ================= */

function updateApplicationCount() {

    const count =
        pickups.length;


    document.getElementById("applicationCount")
        .textContent = count;


    const peopleCount =
        500 + count;


    document.getElementById("peopleCount")
        .textContent = peopleCount + "+";

}


/* ================= TRACK PICKUP ================= */

function trackPickup() {

    const id =
        document.getElementById("trackingId")
        .value
        .trim()
        .toUpperCase();


    const result =
        document.getElementById("trackingResult");


    if (!id) {

        result.innerHTML =
            "<p>Please enter a Pickup ID.</p>";

        return;
    }


    const pickup =
        pickups.find(
            item => item.pickupId === id
        );


    if (!pickup) {

        result.innerHTML = `

            <div class="success-box">

                ❌ Pickup ID not found.

                <br>

                Please check your ID and try again.

            </div>

        `;

        return;
    }


    result.innerHTML = `

        <div class="success-box">

            <strong>Pickup Found ✅</strong>

            <br><br>

            <strong>Pickup ID:</strong>
            ${pickup.pickupId}

            <br>

            <strong>Name:</strong>
            ${pickup.userName}

            <br>

            <strong>E-Waste:</strong>
            ${pickup.wasteType}

            <br>

            <strong>Date:</strong>
            ${pickup.date}

            <br>

            <strong>Time:</strong>
            ${pickup.time}

            <br>

            <strong>Status:</strong>
            <span class="status">
                ${pickup.status}
            </span>

        </div>

    `;

}


/* ================= HISTORY ================= */

function displayHistory() {

    const historyList =
        document.getElementById("historyList");


    let userPickups = [];


    if (currentUser) {

        userPickups =
            pickups.filter(
                item =>
                    item.userId === currentUser.id
            );

    }


    document.getElementById("historyTotal")
        .textContent =
        userPickups.length;


    document.getElementById("historyPending")
        .textContent =
        userPickups.filter(
            item =>
                item.status === "Pending"
        ).length;


    document.getElementById("historyCompleted")
        .textContent =
        userPickups.filter(
            item =>
                item.status === "Completed"
        ).length;


    if (!currentUser) {

        historyList.innerHTML = `

            <div class="empty-history">

                🔐 Please login to view your pickup history.

            </div>

        `;

        return;
    }


    if (userPickups.length === 0) {

        historyList.innerHTML = `

            <div class="empty-history">

                📦 No pickup applications yet.

                <br><br>

                Schedule your first e-waste pickup!

            </div>

        `;

        return;
    }


    historyList.innerHTML =
        userPickups
        .slice()
        .reverse()
        .map(function (pickup) {

            return `

                <div class="history-item">

                    <h3>
                        ♻️ ${pickup.wasteType}
                    </h3>

                    <p>
                        <strong>Pickup ID:</strong>
                        ${pickup.pickupId}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${pickup.date}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${pickup.time}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        ${pickup.address}
                    </p>

                    <p>
                        <strong>Applied On:</strong>
                        ${pickup.createdAt}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        <span class="status">
                            ${pickup.status}
                        </span>
                    </p>

                </div>

            `;

        })
        .join("");

}


/* ================= FEEDBACK ================= */

document
.getElementById("feedbackForm")
.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("feedbackName").value;


    document.getElementById("feedbackResult").innerHTML = `

        <div class="success-box">

            ✅ Thank you, ${name}!

            <br>

            Your feedback has been received.

        </div>

    `;


    this.reset();

});


/* ================= DARK MODE ================= */

const darkModeBtn =
    document.getElementById("darkModeBtn");


darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "ecoDarkMode",
        isDark
    );


    darkModeBtn.textContent =
        isDark ? "☀️" : "🌙";

});


function loadDarkMode() {

    const dark =
        localStorage.getItem("ecoDarkMode");


    if (dark === "true") {

        document.body.classList.add("dark");

        darkModeBtn.textContent = "☀️";

    }

}


/* ================= CLOSE MODAL ================= */

window.addEventListener("click", function (event) {

    const authModal =
        document.getElementById("authModal");

    const infoModal =
        document.getElementById("infoModal");


    if (event.target === authModal) {

        closeAuth();

    }


    if (event.target === infoModal) {

        closeInfo();

    }

});


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeAuth();

        closeInfo();

    }

});