type BalanceCardProps = {
  balance: number;
};

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-xl w-full text-center sm:max-w-sm">
      <p className="font-semibold text-lg sm:text-xl">Balance: {balance} NDT</p>
    </div>
  );
}