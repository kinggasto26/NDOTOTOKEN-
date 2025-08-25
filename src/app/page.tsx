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
  const [tapsLeft, setTapsLeft] = useState(5); // Level 0 max taps
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleTap = () => {
    if (tapsLeft > 0) {
      setBalance(balance + 1);
      setTapsLeft(tapsLeft - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 text-center space-y-6">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>

      {/* Mainnet Banner */}
      <MainnetBanner />

      <BalanceCard balance={balance} />

      <TapLogo tapsLeft={tapsLeft} onTap={handleTap} />

      <AdsCard />

      <ReferralCard />

      <button
        onClick={() => setShowUpgrade(true)}
        className="px-6 py-3 rounded-2xl bg-yellow-500 text-white font-semibold"
      >
        {t("upgrade")}
      </button>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />

      <div className="mt-4">
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