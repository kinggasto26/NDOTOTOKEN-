"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [adsOn, setAdsOn] = useState(true);
  const [airdropOn, setAirdropOn] = useState(true);
  const [background, setBackground] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <div className="flex flex-col p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={adsOn}
            onChange={() => setAdsOn(!adsOn)}
          />
          <span>Ads On/Off</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={airdropOn}
            onChange={() => setAirdropOn(!airdropOn)}
          />
          <span>Airdrop On/Off</span>
        </label>

        <label className="flex flex-col">
          Background Color:
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          Logo URL:
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>

        <button className="px-4 py-2 rounded bg-green-600 text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}