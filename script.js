// ================= DARK MODE =================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeBtn");

    if (document.body.classList.contains("dark-mode")) {

        button.innerText = "☀️ Light Mode";

        localStorage.setItem("darkMode", "on");

    } else {

        button.innerText = "🌙 Dark Mode";

        localStorage.setItem("darkMode", "off");

    }

}


// Restore Dark Mode

window.addEventListener("load", function () {

    if (localStorage.getItem("darkMode") === "on") {

        document.body.classList.add("dark-mode");

        document.getElementById("darkModeBtn").innerText =
            "☀️ Light Mode";

    }

});


// ================= SEARCH E-WASTE =================

function searchWaste() {

    const searchText =
        document.getElementById("wasteSearch").value.toLowerCase();

    const cards =
        document.querySelectorAll(".waste-card");

    const noResult =
        document.getElementById("noResult");

    let found = false;


    cards.forEach(function (card) {

        const cardText =
            card.innerText.toLowerCase();


        if (cardText.includes(searchText)) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (found || searchText === "") {

        noResult.style.display = "none";

    } else {

        noResult.style.display = "block";

    }

}


// ================= E-WASTE CALCULATOR =================

function calculateWaste() {

    const mobile =
        Number(document.getElementById("mobile").value);

    const laptop =
        Number(document.getElementById("laptop").value);

    const battery =
        Number(document.getElementById("battery").value);

    const charger =
        Number(document.getElementById("charger").value);


    const total =
        mobile + laptop + battery + charger;


    document.getElementById("result").innerText =
        "Total E-Waste Items: " + total;

}


// ================= PICKUP SYSTEM =================

let currentPickupId = "";

let currentStatus = 0;


// Generate Pickup ID

function generatePickupId() {

    const randomNumber =
        Math.floor(1000 + Math.random() * 9000);

    return "EW" + randomNumber;

}


// Schedule Pickup

function schedulePickup() {

    const name =
        document.getElementById("pickupName").value;

    const phone =
        document.getElementById("pickupPhone").value;

    const type =
        document.getElementById("pickupType").value;

    const quantity =
        document.getElementById("pickupQuantity").value;

    const date =
        document.getElementById("pickupDate").value;


    currentPickupId =
        generatePickupId();


    currentStatus = 0;


    // Save pickup information

    localStorage.setItem(
        "pickupId",
        currentPickupId
    );

    localStorage.setItem(
        "pickupStatus",
        currentStatus
    );


    // Display Pickup ID

    document.getElementById("pickupId").innerText =
        currentPickupId;

    document.getElementById("pickupResult").style.display =
        "block";


    // Put ID in tracking box

    document.getElementById("trackingId").value =
        currentPickupId;


    // Reset tracking

    resetTracking();


    // Show success message

    alert(
        "Pickup Request Submitted Successfully! ♻️\n\n" +

        "Name: " + name + "\n" +

        "Mobile: " + phone + "\n" +

        "E-Waste: " + type + "\n" +

        "Quantity: " + quantity + "\n" +

        "Pickup Date: " + date + "\n\n" +

        "Your Pickup ID: " + currentPickupId
    );


    // Scroll to pickup result

    document.getElementById("pickupResult")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

}


// ================= TRACK PICKUP =================

function trackPickup() {

    const enteredId =
        document.getElementById("trackingId")
            .value
            .trim()
            .toUpperCase();


    const savedId =
        localStorage.getItem("pickupId");


    const message =
        document.getElementById("trackingMessage");


    const trackingResult =
        document.getElementById("trackingResult");


    if (enteredId === "") {

        message.innerText =
            "Please enter your Pickup ID.";

        message.style.color =
            "#d32f2f";

        trackingResult.style.display =
            "none";

        return;

    }


    if (
        savedId &&
        enteredId === savedId.toUpperCase()
    ) {

        currentPickupId = savedId;

        currentStatus =
            Number(
                localStorage.getItem("pickupStatus")
            ) || 0;


        message.innerText =
            "Pickup ID found successfully!";

        message.style.color =
            "#146b3a";


        trackingResult.style.display =
            "block";


        updateStatusDisplay();

    } else {

        message.innerText =
            "Pickup ID not found. Please check your ID.";

        message.style.color =
            "#d32f2f";


        trackingResult.style.display =
            "none";

    }

}


// ================= UPDATE STATUS =================

function updatePickupStatus() {

    if (!currentPickupId) {

        alert(
            "Please create or track a valid Pickup ID first."
        );

        return;

    }


    if (currentStatus < 3) {

        currentStatus++;


        localStorage.setItem(
            "pickupStatus",
            currentStatus
        );


        updateStatusDisplay();


        const messages = [

            "Request Submitted",

            "Pickup Confirmed",

            "E-Waste Collected",

            "E-Waste Sent for Recycling"

        ];


        alert(
            "Pickup Status Updated!\n\n" +
            messages[currentStatus]
        );


    } else {

        alert(
            "Pickup is already completed and sent for recycling! ♻️"
        );

    }

}


// ================= STATUS DISPLAY =================

function updateStatusDisplay() {

    const steps = [

        document.getElementById("status1"),

        document.getElementById("status2"),

        document.getElementById("status3"),

        document.getElementById("status4")

    ];


    steps.forEach(function (step, index) {

        if (index <= currentStatus) {

            step.classList.add("active");

        } else {

            step.classList.remove("active");

        }

    });


    const button =
        document.getElementById("updateStatusBtn");


    if (currentStatus >= 3) {

        button.innerText =
            "✅ Recycling Completed";

        button.disabled = true;

        button.style.opacity = "0.6";

    } else {

        button.innerText =
            "Update Demo Status";

        button.disabled = false;

        button.style.opacity = "1";

    }

}


// ================= RESET TRACKING =================

function resetTracking() {

    currentStatus = 0;


    document.getElementById("trackingResult")
        .style.display = "none";


    document.getElementById("trackingMessage")
        .innerText = "";


    updateStatusDisplay();

}


// ================= RESTORE PICKUP =================

window.addEventListener("load", function () {

    const savedId =
        localStorage.getItem("pickupId");


    const savedStatus =
        localStorage.getItem("pickupStatus");


    if (savedId) {

        currentPickupId = savedId;

        currentStatus =
            Number(savedStatus) || 0;


        document.getElementById("pickupId")
            .innerText = savedId;


        document.getElementById("trackingId")
            .value = savedId;


        document.getElementById("pickupResult")
            .style.display = "block";

    }

});


// ================= FEEDBACK =================

function submitFeedback() {

    const name =
        document.getElementById("feedbackName").value;

    const rating =
        document.getElementById("rating").value;

    const message =
        document.getElementById("feedbackMessage").value;


    alert(
        "Thank you for your feedback! ⭐\n\n" +

        "Name: " + name + "\n" +

        "Rating: " + rating + "\n" +

        "Feedback: " + message
    );


    document.getElementById("feedbackForm").reset();

}