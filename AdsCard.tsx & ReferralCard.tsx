export default function AdsCard() {
  const handleAdClick = () => alert("You watched the ad! +1 NDT (demo)");
  return (
    <div className="bg-gray-200 p-4 rounded-xl w-full sm:w-1/2 text-center">
      <p className="font-semibold">Watch Ads</p>
      <button onClick={handleAdClick} className="mt-2 px-4 py-2 rounded-lg bg-green-600 text-white">
        ▶ Watch Ads
      </button>
    </div>
  );
}

export default function ReferralCard() {
  const handleInvite = () => alert("Referral link copied! (demo)");
  return (
    <div className="bg-gray-200 p-4 rounded-xl w-full sm:w-1/2 text-center">
      <p className="font-semibold">Referrals: 0</p>
      <button onClick={handleInvite} className="mt-2 px-4 py-2 rounded-lg bg-purple-600 text-white">
        Invite Friends
      </button>
    </div>
  );
}