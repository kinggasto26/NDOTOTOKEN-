const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("webapp"));
app.use("/admin", express.static("admin"));

// ================= USER DATA =================
let users = {};
let adminWallet = "UQDi-2aeyBLfpcdovk7R-cqiJcmn7vk5GXfpEzsr7N4SZha3";

// ================= ADMIN SETTINGS =================
let adminSettings = {
  ads: false,
  airdrop: false,
  claim: false,
};

// ================= API ROUTES =================

// Webapp Home
app.get("/webapp", (req, res) => {
  res.sendFile(path.join(__dirname, "webapp", "index.html"));
});

// Admin Home
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "index.html"));
});

// Get user balance
app.get("/api/balance/:userId", (req, res) => {
  const userId = req.params.userId;
  if (!users[userId]) {
    users[userId] = { balance: 0, level: 0 };
  }
  res.json(users[userId]);
});

// Handle taps
app.post("/api/tap", (req, res) => {
  const { userId } = req.body;
  if (!users[userId]) {
    users[userId] = { balance: 0, level: 0 };
  }
  users[userId].balance += 1;
  res.json({ success: true, balance: users[userId].balance });
});

// Handle upgrades
app.post("/api/upgrade", (req, res) => {
  const { userId, paymentTx, level } = req.body;

  // TODO: Verify TON/OKX transaction here

  if (!users[userId]) {
    users[userId] = { balance: 0, level: 0 };
  }
  users[userId].level = level;
  res.json({ success: true, newLevel: level });
});

// Handle claim
app.post("/api/claim", (req, res) => {
  const { userId } = req.body;
  if (!users[userId]) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  if (!adminSettings.claim) {
    return res.json({ success: false, message: "Claim is OFF" });
  }
  const reward = 100; // Example claim reward
  users[userId].balance += reward;
  res.json({ success: true, reward, balance: users[userId].balance });
});

// ===== Admin Settings Routes =====

// Get current settings
app.get("/api/admin/settings", (req, res) => {
  res.json(adminSettings);
});

// Update settings
app.post("/api/admin/settings", (req, res) => {
  const { ads, airdrop, claim } = req.body;
  adminSettings = { ads, airdrop, claim };
  res.json({ success: true, settings: adminSettings });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});