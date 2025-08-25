// Simple utilities
export function formatBalance(balance: number) {
  return balance.toLocaleString("en-US");
}

export function isSameDay(timestamp1: number, timestamp2: number) {
  const d1 = new Date(timestamp1);
  const d2 = new Date(timestamp2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}