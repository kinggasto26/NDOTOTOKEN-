// src/server/api.js

const express = require("express");
const router = express.Router();
const { verifyPayment } = require("../services/paymentService");

// ======== Simulated DB =========
let users = {}; // { userId: { username, balance, level, dailyTapCount } }
let adminSettings = {
  adsStatus: true,
  airdropStatus: true,
  claimStatus: true
};

// ======== Middleware to get or create user =========
router.use((req, res, next) => {
  const userId = req.query.userId || req.body.userId;
  const username = req.query.username || req.body.username || "Guest";

  if (!users[userId]) {
    users[userId] = {
      username,
      balance: 0,
      level: 0,
      dailyTapCount: 0
    };
  }

  req.user = users[userId];
  next();
});

// ======== TAP endpoint =========
router.post("/tap", (req, res) => {
  const user = req.user;
  const maxTap = [5, 25, 60];

  if (user.dailyTapCount >= maxTap[user.level]) {
    return res.json({ success: false, message: "💤 Umefikia tap limit kwa leo" });
  }

  user.dailyTapCount += 1;
  user.balance += 1; // 1 NDT per tap
  res.json({ success: true, balance: user.balance, dailyTap: user.dailyTapCount });
});

// ======== UPGRADE endpoint =========
router.post("/upgrade", async (req, res) => {
  const user = req.user;
  const level = user.level;
  const requiredTON = [0.5, 1.5, 3]; // example: level 1 = 0.5 TON, level2 = 1.5 TON

  const { tonPaid, walletAddress } = req.body;

  // Verify transaction on TON blockchain
  const paid = await verifyPayment(walletAddress, tonPaid);

  if (!paid) return res.json({ success: false, message: "Payment not received on TON" });
  if (tonPaid < requiredTON[level]) return res.json({ success: false, message: "Insufficient TON paid" });

  user.level += 1;
  user.dailyTapCount = 0;

  res.json({ success: true, newLevel: user.level });
});

// ======== REFERRAL endpoint =========
router.post("/referral", (req, res) => {
  const user = req.user;
  const { friendId } = req.body;

  if (!users[friendId]) {
    users[friendId] = { username: "Friend", balance: 0, level: 0, dailyTapCount: 0 };
  }

  user.balance += 1; // referral reward
  users[friendId].balance += 1; // friend reward

  res.json({ success: true, balance: user.balance });
});

// ======== BALANCE endpoint =========
router.get("/balance", (req, res) => {
  const user = req.user;
  res.json({ balance: user.balance, level: user.level, dailyTap: user.dailyTapCount });
});

// ======== ADMIN SETTINGS endpoint =========
router.get("/admin/settings", (req, res) => {
  res.json({ settings: adminSettings });
});

router.post("/admin/settings", (req, res) => {
  adminSettings = { ...adminSettings, ...req.body };
  res.json({ success: true, settings: adminSettings });
});

module.exports = router;