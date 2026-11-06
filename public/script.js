// ============================================
// HOSTELPRO - SHARED JAVASCRIPT
// ============================================


// COMMON MESSAGE FUNCTION

function showMessage(text, isError = false) {

    // Support pages using either "message" or "dashboardMessage".
    const message =
        document.getElementById("message") ||
        document.getElementById("dashboardMessage");

    if (message) {
        message.textContent = text;
        message.className = isError ? "error" : "success";
    }

}


// GET ROOM FIELD VALUES

function getRoomId(room) {
    return room.Room_id ?? room.room_id ?? room.id;
}

function getRoomNumber(room) {
    return room.Room_no ?? room.room_no;
}

function getBlockName(room) {
    return room.Block_name ?? room.block_name;
}

function getCapacity(room) {
    return room.Capacity ?? room.capacity;
}

function getRoomStatus(room) {
    return String(room.Status ?? room.status ?? "").trim();
}


// SAFELY DISPLAY TEXT

function safeText(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);

}


// ============================================
// DASHBOARD
// ============================================

let dashboardRooms = [];
let currentFilter = "all";


// LOAD ROOMS FOR DASHBOARD

async function loadDashboardRooms() {

    const roomCards = document.getElementById("roomCards");

    if (!roomCards) {
        return;
    }

    try {

        const response = await fetch("/rooms");

        if (!response.ok) {
            throw new Error("Unable to load rooms from the server.");
        }

        const rooms = await response.json();

        if (!Array.isArray(rooms)) {
            throw new Error("The server did not return a room list.");
        }

        dashboardRooms = rooms;

        updateDashboardStatistics();

        displayDashboardRooms();

        const message = document.getElementById("dashboardMessage");

        if (message) {
            message.textContent = rooms.length === 0
                ? "No rooms found. Click Add Room to register your first room."
                : "";
        }

    } catch (error) {

        roomCards.innerHTML = `
            <p class="empty-message">
                Could not load rooms. Check that your server and database
                are running.
            </p>
        `;

        const message = document.getElementById("dashboardMessage");

        if (message) {
            message.textContent = error.message;
        }

    }

}


// UPDATE DASHBOARD STATISTICS

function updateDashboardStatistics() {

    const total = dashboardRooms.length;

    const occupied = dashboardRooms.filter(room =>
        getRoomStatus(room).toLowerCase() === "occupied"
    ).length;

    const available = dashboardRooms.filter(room =>
        getRoomStatus(room).toLowerCase() === "available"
    ).length;

    const maintenance = dashboardRooms.filter(room =>
        getRoomStatus(room).toLowerCase() === "maintenance"
    ).length;


    if (document.getElementById("totalRooms")) {
        document.getElementById("totalRooms").textContent = total;
    }

    if (document.getElementById("occupiedRooms")) {
        document.getElementById("occupiedRooms").textContent = occupied;
    }

    if (document.getElementById("availableRooms")) {
        document.getElementById("availableRooms").textContent = available;
    }

    if (document.getElementById("maintenanceRooms")) {
        document.getElementById("maintenanceRooms").textContent = maintenance;
    }

}


// DISPLAY DASHBOARD ROOM CARDS

function displayDashboardRooms() {

    const roomCards = document.getElementById("roomCards");

    if (!roomCards) {
        return;
    }

    const searchInput = document.getElementById("roomSearch");

    const searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";


    const filteredRooms = dashboardRooms.filter(room => {

        const status = getRoomStatus(room);

        const matchesFilter =
            currentFilter === "all" ||
            status.toLowerCase() === currentFilter.toLowerCase();

        const searchableText = [
            getRoomId(room),
            getRoomNumber(room),
            getBlockName(room),
            getCapacity(room),
            status
        ].join(" ").toLowerCase();

        return matchesFilter && searchableText.includes(searchText);

    });


    if (filteredRooms.length === 0) {

        roomCards.innerHTML = `
            <p class="empty-message">
                No matching rooms found.
            </p>
        `;

        return;

    }


    roomCards.innerHTML = filteredRooms.map(room => {

        const id = getRoomId(room);
        const status = getRoomStatus(room);
        const normalizedStatus = status.toLowerCase();

        let cardClass = "";
        let statusClass = "";

        if (normalizedStatus === "occupied") {
            cardClass = "occupied";
            statusClass = "status-occupied";
        } else if (normalizedStatus === "available") {
            statusClass = "status-available";
        } else if (normalizedStatus === "maintenance") {
            cardClass = "maintenance";
            statusClass = "status-maintenance";
        }

        return `
            <article class="room-card ${cardClass}">

                <div class="room-card-top">

                    <span class="room-label">
                        ${safeText(getBlockName(room) || "Hostel Room")}
                    </span>

                    <span>•••</span>

                </div>

                <h3>${safeText(getRoomNumber(room))}</h3>

                <p class="room-block">
                    Room ID: ${safeText(id)}
                </p>

                <div class="room-info">

                    <div>

                        <p class="room-block">CAPACITY</p>

                        <p class="room-capacity">
                            ${safeText(getCapacity(room))} people
                        </p>

                    </div>

                    <div class="room-actions">

                        <a href="search.html?id=${encodeURIComponent(id)}">
                            View
                        </a>

                        <a href="update.html?id=${encodeURIComponent(id)}">
                            Edit
                        </a>

                    </div>

                </div>

                <span class="room-status ${statusClass}">
                    ${safeText(status || "Unknown")}
                </span>

            </article>
        `;

    }).join("");

}


// SEARCH ROOMS AS THE USER TYPES

const roomSearch = document.getElementById("roomSearch");

if (roomSearch) {

    roomSearch.addEventListener("input", displayDashboardRooms);

}


// FILTER ROOMS BY STATUS

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        displayDashboardRooms();

    });

});


// MOBILE SIDEBAR

const menuToggle = document.getElementById("menuToggle");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.classList.toggle("sidebar-open");
        }

    });

}


// START DASHBOARD

loadDashboardRooms();


// ============================================
// CREATE - ADD ROOM
// ============================================

const addForm = document.getElementById("addForm");

if (addForm) {

    addForm.addEventListener("submit", async event => {

        event.preventDefault();

        const room = {

            Room_no: document.getElementById("roomNo").value.trim(),

            Block_name: document.getElementById("blockName").value.trim(),

            Capacity: Number(document.getElementById("capacity").value),

            Status: document.getElementById("status").value

        };


        if (
            !room.Room_no ||
            !room.Block_name ||
            !Number.isInteger(room.Capacity) ||
            room.Capacity < 1
        ) {

            showMessage(
                "Enter a room number, block name, and a whole-number capacity of at least 1.",
                true
            );

            return;

        }


        try {

            const response = await fetch("/rooms", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(room)

            });


            if (!response.ok) {
                throw new Error(await response.text());
            }


           showMessage("Room added successfully!");

        addForm.reset();

        // Refresh dashboard data if the dashboard is available.
        if (typeof loadDashboardRooms === "function") {
        loadDashboardRooms();
            }

        } catch (error) {

            showMessage(error.message, true);

        }

    });

}


// ============================================
// READ - VIEW ALL ROOMS
// ============================================

async function loadRooms() {

    const table = document.getElementById("roomTable");

    if (!table) {
        return;
    }


    try {

        const response = await fetch("/rooms");

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const rooms = await response.json();

        table.replaceChildren();


        rooms.forEach(room => {

            const row = document.createElement("tr");

            [
                getRoomId(room),
                getRoomNumber(room),
                getBlockName(room),
                getCapacity(room),
                getRoomStatus(room)

            ].forEach(value => {

                const cell = document.createElement("td");

                cell.textContent = value ?? "";

                row.appendChild(cell);

            });


            table.appendChild(row);

        });


        if (rooms.length === 0) {

            showMessage("No rooms found.");

        }


    } catch (error) {

        showMessage(error.message, true);

    }

}


if (document.getElementById("roomTable")) {

    loadRooms();

}


// ============================================
// READ - SEARCH ROOM
// ============================================

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", async event => {

        event.preventDefault();

        const id = document.getElementById("searchId").value.trim();

        const result = document.getElementById("searchResult");

        result.replaceChildren();


        try {

            const response = await fetch("/rooms/" + encodeURIComponent(id));

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const room = await response.json();

            const details = document.createElement("div");

            details.className = "result-card";


            [

                ["Room ID", getRoomId(room)],

                ["Room Number", getRoomNumber(room)],

                ["Block Name", getBlockName(room)],

                ["Capacity", getCapacity(room)],

                ["Status", getRoomStatus(room)]

            ].forEach(([label, value]) => {

                const paragraph = document.createElement("p");

                paragraph.textContent = label + ": " + (value ?? "");

                details.appendChild(paragraph);

            });


            result.appendChild(details);

            showMessage("Room found!");


        } catch (error) {

            showMessage(error.message, true);

        }

    });

}


// ============================================
// UPDATE - UPDATE ROOM
// ============================================

const updateForm = document.getElementById("updateForm");

if (updateForm) {

    updateForm.addEventListener("submit", async event => {

        event.preventDefault();

        const id = document.getElementById("updateId").value.trim();

        const room = {

            Room_no: document.getElementById("updateRoomNo").value.trim(),

            Block_name: document.getElementById("updateBlock").value.trim(),

            Capacity: Number(document.getElementById("updateCapacity").value),

            Status: document.getElementById("updateStatus").value

        };


        if (
            !room.Room_no ||
            !room.Block_name ||
            !Number.isInteger(room.Capacity) ||
            room.Capacity < 1
        ) {

            showMessage("Please enter valid room details.", true);

            return;

        }


        try {

            const response = await fetch("/rooms/" + encodeURIComponent(id), {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(room)

            });


            const result = await response.text();

            if (!response.ok) {
                throw new Error(result);
            }


            showMessage("Room updated successfully!");

        } catch (error) {

            showMessage(error.message, true);

        }

    });

}


// ============================================
// DELETE - DELETE ROOM
// ============================================

const deleteForm = document.getElementById("deleteForm");

if (deleteForm) {

    deleteForm.addEventListener("submit", async event => {

        event.preventDefault();

        const id = document.getElementById("deleteId").value.trim();


        if (!confirm("Are you sure you want to delete this room?")) {
            return;
        }


        try {

            const response = await fetch("/rooms/" + encodeURIComponent(id), {

                method: "DELETE"

            });


            const result = await response.text();

            if (!response.ok) {
                throw new Error(result);
            }


            showMessage("Room deleted successfully!");

            deleteForm.reset();


        } catch (error) {

            showMessage(error.message, true);

        }

    });

}