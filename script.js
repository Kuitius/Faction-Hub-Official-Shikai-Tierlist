let allLists = {};
let currentMode = null;

const startScreen = document.getElementById("startScreen");
const mainScreen = document.getElementById("mainScreen");
const backBtn = document.getElementById("backBtn");
const modeLabel = document.getElementById("modeLabel");

fetch("data.json")
  .then(r => r.json())
  .then(data => {
    allLists = data;

   
    const saved = localStorage.getItem("tierMode");
    if (saved && allLists[saved]) {
      setMode(saved);
    } else {
      showStart();
    }

    setupButtons();
  });

function setupButtons() {
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
    });
  });

  backBtn.addEventListener("click", () => {
    showStart();
  });
}

function showStart() {
  currentMode = null;
  startScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");
  document.getElementById("infoPanel").classList.add("hidden");
}

function setMode(mode) {
  if (!allLists[mode]) return;

  currentMode = mode;
  localStorage.setItem("tierMode", mode);

  modeLabel.textContent = mode === "casual"
    ? "Viewing: Casual"
    : "Viewing: Competitive";

  startScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");

  render();
}

function render() {
  const items = allLists[currentMode] || [];


  document.querySelectorAll(".tier-row").forEach(row => row.innerHTML = "");

  items.forEach(item => {
    const wrapper = document.createElement("div");
    wrapper.className = "icon-wrapper";

    const img = document.createElement("img");
    img.src = item.img;
    img.className = "icon";
    img.onclick = () => showInfo(item);

    const label = document.createElement("div");
    label.className = "icon-label";
    label.textContent = item.name;

    wrapper.appendChild(img);
    wrapper.appendChild(label);

    const row = document.querySelector(`.tier[data-tier="${item.tier}"] .tier-row`);
    if (row) row.appendChild(wrapper);
  });
}

function showInfo(item) {
  document.getElementById("infoTitle").textContent = item.name;
  document.getElementById("infoText").textContent = item.info;
  document.getElementById("infoPanel").classList.remove("hidden");
}
