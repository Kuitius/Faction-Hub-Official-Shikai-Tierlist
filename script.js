let items = [];

fetch("data.json")
  .then(r => r.json())
  .then(data => {
    items = data;
    render();
  });

function render() {
  const tierRows = document.querySelectorAll(".tier-row");
  tierRows.forEach(row => row.innerHTML = "");

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

document
  .querySelector(`.tier[data-tier="${item.tier}"] .tier-row`)
  .appendChild(wrapper);
  });
}

function showInfo(item) {
  document.getElementById("infoTitle").textContent = item.name;
  document.getElementById("infoText").textContent = item.info;
  document.getElementById("infoPanel").classList.remove("hidden");
}
