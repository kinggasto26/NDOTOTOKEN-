type BalanceCardProps = {
  balance: number;
};

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-xl w-full max-w-sm">
      <p className="font-semibold text-lg">Balance: {balance} NDT</p>
    </div>
  );
}