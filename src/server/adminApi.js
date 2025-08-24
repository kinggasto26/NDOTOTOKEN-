const express = require("express");
const router = express.Router();

// Admin settings in-memory
let adminSettings = {
  ads: false,
  claim: false,
  airdrop: false,
  logo: "",
  background: ""
};

// ==== GET admin settings ====
router.get("/settings", (req, res) => {
  res.json(adminSettings);
});

// ==== UPDATE admin settings ====
router.post("/update", (req, res) => {
  const { ads, claim, airdrop, logo, background } = req.body;

  if (ads !== undefined) adminSettings.ads = ads;
  if (claim !== undefined) adminSettings.claim = claim;
  if (airdrop !== undefined) adminSettings.airdrop = airdrop;
  if (logo !== undefined) adminSettings.logo = logo;
  if (background !== undefined) adminSettings.background = background;

  res.json({ success: true, settings: adminSettings });
});

module.exports = router;