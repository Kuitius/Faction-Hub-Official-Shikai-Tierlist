let items = [];

fetch("data.json")
  .then(r => r.json())
  .then(data => {
    items = data;
    render();
  });

const tierRows = document.querySelectorAll(".tier-row");

function render() {
  tierRows.forEach(row => row.innerHTML = "");

  items.forEach(item => {
    const img = document.createElement("img");
    img.src = item.img;
    img.className = "icon";
    img.draggable = true;

    img.onclick = () => showInfo(item);
    img.ondragstart = e => e.dataTransfer.setData("id", item.id);

    document
      .querySelector(`.tier[data-tier="${item.tier}"] .tier-row`)
      .appendChild(img);
  });
}

tierRows.forEach(row => {
  row.ondragover = e => e.preventDefault();
  row.ondrop = e => {
    const id = e.dataTransfer.getData("id");
    const item = items.find(i => i.id == id);
    item.tier = row.parentElement.dataset.tier;
    render();
  };
});

function showInfo(item) {
  document.getElementById("infoTitle").textContent = item.name;
  document.getElementById("infoText").textContent = item.info;
  document.getElementById("infoPanel").classList.remove("hidden");
}
