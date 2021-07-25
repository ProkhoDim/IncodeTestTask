'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = { value: 5000, minValue: 1000 };
const PORT = process.env.PORT || 4000;

const tickers = [
  { ticker: 'AAPL', color: '#BEE50D' }, // Apple
  { ticker: 'GOOGL', color: '#4FFB5E' }, // Alphabet
  { ticker: 'MSFT', color: '#B492CA' }, // Microsoft
  { ticker: 'AMZN', color: '#B35EDE' }, // Amazon
  { ticker: 'FB', color: '#8C6D0F' }, // Facebook
  { ticker: 'TSLA', color: '#DD9284' }, // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
    ),
  );
}

function getQuotes(socket) {
  const quotes = tickers.map(({ ticker, color }) => ({
    ticker,
    color,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit('ticker', quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  let timer = setInterval(function () {
    getQuotes(socket);
  }, FETCH_INTERVAL.value);
  
  socket.emit('interval', FETCH_INTERVAL.value);

  socket.on('change-interval', (userValue) => {
    const intervalValue = getIntervalValue(userValue, socket);

    clearInterval(timer);
    timer = setInterval(function () {
      getQuotes(socket);
    }, intervalValue);
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
    clearInterval(timer);
  });
}

function getIntervalValue(userValue, socket) {
  const { value, minValue } = FETCH_INTERVAL;
  const _userValue = Number(userValue);

  if (!_userValue) return value;

  if (_userValue >= minValue) {
    return _userValue;
  }

  const messageValue = minValue / 1000;
  socket.emit('valueError', {
    error: `Value must be bigger then ${messageValue}s. Current value: ${messageValue}s`,
  });

  return minValue;
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
