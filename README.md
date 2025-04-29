# Fishing Game Dashboard

Web application that displays:

- **Leaderboard** table of players.
- Game items **Market** table.

Connects to external APIs and **works offline** thanks to an automatic **Service Worker** with Workbox.

---

## Technologies Used

- Vite](https://vite.dev/) (without framework, Vanilla template)
- HTML5, CSS3, JavaScript (ES6+)
- Automatic Service Worker with [Workbox](https://developer.chrome.com/docs/workbox/)

---

## Demo

- https://fishing-game-dashboard.vercel.app/

---

## Local installation

```bash
# 1. Clone the repository
git clone https://github.com/ronlab89/Fishing-game-dashboard.git

# 2. Enter the project
cd fishing-game-dashboard

# 3. Install the dependencies
npm install
# or using yarn
yarn

# 4. Run the local server
npm run dev
# or
yarn dev
```

The project is available at `http://localhost:5173/`

---

## Project structure

```bash
public/
 icon-192.webp
 icon-512.webp
 screenshot1.webp
src/
 style.css
 main.js
index.html
vite.config.js
```

---

## Available Commands

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Run server in development mode  |
| `npm run build` | Generate final version in /dist |

---

## Key Features

- Ultra-fast initial load\*\* with Vite.
- Optimal data consumption\*\*: only as much as necessary.
- Works without Internet\*\* after the first load.
- Automatic Service Worker\*\* with ~22 KB Workbox.
- Responsive design.

---
