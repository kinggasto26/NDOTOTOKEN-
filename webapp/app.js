// webapp/app.js

let balance = 0;
let level = 0;
let dailyTap = 0;
let maxTap = [5, 25, 60]; // tap limit per level

const balanceEl = document.getElementById("balance");
const tapBtn = document.getElementById("tapBtn");
const tapMessage = document.getElementById("tapMessage");
const upgradeBtn = document.getElementById("upgradeBtn");
const upgradeMessage = document.getElementById("upgradeMessage");
const refLink = document.getElementById("refLink");

// Set referral link
refLink.value = "https://t.me/YOUR_BOT_USERNAME?start=12345";

// ===== TAP BUTTON LOGIC (simulation) =====
async function sendTap() {
  // Simulation ya backend call
  return { success: true, balance: balance + 1 };
}

tapBtn.addEventListener("click", async () => {
  if (dailyTap >= maxTap[level]) {
    tapMessage.textContent = "Umefika kipimo cha taps cha level yako!";
    return;
  }

  const response = await sendTap();
  if (response.success) {
    dailyTap += 1;
    balance = response.balance;
    balanceEl.textContent = balance;
    tapMessage.textContent = `👏 Umebonyeza! Tap ${dailyTap} ya ${maxTap[level]}`;
  }
});

// ===== UPGRADE BUTTON LOGIC (simulation) =====
async function upgradeLevelFront() {
  // Simulation ya TON payment verification
  return { success: true, newLevel: level + 1 };
}

upgradeBtn.addEventListener("click", async () => {
  const res = await upgradeLevelFront();
  if (res.success) {
    level = res.newLevel;
    dailyTap = 0;
    upgradeMessage.textContent = `🎉 Level ${level} imefunguliwa! Tap limit: ${maxTap[level]}`;
  }
});