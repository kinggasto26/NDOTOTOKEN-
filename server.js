I'm// server.js

const express = require("express");
const path = require("path");
const apiRouter = require("./src/server/api"); // API routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // parse JSON body

// Serve WebApp
app.use("/webapp", express.static(path.join(__dirname, "webapp")));

// Serve Admin Panel
app.use("/admin", express.static(path.join(__dirname, "admin")));

// API routes
app.use("/api", apiRouter);

// Root redirect to WebApp
app.get("/", (req, res) => {
  res.redirect("/webapp");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// ===== Admin Settings Routes =====
let adminSettings = {
  ads: false,
  airdrop: false,
  claim: false,
};

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