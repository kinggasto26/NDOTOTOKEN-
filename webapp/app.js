// ===== UPGRADE BUTTON (TON payment to OKX) =====
upgradeBtn.addEventListener("click", async () => {
  const tonAmount = prompt("Andika kiasi cha TON unachotuma kwa upgrade:");

  // User wallet input (simulation)
  const userWalletKey = prompt("Weka secret key ya wallet yako ya TON (simulation)");

  // OKX admin wallet
  const adminWallet = "UQDi-2aeyBLfpcdovk7R-cqiJcmn7vk5GXfpEzsr7N4SZha3";

  try {
    const TonWeb = require("tonweb");
    const tonweb = new TonWeb(new TonWeb.HttpProvider("https://mainnet.toncenter.com/api/v2/jsonRPC"));

    const keyPair = TonWeb.utils.keyPairFromSecretKey(userWalletKey);
    const wallet = new TonWeb.wallet.All.v3(tonweb.provider, keyPair);

    // Send TON directly to OKX wallet
    const transfer = await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: adminWallet,
      amount: TonWeb.utils.toNano(tonAmount)
    }).send();

    // Optional: wait for confirmation / hash
    alert("🎉 Malipo yametumwa! Transaction hash: " + transfer.id);

    // Call backend API to unlock level
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
    } else {
      upgradeMessage.textContent = data.message;
    }
  } catch (err) {
    console.error(err);
    alert("💥 Malipo hayakufanikiwa. Jaribu tena.");
  }
});