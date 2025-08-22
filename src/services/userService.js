// src/services/userService.js

// kwa prototype hii tutatumia memory (kwa database tutaongeza baadaye)
let users = {};

async function createUser(id, username) {
  if (users[id]) return users[id];
  users[id] = {
    id,
    username,
    balance: 0,
    level: 0,
    dailyTapCount: 0,
    lastTapDate: null,
    tonPaidForLevel: 0,
    referrals: []
  };
  return users[id];
}

async function getUser(id) {
  return users[id] || null;
}

async function getBalance(id) {
  const user = users[id];
  return user ? user.balance : 0;
}

async function incrementTap(id) {
  const user = users[id];
  if (!user) return { message: "User haipo", balance: 0 };

  const today = new Date().toDateString();
  if (user.lastTapDate !== today) {
    user.dailyTapCount = 0;
    user.lastTapDate = today;
  }

  // Define daily tap limits by level
  const tapLimits = { 0: 5, 1: 25, 2: 60 };
  const maxTaps = tapLimits[user.level] || 5;

  if (user.dailyTapCount >= maxTaps) {
    return { message: `Umefika kipimo cha taps cha level yako (${user.level})`, balance: user.balance };
  }

  user.dailyTapCount += 1;
  user.balance += 1; // 1 NDT per tap

  return { message: "Umebonyeza!", balance: user.balance };
}

module.exports = {
  createUser,
  getUser,
  getBalance,
  incrementTap
};