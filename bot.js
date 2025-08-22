// bot.js
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const { getUser, createUser, incrementTap, getBalance } = require("./src/services/userService");
const { upgradeLevel } = require("./src/services/paymentService");

// token kutoka .env
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// /start command
bot.onText(/\/start/, async (msg) => {
  const userId = msg.from.id;
  let user = await getUser(userId);
  if (!user) {
    user = await createUser(userId, msg.from.username);
  }

  bot.sendMessage(msg.chat.id, 
    `👋 Karibu ${msg.from.first_name}!\n` +
    `Hii ndiyo Ndoto Token Tap-to-Earn Bot 🚀\n\n` +
    "Commands:\n" +
    "/start - Anza bot\n" +
    "/balance - Angalia balance yako\n" +
    "/tap - Bonyeza kupata token\n" +
    "/upgrade - Fungua level inayofuata kwa TON\n" +
    "/referrals - Pata referral link yako"
  );
});

// /balance command
bot.onText(/\/balance/, async (msg) => {
  const user = await getUser(msg.from.id);
  const balance = user ? user.balance : 0;
  bot.sendMessage(msg.chat.id, `💰 Balance yako: ${balance} NDT`);
});

// /tap command
bot.onText(/\/tap/, async (msg) => {
  const user = await getUser(msg.from.id);
  if (!user) {
    bot.sendMessage(msg.chat.id, "Tafadhali anza bot kwanza kwa /start");
    return;
  }

  const result = await incrementTap(user.id);
  bot.sendMessage(msg.chat.id, `👏 ${result.message}\nPoint zako sasa: ${result.balance} NDT`);
});

// /upgrade command
bot.onText(/\/upgrade/, async (msg) => {
  const user = await getUser(msg.from.id);
  if (!user) {
    bot.sendMessage(msg.chat.id, "Tafadhali anza bot kwanza kwa /start");
    return;
  }

  const response = await upgradeLevel(user.id);
  bot.sendMessage(msg.chat.id, response);
});

// /referrals command
bot.onText(/\/referrals/, async (msg) => {
  const user = await getUser(msg.from.id);
  if (!user) {
    bot.sendMessage(msg.chat.id, "Tafadhali anza bot kwanza kwa /start");
    return;
  }

  const link = `https://t.me/YOUR_BOT_USERNAME?start=${user.id}`;
  bot.sendMessage(msg.chat.id, `Share link yako ya referral: ${link}`);
});