"use client";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";

export default function ReferralsPage() {
  const { t } = useLanguage();
  const [refCount, setRefCount] = useState(0);

  const handleInvite = () => {
    navigator.clipboard.writeText("https://t.me/YourBot?start=REFCODE");
    alert("Referral link copied! Share with friends.");
    setRefCount(refCount + 1);
  };

  return (
    <div className="flex flex-col items-center p-6 text-center space-y-6">
      <h1 className="text-2xl font-bold">{t("referrals")}</h1>
      <p className="text-lg">You have invited {refCount} friends.</p>
      <button
        onClick={handleInvite}
        className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold"
      >
        Invite Friends
      </button>
    </div>
  );
}