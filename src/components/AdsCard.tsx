export default function AdsCard() {
  const handleAdClick = () => {
    alert("You watched the ad! +1 NDT (demo)");
  };

  return (
    <div className="bg-gray-200 p-4 rounded-xl w-full max-w-sm">
      <p className="font-semibold">Watch Ads</p>
      <button
        onClick={handleAdClick}
        className="mt-2 px-4 py-2 rounded-lg bg-green-600 text-white"
      >
        ▶ Watch Ads
      </button>
    </div>
  );
}