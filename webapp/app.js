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

tapBtn.addEventListener("click", () => {
  if (dailyTap >= maxTap[level]) {
    tapMessage.textContent = "Umefika kipimo cha taps cha level yako!";
    return;
  }

  dailyTap += 1;
  balance += 1;
  balanceEl.textContent = balance;
  tapMessage.textContent = `👏 Umebonyeza! Tap ${dailyTap} ya ${maxTap[level]}`;
});

upgradeBtn.addEventListener("click", () => {
  const nextLevel = level + 1;
  const tonRequired = nextLevel === 1 ? 0.5 : 1.5;
  // Simulation: automatically approve payment
  level = nextLevel;
  dailyTap = 0;
  upgradeMessage.textContent = `🎉 Level ${level} imefunguliwa! Tap limit: ${maxTap[level]}`;
});