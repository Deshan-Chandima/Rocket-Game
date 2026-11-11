# 🚀 SPACE FUEL: ROCKET ODYSSEY

A full-stack, retro-futuristic arcade rocket game featuring **Virtual Identity authentication**, **Guest pilot access**, real-time **Banana API Interoperability**, and an animated **Visual Rocket Launch Flight Silo**.

Built with **React (Vite)** on the frontend and **Node.js/Express with MySQL** on the backend.

---

## 🌟 Academic & Technical Architecture

This project is engineered to satisfy the core software engineering pillars:

| Requirement | Implementation in Space Fuel |
|---|---|
| **1. Virtual Identity** | Custom pilot callsigns, secure password encryption with `bcrypt` (10 rounds), stateful JWT generation (`HMAC-SHA256`), and Bearer token verification (`GET /api/verify-token`). |
| **2. Interoperability** | Full-stack REST service integration consuming Prof. Marc Conrad's external **Banana API** (`https://marcconrad.com/uob/banana/api.php?out=json`) via backend proxy (`GET /api/game/banana-puzzle`) with graceful fallback. |
| **3. Event-Driven Programming** | 15-second countdown timer hooks, reactive keyboard input listeners (keys `0-9`), real-time fuel gauge replenishment, and animated thruster events. |
| **4. Version Control** | Structured Git feature-branching workflow (`feat/virtual-identity`, `feat/interoperability`, `feat/event-driven`, `feat/version-control`), conventional commits, and audited Pull Requests. |

---

## 🎮 Game Concept & Mechanics

### 📖 Storyline
To escape Earth's orbit and achieve escape velocity into deep space, the pilot's spacecraft needs **Star Plasma Fuel**. Inside the cockpit, the **Fuel Reactor Synthesizer Terminal** queries the **Banana API** to generate live plasma formulas (visual math puzzles). The pilot must decode the formula and input the correct calibration value (0–9) before reactor overheat!

### 🕹️ Gameplay Features
1. **Interactive Cockpit HUD**:
   - Live Pilot Callsign & Status (Registered vs. Guest).
   - Fuel Tank Capacity Gauge (`0%` to `100%`).
   - 3 Shield Generators (`❤️❤️❤️`).
   - Sector-adaptive countdown timer with critical audio-visual alerts (`⏱️ 35s` ➔ `⏱️ 25s` ➔ `⏱️ 20s`).
2. **Multi-Level Sector Progression (3 Unique Difficulty Stages)**:
   - **Level 1 (Sector 01: Earth Orbital Escape)**: `35s` timer, `1,000 PTS` per correct formula, `+2,000 PTS` booster separation bonus.
   - **Level 2 (Sector 02: Asteroid Belt Transit)**: `25s` timer, `1,500 PTS` per correct formula, `+3,000 PTS` sector bonus + `+1 Shield Generator repair`.
   - **Level 3 (Sector 03: Hyper-Warp Gateway)**: `20s` timer, `2,000 PTS` per correct formula, `+5,000 PTS` Galaxy Mastery bonus on final victory!
   - Sector Selector available directly on the Home Screen menu (`⭐ LEVEL`).
3. **Visual Rocket Launch Flight Silo**:
   - Real-time rocket elevation track per sector with adaptive stage indicators.
   - Custom SVG pixel rocket with dual multi-plume plasma thruster flames.
   - Atmospheric depth with twinkling star clusters, orbiting celestial bodies, and drifting cosmic clouds.
   - Ground launch gantry tower with blinking aviation beacons, hazard stripes, and steam vents.
   - Dynamic animations: Thruster blast on correct answer, ship wobble on error, hyperspace launch on victory!
4. **Guest Play & Leaderboard Integrity**:
   - Instant guest access without login.
   - Guest scores are excluded from the Galaxy Leaderboard to preserve competitive rankings for registered pilots.
5. **Input Flexibility**:
   - On-screen retro arcade keypad (`0` through `9`).
   - Physical computer keyboard event listener (type keys `0-9` directly).

---

## 📁 Project Structure

```text
Rocket-Game/
├── client/                               # React Frontend (Vite)
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │       └── BackgroundImage.jpg   # High-res retro spaceport background
│   │   ├── components/
│   │   │   ├── GameArena.jsx             # Plasma reactor & Visual Rocket Silo
│   │   │   ├── Home.jsx                  # Main arcade menu (Play, Level, Leaderboard, Quit)
│   │   │   ├── Login.jsx                 # Pilot authentication with password toggle
│   │   │   ├── Register.jsx              # Pilot enlistment & callsign registration
│   │   │   ├── Welcome.jsx               # Pre-flight cockpit HUD & personal best score
│   │   │   ├── Navbar.jsx                # Responsive 3-column retro navigation header
│   │   │   └── ComingSoon.jsx            # Standby screen for unbuilt game sectors
│   │   ├── App.jsx                       # Main client router & state orchestrator
│   │   ├── index.css                     # 100vh retro pixel arcade stylesheet
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                               # Node.js / Express Backend
│   ├── .env.example                      # Environment variables template
│   ├── db.js                             # MySQL connection pool (mysql2/promise)
│   ├── index.js                          # Express REST API routes & Banana proxy
│   ├── package.json
│   └── schema.sql                        # Database schema definition
│
├── .gitignore
└── README.md
```

---

## 🛠️ Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MySQL Server** (via XAMPP, WampServer, or native MySQL service)

---

## 🗄️ Database Configuration

Ensure your MySQL service is active on port `3306`, then run the following SQL script to set up `spacefuel_db`:

```sql
CREATE DATABASE IF NOT EXISTS spacefuel_db;
USE spacefuel_db;

-- 1. Users Table (Virtual Identity Credentials)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Scores Table (Leaderboard Rankings)
CREATE TABLE IF NOT EXISTS scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  nickname VARCHAR(50) NOT NULL,
  score INT NOT NULL,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Installation & Launch Guide

### 1. Configure Server Environment
In `server/.env` (create from `server/.env.example`):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=spacefuel_db
JWT_SECRET=spacefuel_super_secret_jwt_key_2026_pilot_auth
BANANA_API_URL=https://marcconrad.com/uob/banana/api.php?out=json
```

### 2. Start Backend Server
```bash
cd server
npm install
npm run dev
```
*Backend server runs at `http://localhost:5000`.*

### 3. Start Frontend Client
In a separate terminal:
```bash
cd client
npm install
npm run dev
```
*Frontend client runs at `http://localhost:3000`.*

---

## 🛰️ REST API Documentation

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Server operational health check |
| `POST` | `/api/register` | Public | Enlist new pilot, hash password via `bcrypt`, insert into MySQL |
| `POST` | `/api/login` | Public | Verify password with `bcrypt.compare`, issue signed JWT |
| `GET` | `/api/verify-token` | Bearer Token | Validate JWT header to authenticate active pilot session |
| `GET` | `/api/game/banana-puzzle` | Public | **Interoperability**: Proxies Prof. Marc Conrad's Banana API |
| `POST` | `/api/game/save-score` | Public / Auth | Record flight high score into MySQL `scores` table |
| `GET` | `/api/game/leaderboard` | Public | Retrieve top 10 galactic pilot rankings |

---

## 👨‍💻 Author & Module Details

- **Project**: Space Fuel Rocket Odyssey
- **University**: University of Bedfordshire (UOB)
- **Repository**: [GitHub / Rocket-Game](https://github.com/Deshan-Chandima/Rocket-Game.git)
