// src/models/User.js (in-memory version)

let users = {};

/**
 * Fungua user mpya
 * @param {Number} id - Telegram user ID
 * @param {String} username - Telegram username
 * @param {String} role - "admin" au "user"
 */
async function createUser(id, username, role = "user") {
  if (users[id]) return users[id];
  users[id] = {
    id,
    username,
    role,               // "admin" au "user"
    balance: 0,
    level: 0,
    dailyTapCount: 0,
    lastTapDate: null,
    tonPaidForLevel: 0,
    referrals: []
  };
  return users[id];
}

/**
 * Pata user
 */
async function getUser(id) {
  return users[id] || null;
}

module.exports = { createUser, getUser };