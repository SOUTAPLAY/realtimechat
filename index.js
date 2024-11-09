const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('user connected');

  // メッセージ1を処理
  socket.on('sendMessage1', (message) => {
    console.log('Message1 has been sent: ', message);
    io.emit('receiveMessage1', message);  // メッセージ1を全員に送信
  });

  // メッセージ2を処理
  socket.on('sendMessage2', (message) => {
    console.log('Message2 has been sent: ', message);
    io.emit('receiveMessage2', message);  // メッセージ2を全員に送信
  });
});
