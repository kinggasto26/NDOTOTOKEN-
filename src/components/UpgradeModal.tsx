type UpgradeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  if (!open) return null;

  const handleUpgrade = (level: number) => {
    alert(`Upgraded to Level ${level} (demo)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 text-center space-y-4">
        <h2 className="text-xl font-bold">Upgrade Levels</h2>
        <button
          onClick={() => handleUpgrade(1)}
          className="w-full px-4 py-2 rounded-lg bg-yellow-400"
        >
          Level 1 - 0.5 TON
        </button>
        <button
          onClick={() => handleUpgrade(2)}
          className="w-full px-4 py-2 rounded-lg bg-yellow-500"
        >
          Level 2 - 1.5 TON
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-lg bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}