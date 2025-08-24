// Load current settings
async function loadSettings() {
  try {
    const res = await fetch("/api/admin/settings");
    const settings = await res.json();

    document.getElementById("adsCheckbox").checked = settings.ads;
    document.getElementById("claimCheckbox").checked = settings.claim;
    document.getElementById("airdropCheckbox").checked = settings.airdrop;
    document.getElementById("logoInput").value = settings.logo || "";
    document.getElementById("bgInput").value = settings.background || "";
  } catch (err) {
    console.error("Failed to load admin settings:", err);
  }
}

// Save updated settings
async function saveSettings() {
  const data = {
    ads: document.getElementById("adsCheckbox").checked,
    claim: document.getElementById("claimCheckbox").checked,
    airdrop: document.getElementById("airdropCheckbox").checked,
    logo: document.getElementById("logoInput").value,
    background: document.getElementById("bgInput").value
  };

  try {
    const res = await fetch("/api/admin/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.success) alert("Settings zimehifadhiwa ✅");
  } catch (err) {
    console.error("Save settings error:", err);
  }
}

// Initial load
window.onload = () => {
  loadSettings();
};