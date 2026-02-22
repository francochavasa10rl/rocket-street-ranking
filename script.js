const teamsData = [
  { name:"TSM", logo:"logos/tsm.png" },
  { name:"FURIA", logo:"logos/furia.png" },
  { name:"SHOPIFY REBELLION", logo:"logos/shopify.png" },
  { name:"NRG", logo:"logos/nrg.png" },
  { name:"VITALITY", logo:"logos/vitality.png" },
  { name:"KARMINE CORP", logo:"logos/kc.png" },
  { name:"FALCONS", logo:"logos/falcons.png" },
  { name:"SPACESTATION", logo:"logos/ssg.png" },
  { name:"GENTLEMATES", logo:"logos/gentlemates.png" },
  { name:"PWR", logo:"logos/pwr.png" },
  { name:"TWISTED MINDS", logo:"logos/twisted.png" },
  { name:"MIBR", logo:"logos/mibr.png" },
  { name:"GEEKAY ESPORTS", logo:"logos/geekay.png" },
  { name:"NINJAS IN PYJAMAS", logo:"logos/nip.png" },
  { name:"VIRTUS.PRO", logo:"logos/vp.png" },
  { name:"FIVE FEARS", logo:"logos/5f.png" }
];

const teamsUl = document.getElementById("teams");

function renderTeams() {
  teamsUl.innerHTML = "";

  teamsData.forEach((team, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="position">#${index + 1}</span>
      <div class="logo-box">
        <img src="${team.logo}">
      </div>
      <span class="team-name">${team.name}</span>
    `;

    teamsUl.appendChild(li);
  });
}

renderTeams();

new Sortable(teamsUl, {
  animation: 150,
  onEnd: updatePositions
});

function updatePositions() {
  const items = document.querySelectorAll("#teams li");

  items.forEach((item, index) => {
    item.querySelector(".position").textContent = `#${index + 1}`;
  });
}

/* =========================
   GENERADOR PRO CON CANVAS
========================= */

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1350;

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.src = src;
  });
}

async function generateImage() {

  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cargar fondo
  const bg = await loadImage("background.png");
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // ===== NOMBRE PERSONA =====
  const personNameInput = document.getElementById("personName");
  const personName = personNameInput ? personNameInput.value : "";

  if (personName) {
    ctx.fillStyle = "#bbff00";
    ctx.textAlign = "center";
    ctx.font = "bold 60px BourgeoisBold";
    ctx.fillText(personName.toUpperCase(), canvas.width / 2, 330);
  }

  // ===== TEAMS =====
  const teams = document.querySelectorAll("#teams li");

let startY = 320;   // antes era 430
const spacing = 65; // antes era 60

  for (let i = 0; i < teams.length; i++) {

    const teamName = teams[i].querySelector(".team-name").textContent;
    const logoSrc = teams[i].querySelector("img").src;

    // Logo 1:1
    const logo = await loadImage(logoSrc);
    ctx.drawImage(logo, 180, startY - 35, 45, 45);

    // Team name
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.font = "bold 36px BourgeoisBold";
    ctx.fillText(teamName.toUpperCase(), 250, startY);

    startY += spacing;
  }

  // Descargar automáticamente
  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}


document.getElementById("downloadBtn").addEventListener("click", generateImage);


