const express = require('express');

const router = express.Router();

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 4000 });

wss.on('connection', (ws) => {
  wss.clients.forEach((client) => {
    client.send(
      `새로운 유저가 참가 했습니다. 현재 유저 수는 ${wss.clients.size}`
    );
  });

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      client.send(`${message}`);
    });

    ws.on('close', () => {
      wss.clients.forEach((client) => {
        client.send(`유저 한명이 나갔습니다. 현재 유저 수 ${wss.clients.size}`);
      });
    });
  });
});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
