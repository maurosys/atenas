'use strict';

require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3002;

// const app = express();

const bot = require('./channels/telegram');

// const watson = require('./ia/watson');

// watson
//   .sendMessage('quero pizza com prioridade de tempo para rua potigua, 1010')
//   .then((res) => console.log(res));
