// ================== User State ==================
let balance = 0;
let level = 0;

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
      document.getElementById("balance").innerText = balance;
      document.getElementById("level").innerText = level;
    } else {
      alert(data.message || "Tap haikufanikiwa");
    }
  } catch (err) {
    console.error("Tap error:", err);
  }
}

// ================== UPGRADE FUNCTION ==================
async function upgradeLevel() {
  try {
    const res = await fetch("/api/upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user1" }) // TODO: badilisha na Telegram userId
    });
    const data = await res.json();

    if (data.success) {
      balance = data.balance;
      level = data.level;
      document.getElementById("balance").innerText = balance;
      document.getElementById("level").innerText = level;
      alert("Hongera 🎉 umeupgrade hadi level " + level);
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
      document.getElementById("balance").innerText = balance;
      alert(`Umeclaim ${data.reward} NDT 🎁`);
    } else {
      alert(data.message || "Claim haikufanikiwa");
    }
  } catch (err) {
    console.error("Claim error:", err);
  }
}

// ================== LOAD ADMIN SETTINGS ==================
async function loadSettings() {
  try {
    const res = await fetch("/api/admin/settings");
    const settings = await res.json();

    // Ads
    if (settings.ads) {
      document.getElementById("adsSection").style.display = "block";
    } else {
      document.getElementById("adsSection").style.display = "none";
    }

    // Claim
    if (settings.claim) {
      document.getElementById("claimBtn").disabled = false;
      document.getElementById("claimBtn").innerText = "Claim Now 🎁";
    } else {
      document.getElementById("claimBtn").disabled = true;
      document.getElementById("claimBtn").innerText = "Claim imezimwa ⛔";
    }

    // Airdrop
    if (settings.airdrop) {
      document.getElementById("airdropSection").style.display = "block";
    } else {
      document.getElementById("airdropSection").style.display = "none";
    }
  } catch (err) {
    console.error("Failed to load admin settings:", err);
  }
}

// ================== INITIAL LOAD ==================
window.onload = () => {
  loadSettings();
};