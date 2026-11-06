
const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect to the hostel database (supports cloud environment variables or local fallback)
const dbConfig = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Shaik@2006",
    database: process.env.DB_NAME || "hostel",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const db = mysql.createPool(dbConfig);

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL database successfully");
    connection.release();
});

// READ: Get all rooms
app.get("/rooms", (req, res) => {
    db.query("SELECT * FROM rooms", (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.json(result);
    });
});

// READ: Get one room by ID
app.get("/rooms/:id", (req, res) => {
    db.query(
        "SELECT * FROM rooms WHERE Room_id = ?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (result.length === 0) {
                return res.status(404).send("Room not found");
            }

            res.json(result[0]);
        }
    );
});

// CREATE: Insert a new room
app.post("/rooms", (req, res) => {
    const { Room_no, Block_name, Capacity, Status } = req.body;

    if (!Room_no || !Block_name ||
        !Number.isInteger(Capacity) || Capacity < 1 ||
        !["Available", "Occupied", "Maintenance"].includes(Status)) {
        return res.status(400).send("Please enter valid room details");
    }

    db.query(
        "INSERT INTO rooms (Room_no, Block_name, Capacity, Status) VALUES (?, ?, ?, ?)",
        [Room_no, Block_name, Capacity, Status],
        (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.status(201).json({
                message: "Room inserted successfully",
                Room_id: result.insertId
            });
        }
    );
});

// UPDATE: Change room details
app.put("/rooms/:id", (req, res) => {
    const { Room_no, Block_name, Capacity, Status } = req.body;

    if (!Room_no || !Block_name ||
        !Number.isInteger(Capacity) || Capacity < 1 ||
        !["Available", "Occupied", "Maintenance"].includes(Status)) {
        return res.status(400).send("Please enter valid room details");
    }

    db.query(
        "UPDATE rooms SET Room_no = ?, Block_name = ?, Capacity = ?, Status = ? WHERE Room_id = ?",
        [Room_no, Block_name, Capacity, Status, req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Room not found");
            }

            res.send("Room updated successfully");
        }
    );
});

// DELETE: Remove a room
app.delete("/rooms/:id", (req, res) => {
    db.query(
        "DELETE FROM rooms WHERE Room_id = ?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Room not found to delete");
            }

            res.send("Room deleted successfully");
        }
    );
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});