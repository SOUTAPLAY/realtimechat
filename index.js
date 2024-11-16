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

    socket.on('joinRoom', (data) => {
        const { name, room } = data;
        socket.join(room);
        console.log(`${name} joined room: ${room}`);
    });

    socket.on('sendMessage1', (data) => {
        const { room, name, message } = data;
        console.log(`Message1 from ${name} in room ${room}: ${message}`);
        io.to(room).emit('receiveMessage1', { room, name, message });
    });

    socket.on('sendMessage2', (data) => {
        const { room, name, message } = data;
        console.log(`Message2 from ${name} in room ${room}: ${message}`);
        io.to(room).emit('receiveMessage2', { room, name, message });
    });
});
