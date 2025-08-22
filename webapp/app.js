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

// User info (replace with dynamic Telegram ID & username if available)
const userId = 12345;
const username = "Guest";

// Set referral link
refLink.value = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;

// ===== HELPER: Fetch balance =====
async function fetchBalance() {
  const res = await fetch(`/api/balance?userId=${userId}&username=${username}`);
  const data = await res.json();
  balance = data.balance;
  level = data.level;
  balanceEl.textContent = balance;
}
fetchBalance();

// ===== TAP BUTTON =====
tapBtn.addEventListener("click", async () => {
  const res = await fetch("/api/tap?userId=" + userId + "&username=" + username, { method: "POST" });
  const data = await res.json();

  if (!data.success) {
    tapMessage.textContent = data.message;
    return;
  }

  balance = data.balance;
  dailyTap = data.dailyTap;
  balanceEl.textContent = balance;
  tapMessage.textContent = `👏 Umebonyeza! Tap ${dailyTap} ya ${maxTap[level]}`;
});

// ===== UPGRADE BUTTON =====
upgradeBtn.addEventListener("click", async () => {
  const tonPaid = prompt("Weka TON uliolipa kwa upgrade:"); // simulation input

  const res = await fetch("/api/upgrade?userId=" + userId + "&username=" + username, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tonPaid })
  });
  const data = await res.json();

  if (!data.success) {
    upgradeMessage.textContent = data.message;
    return;
  }

  level = data.newLevel;
  dailyTap = 0;
  upgradeMessage.textContent = `🎉 Level ${level} imefunguliwa! Tap limit: ${maxTap[level]}`;
  balanceEl.textContent = balance;
});

// ===== REFERRAL BUTTON =====
const referralBtn = document.getElementById("referralBtn");
referralBtn.addEventListener("click", async () => {
  const friendId = prompt("Weka Telegram ID ya rafiki:"); // simulation
  const res = await fetch("/api/referral?userId=" + userId + "&username=" + username, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ friendId })
  });
  const data = await res.json();
  balance = data.balance;
  balanceEl.textContent = balance;
  alert(`🎁 Rafiki ameongezwa! Balance sasa: ${balance}`);
});