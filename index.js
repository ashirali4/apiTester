const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, true   );
var channel = "ciao"


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
        socket.on("message", function (data) {
            socket.broadcast.emit("message", {
                message: data.message
            });
        });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});