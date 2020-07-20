const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const telegram = new TelegramBot(token, { polling: true });

const watson = require('../ia/watson');

telegram.on('polling_error', function (err) {
  console.log(err);
});

const textMsg = async (text) => {};

const start = async () => {
  telegram.on('message', async (msg) => {
    var chatId = msg.chat.id;

    // console.log(msg.voice);
    const responses = await watson.sendMessage(msg.text);
    if (responses.image) {
      telegram.sendMessage(chatId, responses.message);
      telegram.sendPhoto(chatId, responses.image);
    }
    console.log('message:', msg.text);

    telegram.sendMessage(chatId, responses.message);
    if (msg.photo) telegram.sendMessage(chatId, 'Não recebo imagens, ainda');
  });
};

start();
