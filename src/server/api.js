// src/server/api.js
const express = require("express");
const { getUser, createUser } = require("../models/User");

const router = express.Router();

// ===== Simulate database in-memory =====
let settings = {
  adsStatus: true,
  airdropStatus: true,
  claimStatus: true
};

// Middleware ya user creation
router.use(async (req, res, next) => {
  const userId = parseInt(req.query.userId);
  const username = req.query.username || "Guest";
  if (!userId) return res.status(400).send("userId required");
  req.user = await createUser(userId, username);
  next();
});

// ===== GET USER =====
router.get("/balance", async (req, res) => {
  res.json({ balance: req.user.balance, level: req.user.level });
});

// ===== TAP BUTTON =====
router.post("/tap", async (req, res) => {
  if (!req.user.dailyTapCount) req.user.dailyTapCount = 0;

  // Limit per level
  const maxTapLevel = [5, 25, 60];
  if (req.user.dailyTapCount >= maxTapLevel[req.user.level]) {
    return res.json({ success: false, message: "Daily tap limit reached" });
  }

  req.user.dailyTapCount += 1;
  req.user.balance += 1; // 1 NDT per tap (simulation)
  res.json({ success: true, balance: req.user.balance, dailyTap: req.user.dailyTapCount });
});

// ===== UPGRADE LEVEL =====
router.post("/upgrade", async (req, res) => {
  const requiredTON = [0.5, 1.5]; // level 1 = 0.5 TON, level2 = 1.5 TON
  const level = req.user.level;
  const payment = parseFloat(req.body.tonPaid);

  if (payment < requiredTON[level]) {
    return res.json({ success: false, message: "Insufficient TON for upgrade" });
  }

  req.user.level += 1;
  req.user.dailyTapCount = 0;
  res.json({ success: true, newLevel: req.user.level });
});

// ===== REFERRALS =====
router.post("/referral", async (req, res) => {
  const friendId = parseInt(req.body.friendId);
  if (!req.user.referrals.includes(friendId)) {
    req.user.referrals.push(friendId);
    req.user.balance += 1; // 1 NDT bonus per referral (simulation)
  }
  res.json({ success: true, balance: req.user.balance, referrals: req.user.referrals });
});

// ===== ADMIN SETTINGS =====
router.post("/admin/settings", async (req, res) => {
  const role = req.user.role;
  if (role !== "admin") return res.status(403).send("Access denied");

  const { adsStatus, airdropStatus, claimStatus } = req.body;
  settings.adsStatus = adsStatus;
  settings.airdropStatus = airdropStatus;
  settings.claimStatus = claimStatus;

  res.json({ success: true, settings });
});

module.exports = router;