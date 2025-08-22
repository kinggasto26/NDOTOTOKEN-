upgradeBtn.addEventListener("click", async () => {
  const tonAmount = 0.5; // Level 1 upgrade
  const userWalletKey = prompt("Weka secret key ya wallet yako ya TON (simulation)");

  const adminWallet = "UQDi-2aeyBLfpcdovk7R-cqiJcmn7vk5GXfpEzsr7N4SZha3";

  try {
    const TonWeb = require("tonweb");
    const tonweb = new TonWeb(new TonWeb.HttpProvider("https://mainnet.toncenter.com/api/v2/jsonRPC"));

    const keyPair = TonWeb.utils.keyPairFromSecretKey(userWalletKey);
    const wallet = new TonWeb.wallet.All.v3(tonweb.provider, keyPair);

    // Send TON directly to admin wallet
    const transfer = await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: adminWallet,
      amount: TonWeb.utils.toNano(tonAmount)
    }).send();

    alert("🎉 Malipo yametumwa! Transaction hash: " + transfer.id);

    // Unlock Level on backend
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