# Hostel Management System (HostelPro)

A full-stack web application for managing hostel room allocations, room statuses, blocks, capacities, and pricing, built with Node.js, Express, and MySQL.

---

## 🚀 Features

- **Dashboard / View Rooms**: Browse all hostel rooms with real-time status (Available, Occupied, Maintenance), block filters, capacity, and pricing.
- **Add Room**: Register new rooms with validation for room number, block name, capacity, and status.
- **Search Room**: Instant lookup of rooms by Room ID or Room Number.
- **Update Room**: Modify capacity, block assignments, and room availability status.
- **Delete Room**: Remove decommissioned rooms from the database with confirmation prompts.
- **MySQL Database**: Persistent storage with relational schema, default values, and activity logging.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (Responsive Dashboard, Forms, and Modals)
- **Backend**: Node.js, Express.js REST API
- **Database**: MySQL 8.0 (`mysql2` connection pool)

---

## 📁 Project Structure

```
hostel-management-system/
├── public/                 # Frontend assets served by Express
│   ├── index.html          # Main Dashboard
│   ├── add.html            # Add new room form
│   ├── view.html           # View all rooms
│   ├── search.html         # Search rooms by ID / number
│   ├── update.html         # Edit room details
│   ├── delete.html         # Delete room
│   ├── script.js           # Client-side API integration & DOM logic
│   └── style.css           # Modern stylesheet
├── app.js                  # Express server & REST API endpoints
├── database.sql            # MySQL schema and seed data
├── package.json            # Node.js dependencies & scripts
├── .env.example            # Environment variables template
└── .gitignore              # Ignored files (node_modules, logs, .env)
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MySQL Server 8.0+

### 1. Clone the repository
```bash
git clone https://github.com/shaikirshad6447-oss/hostel-management-system.git
cd hostel-management-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the Database
Import the database schema and sample records:
```bash
mysql -u root -p < database.sql
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env` (optional, defaults to local MySQL):
```bash
cp .env.example .env
```
Update your database credentials if different from defaults:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hostel
DB_PORT=3306
```

### 5. Run the Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Cloud Deployment (Live)

This full-stack application can be deployed to any Node.js cloud platform:

1. **Free Cloud MySQL Database**:
   - Create a free database instance on **[TiDB Cloud](https://tidbcloud.com/)** or **[Aiven](https://aiven.io/)**.
   - Run the SQL queries from `database.sql` in the provider's SQL console.
2. **Deploy Backend & Frontend on [Render](https://render.com/)**:
   - Create a **New Web Service** connected to this GitHub repository.
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add Environment Variables:
     - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` (from your Cloud MySQL provider).
