import "./style.css";

async function loadData() {
  const [leaderboardRes, marketRes] = await Promise.all([
    fetch("https://api-game.bloque.app/game/leaderboard"),
    fetch("https://api-game.bloque.app/game/market"),
  ]);

  const leaderboardData = await leaderboardRes.json();
  const marketData = await marketRes.json();
  renderLeaderboard(
    leaderboardData.players.filter((player) => player.level > 1)
  );
  renderMarket(marketData.items);
}

let currentPage = 1;
const rowsPerPage = 10;

function renderLeaderboard(players) {
  const tbody = document.querySelector("#leaderboard-table tbody");
  const pagination = document.getElementById("leaderboard-pagination");

  function displayPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedPlayers = players.slice(start, end);

    tbody.innerHTML = paginatedPlayers
      .map(
        (player) => `
      <tr>
        <td>${player.rank}</td>
        <td>${player.username}</td>
        <td>${player.level}</td>
        <td>${player.xp}</td>
        <td>${player.gold}</td>
        <td>${player.fishEmojis}</td>
        <td>${player.emojiDescription}</td>
        <td>${player.isInfected ? "Yes" : "No"}</td>
      </tr>
    `
      )
      .join("");
  }

  function setupPagination() {
    const pageCount = Math.ceil(players.length / rowsPerPage);
    pagination.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("pagination-btn");
      if (i === currentPage) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentPage = i;
        displayPage(currentPage);
        setupPagination();
      });

      pagination.appendChild(btn);
    }
  }

  displayPage(currentPage);
  setupPagination();
}

function renderMarket(items) {
  const tbody = document.querySelector("#market-table tbody");
  tbody.innerHTML = items
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.description}</td>
      <td>${item.cost}</td>
    </tr>
  `
    )
    .join("");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then((registration) => {
    registration.onupdatefound = () => {
      const newWorker = registration.installing;
      newWorker.onstatechange = () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          showUpdateBanner();
        }
      };
    };
  });
}

function showUpdateBanner() {
  const banner = document.createElement("div");
  banner.textContent = "Nueva versión disponible. Haz clic para actualizar.";
  banner.style.position = "fixed";
  banner.style.bottom = "20px";
  banner.style.left = "50%";
  banner.style.transform = "translateX(-50%)";
  banner.style.background = "#000";
  banner.style.color = "#fff";
  banner.style.padding = "10px 20px";
  banner.style.borderRadius = "5px";
  banner.style.cursor = "pointer";
  banner.style.zIndex = "9999";
  document.body.appendChild(banner);

  banner.addEventListener("click", () => {
    window.location.reload();
  });
}

loadData();
