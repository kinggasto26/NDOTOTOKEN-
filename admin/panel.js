// admin/panel.js
const { getUser } = require("../src/services/userService");

// Simulation ya settings
let adsStatus = true;
let airdropStatus = true;
let claimStatus = true;

// Simulate login (replace na user id halisi)
const loggedInUserId = 12345; // admin au ordinary user

async function loadAdminPanel(userId) {
  const user = await getUser(userId);
  if (!user || user.role !== "admin") {
    alert("❌ Huna ufikiaji wa Admin Panel");
    document.querySelectorAll("button, input").forEach(el => el.disabled = true);
    return;
  }

  // Admin anaweza kubadilisha
  document.querySelectorAll("button, input").forEach(el => el.disabled = false);
}

loadAdminPanel(loggedInUserId);

// ON/OFF buttons
const adsBtn = document.getElementById("adsBtn");
const airdropBtn = document.getElementById("airdropBtn");
const claimBtn = document.getElementById("claimBtn");
const logoInput = document.getElementById("logoInput");
const bgInput = document.getElementById("bgInput");
const saveBtn = document.getElementById("saveBtn");

adsBtn.addEventListener("click", () => {
  const user = { role: "admin" }; // kwa prototype
  if (user.role !== "admin") return;
  adsStatus = !adsStatus;
  adsBtn.textContent = adsStatus ? "Ads ON" : "Ads OFF";
});

airdropBtn.addEventListener("click", () => {
  const user = { role: "admin" };
  if (user.role !== "admin") return;
  airdropStatus = !airdropStatus;
  airdropBtn.textContent = airdropStatus ? "Airdrop ON" : "Airdrop OFF";
});

claimBtn.addEventListener("click", () => {
  const user = { role: "admin" };
  if (user.role !== "admin") return;
  claimStatus = !claimStatus;
  claimBtn.textContent = claimStatus ? "Claim ON" : "Claim OFF";
});

saveBtn.addEventListener("click", () => {
  const logo = logoInput.files[0];
  const bg = bgInput.files[0];
  alert(`✅ Settings saved!\nLogo: ${logo ? logo.name : "same"}\nBackground: ${bg ? bg.name : "same"}`);
});