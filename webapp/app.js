// ================== User State ==================
let balance = 0;
let level = 0;

// ================== Levels Config ==================
const levels = {
  0: { cost: 0, maxTaps: 5, reward: 1 },
  1: { cost: 0.5, maxTaps: 25, reward: 1 },
  2: { cost: 1.5, maxTaps: 60, reward: 1 },
};

// ================== TAP FUNCTION ==================
async function sendTap() {
  try {
    const res = await fetch("/api/tap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user1" }) // TODO: badilisha na Telegram userId
    });
    const data = await res.json();

    if (data.success) {
      balance = data.balance;
      level = data.level;
      updateUI();
    } else {
      alert(data.message || "Tap haikufanikiwa");
    }
  } catch (err) {
    console.error("Tap error:", err);
  }
}

// ================== UPGRADE FUNCTION ==================
async function upgradeLevel() {
  const nextLevel = level + 1;
  const levelInfo = levels[nextLevel];

  if (!levelInfo) {
    alert("Hakuna level zaidi ✅");
    return;
  }

  const paymentAmount = parseFloat(prompt(`Lipa ${levelInfo.cost} TON kwa upgrade hadi Level ${nextLevel}`));
  if (isNaN(paymentAmount) || paymentAmount < levelInfo.cost) {
    alert("Payment haikutosha");
    return;
  }

  try {
    const res = await fetch("/api/upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user1", paymentAmount })
    });
    const data = await res.json();

    if (data.success) {
      level = data.level;
      updateUI();
      alert(data.message);
    } else {
      alert(data.message || "Upgrade haikufanikiwa");
    }
  } catch (err) {
    console.error("Upgrade error:", err);
  }
}

// ================== CLAIM FUNCTION ==================
async function claimTokens() {
  try {
    const res = await fetch("/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user1" }) // TODO: badilisha na Telegram userId
    });
    const data = await res.json();

    if (data.success) {
      balance = data.balance;
      updateUI();
      alert(`Umeclaim ${data.reward} NDT 🎁`);
    } else {
      alert(data.message || "Claim haikufanikiwa");
    }
  } catch (err) {
    console.error("Claim error:", err);
  }
}

// ================== UPDATE UI ==================
function updateUI() {
  document.getElementById("balance").innerText = balance;
  document.getElementById("level").innerText = level;
}

// ================== LOAD ADMIN SETTINGS ==================
async function loadSettings() {
  try {
    const res = await fetch("/api/admin/settings");
    const settings = await res.json();

    // Ads
    document.getElementById("adsSection").style.display = settings.ads ? "block" : "none";

    // Claim
    const claimBtn = document.getElementById("claimBtn");
    if (settings.claim) {
      claimBtn.disabled = false;
      claimBtn.innerText = "Claim Now 🎁";
    } else {
      claimBtn.disabled = true;
      claimBtn.innerText = "Claim imezimwa ⛔";
    }

    // Airdrop
    document.getElementById("airdropSection").style.display = settings.airdrop ? "block" : "none";
  } catch (err) {
    console.error("Failed to load admin settings:", err);
  }
}

// ================== INITIAL LOAD ==================
window.onload = () => {
  loadSettings();
  updateUI();
};