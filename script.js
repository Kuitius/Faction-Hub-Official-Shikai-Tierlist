let allLists = {};
let currentMode = null;


window.chooseMode = function(mode) {
  const startScreen = document.getElementById("startScreen");
  const mainScreen = document.getElementById("mainScreen");
  const modeLabel = document.getElementById("modeLabel");
  const infoPanel = document.getElementById("infoPanel");

  
  if (!allLists || !allLists[mode]) {
    console.error("Mode not found or data not loaded:", mode, allLists);
    alert("Data not loaded yet or mode missing in data.json.");
    return;
  }

  currentMode = mode;
  localStorage.setItem("tierMode", mode);

  if (modeLabel) {
    modeLabel.textContent = mode === "casual" ? "Viewing: Casual" : "Viewing: Competitive";
  }

 
  startScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  if (infoPanel) infoPanel.classList.add("hidden");

  render();
};


window.goBackToModeSelect = function() {
  const startScreen = document.getElementById("startScreen");
  const mainScreen = document.getElementById("mainScreen");
  const infoPanel = document.getElementById("infoPanel");

  startScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");
  if (infoPanel) infoPanel.classList.add("hidden");
};


fetch("data.json")
  .then(r => {
    if (!r.ok) throw new Error("Failed to load data.json");
    return r.json();
  })
  .then(data => {
    allLists = data;

   
    const saved = localStorage.getItem("tierMode");
    if (saved && allLists[saved]) {
      window.chooseMode(saved);
    }
  })
  .catch(err => {
    console.error("Failed to load data.json:", err);
    alert("Failed to load data.json. Check path/name and JSON formatting.");
  });

function render() {
  const items = allLists[currentMode] || [];

  
  document.querySelectorAll(".tier-row").forEach(row => (row.innerHTML = ""));

  
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
