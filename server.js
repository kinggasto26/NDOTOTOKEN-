// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve WebApp
app.use("/webapp", express.static(path.join(__dirname, "webapp")));

// Serve Admin Panel
app.use("/admin", express.static(path.join(__dirname, "admin")));

// Root redirect to WebApp
app.get("/", (req, res) => {
  res.redirect("/webapp");
});

app.listen(PORT, () => {
  console.log(`Server inafanya kazi kwenye http://localhost:${PORT}`);
});