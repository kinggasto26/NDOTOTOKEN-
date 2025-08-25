type TapLogoProps = {
  tapsLeft: number;
  onTap: () => void;
};

export default function TapLogo({ tapsLeft, onTap }: TapLogoProps) {
  return (
    <button
      onClick={onTap}
      disabled={tapsLeft === 0}
      className="w-32 h-32 sm:w-40 sm:h-40 bg-blue-600 rounded-full text-white text-lg sm:text-xl font-bold flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      {tapsLeft > 0 ? "Gusa / Tap" : "⏳ Tomorrow"}
    </button>
  );
}