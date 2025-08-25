"use client";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";
import TapLogo from "@/components/TapLogo";
import BalanceCard from "@/components/BalanceCard";
import AdsCard from "@/components/AdsCard";
import ReferralCard from "@/components/ReferralCard";
import UpgradeModal from "@/components/UpgradeModal";
import MainnetBanner from "@/components/MainnetBanner";

export default function Dashboard() {
  const { t, lang, setLang } = useLanguage();
  const [balance, setBalance] = useState(0);
  const [tapsLeft, setTapsLeft] = useState(5);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleTap = () => {
    if (tapsLeft > 0) {
      setBalance(balance + 1);
      setTapsLeft(tapsLeft - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold">{t("welcome")}</h1>

      {/* Mainnet Banner */}
      <MainnetBanner />

      {/* Balance */}
      <BalanceCard balance={balance} />

      {/* Tap Logo */}
      <div className="flex justify-center w-full">
        <TapLogo tapsLeft={tapsLeft} onTap={handleTap} />
      </div>

      {/* Ads & Referrals */}
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <AdsCard />
        <ReferralCard />
      </div>

      {/* Upgrade Button */}
      <button
        onClick={() => setShowUpgrade(true)}
        className="px-4 py-2 rounded-2xl bg-yellow-500 text-white font-semibold w-full sm:w-auto"
      >
        {t("upgrade")}
      </button>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />

      {/* Language Switch */}
      <div className="mt-2">
        <button
          onClick={() => setLang(lang === "en" ? "sw" : "en")}
          className="text-sm underline text-gray-500"
        >
          🌐 {lang === "en" ? "Badili Kiswahili" : "Switch to English"}
        </button>
      </div>
    </div>
  );
}