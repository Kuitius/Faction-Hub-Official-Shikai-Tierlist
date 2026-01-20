let allLists = {};
let currentMode = localStorage.getItem("tierMode") || "casual";

fetch("data.json")
  .then(r => r.json())
  .then(data => {
    allLists = data;
    setupModeButtons();
    setMode(currentMode);
  });

function setupModeButtons() {
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
    });
  });
}

function setMode(mode) {
  currentMode = mode;
  localStorage.setItem("tierMode", mode);

  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  render();
}

function render() {
  const items = allLists[currentMode] || [];
  const tierRows = document.querySelectorAll(".tier-row");
  tierRows.forEach(row => (row.innerHTML = ""));

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
