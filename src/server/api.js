const express = require("express");
const router = express.Router();

// ================== In-memory database ==================
let users = {}; // userId => { balance, level, tapsToday, lastTapDate }

// Admin wallet (malipo ya upgrades)
const adminWallet = "OKX_ADMIN_WALLET_ADDRESS";

// ================== Levels Config ==================
const levels = {
  0: { cost: 0, maxTaps: 5, reward: 1 },       // Free
  1: { cost: 0.5, maxTaps: 25, reward: 1 },    // Requires 0.5 TON
  2: { cost: 1.5, maxTaps: 60, reward: 1 },    // Requires 1.5 TON
};

// ================== Helpers ==================
function resetDailyTaps(user) {
  const today = new Date().toDateString();
  if (user.lastTapDate !== today) {
    user.tapsToday = 0;
    user.lastTapDate = today;
  }
}

// ================== API ROUTES ==================

// ---- Tap ----
router.post("/tap", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.json({ success: false, message: "Missing userId" });

  if (!users[userId]) {
    users[userId] = { balance: 0, level: 0, tapsToday: 0, lastTapDate: "" };
  }

  const user = users[userId];
  resetDailyTaps(user);

  const levelInfo = levels[user.level] || levels[0];
  if (user.tapsToday >= levelInfo.maxTaps) {
    return res.json({ success: false, message: "Umemaliza taps za leo. Rudi kesho 🙏" });
  }

  user.balance += levelInfo.reward;
  user.tapsToday += 1;

  res.json({ success: true, balance: user.balance, level: user.level });
});

// ---- Upgrade with TON payment ----
router.post("/upgrade", async (req, res) => {
  const { userId, paymentAmount } = req.body; // paymentAmount in TON
  if (!userId) return res.json({ success: false, message: "Missing userId" });

  if (!users[userId]) {
    users[userId] = { balance: 0, level: 0, tapsToday: 0, lastTapDate: "" };
  }

  const user = users[userId];
  const nextLevel = user.level + 1;

  if (!levels[nextLevel]) {
    return res.json({ success: false, message: "Hakuna level zaidi" });
  }

  const cost = levels[nextLevel].cost;

  // Check if user sent enough TON
  if (!paymentAmount || paymentAmount < cost) {
    return res.json({ success: false, message: `Unahitaji ${cost} TON kwa upgrade hii` });
  }

  // Simulate sending TON to admin wallet
  console.log(`💰 Received ${paymentAmount} TON from ${userId}, sending to admin wallet: ${adminWallet}`);

  // Upgrade user level
  user.level = nextLevel;

  res.json({ success: true, level: user.level, message: `Level ${nextLevel} imefunguka ✅` });
});

// ---- Claim ----
router.post("/claim", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.json({ success: false, message: "Missing userId" });

  if (!users[userId]) {
    users[userId] = { balance: 0, level: 0, tapsToday: 0, lastTapDate: "" };
  }

  const user = users[userId];
  const reward = 10; // kila claim = 10 NDT

  user.balance += reward;
  res.json({ success: true, reward, balance: user.balance });
});

module.exports = router;