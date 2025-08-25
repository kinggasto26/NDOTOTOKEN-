type User = {
  id: string;
  balance: number;
  tapsLeft: number;
  level: number;
  referrals: number;
  lastTap: number; // timestamp
};

const users: Record<string, User> = {};

export function createUser(id: string): User {
  if (!users[id]) {
    users[id] = { id, balance: 0, tapsLeft: 5, level: 0, referrals: 0, lastTap: 0 };
  }
  return users[id];
}

export function getUser(id: string): User {
  return users[id] || createUser(id);
}

export function addTap(id: string) {
  const user = getUser(id);
  const now = Date.now();
  // reset taps if next day
  const oneDay = 24 * 60 * 60 * 1000;
  if (now - user.lastTap > oneDay) {
    user.tapsLeft = [5, 25, 60][user.level] || 5;
  }

  if (user.tapsLeft > 0) {
    user.balance += 1;
    user.tapsLeft -= 1;
    user.lastTap = now;
    return true;
  }
  return false;
}

export function upgradeLevel(id: string, level: number) {
  const user = getUser(id);
  if (level > user.level) {
    user.level = level;
    // increase taps
    user.tapsLeft = [5, 25, 60][level] || 5;
    return true;
  }
  return false;
}

export function addReferral(id: string) {
  const user = getUser(id);
  user.referrals += 1;
  user.balance += 1; // reward referral
}