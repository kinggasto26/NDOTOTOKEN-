// admin/panel.js

const adsCheckbox = document.getElementById("adsStatus");
const airdropCheckbox = document.getElementById("airdropStatus");
const claimCheckbox = document.getElementById("claimStatus");
const saveBtn = document.getElementById("saveSettings");

// Simulation ya role
const userRole = prompt("Andika role yako (admin/worker):"); // admin = wewe, worker = wachimbaji

// ===== Disable kwa wachimbaji =====
if (userRole !== "admin") {
  adsCheckbox.disabled = true;
  airdropCheckbox.disabled = true;
  claimCheckbox.disabled = true;
  saveBtn.disabled = true;
}

// ===== Load settings =====
async function loadSettings() {
  const res = await fetch(`/api/admin/settings?userId=1&username=Admin`);
  const data = await res.json();
  adsCheckbox.checked = data.settings.adsStatus;
  airdropCheckbox.checked = data.settings.airdropStatus;
  claimCheckbox.checked = data.settings.claimStatus;
}
loadSettings();

// ===== Save settings =====
saveBtn.addEventListener("click", async () => {
  if (userRole !== "admin") return; // Safety

  const body = {
    adsStatus: adsCheckbox.checked,
    airdropStatus: airdropCheckbox.checked,
    claimStatus: claimCheckbox.checked
  };

  const res = await fetch("/api/admin/settings?userId=1&username=Admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (data.success) {
    alert("🎉 Settings zimehifadhiwa!");
  }
});

// ===== Live update kwa wachimbaji =====
if (userRole !== "admin") {
  setInterval(async () => {
    const res = await fetch(`/api/admin/settings?userId=1&username=Admin`);
    const data = await res.json();
    adsCheckbox.checked = data.settings.adsStatus;
    airdropCheckbox.checked = data.settings.airdropStatus;
    claimCheckbox.checked = data.settings.claimStatus;
  }, 5000); // update kila 5 sec
}