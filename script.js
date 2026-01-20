document.addEventListener("DOMContentLoaded", () => {
  let allLists = {};
  let currentMode = null;

  const startScreen = document.getElementById("startScreen");
  const mainScreen = document.getElementById("mainScreen");
  const backBtn = document.getElementById("backBtn");
  const modeLabel = document.getElementById("modeLabel");
  const infoPanel = document.getElementById("infoPanel");


  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => setMode(btn.dataset.mode));
  });

  backBtn?.addEventListener("click", showStart);


  fetch("data.json")
    .then(r => {
      if (!r.ok) throw new Error("Failed to load data.json");
      return r.json();
    })
    .then(data => {
      allLists = data;

   
      const saved = localStorage.getItem("tierMode");
      if (saved && allLists[saved]) {
        setMode(saved);
      } else {
        showStart();
      }
    })
    .catch(err => {
      console.error(err);
      showStart();
      alert("Could not load data.json. Check filename/path and JSON formatting.");
    });

  function showStart() {
    currentMode = null;
    startScreen?.classList.remove("hidden");
    mainScreen?.classList.add("hidden");
    infoPanel?.classList.add("hidden");
  }

  function setMode(mode) {
  
    if (!allLists || !allLists[mode]) {
      console.warn("Mode not available yet:", mode);
      return;
    }

    currentMode = mode;
    localStorage.setItem("tierMode", mode);

    if (modeLabel) {
      modeLabel.textContent = mode === "casual" ? "Viewing: Casual" : "Viewing: Competitive";
    }

    startScreen?.classList.add("hidden");
    mainScreen?.classList.remove("hidden");

    render();
  }

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
    infoPanel?.classList.remove("hidden");
  }
});
