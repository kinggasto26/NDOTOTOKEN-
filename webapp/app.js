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
  const tonAmount = prompt("Weka kiasi cha TON unachotuma kwa upgrade:");
  const userWalletKey = prompt("Weka secret key ya wallet yako ya TON (simulation)");

  const adminWallet = "UQDi-2aeyBLfpcdovk7R-cqiJcmn7vk5GXfpEzsr7N4SZha3";

  try {
    const TonWeb = require("tonweb");
    const tonweb = new TonWeb(new TonWeb.HttpProvider("https://mainnet.toncenter.com/api/v2/jsonRPC"));

    const keyPair = TonWeb.utils.keyPairFromSecretKey(userWalletKey);
    const wallet = new TonWeb.wallet.All.v3(tonweb.provider, keyPair);

    const transfer = await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: adminWallet,
      amount: TonWeb.utils.toNano(tonAmount)
    }).send();

    alert("🎉 Malipo yametumwa! Transaction hash: " + transfer.id);

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