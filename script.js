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
    const img = document.createElement("img");
    img.src = item.img;
    img.className = "icon";
    img.onclick = () => showInfo(item);
    img.title = item.name;


    document
      .querySelector(`.tier[data-tier="${item.tier}"] .tier-row`)
      .appendChild(img);
  });
}

function showInfo(item) {
  document.getElementById("infoTitle").textContent = item.name;
  document.getElementById("infoText").textContent = item.info;
  document.getElementById("infoPanel").classList.remove("hidden");
}
